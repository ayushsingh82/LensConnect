"use client";

import { useEventRegistry } from '@/hooks/useContracts'
import { useAccount } from 'wagmi'
import { Calendar, MapPin, Users, Trophy, MessageSquare, Check } from 'lucide-react'
import { useState } from 'react'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { toast } from 'sonner'

const EVENTS = [
  {
    id: "1",
    name: "Lens Protocol Hackathon",
    description: "Build the future of social networking on Lens Protocol. Create innovative applications that leverage the power of decentralized social graphs.",
    image: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "April 16-18, 2024",
    location: "SFC",
    participants: 150,
    xpReward: 1000,
    registeredUsers: [
      { username: "alice.lens", interests: ["web3", "defi"] },
      { username: "bob.lens", interests: ["social", "gaming"] },
      { username: "carol.lens", interests: ["defi", "nft"] }
    ]
  },
  {
    id: "2",
    name: "Lens Community Meetup",
    description: "Join fellow Lens Protocol enthusiasts for a day of networking, workshops, and discussions about the future of decentralized social media.",
    image: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
    date: "March 20, 2024",
    location: "San Francisco",
    participants: 75,
    xpReward: 500,
    registeredUsers: [
      { username: "dave.lens", interests: ["social", "gaming"] },
      { username: "eve.lens", interests: ["defi", "web3"] }
    ]
  }
]

export default function EventsPage() {
  const { address } = useAccount()
  const { registerForEvent } = useEventRegistry()
  const [selectedEvent, setSelectedEvent] = useState<typeof EVENTS[0] | null>(null)
  const [sentRequests, setSentRequests] = useState<string[]>([])
  const [isRegistering, setIsRegistering] = useState(false)

  const handleRegister = async (eventId: string) => {
    if (!address) return
    setIsRegistering(true)
    try {
      await registerForEvent(eventId, address)
      toast.success('Successfully registered for the event!', {
        description: 'You can now connect with other participants.',
        duration: 5000,
      })
      setSelectedEvent(null)
    } catch (error) {
      console.error('Failed to register for event:', error)
      toast.error('Failed to register for event', {
        description: 'Please try again later.',
        duration: 5000,
      })
    } finally {
      setIsRegistering(false)
    }
  }

  const handleConnectionRequest = (username: string) => {
    setSentRequests(prev => [...prev, username])
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Upcoming Events</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {EVENTS.map((event) => (
            <div
              key={event.id}
              className="bg-black/50 border border-purple-500/20 rounded-lg overflow-hidden hover:border-purple-500/40 transition-colors"
            >
              <div className="relative h-48 w-full">
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-full object-cover"
                />
              </div>
              
              <div className="p-6">
                <h2 className="text-2xl font-semibold mb-2">{event.name}</h2>
                <p className="text-gray-400 mb-4">{event.description}</p>
                
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="flex items-center gap-2 text-gray-300">
                    <Calendar className="w-5 h-5 text-purple-400" />
                    <span>{event.date}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <MapPin className="w-5 h-5 text-purple-400" />
                    <span>{event.location}</span>
                  </div>
                  <div className="flex items-center gap-2 text-gray-300">
                    <Users className="w-5 h-5 text-purple-400" />
                    <span>{event.participants} participants</span>
                  </div>
                  <div className="flex items-center gap-2 text-yellow-400">
                    <Trophy className="w-5 h-5" />
                    <span>{event.xpReward} XP</span>
                  </div>
                </div>

                <button
                  onClick={() => setSelectedEvent(event)}
                  className="w-full bg-purple-500/20 text-purple-400 py-2 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  Register Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="bg-black/95 border border-purple-500/20 text-white">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-purple-400">{selectedEvent.name}</DialogTitle>
              </DialogHeader>
              
              <div className="space-y-6 py-4">
                <div className="flex items-center text-lg text-white/80">
                  <Calendar className="w-5 h-5 mr-3 text-purple-400" />
                  {selectedEvent.date}
                </div>
                <div className="flex items-center text-lg text-white/80">
                  <MapPin className="w-5 h-5 mr-3 text-purple-400" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center text-lg text-white/80">
                  <Users className="w-5 h-5 mr-3 text-purple-400" />
                  {selectedEvent.participants} people joining
                </div>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-4">Participants</h3>
                  <div className="space-y-4">
                    {selectedEvent.registeredUsers.map((user, index) => (
                      <div key={index} className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-white font-medium text-lg">{user.username}</span>
                          {sentRequests.includes(user.username) ? (
                            <button
                              className="flex items-center gap-2 text-green-400 px-3 py-1 rounded-full bg-green-500/10"
                              disabled
                            >
                              <Check className="w-4 h-4" />
                              Sent
                            </button>
                          ) : (
                            <button
                              onClick={() => handleConnectionRequest(user.username)}
                              className="flex items-center gap-2 text-purple-400 px-3 py-1 rounded-full bg-purple-500/10 hover:bg-purple-500/20"
                            >
                              <MessageSquare className="w-4 h-4" />
                              Connect
                            </button>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {user.interests.map((interest, i) => (
                            <span
                              key={i}
                              className="px-2 py-1 text-sm rounded-full bg-purple-500/20 text-purple-400"
                            >
                              {interest}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                <button
                  onClick={() => handleRegister(selectedEvent.id)}
                  disabled={isRegistering}
                  className="w-full bg-purple-500/20 text-purple-400 py-3 rounded-lg hover:bg-purple-500/30 transition-colors mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isRegistering ? 'Registering...' : 'Register for Event'}
                </button>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  )
}