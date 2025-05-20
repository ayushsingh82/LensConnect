"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { CalendarIcon, MapPinIcon, UsersIcon, MessageSquareIcon, CheckIcon } from "lucide-react";
import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useRouter } from "next/navigation";

// Mock data for events
const events = [
  {
    id: 1,
    name: "Lens Protocol Meetup",
    description: "Join us for a casual meetup to discuss the future of decentralized social media.",
    image: "/event1.jpg",
    startDate: "2024-05-16T13:48:00",
    location: "San Francisco, CA",
    coordinates: { lat: 37.7749, lng: -122.4194 },
    attendees: 20,
    features: ["POAP"],
    registeredUsers: [
      { username: "alice.lens", interests: ["zk", "defi"] },
      { username: "bob.lens", interests: ["fhe", "gaming"] },
      { username: "carol.lens", interests: ["defi", "nft"] }
    ]
  },
  {
    id: 2,
    name: "Web3 Conference",
    description: "Annual conference bringing together the brightest minds in Web3.",
    image: "/event2.jpg",
    startDate: "2024-06-20T09:00:00",
    location: "New York, NY",
    coordinates: { lat: 40.7128, lng: -74.0060 },
    attendees: 25,
    features: ["POAP"],
    registeredUsers: [
      { username: "dave.lens", interests: ["zk", "gaming"] },
      { username: "eve.lens", interests: ["defi", "fhe"] }
    ]
  },
  // Add more mock events as needed
];

// Available interests
const availableInterests = [
  "zk", "defi", "gaming", "fhe", "nft", "dao", "social", "infrastructure", "privacy"
];

export default function EventsPage() {
  const router = useRouter();
  const [selectedEvent, setSelectedEvent] = useState<typeof events[0] | null>(null);
  const [registeredEvents, setRegisteredEvents] = useState<number[]>([]);
  const [showAttendees, setShowAttendees] = useState(false);
  const [sentRequests, setSentRequests] = useState<string[]>([]);
  const [registrationForm, setRegistrationForm] = useState({
    lensAddress: "",
    selectedInterests: [] as string[]
  });

  const handleRegister = (eventId: number) => {
    setRegisteredEvents(prev => [...prev, eventId]);
    // Reset form
    setRegistrationForm({
      lensAddress: "",
      selectedInterests: []
    });
    // Close the modal
    setSelectedEvent(null);
    // Redirect to interactions page
    router.push('/interactions');
  };

  const handleInterestToggle = (interest: string) => {
    setRegistrationForm(prev => ({
      ...prev,
      selectedInterests: prev.selectedInterests.includes(interest)
        ? prev.selectedInterests.filter(i => i !== interest)
        : [...prev.selectedInterests, interest]
    }));
  };

  const isRegistered = (eventId: number) => {
    return registeredEvents.includes(eventId);
  };

  const handleConnectionRequest = (username: string) => {
    setSentRequests(prev => [...prev, username]);
  };

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8 border-b-2 border-white pb-4">
        <h1 className="text-3xl font-bold text-purple-400">Upcoming Events</h1>
        <Link href="/create">
          <Button className="bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500">
            Create Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <Card key={event.id} className="overflow-hidden hover:shadow-lg transition-shadow border-2 border-white hover:border-purple-500">
            <div className="aspect-video bg-purple-500/10 relative">
              {/* Add actual image here */}
              <div className="absolute inset-0 flex items-center justify-center text-white">
                Event Image
              </div>
            </div>
            <CardHeader>
              <CardTitle className="text-xl text-white">{event.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-white/70">{event.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="flex items-center text-sm text-white/80">
                  <CalendarIcon className="w-4 h-4 mr-2 text-white" />
                  {new Date(event.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <MapPinIcon className="w-4 h-4 mr-2 text-white" />
                  {event.location}
                </div>
                <div className="flex items-center text-sm text-white/80">
                  <UsersIcon className="w-4 h-4 mr-2 text-white" />
                  {event.attendees} attendees
                </div>
                <div className="flex flex-wrap gap-2 mt-2">
                  {event.features.map((feature) => (
                    <Badge key={feature} variant="secondary" className="bg-purple-500/10 text-white border border-white">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex gap-2">
              <Button 
                className="w-full bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500"
                onClick={() => setSelectedEvent(event)}
              >
                View Details
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>

      <Dialog open={!!selectedEvent} onOpenChange={() => setSelectedEvent(null)}>
        <DialogContent className="max-w-2xl bg-black/95 border-2 border-white">
          {selectedEvent && (
            <>
              <DialogHeader>
                <DialogTitle className="text-2xl text-white">{selectedEvent.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-6 py-4">
                <div className="flex items-center text-lg text-white/80">
                  <CalendarIcon className="w-5 h-5 mr-3 text-purple-400" />
                  {new Date(selectedEvent.startDate).toLocaleDateString()}
                </div>
                <div className="flex items-center text-lg text-white/80">
                  <MapPinIcon className="w-5 h-5 mr-3 text-purple-400" />
                  {selectedEvent.location}
                </div>
                <div className="flex items-center text-lg text-white/80">
                  <UsersIcon className="w-5 h-5 mr-3 text-purple-400" />
                  {selectedEvent.attendees} people joining
                  <Button 
                    variant="ghost" 
                    className="ml-4 text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                    onClick={() => setShowAttendees(!showAttendees)}
                  >
                    {showAttendees ? "Hide Attendees" : "Show Attendees"}
                  </Button>
                </div>
                
                {showAttendees && (
                  <div className="mt-6">
                    <div className="space-y-4">
                      {selectedEvent.registeredUsers.map((user, index) => (
                        <div key={index} className="p-4 bg-purple-500/10 rounded-lg border border-purple-500/20">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-white font-medium text-lg">{user.username}</span>
                            {sentRequests.includes(user.username) ? (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-green-400 hover:text-green-300 hover:bg-green-500/10"
                                disabled
                              >
                                <CheckIcon className="w-4 h-4 mr-2" />
                                Sent ✓
                              </Button>
                            ) : (
                              <Button
                                variant="ghost"
                                size="sm"
                                className="text-purple-400 hover:text-purple-300 hover:bg-purple-500/10"
                                onClick={() => handleConnectionRequest(user.username)}
                              >
                                <span className="mr-2">👤</span>
                                Connect
                              </Button>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2">
                            {user.interests.map((interest, i) => (
                              <Badge key={i} variant="secondary" className="bg-purple-500/20 text-white border border-purple-500/30">
                                {interest}
                              </Badge>
                            ))}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="pt-4">
                  {!isRegistered(selectedEvent.id) ? (
                    <div className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="lensAddress" className="text-white">Your Lens Address</Label>
                        <Input
                          id="lensAddress"
                          placeholder="Enter your .lens address"
                          value={registrationForm.lensAddress}
                          onChange={(e) => setRegistrationForm(prev => ({ ...prev, lensAddress: e.target.value }))}
                          className="bg-black/50 border-purple-500/50 text-white"
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label className="text-white">Select Your Interests</Label>
                        <div className="grid grid-cols-2 gap-2">
                          {availableInterests.map((interest) => (
                            <div key={interest} className="flex items-center space-x-2">
                              <Checkbox
                                id={interest}
                                checked={registrationForm.selectedInterests.includes(interest)}
                                onCheckedChange={() => handleInterestToggle(interest)}
                                className="border-purple-500/50 data-[state=checked]:bg-purple-500"
                              />
                              <Label
                                htmlFor={interest}
                                className="text-sm text-white cursor-pointer"
                              >
                                {interest}
                              </Label>
                            </div>
                          ))}
                        </div>
                      </div>

                      <Button 
                        className="w-full bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500"
                        onClick={() => handleRegister(selectedEvent.id)}
                        disabled={registrationForm.selectedInterests.length === 0}
                      >
                        Register for Event
                      </Button>
                    </div>
                  ) : (
                    <Button 
                      className="w-full bg-green-500 hover:bg-green-600 text-white border-2 border-green-500"
                      disabled
                    >
                      Registered ✓
                    </Button>
                  )}
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}