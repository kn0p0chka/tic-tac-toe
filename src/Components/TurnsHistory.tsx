import React from "react";
import { TurnsRowsState } from "../models/display";

type TurnsHistoryProps = {
  turnsHistory: TurnsRowsState[];
  goToTurn: (turnIndex: number) => void;
};

function TurnsHistory({ turnsHistory, goToTurn }: TurnsHistoryProps) {
  return (
    <div className="turnsBox">
      {turnsHistory.map((turn, index) => {
        return (
          <a
            className="turn"
            key={index}
            onClick={() => {
              goToTurn(index);
            }}
          >
            player {turn.player} is on {turn.pos.row} row and {turn.pos.col}
            cell <span className="red">CLICK TO RETURN</span>
          </a>
        );
      })}
    </div>
  );
}

export default TurnsHistory;
