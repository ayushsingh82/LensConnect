'use client'

import { useEffect, useState } from 'react'
import { generateQuests, getQuestColor, getDifficultyColor, Quest } from '@/lib/ai'
import { Trophy, Sparkles } from 'lucide-react'
import { useAccount } from 'wagmi'
import { useXPManager } from '@/hooks/useContracts'

export default function QuestPage() {
  const [quests, setQuests] = useState<Quest[]>([])
  const [loading, setLoading] = useState(true)
  const { address } = useAccount()
  const { getUserXP, getUserLevel } = useXPManager()
  const [userXP, setUserXP] = useState<number>(0)
  const [userLevel, setUserLevel] = useState<number>(0)

  useEffect(() => {
    const loadQuests = async () => {
      try {
        const generatedQuests = await generateQuests(
          "Lens Connect Hackathon",
          "A hackathon focused on building the future of social networking on Lens Protocol"
        )
        setQuests(generatedQuests)
      } catch (error) {
        console.error('Failed to generate quests:', error)
      } finally {
        setLoading(false)
      }
    }

    loadQuests()
  }, [])

  useEffect(() => {
    const loadUserData = async () => {
      if (address) {
        try {
          const xp = await getUserXP(address)
          const level = await getUserLevel(address)
          setUserXP(Number(xp.data))
          setUserLevel(Number(level.data))
        } catch (error) {
          console.error('Failed to load user data:', error)
        }
      }
    }

    loadUserData()
  }, [address, getUserXP, getUserLevel])

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white p-8">
        <div className="max-w-4xl mx-auto">
          <div className="animate-pulse space-y-4">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="h-32 bg-purple-500/10 rounded-lg" />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Sparkles className="w-8 h-8 text-purple-400" />
            <h1 className="text-3xl font-bold text-white">AI-Generated Quests</h1>
          </div>
          {address && (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2 text-yellow-400">
                <Trophy className="w-5 h-5" />
                <span className="font-semibold">{userXP} XP</span>
              </div>
              <div className="px-3 py-1 rounded-full bg-purple-500/20 text-purple-400">
                Level {userLevel}
              </div>
            </div>
          )}
        </div>

        <div className="grid gap-6">
          {quests.map((quest, index) => (
            <div
              key={index}
              className="bg-black/50 border border-purple-500/20 rounded-lg p-6 hover:border-purple-500/40 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-2">{quest.title}</h3>
                  <p className="text-gray-400 mb-4">{quest.description}</p>
                  <div className="flex gap-3">
                    <span className={`px-3 py-1 rounded-full text-sm ${getQuestColor(quest.type)}`}>
                      {quest.type}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm ${getDifficultyColor(quest.difficulty)}`}>
                      {quest.difficulty}
                    </span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-yellow-400">
                  <Trophy className="w-5 h-5" />
                  <span className="font-semibold">{quest.xp} XP</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}