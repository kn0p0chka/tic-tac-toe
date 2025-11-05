// TODO: this function is not used anywhere. So you can remove it.
import { CellState } from "../models/display";
type NewCellState = {
  pos: {
    col: number;
    row: number;
  };
  state: CellState;
};
const newCellsMaker = (cells: CellState[][]) => {
  const newArr: NewCellState[] = [];

  for (let row = 0; row < cells.length; row++) {
    for (let col = 0; col < cells[row].length; col++) {
      const cell = cells[row][col];
      newArr.push({
        pos: { col: col, row: row },
        state: cell,
      });
    }
  }
  return newArr;
};

export default newCellsMaker;
