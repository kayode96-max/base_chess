import React, { useState } from 'react';
import './MenstrualCycleMonitor.css';

function addDays(date: Date, days: number) {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

function formatDate(date: Date) {
  return date.toISOString().split('T')[0];
}

function MenstrualCycleMonitor() {
  const [lastPeriod, setLastPeriod] = useState('');
  const [cycleLength, setCycleLength] = useState(28);
  const [periodLength, setPeriodLength] = useState(5);
  const [nextPeriod, setNextPeriod] = useState('');
  const [fertileWindow, setFertileWindow] = useState<string[]>([]);

  const calculate = () => {
    if (!lastPeriod) return;
    const last = new Date(lastPeriod);
    const next = addDays(last, cycleLength);
    setNextPeriod(formatDate(next));
    // Fertile window: days 10-16 of cycle
    const fertileStart = addDays(last, 10);
    const window: string[] = [];
    for (let d = 0; d <= 6; d++) {
      window.push(formatDate(addDays(fertileStart, d)));
    }
    setFertileWindow(window);
  };

  return (
    <div className="menstrual-cycle-monitor">
      <h2>Menstrual Cycle Monitor</h2>
      <div className="input-section">
        <label>Last Period Start Date:</label>
        <input
          type="date"
          value={lastPeriod}
          onChange={e => setLastPeriod(e.target.value)}
        />
        <label>Cycle Length (days):</label>
        <input
          type="number"
          min={21}
          max={35}
          value={cycleLength}
          onChange={e => setCycleLength(Number(e.target.value))}
        />
        <label>Period Length (days):</label>
        <input
          type="number"
          min={2}
          max={10}
          value={periodLength}
          onChange={e => setPeriodLength(Number(e.target.value))}
        />
        <button onClick={calculate}>Calculate</button>
      </div>
      {nextPeriod && (
        <div className="result-section">
          <p><b>Next Period:</b> {nextPeriod}</p>
          <p><b>Fertile Window:</b> {fertileWindow[0]} to {fertileWindow[6]}</p>
        </div>
      )}
    </div>
  );
}

export default MenstrualCycleMonitor;
