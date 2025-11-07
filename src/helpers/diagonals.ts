import getNullArray from "./getNullArray";
import { CellState, NewCellState } from "./../models/display";

export const getDiagonalBoard1 = (
  cells: (NewCellState | null)[][]
): (NewCellState | null)[][] => {
  const upgArray = cells.map((row, index) => {
    return [
      ...getNullArray(row.length - 1 - index),
      ...row,
      ...getNullArray(index),
    ];
  });
  return upgArray;
};

export const getDiagonalBoard2 = (
  cells: (NewCellState | null)[][]
): (NewCellState | null)[][] => {
  const upgArray = cells.map((row, index) => {
    return [
      ...getNullArray(index),
      ...row,
      ...getNullArray(row.length - 1 - index),
    ];
  });
  return upgArray;
};
