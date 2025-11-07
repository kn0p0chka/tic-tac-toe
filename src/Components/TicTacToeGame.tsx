import React, { useMemo, useState } from "react";
import calcCellsByTurnsHistory from "../helpers/calculateCellsByTurnsHistory";
import { getWinningCombination } from "../helpers/checkWinner";
import { GameConfig, TurnsRowsState } from "../models/display";

import "./Display.css";
import Table from "./Table";
import Config from "./Config";
import GameStatus from "./GameStatus";
import TurnsHistory from "./TurnsHistory";

function TicTacToeGame() {
  const [turnsHistory, setTurnsHistory] = useState<TurnsRowsState[]>([]);
  const [config, setConfig] = useState<GameConfig>({
    boardSize: 3,
    enableTurnDisappearing: false,
    winCombinationLength: 3,
    disappearingCellsInpVal: 5,
  });

  const cells = useMemo(() => {
    return calcCellsByTurnsHistory(turnsHistory, config.boardSize);
  }, [turnsHistory, config.boardSize]);
  const activePlayer = useMemo(() => {
    const lastPlayer = turnsHistory.at(-1)?.player;
    return lastPlayer === "X" ? "O" : "X";
  }, [turnsHistory]);

  const isBoardFilled =
    turnsHistory.length === config.boardSize * config.boardSize;
  const makeTurn = (
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
    const winCombination = getWinningCombination(
      cells,
      config.winCombinationLength
    );

    const winner = winCombination?.[0]?.state || null;

    return { winner, winCombination };
  }, [cells, config.winCombinationLength, turnsHistory]);

  const handleCellClick = (colIndex: number, rowIndex: number) => {
    if (winner) return;
    const isFilled = turnsHistory.find((obj) => {
      if (obj.pos.col === colIndex && obj.pos.row == rowIndex) return true;
    });
    if (isFilled) return;

    makeTurn(colIndex, rowIndex, activePlayer);

    if (config.enableTurnDisappearing) {
      setTurnsHistory((prev) => prev.slice(-config.disappearingCellsInpVal));
    }
  };

  const handleResetConfig = () => {
    setTurnsHistory([]);
    setConfig((prev) => ({
      boardSize: 3,
      enableTurnDisappearing: false,
      winCombinationLength: 3,
      disappearingCellsInpVal: 5,
    }));
  };

  const handleRestart = () => {
    setTurnsHistory([]);
  };

  return (
    <div className="mainCont">
      <Table
        cells={cells}
        winCombination={winCombination}
        handleCellClick={handleCellClick}
        config={config}
      />

      <div className="contLeft">
        <Config
          config={config}
          setConfig={setConfig}
          setTurnsHistory={setTurnsHistory}
          handleResetConfig={handleResetConfig}
          handleRestart={handleRestart}
        />
        <GameStatus winner={winner} isBoardFilled={isBoardFilled} />
        <TurnsHistory turnsHistory={turnsHistory} goToTurn={goToTurn} />
      </div>
    </div>
  );
}

export default TicTacToeGame;
