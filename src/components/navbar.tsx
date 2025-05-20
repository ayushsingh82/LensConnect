'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAccount, useDisconnect, useConnect } from 'wagmi'
import { Trophy, MessageSquare, LogOut, ChevronDown, Wallet, Sparkles } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export function Navbar() {
  const pathname = usePathname()
  const { address } = useAccount()
  const { disconnect } = useDisconnect()
  const { connect, connectors } = useConnect()

  const routes = [
    {
      href: '/',
      label: 'Home'
    },
    {
      href: '/events',
      label: 'Events'
    },
    {
      href: '/create',
      label: 'Create Event'
    },
    {
      href: '/leaderboard',
      label: 'Leaderboard',
      icon: Trophy
    },
    {
      href: '/interactions',
      label: 'Interactions',
      icon: MessageSquare
    },
    {
      href: '/quest',
      label: 'AI Quests',
      icon: Sparkles
    }
  ]

  return (
    <nav className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Lens-Connect
            </Link>
          </div>
          
          <div className="flex items-center space-x-6">
            {routes.map((route) => (
              <Link
                key={route.href}
                href={route.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-purple-400 flex items-center gap-2",
                  pathname === route.href
                    ? "text-purple-400"
                    : "text-gray-300"
                )}
              >
                {route.icon && <route.icon className="w-4 h-4" />}
                {route.label}
              </Link>
            ))}
            
            {address ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" className="text-purple-400 border-purple-500/50 hover:border-purple-500 flex items-center gap-2">
                    <Wallet className="w-4 h-4" />
                    {address.slice(0, 6)}...{address.slice(-4)}
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 bg-black/90 border-purple-500/20">
                  <DropdownMenuLabel className="text-purple-400">
                    Connected Wallet
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-purple-500/20" />
                  <DropdownMenuItem
                    className="text-red-400 hover:text-red-300 hover:bg-red-500/10 cursor-pointer"
                    onClick={() => disconnect()}
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Disconnect
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="text-purple-400 border-purple-500/50 hover:border-purple-500">
                    Connect Wallet
                  </Button>
                </DialogTrigger>
                <DialogContent className="bg-black/90 border-purple-500/20 text-white">
                  <DialogHeader>
                    <DialogTitle className="text-xl text-purple-400">Connect Wallet</DialogTitle>
                  </DialogHeader>
                  <div className="grid gap-4 py-4">
                    {connectors.map((connector) => (
                      <Button
                        key={connector.uid}
                        variant="outline"
                        className="w-full text-purple-400 border-purple-500/50 hover:border-purple-500 hover:bg-purple-500/10"
                        onClick={() => connect({ connector })}
                      >
                        <Wallet className="w-4 h-4 mr-2" />
                        {connector.name}
                      </Button>
                    ))}
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 