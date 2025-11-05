import React, { useEffect, useMemo, useState } from "react";
import calcCellsByTurnsHistory from "../helpers/calculateCellsByTurnsHistory";
import { checkWinner } from "../helpers/checkWinner";
import { GameConfig, NewCellState, TurnsRowsState } from "../models/display";
import CellContainer from "./CellContainer";
import ContainerLeft from "./ContainerLeft";
import "./Display.css";

function TicTacToeGame() {
  /* input state */
  // TODO: create a constant for the default config outside of the component. and pass it here.
  const [config, setConfig] = useState<GameConfig>({
    boardSize: 3,
    enableTurnDisappearing: false,
    winCombinationLength: 3,
    disappearingCellsInpVal: 5,
  });

  /* other states */
  const [turnsHistory, setTurnsHistory] = useState<TurnsRowsState[]>([]);

  const cells = useMemo(() => {
    return calcCellsByTurnsHistory(turnsHistory, config.boardSize);
  }, [turnsHistory, config.boardSize]);

  const activePlayer = useMemo(() => {
    // TODO: don't do like this. why it is bad?
    // variable should be named exactly as the data it represents.
    // this code - turnsHistory.at(-1)?.player; - returns the last player not an active. And then we change it to active player.
    // also if it is possible to create a variable using const instead of let you should do it.
    // So the code should be like this:
    // const lastPlayer = turnsHistory.at(-1)?.player;
    // return lastPlayer === "X" ? "O" : "X";
    let activePlayer = turnsHistory.at(-1)?.player;
    activePlayer != "X" ? (activePlayer = "X") : (activePlayer = "O");
    return activePlayer;
  }, [turnsHistory]);

  // TODO: this calculation is huge. it could be simplify if you use turnsHistory.length to check if the board is filled.
  const isBoardFilled = !cells.some((row) => row.some((cell) => cell.state == null));
  const makeTurn = (cellIndex: number, rowIndex: number, player: TurnsRowsState["player"]) => {
    setTurnsHistory((prev) => [...prev, { pos: { row: rowIndex, col: cellIndex }, player }]);
  };

  const goToTurn = (turnIndex: number) => {
    setTurnsHistory((prev) => prev.filter((prevTurn, i) => i <= turnIndex));
  };

  const { winner, winCombination } = useMemo(() => {
    console.log(111);

    const winCombination = checkWinner(cells, config.winCombinationLength);

    // TODO: this condition is not needed. You can remove it.
    if (!winCombination || winCombination.length === 0) {
      return { winner: null, winCombination: [] };
    }

    // TODO: Once you removed the condition, you will get an error in the line bellow "'winCombination' is possibly 'null'"
    // to fix it use ?. operator
    const winner = winCombination[0]?.state || null;

    return { winner, winCombination };
  }, [cells, config.winCombinationLength, turnsHistory]);

  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (winner) return;
    const isFilled = turnsHistory.find((obj) => {
      // TODO: Always use === instead of ==
      if (obj.pos.col == colIndex && obj.pos.row == rowIndex) return true;
    });
    if (isFilled) return;

    makeTurn(colIndex, rowIndex, activePlayer);

    if (config.enableTurnDisappearing) {
      setTurnsHistory((prev) => prev.slice(-config.disappearingCellsInpVal));
    }
  };

  const handleResetConfig = () => {
    setTurnsHistory([]);
    //check if clears setting
    // TODO: you should reset the whole config instead of only boardSize
    setConfig((prev) => ({ ...prev, boardSize: 3 }));
  };

  const handleRestart = () => {
    setTurnsHistory([]);
  };

  return (
    <div className="mainCont">
      <CellContainer
        cells={cells}
        config={config}
        winCombination={winCombination}
        handleCellClick={handleCellClick}
      />

      <ContainerLeft
        handleResetConfig={handleResetConfig}
        handleRestart={handleRestart}
        winner={winner}
        config={config}
        setConfig={setConfig}
        isBoardFilled={isBoardFilled}
        turnsHistory={turnsHistory}
        goToTurn={goToTurn}
        setTurnsHistory={setTurnsHistory}
      />
    </div>
  );
}

export default TicTacToeGame;
