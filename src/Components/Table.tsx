import React from "react";
import { GameConfig, NewCellState } from "../models/display";
import Cell from "./Cell";

type TableProps = {
  cells: NewCellState[][];
  winCombination: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
  config: GameConfig;
};

function Table({ cells, config, winCombination, handleCellClick }: TableProps) {
  const isCellPartOfWinningCombination = (cell: NewCellState) => {
    return winCombination?.some(
      (winningCell) => winningCell.pos.col === cell.pos.col && winningCell.pos.row === cell.pos.row
    )
      ? true
      : false;
  };

  return (
    <div className="cont">
      <div className="cellsContainer">
        {cells.map((row, rowIndex) => (
          <div key={rowIndex} className="row">
            {row.map((cell, colIndex) => (
              <Cell
                config={config}
                key={`${rowIndex}-${colIndex}`}
                cell={cell}
                isWinningCell={isCellPartOfWinningCombination(cell)}
                handleCellClick={handleCellClick}
              />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Table;
