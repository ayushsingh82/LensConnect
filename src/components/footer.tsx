'use client'

import Link from 'next/link'
import { Github, Twitter, MessageCircle } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-purple-500/20 bg-black/50 backdrop-blur-sm mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-white">Lens-Connect</h3>
            <p className="text-gray-400 text-sm">
              Create and discover events in the Lens Protocol ecosystem
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-purple-400 mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/events" className="text-gray-400 hover:text-purple-400 text-sm">
                  Browse Events
                </Link>
              </li>
              <li>
                <Link href="/create" className="text-gray-400 hover:text-purple-400 text-sm">
                  Create Event
                </Link>
              </li>
              <li>
                <Link href="/leaderboard" className="text-gray-400 hover:text-purple-400 text-sm">
                  Leaderboard
                </Link>
              </li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h4 className="text-sm font-semibold text-purple-400 mb-4">Resources</h4>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://docs.lens.xyz" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-sm"
                >
                  Documentation
                </a>
              </li>
              <li>
                <a 
                  href="https://github.com/lens-protocol" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-sm"
                >
                  GitHub
                </a>
              </li>
              <li>
                <a 
                  href="https://lens.xyz/blog" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-purple-400 text-sm"
                >
                  Blog
                </a>
              </li>
            </ul>
          </div>

          {/* Social Links */}
          <div>
            <h4 className="text-sm font-semibold text-purple-400 mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a
                href="https://twitter.com/LensProtocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/lens-protocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://discord.gg/lensprotocol"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-400 hover:text-purple-400"
              >
                <MessageCircle className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-purple-500/20 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              © {new Date().getFullYear()} Lens-Connect. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link href="/privacy" className="text-gray-400 hover:text-purple-400 text-sm">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-purple-400 text-sm">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
} 