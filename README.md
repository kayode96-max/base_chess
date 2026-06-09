# BaseChess - On-Chain Chess Game Platform

A decentralized chess gaming platform built on Base with blockchain integration, AI-powered move suggestions, and smart contract-based wagering.

## Overview

BaseChess is a comprehensive chess gaming ecosystem that combines traditional chess gameplay with Web3 capabilities. Players can compete in on-chain chess games with wager support, train with AI-powered coaching, solve tactical puzzles, and participate in tournaments—all while leveraging blockchain technology for transparency and trustless transactions.

**Built with:** Next.js, React, TypeScript, Solidity, Viem, Wagmi, OnchainKit, Genkit AI, and Hardhat

## Features

### Core Gameplay
- **On-Chain Chess Games**: Play chess with full move validation on the blockchain
- **Wager System**: Support for in-game wagering and rewards
- **Real-Time Multiplayer**: Play against other users with live game state synchronization
- **AI Opponent**: Play against Gemini AI-powered chess engine for single-player mode
- **Move Validation**: Complete chess rule enforcement including castling, en passant, and promotion

### Learning & Development
- **Chess Puzzles**: Solve tactical puzzles with difficulty levels
- **AI-Powered Coaching**: Get real-time move suggestions and strategic analysis
- **Learning Dashboard**: Track progress, skill levels, and achievements
- **Coach Marketplace**: Browse and book professional chess coaches
- **Training Modes**: Specialized training for different chess strategies

### Social & Community
- **Leaderboards**: Daily, weekly, and all-time rankings
- **Player Profiles**: View detailed player statistics and match history
- **Game History**: Complete match records with move annotations
- **Tournament System**: Organized tournaments with brackets and rankings

## Prerequisites

Before getting started, ensure you have:

- **Node.js** 18+ and npm/yarn installed
- **Git** for version control
- **Base chain** understanding (L2 blockchain on Ethereum)
- **MetaMask** or compatible Web3 wallet (for mainnet deployment)
- **Coinbase Developer Platform** account for API keys (optional, for advanced features)

## Installation & Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd base_chess
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Environment Configuration

Create a `.env.local` file in the root directory:

```bash
# Farcaster & OnchainKit
NEXT_PUBLIC_PROJECT_NAME="BaseChess"
NEXT_PUBLIC_ONCHAINKIT_API_KEY=<your-cdp-api-key>
NEXT_PUBLIC_URL=http://localhost:3000

# Blockchain (Optional)
NEXT_PUBLIC_CHAIN_ID=8453  # Base mainnet

# AI Configuration (Gemini API)
GENKIT_API_KEY=<your-genkit-api-key>
NEXT_PUBLIC_GENKIT_ENABLED=true

# Contract Addresses (after deployment)
NEXT_PUBLIC_CHESS_CONTRACT_ADDRESS=<deployed-contract-address>
```

Copy `.example.env` for reference:

```bash
cp .example.env .env.local
```

### 4. Run the Development Server

```bash
npm install
```

Open [http://localhost:3000](http://localhost:3000) in your browser. The app auto-reloads on code changes.

## Smart Contract Development

### Compile Contracts

```bash
npm run compile
```

### Deploy to Base Sepolia (Testnet)

```bash
npm run deploy:baseSepolia
```

### Deploy to Base Mainnet

```bash
npm run deploy:base
```

### Run Contract Tests

```bash
npm run test
```

### Start Local Hardhat Node

```bash
npm run node
```

## AI Integration

### Start Genkit Development Server

```bash
npm run genkit:dev
```

The Genkit server provides AI-powered chess analysis and move suggestions using Google's Generative AI.

### Production Genkit Server

```bash
npm run genkit
```

## Project Structure
```
app/                   # Next.js application
├── components/        # React components
│   ├── ChessBoard.tsx
│   ├── GameControls.tsx
│   ├── GameInfo.tsx
│   ├── MoveHistory.tsx
│   └── ...
├── (pages)/          # Page routes
│   ├── play/         # Main game interface
│   ├── puzzles/      # Puzzle training
│   ├── training/     # Learning dashboard
│   ├── coaches/      # Coach marketplace
│   └── ...
├── api/              # API routes
│   ├── ai-move/      # AI move generation endpoint
│   └── auth/         # Authentication
├── contexts/         # React Context providers
├── hooks/            # Custom React hooks
├── lib/              # Utility functions
└── styles/           # CSS modules and global styles

contracts/           # Solidity smart contracts
├── Chess.sol         # Core chess game logic
├── ChessAcademy.sol  # Learning/coaching contracts
├── ChessCoach.sol    # Coach marketplace
├── ChessPuzzles.sol  # Puzzle system
└── ChessFactory.sol  # Factory pattern implementation

scripts/             # Deployment and utility scripts
├── deploy.js        # Main deployment script
└── deployAdvanced.js

test/                # Smart contract tests
└── Chess.test.js

public/              # Static assets
genkit.config.ts     # Genkit AI configuration
minikit.config.ts    # Farcaster Mini App configuration
hardhat.config.js    # Hardhat network configuration
next.config.ts       # Next.js configuration
tsconfig.json        # TypeScript configuration
```

## Deployment

### Production Deployment to Vercel

#### 1. Prepare for Deployment

```bash
npm run build
```

#### 2. Deploy to Vercel

```
GOOGLE_API_KEY=your_google_api_key
NEXT_PUBLIC_PROJECT_NAME=Base Chess
NEXT_PUBLIC_URL=http://localhost:3000
```

- Get your Google API key from [Google AI Studio](https://ai.google.dev/)

### 3. Run Locally

```bash
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

---

## Smart Contracts

- Located in `contracts/`
- Deploy using Hardhat scripts in `scripts/`
- Test with `npm run test`

---

## AI Chess

- Uses Gemini 1.5 Flash via `@google/generative-ai` (see `app/lib/genkitChessAI.ts`)
- Fallback to local minimax engine if API fails
- Configure AI in the UI (difficulty, etc.)

---

## Deployment

- Deploy frontend with [Vercel](https://vercel.com/) or similar
- Deploy contracts with Hardhat

### Wallet Connection Issues

- Ensure MetaMask is installed and configured
- Verify correct network is selected (Base Sepolia/Mainnet)
- Clear browser cache and cookies

## Security Considerations

- **Private Keys**: Never commit `.env.local` or private keys
- **API Keys**: Keep API keys confidential and rotate regularly
- **Smart Contracts**: Audit contracts before mainnet deployment
- **User Funds**: Implement proper access controls for wager system
- **Data Validation**: Always validate move legality on-chain

## Contributing

1. Fork the repo
2. Create a feature branch
3. Commit and push your changes
4. Open a pull request

---

## License

MIT

---

## Credits

- Built by the Base Chess team
- AI powered by Google Gemini
- Onchain contracts inspired by open-source chess projects
