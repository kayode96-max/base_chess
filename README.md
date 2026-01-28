# Base Chess

A full-stack, AI-powered chess platform built with Next.js, TypeScript, and Solidity smart contracts. Play chess online, against AI, solve puzzles, train, and explore a coach marketplace—all onchain.

---

## Features

- **Single Player & Local Multiplayer**: Play chess against yourself, a friend, or the AI (Gemini-powered or local engine)
- **Online Multiplayer**: Challenge others in real time using onchain smart contracts
- **AI Opponent**: Choose from three AI difficulty levels powered by Google Gemini 1.5 Flash
- **Puzzles & Training**: Solve chess puzzles and follow structured learning paths
- **Coach Marketplace**: Discover and book chess coaches
- **Wallet Integration**: Connect your wallet for onchain play and rewards
- **Theming**: Light/dark mode and user preferences

---

## Project Structure

- `app/(pages)/` — Main route groups (play, online, puzzles, training, coaches, settings, wallet, leaderboards)
- `app/components/` — Shared and feature-specific React components
- `app/contexts/` — React context providers (e.g., theming)
- `app/contracts/` — Contract ABIs and addresses
- `app/hooks/` — Custom React hooks
- `app/lib/` — Chess engine, AI, and data utilities
- `contracts/` — Solidity smart contracts
- `test/` — Contract and integration tests
- `public/` — Static assets (images, icons)
- `scripts/` — Deployment scripts

---

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Environment Variables

Create a `.env.local` file in the root directory. Example:

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

---

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
