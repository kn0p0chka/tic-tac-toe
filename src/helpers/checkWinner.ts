import { getDiagonalBoard1, getDiagonalBoard2 } from "./diagonals";
import isWinner from "./isWinner";
import { CellState, NewCellState } from "./../models/display";
import newCellsMaker from "./arraychanger";

export const checkWinner = (cells: NewCellState[][], boardSize: number) => {
  for (let rowIndex = 0; rowIndex < cells[0].length; rowIndex++) {
    const row = cells[rowIndex];
    const winningRow = isWinner(row, boardSize);
    if (winningRow) return winningRow;
  }

  for (let colIndex = 0; colIndex < cells[0].length; colIndex++) {
    const columnCells = cells.map((row) => row[colIndex]);
    const winningCol = isWinner(columnCells, boardSize);
    if (winningCol) return winningCol;
  }

  const diagonalBoard1 = getDiagonalBoard1(cells);
  for (let colIndex = 0; colIndex < diagonalBoard1[0].length; colIndex++) {
    const diagonal1 = diagonalBoard1.map((row) => row[colIndex]);
    const winningDia1 = isWinner(diagonal1, boardSize);
    if (winningDia1) return winningDia1;
  }
  const diagonalBoard2 = getDiagonalBoard2(cells);
  for (let colIndex = 0; colIndex < diagonalBoard2[0].length; colIndex++) {
    const diagonal2 = diagonalBoard2.map((row) => row[colIndex]);
    const winningDia2 = isWinner(diagonal2, boardSize);
    if (winningDia2) return winningDia2;
  }
  return null; // if there is a winning column
};
