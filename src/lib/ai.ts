export interface Quest {
  title: string;
  description: string;
  xp: number;
  difficulty: 'Easy' | 'Medium' | 'Hard';
  type: 'Social' | 'Content' | 'Engagement' | 'Community';
}

export async function generateQuests(eventName: string, eventDescription: string): Promise<Quest[]> {
  // This is a mock implementation. In a real application, you would call an AI API here
  const quests: Quest[] = [
    {
      title: "Social Butterfly",
      description: `Connect with 5 other attendees at ${eventName} and share your thoughts about the event.`,
      xp: 50,
      difficulty: "Easy",
      type: "Social"
    },
    {
      title: "Content Creator",
      description: `Create a detailed post about your experience at ${eventName}, including key takeaways and insights.`,
      xp: 100,
      difficulty: "Medium",
      type: "Content"
    },
    {
      title: "Community Builder",
      description: `Organize a small discussion group during ${eventName} and document the key points discussed.`,
      xp: 150,
      difficulty: "Hard",
      type: "Community"
    },
    {
      title: "Event Enthusiast",
      description: `Engage with at least 3 event posts by providing meaningful comments and insights.`,
      xp: 75,
      difficulty: "Medium",
      type: "Engagement"
    }
  ];

  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000));

  return quests;
}

export function getQuestColor(type: Quest['type']): string {
  switch (type) {
    case 'Social':
      return 'bg-blue-500/20 text-blue-400';
    case 'Content':
      return 'bg-purple-500/20 text-purple-400';
    case 'Engagement':
      return 'bg-green-500/20 text-green-400';
    case 'Community':
      return 'bg-orange-500/20 text-orange-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
}

export function getDifficultyColor(difficulty: Quest['difficulty']): string {
  switch (difficulty) {
    case 'Easy':
      return 'bg-green-500/20 text-green-400';
    case 'Medium':
      return 'bg-yellow-500/20 text-yellow-400';
    case 'Hard':
      return 'bg-red-500/20 text-red-400';
    default:
      return 'bg-gray-500/20 text-gray-400';
  }
} 