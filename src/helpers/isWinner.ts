import { CellState, NewCellState } from "./../models/display";

const isWinner = (
  cells: (NewCellState | null)[],
  winCombinationLength: number
) => {
  let cellItem: NewCellState["state"] = null;
  let winnerCells: NewCellState[] = [];
  cells.forEach((cell) => {
    if (winnerCells.length === winCombinationLength) return;
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

  if (winnerCells.length < winCombinationLength) return null;

  return winnerCells;
};

export default isWinner;
