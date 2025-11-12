import React from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { GameConfig, TurnsRowsState } from "../models/display";

type ConfigProps = {
  setTurnsHistory: (value: React.SetStateAction<TurnsRowsState[]>) => void;
  handleResetConfig: () => void;
  handleRestart: () => void;
  config: GameConfig;
  setConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
};

function Config({
  setTurnsHistory,
  handleResetConfig,
  handleRestart,
  config,
  setConfig,
}: ConfigProps) {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<GameConfig>({
    defaultValues: config,
  });

  const onSubmit: SubmitHandler<GameConfig> = (data) => {
    setConfig(data);
    setTurnsHistory([]);
  };

  const watchedBoardSize = Number(watch("boardSize"));
  const watchedEnableTurnsDisappearing = watch("enableTurnDisappearing");
  const watchedWinCombinationLength = Number(watch("winCombinationLength"));

  return (
    <form
      className="form"
      onSubmit={handleSubmit(onSubmit, (error) => {
        console.log(error, "error");
      })}
    >
      <label>
        <p>Board size:</p>
        <input
          id="boardSize"
          type="number"
          className="inp"
          {...register("boardSize", {
            min: 3,
            max: 10,
          })}
        />

        {errors.boardSize && (
          <p className="red">
            {errors.boardSize?.type === "min" && "pls type number more than 3"}
            {errors.boardSize?.type === "max" && `pls type number less than ${watchedBoardSize}`}
          </p>
        )}
      </label>
      <label>
        <p> Win Combination Length:</p>
        <input
          id="winCombinationLength"
          type="number"
          className="inp"
          {...register("winCombinationLength", {
            min: 3,
            max: Number(watchedBoardSize),
          })}
        />
        {errors.winCombinationLength && (
          <p className="red">
            {errors.winCombinationLength?.type === "min" && "pls type number more than 3"}
            {errors.winCombinationLength?.type === "max" &&
              `pls type number less than ${watchedBoardSize}`}
          </p>
        )}
      </label>
      <label>
        <input
          id="disappearingCellsInpVal"
          type="checkbox"
          {...register("enableTurnDisappearing")}
        />
        <p className="checkBoxLabelText"> Enable Turn Disappearing</p>
        {watchedEnableTurnsDisappearing && (
          <input
            type="number"
            className="inp"
            {...register("disappearingCellsInpVal", {
              min: Number(watchedWinCombinationLength) * 2 - 1,
              max: Number(watchedBoardSize) * Number(watchedBoardSize) - 1,
            })}
          />
        )}
        {errors.disappearingCellsInpVal && (
          <p className="red">
            {errors.disappearingCellsInpVal?.type === "min" &&
              `pls type number more than ${Number(watchedWinCombinationLength) * 2 - 1}`}
            {errors.disappearingCellsInpVal?.type === "max" &&
              `"pls type number less than ${
                Number(watchedBoardSize) * Number(watchedBoardSize) - 1
              }`}
          </p>
        )}
      </label>

      <input type="submit" className="btnApply" value={"APPLY"} />
      <button
        className="btnRestart"
        onClick={() => {
          handleRestart();
        }}
      >
        RESTART GAME
      </button>
      <button
        className="btnReset"
        onClick={() => {
          console.log("hi");
          handleResetConfig();
          // TODO: use the default config from the constants file. (check comment in TicTacToeGame.tsx)
          const defaultValues = {
            boardSize: 3,
            enableTurnDisappearing: false,
            winCombinationLength: 3,
            disappearingCellsInpVal: 5,
          };
          reset(defaultValues);
        }}
      >
        RESET SETTINGS
      </button>
    </form>
  );
}

export default Config;
