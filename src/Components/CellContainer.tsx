import React from "react";
import { GameConfig, NewCellState } from "../models/display";
import Cell from "./Cell";

type CellContainerProps = {
  cells: NewCellState[][];
  config: GameConfig;
  winCombination: NewCellState[] | null;
  handleCellClick: (colIndex: number, rowIndex: number) => void;
};

// TODO: rename the component and the file to Table
function CellContainer({ cells, config, winCombination, handleCellClick }: CellContainerProps) {
  return (
    // TODO: there are no cont class in the css file. Also the extra div is not needed. So remove it.
    <div className="cont">
      <div className="cellsContainer">
        {cells.map((row, rowIndex) => {
          // TODO: here should be row.map((...)=>(<Cell ... />)) instead of  <Cell ... />. Another logic move to the Cell component.
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
