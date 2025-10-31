import React from "react";
import { GameConfig, NewCellState } from "../models/display";
import Cell from "./Cell";

type CellContainerProps = {
  cells: NewCellState[][];
  config: GameConfig;
  winCombination: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};
function CellContainer({
  cells,
  config,
  winCombination,
  handleCellClick,
}: CellContainerProps) {
  return (
    <div className="cont">
      <div className="cellsContainer">
        {cells.map((row, rowIndex) => {
          return (
            <Cell
              key={rowIndex}
              row={row}
              config={config}
              rowIndex={rowIndex}
              winCombination={winCombination}
              handleCellClick={handleCellClick}
            />
          );
        })}
      </div>
    </div>
  );
}

export default CellContainer;
