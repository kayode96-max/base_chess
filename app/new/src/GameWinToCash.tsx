import React, { useState } from 'react';
import './GameWinToCash.css';

function GameWinToCash() {
  const [wins, setWins] = useState(0);
  const [rate, setRate] = useState(100); // 100 NGN per win
  const [cash, setCash] = useState(0);

  const addWin = () => {
    const newWins = wins + 1;
    setWins(newWins);
    setCash(newWins * rate);
  };

  const reset = () => {
    setWins(0);
    setCash(0);
  };

  return (
    <div className="game-win-to-cash">
      <h2>Convert Game Wins to Cash</h2>
      <div className="win-section">
        <span>Wins: {wins}</span>
        <button onClick={addWin}>Add Win</button>
        <button onClick={reset}>Reset</button>
      </div>
      <div className="rate-section">
        <label>Cash per Win (₦):</label>
        <input
          type="number"
          min={1}
          value={rate}
          onChange={e => setRate(Number(e.target.value))}
        />
      </div>
      <div className="cash-section">
        <span>Total Cash: <b>₦{cash}</b></span>
      </div>
    </div>
  );
}

export default GameWinToCash;
