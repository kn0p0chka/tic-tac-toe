// TODO: REMOVE file
type CellState = "O" | "X" | null;

const checkWinner = (cells: CellState[][]): boolean => {
  // check is there winning row

  return true; // if there is a winning row

  // check is there winning column
  // ... some code
  return true; // if there is a winning column
};
const boardWithWinningRow: CellState[][] = [
  [null, "X", "O"],
  [null, null, "O"],
  ["X", "X", "X"], //
];
console.log(checkWinner(boardWithWinningRow)); // EXPECTED RESULT TRUE

const boardWithWinningRow2: CellState[][] = [
  [null, "X", "O", null],
  [null, null, "O", null],
  ["X", "X", "X", null], //
  ["X", "X", null, null],
];
console.log(checkWinner(boardWithWinningRow2)); // EXPECTED RESULT TRUE

const boardWithWinningRow3: CellState[][] = [
  [null, "X", "O", null],
  [null, null, "O", null],
  ["X", "X", null, "X"],
  ["X", "X", null, null],
];
console.log(checkWinner(boardWithWinningRow3)); // EXPECTED RESULT FALSE

const boardWithWinningColumn: CellState[][] = [
  [null, "X", "O"],
  [null, null, "O"],
  ["X", null, "O"],
];
console.log(checkWinner(boardWithWinningColumn)); // EXPECTED RESULT TRUE

const boardWithWinningColumn2: CellState[][] = [
  [null, null, "X", "O"],
  [null, null, null, "O"],
  [null, "X", null, "O"],
  [null, "X", null, "O"],
];
console.log(checkWinner(boardWithWinningColumn2)); // EXPECTED RESULT TRUE

const boardWithWinningColumn3: CellState[][] = [
  [null, null, "X", "O"],
  [null, null, null, "O"],
  [null, "X", null, null],
  [null, "X", null, "O"],
];
console.log(checkWinner(boardWithWinningColumn3)); // EXPECTED RESULT FALSE
