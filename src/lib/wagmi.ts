import { http } from 'wagmi'
import { polygon } from 'wagmi/chains'

export const config = {
  chains: [polygon],
  transports: {
    [polygon.id]: http(),
  },
} 