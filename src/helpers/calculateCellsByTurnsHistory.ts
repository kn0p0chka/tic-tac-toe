import { NewCellState, TurnsRowsState } from "../models/display";

const createIterableArray = (length: number) => {
  return Array.from({ length }, (el, index) => index);
};

function calcCellsByTurnsHistory(turnsHistory: TurnsRowsState[], size: number) {
  const cells: NewCellState[][] = createIterableArray(size).map((rowInd) =>
    createIterableArray(size).map((colInd) => {
      return {
        pos: { row: rowInd, col: colInd },
        state: null,
      };
    })
  );
  turnsHistory.forEach((cell) => {
    cells[cell.pos.row][cell.pos.col].state = cell.player;
  });
  return cells;
}

export default calcCellsByTurnsHistory;
