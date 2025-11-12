import React from "react";
import { GameConfig, NewCellState } from "../models/display";

type CellProps = {
  cell: NewCellState;
  config: GameConfig;
  // TODO: this property should be BOOLEAN.
  isWinningCell: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};

function Cell({ cell, config, isWinningCell, handleCellClick }: CellProps) {
  const cellSize = 600 / config.boardSize;

  // TODO: remove this function. You should use isWinningCell directly.
  const isHighlighted = () => {
    const wonCells = isWinningCell?.find(
      (wonCell) => wonCell.pos.col === cell.pos.col && wonCell.pos.row === cell.pos.row
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
      // TODO: use isWinningCell directly. className should be "cell" + (isWinningCell ? " highlight" : "")
      // But it is better to use a library clsx OR classnames to do so. Like this:
      // className={clsx("cell", { "highlight": isWinningCell })}
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
