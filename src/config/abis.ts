export const XP_MANAGER_ABI = [
  {
    inputs: [
      { name: "profileId", type: "uint256" },
      { name: "amount", type: "uint256" }
    ],
    name: "awardXP",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "profileId", type: "uint256" }
    ],
    name: "getUserXP",
    outputs: [
      { name: "xp", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "profileId", type: "uint256" }
    ],
    name: "getUserLevel",
    outputs: [
      { name: "level", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const;

export const EVENT_REGISTRY_ABI = [
  {
    inputs: [
      { name: "eventId", type: "uint256" },
      { name: "profileId", type: "uint256" }
    ],
    name: "registerForEvent",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function"
  },
  {
    inputs: [
      { name: "eventId", type: "uint256" }
    ],
    name: "getEventDetails",
    outputs: [
      { name: "name", type: "string" },
      { name: "description", type: "string" },
      { name: "startTime", type: "uint256" },
      { name: "endTime", type: "uint256" },
      { name: "maxParticipants", type: "uint256" },
      { name: "currentParticipants", type: "uint256" }
    ],
    stateMutability: "view",
    type: "function"
  },
  {
    inputs: [
      { name: "profileId", type: "uint256" }
    ],
    name: "getUserEvents",
    outputs: [
      {
        components: [
          { name: "eventId", type: "uint256" },
          { name: "name", type: "string" },
          { name: "startTime", type: "uint256" },
          { name: "endTime", type: "uint256" }
        ],
        name: "events",
        type: "tuple[]"
      }
    ],
    stateMutability: "view",
    type: "function"
  }
] as const; 