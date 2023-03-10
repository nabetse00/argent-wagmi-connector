import ArgentWagmiConnector from "./index";
import { zkSyncTestnet } from "wagmi/chains";
import { describe, it, expect } from 'vitest';

const options = {
    chains: [zkSyncTestnet],
    options: {
      chainId: zkSyncTestnet.id,
      rpcUrl: zkSyncTestnet.rpcUrls.default.http[0],
      walletConnect: {
        metadata: {
          name: "Test app init",
          description: "Description of test app init",
          url: "https://example.com",
          icons: ["https://cdn.sstatic.net/Sites/stackoverflow/Img/apple-touch-icon.png?v=c78bd457575a"]
        }
      }
    }
  }

  describe('Argent Wallet Connector', () => {
    it('inits', async () => {
        const connector = new ArgentWagmiConnector(options)
        expect(connector.name).toEqual('Argent Wallet')
    })
})