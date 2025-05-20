"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Trophy, Users, Star } from "lucide-react";

// Mock data for leaderboard
const leaderboardData = [
  {
    id: 1,
    lensHandle: "alice.lens",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=alice",
    connections: 245,
    xp: 1250,
    rank: 1,
  },
  {
    id: 2,
    lensHandle: "bob.lens",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=bob",
    connections: 189,
    xp: 980,
    rank: 2,
  },
  {
    id: 3,
    lensHandle: "carol.lens",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=carol",
    connections: 156,
    xp: 845,
    rank: 3,
  },
  {
    id: 4,
    lensHandle: "dave.lens",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=dave",
    connections: 132,
    xp: 720,
    rank: 4,
  },
  {
    id: 5,
    lensHandle: "eve.lens",
    avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=eve",
    connections: 98,
    xp: 650,
    rank: 5,
  },
];

export default function LeaderboardPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-8 border-b-2 border-white pb-4">
        <h1 className="text-3xl font-bold text-purple-400">Leaderboard</h1>
      </div>

      <div className="bg-black/40 border-2 border-white/20 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-white/20">
              <th className="p-4 text-left text-white/60 font-medium">Rank</th>
              <th className="p-4 text-left text-white/60 font-medium">Profile</th>
              <th className="p-4 text-left text-white/60 font-medium">Connections</th>
              <th className="p-4 text-left text-white/60 font-medium">Total XP</th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData.map((profile) => (
              <tr 
                key={profile.id} 
                className="border-b border-white/10 hover:bg-purple-500/10 transition-colors"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Trophy className="w-5 h-5 text-purple-400" />
                    <span className="font-bold text-white">#{profile.rank}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border-2 border-purple-500">
                      <AvatarImage src={profile.avatar} />
                      <AvatarFallback>{profile.lensHandle.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <span className="font-medium text-white">{profile.lensHandle}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Users className="w-4 h-4 text-purple-400" />
                    <span className="text-white">{profile.connections}</span>
                  </div>
                </td>
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-yellow-400" />
                    <span className="text-white">{profile.xp}</span>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}