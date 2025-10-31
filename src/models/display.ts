export type CellState = "O" | "X" | null;
export type TurnState = { cellId: number; player: "O" | "X" };
export type TurnsRowsState = {
  pos: { row: number; col: number };
  player: "O" | "X";
};
export type NewCellState = {
  pos: {
    col: number;
    row: number;
  };
  state: CellState;
};
export type GameConfig = {
  boardSize: number;
  enableTurnDisappearing: boolean;
  winCombinationLength: number;
  disappearingCellsInpVal: number;
};
