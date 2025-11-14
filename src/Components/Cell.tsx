import React from "react";
import { GameConfig, NewCellState } from "../models/display";

type CellProps = {
  cell: NewCellState;
  config: GameConfig;
  isWinningCell: boolean;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};

function Cell({ cell, config, isWinningCell, handleCellClick }: CellProps) {
  const cellSize = 600 / config.boardSize;

  return (
    <div
      style={{
        width: cellSize + "px",
        height: cellSize + "px",
        fontSize: cellSize + "px",
      }}
      className={"cell" + (isWinningCell ? " highlight" : "")}
      key={cell.pos.col}
      onClick={() => {
        handleCellClick(cell.pos.col, cell.pos.row);
      }}
    >
      {cell.state}
    </div>
  );
}

export default Cell;
