# LensConnect - Event Engagement Platform

A decentralized platform for event management and engagement built on Lens Protocol, featuring AI-powered quests and XP rewards.

## Features

### 1. XP Collection System
- On-chain XP tracking through the XP Manager contract
- Level progression based on XP accumulation
- XP rewards for completing quests and participating in events
- Real-time XP updates and level visualization

### 2. AI-Powered Quest System
- Dynamic quest generation based on event context
- Four quest types:
  - Social: Networking and community building
  - Content: Creating valuable content
  - Engagement: Interacting with event content
  - Community: Organizing and participating in discussions
- Difficulty levels (Easy, Medium, Hard) with corresponding XP rewards
- AI-generated quest descriptions and requirements

### 3. On-Chain Integration
- Smart Contracts:
  - XP Manager: Handles XP distribution and tracking
  - Event Registry: Manages event registration and details
- Lens Protocol Integration:
  - Profile-based interactions
  - Content posting and engagement
  - Social graph integration
- Lens Network Sepolia Testnet deployment

### 4. Event Management
- Event creation and registration
- Participant tracking
- Event-specific quests and rewards
- Real-time event status updates

## Technical Flow

1. **User Onboarding**
   - Connect wallet
   - Create/Import Lens profile
   - Initialize XP tracking

2. **Event Participation**
   - Browse available events
   - Register for events
   - View event details and requirements

3. **Quest System**
   - AI generates quests based on event context
   - Users view available quests
   - Complete quests through platform interactions
   - XP rewards distributed on completion

4. **XP Collection**
   - XP earned through quest completion
   - Level progression based on XP thresholds
   - On-chain XP tracking and verification
   - Real-time XP and level updates

5. **Content Creation**
   - Post event-related content
   - Engage with other participants
   - Earn XP for valuable contributions
   - Build reputation through consistent engagement

## Getting Started

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env.local
```

4. Run the development server:
```bash
npm run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Smart Contracts

### XP Manager
- `awardXP`: Award XP to users
- `getUserXP`: Get user's current XP
- `getUserLevel`: Get user's current level

### Event Registry
- `registerForEvent`: Register for events
- `getEventDetails`: Get event information
- `getUserEvents`: Get user's registered events

## Network Configuration
- Network: Lens Network Sepolia
- Chain ID: 37111
- RPC URL: https://rpc.testnet.lens.dev
- Explorer: https://explorer.testnet.lens.dev

## Contributing
Contributions are welcome! Please feel free to submit a Pull Request.

## License
This project is licensed under the MIT License - see the LICENSE file for details.
