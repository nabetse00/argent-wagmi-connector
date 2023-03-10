# Argent Wagmi Custom Connector

## Intro

Welcome to the Argent Wagmi Custom Connector npm package! 

This package provides an easy way for developers to quickly and easily integrate their applications with the Wagmi platform.

## Usage
```ts
/**
 * imports 
 * */

import { arbitrum, avalanche, bsc, fantom, gnosis, mainnet, optimism, polygon, zkSync, zkSyncTestnet, } from 'wagmi/chains'
import ArgentWagmiConnector  from "@nabetse/argent-wagmi-connector";


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

/**
 * More code here
 * */

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

## Example 

See an example using vite react-ts template: https://github.com/nabetse00/test-argent-wagmi-connector

Web3Modal needs Metamask so install this extension !

Demo site https://nabetse00.github.io/test-argent-wagmi-connector/

# 