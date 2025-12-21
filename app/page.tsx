"use client";
import { useState, useEffect } from "react";
import { useMiniKit } from "@coinbase/onchainkit/minikit";
import ChessBoard from "./components/ChessBoard";
import GameInfo from "./components/GameInfo";
import GameLobby from "./components/GameLobby";
import { useChessContract } from "./hooks/useChessContract";
import styles from "./page.module.css";

type ViewMode = 'lobby' | 'game';

export default function Home() {
  const { isFrameReady, setFrameReady, context } = useMiniKit();
  const [viewMode, setViewMode] = useState<ViewMode>('lobby');
  const [currentGameId, setCurrentGameId] = useState<number | null>(null);
  const [gameState, setGameState] = useState<any>(null);
  const [playerAddress, setPlayerAddress] = useState<string>('');
  
  const {
    loading,
    error: contractError,
    createGame,
    joinGame,
    makeMove,
    getGameInfo,
    getOpenGames
  } = useChessContract();

  const [openGames, setOpenGames] = useState<any[]>([]);

  // Initialize the miniapp
  useEffect(() => {
    if (!isFrameReady) {
      setFrameReady();
    }
  }, [setFrameReady, isFrameReady]);

  // Load open games when in lobby
  useEffect(() => {
    if (viewMode === 'lobby') {
      loadOpenGames();
    }
  }, [viewMode]);

  // Load game state when viewing a game
  useEffect(() => {
    if (currentGameId !== null) {
      loadGameState();
    }
  }, [currentGameId]);

  const loadOpenGames = async () => {
    const games = await getOpenGames();
    setOpenGames(games);
  };

  const loadGameState = async () => {
    if (currentGameId === null) return;
    const state = await getGameInfo(currentGameId);
    if (state) {
      setGameState(state);
    }
  };

  const handleCreateGame = async (wager: string) => {
    const result = await createGame('0x0000000000000000000000000000000000000000', wager);
    if (result.success && result.gameId !== undefined) {
      setCurrentGameId(result.gameId);
      setViewMode('game');
    }
  };

  const handleJoinGame = async (gameId: number, wager: string) => {
    const result = await joinGame(gameId, wager);
    if (result.success) {
      setCurrentGameId(gameId);
      setViewMode('game');
    }
  };

  const handleMove = async (from: number, to: number) => {
    if (currentGameId === null) return;
    
    const result = await makeMove(currentGameId, from, to);
    if (result.success) {
      // Reload game state after move
      await loadGameState();
    }
  };

  const handleBackToLobby = () => {
    setCurrentGameId(null);
    setGameState(null);
    setViewMode('lobby');
  };

  // Determine if current user is white player
  const isPlayerWhite = gameState && playerAddress && 
    gameState.whitePlayer.toLowerCase() === playerAddress.toLowerCase();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <div className={styles.headerContent}>
          <h1 className={styles.logo}>
            <span className={styles.logoIcon}>♟</span>
            Base Chess
          </h1>
          {context?.user && (
            <div className={styles.userInfo}>
              <span className={styles.userName}>{context.user.displayName || 'Player'}</span>
            </div>
          )}
        </div>
      </header>

      <main className={styles.main}>
        {viewMode === 'lobby' ? (
          <GameLobby
            openGames={openGames}
            onJoinGame={handleJoinGame}
            onCreateGame={handleCreateGame}
            loading={loading}
          />
        ) : (
          <div className={styles.gameView}>
            <button className={styles.backButton} onClick={handleBackToLobby}>
              ← Back to Lobby
            </button>
            
            {gameState && (
              <>
                <GameInfo
                  whitePlayer={gameState.whitePlayer}
                  blackPlayer={gameState.blackPlayer}
                  isWhiteTurn={gameState.whiteTurn}
                  moveCount={gameState.moveCount}
                  wager={gameState.wager}
                />
                
                <ChessBoard
                  board={gameState.board}
                  onMove={handleMove}
                  isWhiteTurn={gameState.whiteTurn}
                  isPlayerWhite={isPlayerWhite}
                  disabled={gameState.state !== 0 || loading}
                />

                {contractError && (
                  <div className={styles.error}>
                    {contractError}
                  </div>
                )}
              </>
            )}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p className={styles.footerText}>
          Powered by Base Network • On-chain Chess
        </p>
      </footer>
    </div>
  );
}
