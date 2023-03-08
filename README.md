# Argent Wagmi Custom Connector

## Usage
```ts
import { arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon, zkSync, zkSyncTestnet, } from 'wagmi/chains'

const chains = [zkSync, zkSyncTestnet];

// Add Argent connector
const connector = new ArgentWagmiConnector({
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
})

const wagmiClient = createClient({
  autoConnect: false,
  connectors: [
    connector,
    ...modalConnectors(
      { version: '2', appName: 'web3Modal', chains: chains, projectId, }
    ),
  ],
  provider
})

... 
-- MORE CODE --
...

return (
    <>
      <WagmiConfig client={wagmiClient}>
        <div className="App">
          <Web3Button
            balance='show' />
        </div>
      </WagmiConfig>

      <br />

      <Web3Modal
        projectId={projectId}
        ethereumClient={ethereumClient}
        enableAccountView={true}
        enableNetworkView={true}
        themeMode='light'
        walletImages={{
          argentWallet: '/wallet_argent.svg'
        }}
      />

    </>
  )

```