"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import QRCode from "react-qr-code";
import { CalendarIcon, UserPlusIcon } from "lucide-react";
import Link from "next/link";

// Mock data for registered events - this would come from your backend/database
const registeredEvents = [
  {
    id: 1,
    name: "Lens Protocol Hackathon",
    startDate: "2024-05-16T13:48:00",
    qrCode: "event-1-qr-code",
    participants: [
      { username: "alice.lens", interests: ["zk", "defi"], connectionStatus: "pending" },
      { username: "bob.lens", interests: ["fhe", "gaming"], connectionStatus: "connected" },
      { username: "carol.lens", interests: ["defi", "nft"], connectionStatus: "none" }
    ]
  }
];

export default function InteractionsPage() {
  const [selectedEvent, setSelectedEvent] = useState<typeof registeredEvents[0] | null>(null);

  const handleConnectionRequest = (username: string) => {
    // Here you would typically handle the connection request
    console.log(`Connection request sent to ${username}`);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-purple-400 mb-8">My Events</h1>
      
      {registeredEvents.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="text-white/60 text-lg mb-4">
            You haven't registered for any events yet
          </div>
          <Link href="/events">
            <Button className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500">
              Browse Events
            </Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {registeredEvents.map((event) => (
            <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-white hover:border-purple-500">
              <CardHeader>
                <CardTitle className="text-xl text-white">{event.name}</CardTitle>
                <div className="flex items-center text-sm text-white/80">
                  <CalendarIcon className="w-4 h-4 mr-2 text-white" />
                  {new Date(event.startDate).toLocaleDateString()}
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center space-y-4">
                  <div className="bg-white p-4 rounded-lg">
                    <QRCode value={event.qrCode} size={200} />
                  </div>
                  <Button 
                    className="w-full bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500"
                    onClick={() => setSelectedEvent(event)}
                  >
                    View Connections
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl bg-black/95 border-2 border-white">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">{selectedEvent.name}</DialogTitle>
              </DialogHeader>
              
              <div className="mt-4">
                <h3 className="text-xl font-semibold text-white mb-4">Event Participants</h3>
                <div className="space-y-4">
                  {selectedEvent.participants.map((participant, index) => (
                    <div key={index} className="flex items-center justify-between p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <span className="text-white font-medium">{participant.username}</span>
                          {participant.connectionStatus === "connected" && (
                            <Badge variant="secondary" className="bg-green-500/20 text-green-400 border border-green-500/30">
                              Connected
                            </Badge>
                          )}
                          {participant.connectionStatus === "pending" && (
                            <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/30">
                              Pending
                            </Badge>
                          )}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {participant.interests.map((interest, i) => (
                            <Badge key={i} variant="secondary" className="bg-purple-500/20 text-white border border-purple-500/30">
                              {interest}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      {participant.connectionStatus === "none" && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                          onClick={() => handleConnectionRequest(participant.username)}
                        >
                          <UserPlusIcon className="w-4 h-4 mr-2" />
                          Connect
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}