import { type } from "os";
import { CellState } from "./../models/display";
type NewCellState = {
  pos: {
    col: number;
    row: number;
  };
  state: CellState;
};
const isWinner = (
  cells: (NewCellState | null)[],
  wonCombinationCount: number
) => {
  // let count = 0;
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
