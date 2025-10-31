import React, { useEffect, useMemo, useState } from "react";
import calcCellsByTurnsHistory from "../helpers/calculateCellsByTurnsHistory";
import { checkWinner } from "../helpers/checkWinner";
import { GameConfig, NewCellState, TurnsRowsState } from "../models/display";
import CellContainer from "./CellContainer";
import ContainerLeft from "./ContainerLeft";
import "./Display.css";

function TicTacToeGame() {
  /* input state */
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
    let activePlayer = turnsHistory.at(-1)?.player;
    activePlayer != "X" ? (activePlayer = "X") : (activePlayer = "O");
    return activePlayer;
  }, [turnsHistory]);

  const isBoardFilled = !cells.some((row) =>
    row.some((cell) => cell.state == null)
  );
  const handleTurn = (
    cellIndex: number,
    rowIndex: number,
    player: TurnsRowsState["player"]
  ) => {
    setTurnsHistory((prev) => [
      ...prev,
      { pos: { row: rowIndex, col: cellIndex }, player },
    ]);
  };

  const goToTurn = (turnIndex: number) => {
    setTurnsHistory((prev) => prev.filter((prevTurn, i) => i <= turnIndex));
  };

  const { winner, winCombination } = useMemo(() => {
    console.log(111);

    const winCombination = checkWinner(cells, config.winCombinationLength);

    if (!winCombination || winCombination.length === 0) {
      return { winner: null, winCombination: [] };
    }

    const winner = winCombination[0]?.state || null;

    return { winner, winCombination };
  }, [cells, config.winCombinationLength, turnsHistory]);

  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (winner) return;
    const isFilled = turnsHistory.find((obj) => {
      if (obj.pos.col == colIndex && obj.pos.row == rowIndex) return true;
    });
    if (isFilled) return;

    handleTurn(colIndex, rowIndex, activePlayer);

    if (config.enableTurnDisappearing) {
      setTurnsHistory((prev) => prev.slice(-config.disappearingCellsInpVal));
    }
  };

  const handleResetConfig = () => {
    setTurnsHistory([]);
    //check if clears setting
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
