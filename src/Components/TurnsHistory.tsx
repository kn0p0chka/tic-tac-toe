// TODO: PLEASE REMOVE ALL UNNEEDED COMMENTS

// TODO: Lets split this component into smaller components.
// 1) Form component with all buttons (Config OR Settings) done
// 2) component with statuses (GameStatus)  done

// 3) component with turns history (TurnsHistory)
// All these components will be placed in the TicTacToeGame container
// so there will no longer be a component TurnsHistory.

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
