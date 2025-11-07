import React from "react";
import { CellState } from "../models/display";

type GameStatusProps = {
  winner: CellState;
  isBoardFilled: boolean;
};
function GameStatus({ winner, isBoardFilled }: GameStatusProps) {
  return (
    <>
      {winner && <h3 className="winner">the winner is: {winner} !!</h3>}
      {!winner && isBoardFilled && (
        <h3 className="winner">the winner is love</h3>
      )}
    </>
  );
}

export default GameStatus;
