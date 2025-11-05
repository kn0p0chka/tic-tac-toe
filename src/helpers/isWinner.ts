import { CellState } from "./../models/display";
// TODO: we have the same type in models/display.ts. So you can use it instead of this one.
type NewCellState = {
  pos: {
    col: number;
    row: number;
  };
  state: CellState;
};

// TODO: rename wonCombinationCount to winCombinationLength
const isWinner = (cells: (NewCellState | null)[], wonCombinationCount: number) => {
  let cellItem: NewCellState["state"] = null;
  let winnerCells: NewCellState[] = [];
  cells.forEach((cell) => {
    if (winnerCells.length === wonCombinationCount) return;
    if (!cell?.state) {
      winnerCells = [];
      cellItem = null;
      return;
    }
    if (cellItem !== cell.state) {
      winnerCells = [cell];
      cellItem = cell.state;
    } else {
      winnerCells.push(cell);
    }
  });

  if (winnerCells.length < wonCombinationCount) return null;

  return winnerCells;
};

export default isWinner;
