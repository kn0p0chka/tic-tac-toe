// TODO: rename Components folder to components
import React from "react";
import { GameConfig, NewCellState } from "../models/display";

type CellProps = {
  // TODO: row is not needed here. You should pass only a single cell to this component instead of the row.
  row: NewCellState[];
  // TODO: rowIndex is not needed here. You can use cell.pos.row instead of rowIndex.
  rowIndex: number;
  config: GameConfig;
  // TODO: add a prop "isWinningCell" to check if the cell is part of the winning combination.
  // and remove winCombination prop.
  // in the parent component create a function:
  // const isCellPartOfWinningCombination = (cell: NewCellState) => {
  //   return winCombination?.some((winningCell) => winningCell.pos.col === cell.pos.col && winningCell.pos.row === cell.pos.row);
  // };
  // and pass a new isWinningCell prop to this component:
  // isWinningCell={isCellPartOfWinningCombination(cell)}
  winCombination: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};

// TODO: The name of the component is weird. If you called it as a Cell, it should be a single cell. But here it is a row of cells.
// So you should pass only a single cell to this component instead of the row. Another logic move to the CellContainer|Table component.
function Cell({ row, rowIndex, config, winCombination, handleCellClick }: CellProps) {
  // TODO: it should not be a function. Make it as a simple variable. The name of it could be cellSize
  const handleBoardSize = () => {
    return 600 / config.boardSize;
  };

  return (
    <div className={"row"}>
      {/* TODO: use cell.pos.col instead of colIndex*/}
      {row.map((cell, colIndex) => {
        return (
          <div
            style={{
              width: handleBoardSize() + "px",
              height: handleBoardSize() + "px",
              fontSize: handleBoardSize() + "px",
            }}
            className={`cell ${
              // TODO: there should not be large logic in the html section. Make it as a simple variable and use it here. The name of it could be isHighlighted
              winCombination?.find((cell) => cell.pos.col === colIndex && cell.pos.row === rowIndex)
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
