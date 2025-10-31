import { NewCellState, TurnsRowsState } from "../models/display";

const createArrayByLength = (length: number) => {
  return Array.from({ length }, (el, index) => index);
};

function calcCellsByTurnsHistory(turnsHistory: TurnsRowsState[], size: number) {
  const cells: NewCellState[][] = createArrayByLength(size).map((rowInd) =>
    createArrayByLength(size).map((colInd) => {
      return {
        pos: { row: rowInd, col: colInd },
        state: null,
      };
    })
  );
  turnsHistory.map((cell, index) => {
    cells[cell.pos.row][cell.pos.col].state = cell.player;
  });
  return cells;
}
export default calcCellsByTurnsHistory;
