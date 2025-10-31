import React from "react";
import { GameConfig, NewCellState } from "../models/display";
type CellProps = {
  row: NewCellState[];
  rowIndex: number;
  config: GameConfig;
  winCombination: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};

function Cell({
  row,
  rowIndex,
  config,
  winCombination,
  handleCellClick,
}: CellProps) {
  const handleBoardSize = () => {
    return 600 / config.boardSize;
  };
  return (
    <div className={"row"}>
      {row.map((cell, colIndex) => {
        return (
          <div
            style={{
              width: handleBoardSize() + "px",
              height: handleBoardSize() + "px",
              fontSize: handleBoardSize() + "px",
            }}
            className={`cell ${
              winCombination?.find(
                (cell) => cell.pos.col === colIndex && cell.pos.row === rowIndex
              )
                ? "highlight"
                : ""
            }`}
            key={colIndex}
            onClick={() => {
              handleCellClick(colIndex, rowIndex);
            }}
          >
            {cell.state}
          </div>
        );
      })}
    </div>
  );
}

export default Cell;
