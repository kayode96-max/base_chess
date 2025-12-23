import { useState, useEffect } from 'react';
import { useChessPuzzles } from '../hooks/useAdvancedContracts';
import PuzzleBoard from './PuzzleBoard';
import { 
  GameState, 
  Move, 
  makeMove, 
  createStateFromFEN,
  moveToUCI 
} from '../lib/chessEngine';
import { 
  ChessPuzzle, 
  getRandomPuzzle, 
  getPuzzleByRating,
  PUZZLE_THEMES, 
  PUZZLE_DIFFICULTIES 
} from '../lib/puzzleData';
import styles from './PuzzleTraining.module.css';

export default function PuzzleTraining() {
  const { puzzleStats, attemptPuzzle } = useChessPuzzles();
  
  const [currentPuzzle, setCurrentPuzzle] = useState<ChessPuzzle | null>(null);
  const [gameState, setGameState] = useState<GameState | null>(null);
  const [moveIndex, setMoveIndex] = useState(0);
  const [startTime, setStartTime] = useState<number>(Date.now());
  const [feedback, setFeedback] = useState<string>('');
  const [feedbackType, setFeedbackType] = useState<'success' | 'error' | 'info'>('info');
  const [isSolved, setIsSolved] = useState(false);
  const [attempts, setAttempts] = useState(0);
  const [playerRating, setPlayerRating] = useState(1500);


  // Load player rating from stats
  useEffect(() => {
    if (puzzleStats && puzzleStats[4]) {
      setPlayerRating(Number(puzzleStats[4]) || 1500);
    }
  }, [puzzleStats]);

  // Load initial puzzle
  useEffect(() => {
    loadNewPuzzle();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const loadNewPuzzle = () => {
    let puzzle: ChessPuzzle | undefined;
    
    // Try to get puzzle matching player rating
    puzzle = getPuzzleByRating(playerRating - 200, playerRating + 200);
    
    // Fallback to random puzzle
    if (!puzzle) {
      puzzle = getRandomPuzzle();
    }
    
    setCurrentPuzzle(puzzle);
    setGameState(createStateFromFEN(puzzle.fen));
    setMoveIndex(0);
    setFeedback('');
    setFeedbackType('info');
    setIsSolved(false);
    setStartTime(Date.now());
    setAttempts(0);
  };

  const handleMove = (move: Move) => {
    if (!currentPuzzle || !gameState || isSolved) return;

    const uciMove = moveToUCI(move);
    const expectedMove = currentPuzzle.moves[moveIndex];

    // Check if the move is correct
    if (uciMove === expectedMove) {
      // Correct move!
      const newState = makeMove(gameState, move);
      setGameState(newState);
      setMoveIndex(moveIndex + 1);
      setAttempts(attempts + 1);

      // Check if puzzle is complete
      if (moveIndex + 1 >= currentPuzzle.moves.length) {
        handlePuzzleSolved();
      } else {
        setFeedback(`✓ Correct! Move ${moveIndex + 1}/${currentPuzzle.moves.length}`);
        setFeedbackType('success');
        
        // Auto-play opponent's response if there is one
        if (moveIndex + 1 < currentPuzzle.moves.length) {
          setTimeout(() => playOpponentMove(), 500);
        }
      }
    } else {
      // Wrong move
      setFeedback('✗ Not the best move. Try again!');
      setFeedbackType('error');
      setAttempts(attempts + 1);
      
      // Reset to puzzle start after wrong move
      setTimeout(() => {
        setGameState(createStateFromFEN(currentPuzzle.fen));
        setMoveIndex(0);
        setFeedback('Puzzle reset. Try again!');
        setFeedbackType('info');
      }, 1500);
    }
  };

  const playOpponentMove = () => {
    if (!currentPuzzle || !gameState) return;

    const opponentMoveUCI = currentPuzzle.moves[moveIndex];
    const move = uciToMove(opponentMoveUCI, gameState);
    
    if (move) {
      const newState = makeMove(gameState, move);
      setGameState(newState);
      setMoveIndex(moveIndex + 1);
      
      if (moveIndex + 1 < currentPuzzle.moves.length) {
        setFeedback('Opponent played. Your turn!');
        setFeedbackType('info');
      }
    }
  };

  const uciToMove = (uci: string, state: GameState): Move | null => {
    const from = (8 - parseInt(uci[1])) * 8 + (uci.charCodeAt(0) - 97);
    const to = (8 - parseInt(uci[3])) * 8 + (uci.charCodeAt(2) - 97);
    
    return {
      from,
      to,
      piece: state.board[from],
      capturedPiece: state.board[to]
    };
  };

  const handlePuzzleSolved = async () => {
    setIsSolved(true);
    const timeSpent = Math.floor((Date.now() - startTime) / 1000);
    
    setFeedback('🎉 Puzzle solved! Excellent!');
    setFeedbackType('success');

    // Submit to blockchain (wrapped in try-catch as it may fail if not connected)
    try {
      if (currentPuzzle) {
        await attemptPuzzle(
          currentPuzzle.id, 
          currentPuzzle.moves, 
          timeSpent
        );
      }
    } catch (error) {
      console.log('Blockchain submission skipped:', error);
      // Continue anyway - puzzle solving works offline too
    }
  };

  const showHint = () => {
    if (!currentPuzzle || isSolved) return;
    
    const nextMove = currentPuzzle.moves[moveIndex];
    const fromSquare = nextMove.slice(0, 2);
    const toSquare = nextMove.slice(2, 4);
    
    setFeedback(`💡 Hint: Move from ${fromSquare} to ${toSquare}`);
    setFeedbackType('info');
  };

  const skipPuzzle = () => {
    loadNewPuzzle();
    setFeedback('Puzzle skipped. Try this one!');
    setFeedbackType('info');
  };

  if (!currentPuzzle || !gameState) {
    return <div className={styles.loading}>Loading puzzle...</div>;
  }

  const playerColor = gameState.isWhiteTurn ? 'white' : 'black';

  return (
    <div className={styles.puzzleTraining}>
      <div className={styles.header}>
        <h1>Puzzle Training</h1>
        <div className={styles.stats}>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Rating</span>
            <span className={styles.statValue}>{playerRating}</span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Solved</span>
            <span className={styles.statValue}>
              {puzzleStats ? Number(puzzleStats[1]) : 0}
            </span>
          </div>
          <div className={styles.statBox}>
            <span className={styles.statLabel}>Streak</span>
            <span className={styles.statValue}>
              {puzzleStats ? Number(puzzleStats[2]) : 0}
            </span>
          </div>
        </div>
      </div>

      <div className={styles.puzzleContainer}>
        <div className={styles.puzzleInfo}>
          <div className={styles.infoBadge}>
            <span className={styles.theme}>{PUZZLE_THEMES[currentPuzzle.theme]}</span>
            <span className={styles.difficulty}>{PUZZLE_DIFFICULTIES[currentPuzzle.difficulty]}</span>
            <span className={styles.rating}>⚡ {currentPuzzle.rating}</span>
          </div>
          
          <div className={styles.instructions}>
            <h3>{currentPuzzle.description}</h3>
            <p className={styles.turnIndicator}>
              {playerColor === 'white' ? '♔' : '♚'} {playerColor === 'white' ? 'White' : 'Black'} to move
            </p>
            <p className={styles.progress}>
              Move {moveIndex + 1} of {currentPuzzle.moves.length}
            </p>
          </div>
        </div>

        <div className={styles.boardContainer}>
          <PuzzleBoard
            gameState={gameState}
            onMove={handleMove}
            disabled={isSolved}
            highlightLegalMoves={true}
            playerColor={playerColor}
          />
        </div>

        <div className={styles.controls}>
          {feedback && (
            <div className={`${styles.feedback} ${styles[feedbackType]}`}>
              {feedback}
            </div>
          )}

          <div className={styles.actions}>
            <button 
              className={styles.hintButton} 
              onClick={showHint}
              disabled={isSolved}
            >
              💡 Hint
            </button>
            <button 
              className={styles.skipButton} 
              onClick={skipPuzzle}
            >
              Skip Puzzle
            </button>
            <button 
              className={styles.nextButton} 
              onClick={loadNewPuzzle}
              disabled={!isSolved}
            >
              Next Puzzle →
            </button>
          </div>

          <div className={styles.stats}>
            <span>Attempts: {attempts}</span>
            <span>Time: {Math.floor((Date.now() - startTime) / 1000)}s</span>
          </div>
        </div>
      </div>

      <div className={styles.dailyChallenge}>
        <div className={styles.challengeHeader}>
          <h2>🏆 Daily Challenge</h2>
          <span className={styles.timer}>Resets in: 23:42:15</span>
        </div>
        <p>Solve today&apos;s puzzle and compete for rewards!</p>
        <div className={styles.prizePool}>
          Prize Pool: <strong>0.1 ETH</strong>
        </div>
        <button className={styles.challengeButton}>
          Start Daily Challenge
        </button>
      </div>
    </div>
  );
}
