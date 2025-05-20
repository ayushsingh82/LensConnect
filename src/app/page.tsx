'use client';

import Image from "next/image";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { PlusCircle, Calendar, Users, Trophy, Sparkles } from "lucide-react";
import { useAccount } from "wagmi";

export default function Home() {
  const { address } = useAccount();

  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-purple-900 flex flex-col items-center justify-center p-6">
    <div className="text-center mb-12">
      <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
        Welcome to Lens Connect
      </h1>
      <p className="text-xl text-purple-200 mb-8">
        Create and discover events in the Lens Protocol ecosystem
      </p>
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl w-full mb-16">
      <Card className="bg-black/50 border-purple-500/50 hover:border-purple-500 transition-colors">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <PlusCircle className="w-6 h-6 text-purple-400" />
            Create Event
          </CardTitle>
          <CardDescription className="text-purple-200">
            Organize your own event and connect with the community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500"
            onClick={() => window.location.href = '/create'}
          >
            Create New Event
          </Button>
        </CardContent>
      </Card>

      <Card className="bg-black/50 border-purple-500/50 hover:border-purple-500 transition-colors">
        <CardHeader>
          <CardTitle className="text-2xl text-white flex items-center gap-2">
            <Calendar className="w-6 h-6 text-purple-400" />
            Find Events
          </CardTitle>
          <CardDescription className="text-purple-200">
            Discover and join events in the Lens ecosystem
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Button 
            className="w-full bg-purple-500 hover:bg-purple-600 text-white border-2 border-purple-500"
            onClick={() => window.location.href = '/events'}
          >
            Browse Events
          </Button>
        </CardContent>
      </Card>
    </div>

    <div className="max-w-4xl w-full mb-16">
      <h2 className="text-3xl font-bold text-white text-center mb-8">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="bg-black/50 border-purple-500/50 hover:border-purple-500 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Users className="w-6 h-6 text-purple-400" />
            </div>
            <CardTitle className="text-xl text-white">Offline Connections</CardTitle>
            <CardDescription className="text-purple-200">
              Connect with Lens community members in real life and build meaningful relationships
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-black/50 border-purple-500/50 hover:border-purple-500 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Trophy className="w-6 h-6 text-purple-400" />
            </div>
            <CardTitle className="text-xl text-white">On-Chain Reputation</CardTitle>
            <CardDescription className="text-purple-200">
              Build your reputation through verified event participation and community engagement
            </CardDescription>
          </CardHeader>
        </Card>

        <Card className="bg-black/50 border-purple-500/50 hover:border-purple-500 transition-colors">
          <CardHeader>
            <div className="w-12 h-12 rounded-full bg-purple-500/20 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-purple-400" />
            </div>
            <CardTitle className="text-xl text-white">AI-Powered Quests</CardTitle>
            <CardDescription className="text-purple-200">
              Complete quests, earn XP, and unlock special rewards through our AI agents
            </CardDescription>
          </CardHeader>
        </Card>
      </div>
    </div>

    {address && (
      <Card className="w-full max-w-lg bg-black/50 border-purple-500/50">
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="h-16 w-16">
            <AvatarFallback>{address.substring(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <CardTitle className="text-xl text-white">Connected Wallet</CardTitle>
            <CardDescription className="mt-1 text-purple-200">
              {address}
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-purple-200">
            Successfully authenticated with Lens Protocol
          </p>
        </CardContent>
      </Card>
    )}
  </div>
  );
}
