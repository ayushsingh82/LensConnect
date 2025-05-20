export const CONTRACT_ADDRESSES = {
  XP_MANAGER: "0x4fbffF20302F3326B20052ab9C217C44F6480900",
  EVENT_REGISTRY: "0xeff187b4190E551FC25a7fA4dFC6cf7fDeF7194f",
} as const;

export const NETWORK_CONFIG = {
  LENS_SEPOLIA: {
    chainId: 37111,
    name: "Lens Network Sepolia",
    rpcUrl: "https://rpc.testnet.lens.dev",
    blockExplorer: "https://explorer.testnet.lens.dev",
  },
} as const; 