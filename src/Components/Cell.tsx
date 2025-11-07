import React from "react";
import { GameConfig, NewCellState } from "../models/display";

type CellProps = {
  cell: NewCellState;
  config: GameConfig;
  isWinningCell: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};

function Cell({ cell, config, isWinningCell, handleCellClick }: CellProps) {
  const cellSize = 600 / config.boardSize;

  const isHighlighted = () => {
    const wonCells = isWinningCell?.find(
      (wonCell) =>
        wonCell.pos.col === cell.pos.col && wonCell.pos.row === cell.pos.row
    )
      ? "highlight"
      : "";

    return wonCells;
  };
  return (
    <div
      style={{
        width: cellSize + "px",
        height: cellSize + "px",
        fontSize: cellSize + "px",
      }}
      className={`cell ${isHighlighted()}`}
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
