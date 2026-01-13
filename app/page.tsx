"use client";
import { useState } from 'react';
import MobileAppLayout from './components/common/MobileAppLayout';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

type GameMode = 'single-player' | 'multiplayer';
type ColorChoice = 'white' | 'black' | 'random';
type OnlineView = 'lobby' | 'game';

const SECTION_CONFIG = [
  { id: 'overview', label: 'Overview', emoji: '📊' },
  { id: 'play', label: 'Play', emoji: '♟️' },
  { id: 'training', label: 'Training', emoji: '🎓' },
  { id: 'coaches', label: 'Coaches', emoji: '🧑‍🏫' },
  { id: 'puzzles', label: 'Puzzles', emoji: '🧩' },
  { id: 'online', label: 'Online', emoji: '🌐' },
  { id: 'settings', label: 'Settings', emoji: '⚙️' },
];

export default function Home() {
  // Placeholder: In a real app, fetch user/game data here
  const user = {
    name: 'Grandmaster_X',
    avatar: 'https://lh3.googleusercontent.com/aida-public/AB6AXuBxm0DC_HC0y6kB_rdUul_DvCqMGnpAZPZlYh_9xgia4eRcM-al3SRxRSp37Juxg2mWo2yqtdBwzs-Iygf_mWrczrUDgZVcxBrplsHaLcFsB8SuAkwRQdLQN1p45297MXBdEvDJUzNs-aSSIfar6G0HfujKAK8Tkr4xL3SPMkn-eh8BmgmsbLuKCm7-Dm_ZcbfDNhK_MjmURk5YG7jYvOKlga5gt0rppt9WtXrflHinXOQWb7c4UIwVAfHyWZMrHRFZ4hWYnz0QFw3q',
    rating: 2450,
    eth: 0.428,
    usdc: 1250.0,
    network: 'Base Network',
    ratingChange: 12,
    gwei: 12,
  };

  return (
    <MobileAppLayout>
      {/* Main Performance Card */}
      <div className="px-4 py-2">
        <div className="relative overflow-hidden bg-cover bg-center flex flex-col items-stretch justify-end rounded-xl pt-12 shadow-2xl border border-white/10" style={{backgroundImage: `linear-gradient(180deg, rgba(16, 22, 34, 0.2) 0%, rgba(19, 91, 236, 0.6) 100%), url('https://lh3.googleusercontent.com/aida-public/AB6AXuBtZSuTThR1uSA4hURTeXWxQ7gcbymuajjQBiuc2p3ETig7j1D8R-6XpI2hDgXOsy-S9MJmTJ_5AE-f2ScuDSRyul4n4clCzQonhbicx8ll06l-WdW6bwMQDVzePfMWdP9V-aw5fIiGV0UZLu_5j85-zdYOuwknYT_qxLsVsT5_nHlO17V90XVhwsSumtQr3DLrpuSGPzLbXhijSA6JeDHEOi3gFQtQO77EW4WgMbNzuCzu6_7TOaU3lNsJIFpxSq7lnO-2GZKI6idq')`}}>
          <div className="absolute top-4 right-4">
            <div className="bg-black/30 backdrop-blur-md px-2 py-1 rounded-lg flex items-center gap-2 border border-white/10">
              <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: '"FILL" 1'}}>local_gas_station</span>
              <span className="text-[10px] font-bold">{user.gwei} Gwei</span>
            </div>
          </div>
          <div className="flex flex-col gap-4 p-5">
            <div className="flex justify-between items-end">
              <div className="flex flex-col gap-1">
                <p className="text-white/70 text-xs font-semibold uppercase tracking-widest">Base Rating</p>
                <div className="flex items-baseline gap-2">
                  <p className="text-white tracking-tight text-4xl font-extrabold leading-tight">{user.rating.toLocaleString()}</p>
                  <span className="text-green-400 text-sm font-bold flex items-center">
                    <span className="material-symbols-outlined text-sm">arrow_upward</span>{user.ratingChange}
                  </span>
                </div>
              </div>
              <button className="flex min-w-[84px] cursor-pointer items-center justify-center rounded-lg h-10 px-4 bg-white text-primary text-sm font-bold shadow-lg">
                <span className="truncate">Analytics</span>
              </button>
            </div>
            <div className="grid grid-cols-2 gap-3 pt-4 border-t border-white/10">
              <div className="flex flex-col gap-1">
                <p className="text-white/60 text-[10px] font-bold uppercase">ETH Balance</p>
                <p className="text-white text-lg font-bold">{user.eth} ETH</p>
              </div>
              <div className="flex flex-col gap-1">
                <p className="text-white/60 text-[10px] font-bold uppercase">USDC Balance</p>
                <p className="text-white text-lg font-bold">{user.usdc.toLocaleString()}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* ...add more dashboard sections here as needed... */}
    </MobileAppLayout>
  );
}

    setIsAIThinking(true);

    const timer = setTimeout(async () => {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 8000);

        let data: unknown = null;
        try {
          const response = await fetch('/api/ai-move', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ gameState, difficulty }),
            signal: controller.signal,
          });

          clearTimeout(timeoutId);

          if (!response.ok) {
            throw new Error('Failed to get AI move');
          }

          data = await response.json();
        } catch (err) {
          clearTimeout(timeoutId);
          throw err;
        }

        if (typeof data === 'object' && data && 'move' in data) {
          const moveData = (data as { move?: { from: number; to: number } }).move;
          if (moveData) {
            const aiMove: Move = {
              from: moveData.from,
              to: moveData.to,
              piece: gameState.board[moveData.from],
              capturedPiece: gameState.board[moveData.to],
            };

            const newState = applyMove(gameState, aiMove);
            setGameState(newState);
            setLastMove(aiMove);
          }
        }
      } catch {
        try {
          const { getBestMove } = await import('./lib/chessAI');
          const aiMove = getBestMove(gameState, difficulty);
          if (aiMove) {
            const newState = applyMove(gameState, aiMove);
            setGameState(newState);
            setLastMove(aiMove);
          }
        } catch (fallbackErr) {
          console.error('[Client] AI fallback failed:', fallbackErr);
        }
      } finally {
        setIsAIThinking(false);
      }
    }, 300 + Math.random() * 500);

    return () => clearTimeout(timer);
  }, [isAITurn, isGameOver, gameState, difficulty, isAIThinking]);

  const handleMove = useCallback(
    (move: Move) => {
      if (isAIThinking) return;

      const newState = applyMove(gameState, move);
      setGameState(newState);
      setLastMove(move);
    },
    [gameState, isAIThinking]
  );

  const handleNewGame = useCallback(() => {
    setGameState(createInitialState());
    setLastMove(null);
    setIsAIThinking(false);
  }, []);

  const handleUndo = useCallback(() => {
    if (gameMode === 'single-player') {
      let newState = undoMove(gameState);
      if (newState.moveHistory.length > 0 && newState.isWhiteTurn !== isPlayerWhite) {
        newState = undoMove(newState);
      }
      setGameState(newState);
      setLastMove(newState.moveHistory[newState.moveHistory.length - 1] || null);
    } else {
      const newState = undoMove(gameState);
      setGameState(newState);
      setLastMove(newState.moveHistory[newState.moveHistory.length - 1] || null);
    }
  }, [gameState, gameMode, isPlayerWhite]);

  const handleFlipBoard = useCallback(() => {
    setBoardFlipped(!boardFlipped);
  }, [boardFlipped]);

  const handleDifficultyChange = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
  }, []);

  const startGame = (mode: GameMode, color: ColorChoice = 'white') => {
    const isWhite = color === 'random' ? Math.random() > 0.5 : color === 'white';
    setIsPlayerWhite(isWhite);
    setBoardFlipped(!isWhite);
    setGameState(createInitialState());
    setLastMove(null);
    setGameMode(mode);
    setIsAIThinking(false);
  };

  const handleJoinOnlineGame = (gameId: number) => {
    setOnlineGameId(gameId);
    setOnlineView('game');
  };

  const returnToLobby = () => {
    setOnlineView('lobby');
    setOnlineGameId(null);
  };

  const scrollToSection = (id: string) => {
    setActiveSection(id);
  };

  const displayAsWhite = boardFlipped ? !isPlayerWhite : isPlayerWhite;

  const overviewStats = useMemo(
    () => [
      { label: 'Active Accounts', value: '45,678', trend: '+12.5%', tone: 'positive' },
      { label: 'Puzzles Solved', value: '1,234', trend: '+4.3%', tone: 'positive' },
      { label: 'Avg Accuracy', value: '92%', trend: '-1.2%', tone: 'neutral' },
      { label: 'Win Rate', value: '58%', trend: '+2.8%', tone: 'positive' },
    ],
    []
  );

  const boardModeLabel = gameMode === 'single-player' ? 'Practice vs AI' : 'Local Two Player';

  return (
    <div className={styles.appShell}>
      <aside className={styles.sidebar}>
        <div className={styles.brand}>
          <div className={styles.brandMark}>♟</div>
          <div>
            <p className={styles.brandLabel}>Base Chess</p>
            <p className={styles.brandSub}>On-chain learning</p>
          </div>
        </div>

        <nav className={styles.navList}>
          {SECTION_CONFIG.map((section) => (
            <button
              key={section.id}
              className={activeSection === section.id ? styles.navItemActive : styles.navItem}
              onClick={() => scrollToSection(section.id)}
            >
              <span className={styles.navEmoji}>{section.emoji}</span>
              <span>{section.label}</span>
            </button>
          ))}
        </nav>

        <div className={styles.sidebarFooter}>
          <div className={styles.sidebarCard}>
            <p className={styles.sidebarTitle}>Streak</p>
            <p className={styles.sidebarValue}>12 days 🔥</p>
            <p className={styles.sidebarHint}>Keep playing daily</p>
          </div>
          <div className={styles.sidebarCard}>
            <p className={styles.sidebarTitle}>Leaderboard</p>
            <p className={styles.sidebarValue}>#08</p>
            <p className={styles.sidebarHint}>Top 10 on Base</p>
          </div>
        </div>
      </aside>

      <div className={styles.contentArea}>
        <header className={styles.topbar}>
          <div className={styles.topbarLeft}>
            <p className={styles.eyebrow}>Dashboard</p>
            <h1 className={styles.pageTitle}>Chess Control Room</h1>
            <p className={styles.subtitle}>Layered overview of play, training, and on-chain actions.</p>
          </div>
          <div className={styles.topbarActions}>
            <button className={styles.ghostButton} onClick={() => startGame('multiplayer', 'white')}>
              Start Local Game
            </button>
            <button className={styles.primaryButton} onClick={() => startGame('single-player', 'random')}>
              New AI Match
            </button>
            <ThemeSwitcher />
          </div>
        </header>

        <main className={styles.sectionStack}>
          {activeSection === 'overview' && (
            <section id="overview" className={styles.sectionCard}>
              <div className={styles.sectionHeader}>
                <div>
                  <p className={styles.eyebrow}>Snapshot</p>
                  <h2 className={styles.sectionTitle}>Performance Overview</h2>
                </div>
                <div className={styles.chipRow}>
                  <span className={styles.chip}>On-chain synced</span>
                  <span className={styles.chipSecondary}>Neutral theme</span>
                </div>
              </div>

              <div className={styles.metricGrid}>
                {overviewStats.map((stat) => (
                  <div key={stat.label} className={styles.metricCard}>
                    <p className={styles.metricLabel}>{stat.label}</p>
                    <div className={styles.metricValueRow}>
                      <span className={styles.metricValue}>{stat.value}</span>
                      <span className={stat.tone === 'positive' ? styles.trendPositive : styles.trendNeutral}>
                        {stat.trend}
                      </span>
                    </div>
                    <p className={styles.metricHint}>Last 30 days</p>
                  </div>
                ))}

                <div className={styles.metricWide}>
                  <div className={styles.metricHeader}>
                    <div>
                      <p className={styles.metricLabel}>Engagement curve</p>
                      <p className={styles.metricHint}>Sessions per day (3 months)</p>
                    </div>
                    <div className={styles.tabRow}>
                      <button className={styles.tabActive}>90d</button>
                      <button className={styles.tab}>30d</button>
                      <button className={styles.tab}>7d</button>
                    </div>
                  </div>
                  <div className={styles.chartPlaceholder}>
                    <div className={styles.chartWave} />
                    <div className={styles.chartWaveSecondary} />
                  </div>
                </div>
              </div>
            </section>
          )}

          {activeSection === 'play' && (
            <section id="play" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Play</p>
                <h2 className={styles.sectionTitle}>{boardModeLabel}</h2>
                <p className={styles.subtitle}>Solid board layer with controls and live state.</p>
              </div>
              <div className={styles.segmentedControl}>
                <button
                  className={gameMode === 'single-player' ? styles.segmentActive : styles.segment}
                  onClick={() => startGame('single-player', 'white')}
                >
                  🤖 vs AI
                </button>
                <button
                  className={gameMode === 'multiplayer' ? styles.segmentActive : styles.segment}
                  onClick={() => startGame('multiplayer', 'white')}
                >
                  👥 Local 2P
                </button>
              </div>
            </div>

            <div className={styles.playGrid}>
              <div className={styles.boardPanel}>
                {isAIThinking && (
                  <div className={styles.thinkingIndicator}>
                    <span className={styles.spinner} />
                    AI is thinking...
                  </div>
                )}

                <ChessBoard
                  gameState={gameState}
                  onMove={handleMove}
                  isPlayerWhite={gameMode === 'multiplayer' ? gameState.isWhiteTurn : displayAsWhite}
                  disabled={isAIThinking || isAITurn}
                  lastMove={lastMove}
                  highlightLegalMoves={true}
                />
              </div>

              <div className={styles.controlsPanel}>
                <div className={styles.inlineActions}>
                  <label className={styles.fieldLabel}>Difficulty</label>
                  <select
                    className={styles.select}
                    value={difficulty}
                    onChange={(e) => handleDifficultyChange(e.target.value as Difficulty)}
                  >
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                  </select>
                </div>

                <div className={styles.inlineActions}>
                  <label className={styles.fieldLabel}>Color</label>
                  <div className={styles.pillRow}>
                    <button className={styles.pill} onClick={() => startGame(gameMode, 'white')}>
                      ♔ White
                    </button>
                    <button className={styles.pill} onClick={() => startGame(gameMode, 'black')}>
                      ♚ Black
                    </button>
                    <button className={styles.pill} onClick={() => startGame(gameMode, 'random')}>
                      🎲 Random
                    </button>
                  </div>
                </div>

                <GameControls
                  gameState={gameState}
                  onNewGame={handleNewGame}
                  onUndo={handleUndo}
                  onFlipBoard={handleFlipBoard}
                  difficulty={difficulty}
                  onDifficultyChange={handleDifficultyChange}
                  isPlayerWhite={displayAsWhite}
                  isSinglePlayer={gameMode === 'single-player'}
                  canUndo={gameState.moveHistory.length > 0}
                />

                <MoveHistory gameState={gameState} />
              </div>
            </div>
          </section>
          )}

          {activeSection === 'training' && (
            <section id="training" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Learning</p>
                <h2 className={styles.sectionTitle}>Learning Paths & Progress</h2>
                <p className={styles.subtitle}>Track skills, lessons, and achievements in one stream.</p>
              </div>
              <div className={styles.chipRow}>
                <span className={styles.chip}>Skill graph</span>
                <span className={styles.chipSecondary}>Streak-safe</span>
              </div>
            </div>
            <LearningDashboard />
          </section>
          )}

          {activeSection === 'coaches' && (
            <section id="coaches" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Marketplace</p>
                <h2 className={styles.sectionTitle}>Coach Directory</h2>
                <p className={styles.subtitle}>Book time with high-rated instructors.</p>
              </div>
              <span className={styles.chip}>Escrow protected</span>
            </div>
            <CoachMarketplace />
          </section>
          )}

          {activeSection === 'puzzles' && (
            <section id="puzzles" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Tactics Lab</p>
                <h2 className={styles.sectionTitle}>Puzzle Training</h2>
                <p className={styles.subtitle}>Rapid reps with rewards.</p>
              </div>
              <span className={styles.chip}>ETH prize pool</span>
            </div>
            <PuzzleTraining />
          </section>
          )}

          {activeSection === 'online' && (
            <section id="online" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>On-chain</p>
                <h2 className={styles.sectionTitle}>Online Lobby</h2>
                <p className={styles.subtitle}>Base network multiplayer with staking-ready flow.</p>
              </div>
              <div className={styles.segmentedControl}>
                <button
                  className={onlineView === 'lobby' ? styles.segmentActive : styles.segment}
                  onClick={() => setOnlineView('lobby')}
                >
                  Lobby
                </button>
                <button
                  className={onlineView === 'game' ? styles.segmentActive : styles.segment}
                  onClick={() => onlineGameId && setOnlineView('game')}
                  disabled={!onlineGameId}
                >
                  Active Game
                </button>
              </div>
            </div>

            {onlineView === 'game' && onlineGameId !== null ? (
              <OnlineGame gameId={onlineGameId} onBack={returnToLobby} />
            ) : (
              <GameLobbyOnline onBack={() => setOnlineView('lobby')} onJoinGame={handleJoinOnlineGame} />
            )}
          </section>
          )}

          {activeSection === 'settings' && (
            <section id="settings" className={styles.sectionCard}>
            <div className={styles.sectionHeader}>
              <div>
                <p className={styles.eyebrow}>Personalize</p>
                <h2 className={styles.sectionTitle}>Preferences</h2>
                <p className={styles.subtitle}>Theme, layout, and controls.</p>
              </div>
              <ThemeSwitcher />
            </div>

            <div className={styles.preferenceGrid}>
              <div className={styles.preferenceCard}>
                <p className={styles.metricLabel}>Board flip</p>
                <p className={styles.metricHint}>Mirror the board instantly</p>
                <button className={styles.primaryButton} onClick={handleFlipBoard}>Flip board</button>
              </div>
              <div className={styles.preferenceCard}>
                <p className={styles.metricLabel}>New match</p>
                <p className={styles.metricHint}>Start fresh and clear history</p>
                <button className={styles.ghostButton} onClick={handleNewGame}>Reset game</button>
              </div>
              <div className={styles.preferenceCard}>
                <p className={styles.metricLabel}>Undo stack</p>
                <p className={styles.metricHint}>Rewind last turns</p>
                <button className={styles.ghostButton} onClick={handleUndo} disabled={gameState.moveHistory.length === 0}>
                  Undo move
                </button>
              </div>
            </div>
          </section>
          )}
        </main>
      </div>
    </div>
  );
}
