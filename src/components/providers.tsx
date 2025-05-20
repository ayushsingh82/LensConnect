"use client";

import { getPublicClient } from "@/lib/lens/client";
import { chains } from "@lens-chain/sdk/viem";
import { LensProvider } from "@lens-protocol/react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConnectKitProvider, getDefaultConfig } from "connectkit";
import { JSX } from "react";
import { createConfig, http, WagmiProvider } from "wagmi";
import { ThemeProvider } from "next-themes";
import { config } from '@/lib/wagmi'

const queryClient = new QueryClient()

export const Providers = ({ children }: { children: JSX.Element }) => {
  const publicClient = getPublicClient();

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <WagmiProvider config={config}>
        <QueryClientProvider client={queryClient}>
          <ConnectKitProvider>
            <LensProvider client={publicClient}>{children}</LensProvider>
          </ConnectKitProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </ThemeProvider>
  );
};
