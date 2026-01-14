import React, { useState } from 'react';
import './ChessBoard.css';

const initialBoard = [
  ['r','n','b','q','k','b','n','r'],
  ['p','p','p','p','p','p','p','p'],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['','','','','','','',''],
  ['P','P','P','P','P','P','P','P'],
  ['R','N','B','Q','K','B','N','R']
];

function ChessBoard() {
  const [board, setBoard] = useState(initialBoard);
  const [selected, setSelected] = useState<{row: number, col: number} | null>(null);

  const handleCellClick = (row: number, col: number) => {
    if (selected) {
      // Simple move logic: move piece, no validation
      const newBoard = board.map(arr => arr.slice());
      newBoard[row][col] = board[selected.row][selected.col];
      newBoard[selected.row][selected.col] = '';
      setBoard(newBoard);
      setSelected(null);
    } else if (board[row][col]) {
      setSelected({row, col});
    }
  };

  return (
    <div className="chessboard">
      {board.map((rowArr, rowIdx) => (
        <div className="row" key={rowIdx}>
          {rowArr.map((piece, colIdx) => (
            <div
              className={`cell${selected && selected.row === rowIdx && selected.col === colIdx ? ' selected' : ''}`}
              key={colIdx}
              onClick={() => handleCellClick(rowIdx, colIdx)}
            >
              {piece}
            </div>
          ))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;
