import { http } from 'wagmi'
import { mainnet , lineaSepolia } from 'wagmi/chains'
import { createConfig } from 'wagmi'

// Define Lens Network Sepolia
const lensSepolia = {
  id: 37111,
  name: 'Lens Network Sepolia',
  network: 'lens-sepolia',
  nativeCurrency: {
    decimals: 18,
    name: 'Ethereum',
    symbol: 'ETH',
  },
  rpcUrls: {
    default: { http: ['https://rpc.testnet.lens.dev'] },
    public: { http: ['https://rpc.testnet.lens.dev'] },
  },
  blockExplorers: {
    default: { name: 'Lens Explorer', url: 'https://explorer.testnet.lens.dev' },
  },
  testnet: true,
} as const

export const config = createConfig({
  chains: [lensSepolia, mainnet],
  transports: {
    [lensSepolia.id]: http(),
    [mainnet.id]: http(),
  },
  ssr: true
}) 