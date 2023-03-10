import { getEthereumProvider, IArgentLoginOptions } from '@argent/login';
import type { ProviderRpcError } from '@wagmi/core';
import {
  UserRejectedRequestError
} from '@wagmi/core';
import { getAddress } from 'ethers/lib/utils.js';
import { Chain, Connector } from 'wagmi';
import { Web3Provider } from 'zksync-web3';

/**
 * ArgentWagmiConnector
 * @extends {Connector<Web3Provider, IArgentLoginOptions>}
 * @author nabetse
 */
export default class ArgentWagmiConnector extends Connector<Web3Provider, IArgentLoginOptions> {
  async connect(_config?: { chainId?: number | undefined } | undefined) {
    try {
      const provider = await this.getProvider()
      provider.on('accountsChanged', this.onAccountsChanged)
      provider.on('chainChanged', this.onChainChanged)
      provider.on('disconnect', this.onDisconnect)
      this.emit('message', { type: 'connecting' })

      const account = await this.getAccount();

      const id = await this.getChainId();
      const unsupported = await this.isAuthorized();
      return {
        account,
        chain: { id, unsupported },
        provider: provider,
      };
    } catch (error) {
      if (
        /(user closed modal|accounts received is empty)/i.test(
          (error as ProviderRpcError).message,
        )
      )
        throw new UserRejectedRequestError(error)
      throw error
    }
  }
  async disconnect(): Promise<void> {
    if (!this.#provider) return

    const provider = await this.getProvider()
    provider.removeListener('accountsChanged', this.onAccountsChanged)
    provider.removeListener('chainChanged', this.onChainChanged)
    provider.removeListener('disconnect', this.onDisconnect)
    localStorage.removeItem('walletconnect');
    this.#provider = undefined;
  }
  async getAccount(): Promise<`0x${string}`> {
    const provider = await this.getProvider();
    const signer = provider.getSigner();
    const account = await signer.getAddress();
    return getAddress(account);
  }
  async getChainId(): Promise<number> {
    const provider = await this.getProvider();
    const cID = provider.getNetwork().then((n) => {
      return n.chainId;
    });
    return cID;
  }
  async getSigner(_config?: { chainId?: number | undefined } | undefined): Promise<any> {
    const provider = await this.getProvider();
    return provider.getSigner();
  }

  async isAuthorized(): Promise<boolean> {
    try {
      const account = await this.getAccount()
      return !!account
    } catch {
      return false
    }
  }
  protected onAccountsChanged(accounts: `0x${string}`[]): void {
    //if (accounts.length === 0) this.disconnect();
    if (accounts.length === 0) this.emit('disconnect')
    else this.emit('change', { account: getAddress(accounts[0] as string) })
  }
  protected onChainChanged(_chain: string | number): void {
    throw new Error('Method not implemented.');
  }
  protected onDisconnect(error: Error): void {
    console.error(error)
    this.disconnect();
  }
  readonly id = 'argentWallet';
  readonly name = 'Argent Wallet';
  readonly ready = true;

  #provider?: Web3Provider;

  /**
   * @param {Chain[]} chains
   * @param {IArgentLoginOptions} options
   */
  constructor(config: { chains?: Chain[]; options: IArgentLoginOptions }) {
    super(config);
  }

  async getProvider() {
    if (!this.#provider) {
      const ethereumProvider = await getEthereumProvider(this.options);
      await ethereumProvider.enable();
      this.#provider = new Web3Provider(ethereumProvider);
    }
    return this.#provider;
  }
}

module.exports = ArgentWagmiConnector;