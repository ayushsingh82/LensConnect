'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { useAccount } from 'wagmi'
import { Trophy, MessageSquare } from 'lucide-react'

export function Navbar() {
  const pathname = usePathname()
  const { address } = useAccount()

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
    }
  ]

  return (
    <nav className="border-b border-purple-500/20 bg-black/50 backdrop-blur-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-white">
              Lens Events
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
              <Button variant="outline" className="text-purple-400 border-purple-500/50 hover:border-purple-500">
                {address.slice(0, 6)}...{address.slice(-4)}
              </Button>
            ) : (
              <Button variant="outline" className="text-purple-400 border-purple-500/50 hover:border-purple-500">
                Connect Wallet
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  )
} 