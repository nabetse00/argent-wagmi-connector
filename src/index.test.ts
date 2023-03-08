import ArgentWagmiConnector from "./index";
import { zkSyncTestnet } from "wagmi/chains";
import { describe, it, expect } from 'vitest';

const options = {
    chains: [zkSyncTestnet],
    options: {
      chainId: 280,
      rpcUrl: "https://zksync2-testnet.zksync.dev",
      walletConnect: {
        metadata: {
          name: "Cool dapp",
          description: "Description of a cool dapp",
          url: "https://example.com",
          icons: ["https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"]
        }
      }
    }
  }

  describe('Simple test', () => {
    it('Should have correct name', async () => {
        const connector = new ArgentWagmiConnector(options)
        expect(connector.name).toEqual('Argent Wallet')
    })
})