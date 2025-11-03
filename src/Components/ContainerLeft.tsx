import React, { useEffect, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  CellState,
  GameConfig,
  NewCellState,
  TurnsRowsState,
} from "../models/display";

type ContainerLeftProps = {
  winner: CellState;
  isBoardFilled: boolean;
  turnsHistory: TurnsRowsState[];

  config: GameConfig;
  setConfig: React.Dispatch<React.SetStateAction<GameConfig>>;
  handleResetConfig: () => void;
  handleRestart: () => void;
  goToTurn: (turnIndex: number) => void;
  setTurnsHistory: (value: React.SetStateAction<TurnsRowsState[]>) => void;
};
// type ErrorData = {
//   winCombinationLength: string | null;
//   boardSize: string | null;
//   disappearingCellsInpVal: string | null;
// };
type Inputs = {
  winCombinationLength: string | null;
  boardSize: string | null;
  disappearingCellsInpVal: string | null;
  enableTurnsDisappearing: boolean;
};

function ContainerLeft({
  handleResetConfig,
  handleRestart,
  winner,
  isBoardFilled,
  turnsHistory,
  config,
  goToTurn,
  setConfig,
  setTurnsHistory,
}: ContainerLeftProps) {
  // const [formData, setFormData] = useState({
  //   enableTurnDisappearing: config.enableTurnDisappearing,
  //   boardSize: config.boardSize,
  //   winCombinationLength: config.winCombinationLength,
  //   disappearingCellsInpVal: config.disappearingCellsInpVal,
  // });
  // const [error, setError] = useState<ErrorData>({
  //   winCombinationLength: null,
  //   boardSize: null,
  //   disappearingCellsInpVal: null,
  // });
  // const validateForm = () => {
  //   setError({
  //     winCombinationLength: null,
  //     boardSize: null,
  //     disappearingCellsInpVal: null,
  //   });
  //   let isError = false;
  //   if (formData.winCombinationLength < 3) {
  //     setError((prev) => ({
  //       ...prev,
  //       winCombinationLength: "pls type number more than 3",
  //     }));
  //     isError = true;
  //   }
  //   if (formData.winCombinationLength > formData.boardSize) {
  //     setError((prev) => ({
  //       ...prev,
  //       winCombinationLength: `pls type number less than board size`,
  //     }));
  //     isError = true;
  //   }
  //   if (formData.boardSize > 10) {
  //     setError((prev) => ({
  //       ...prev,
  //       boardSize: "pls type number less than 10",
  //     }));
  //     isError = true;
  //   }
  //   if (formData.boardSize < 3) {
  //     setError((prev) => ({
  //       ...prev,
  //       boardSize: "pls type number more than 3",
  //     }));
  //     isError = true;
  //   }
  //   if (formData.disappearingCellsInpVal < 5) {
  //     setError((prev) => ({
  //       ...prev,
  //       disappearingCellsInpVal: "pls type number more than 5",
  //     }));
  //     isError = true;
  //   }

  //   if (
  //     formData.disappearingCellsInpVal >=
  //     formData.boardSize * formData.boardSize - 1
  //   ) {
  //     setError((prev) => ({
  //       ...prev,
  //       disappearingCellsInpVal: `pls type number less than ${
  //         formData.boardSize * formData.boardSize - 1
  //       } `,
  //     }));
  //     isError = true;
  //   }
  //   return !isError;
  // };

  // const handleApply = () => {
  //   const isValid = validateForm();
  //   if (!isValid) return;
  //   setError({
  //     winCombinationLength: null,
  //     boardSize: null,
  //     disappearingCellsInpVal: null,
  //   });
  //   setConfig({
  //     boardSize: formData.boardSize,
  //     winCombinationLength: formData.winCombinationLength,
  //     enableTurnDisappearing: formData.enableTurnDisappearing,
  //     disappearingCellsInpVal: formData.disappearingCellsInpVal,
  //   });
  //   setTurnsHistory([]);
  // };

  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      boardSize: String(config.boardSize),
      winCombinationLength: String(config.winCombinationLength),
      disappearingCellsInpVal: String(config.disappearingCellsInpVal),
    },
  });
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    setConfig({
      boardSize: Number(data.boardSize),
      enableTurnDisappearing: data.enableTurnsDisappearing,
      winCombinationLength: Number(data.winCombinationLength),
      disappearingCellsInpVal: Number(data.disappearingCellsInpVal),
    });
    setTurnsHistory([]);
  };
  const watchedBoardSize = Number(watch("boardSize"));
  const watchedEnableTurnsDisappearing = watch("enableTurnsDisappearing");
  const watchedWinCombinationLength = Number(watch("winCombinationLength"));

  return (
    <div className="contLeft">
      <form
        className="contBtn"
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
              {errors.boardSize?.type === "min" &&
                "pls type number more than 3"}
              {errors.boardSize?.type === "max" &&
                `"pls type number less than ${watchedBoardSize}`}
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
              {errors.winCombinationLength?.type === "min" &&
                "pls type number more than 3"}
              {errors.winCombinationLength?.type === "max" &&
                `"pls type number less than ${watchedBoardSize}`}
            </p>
          )}
        </label>
        <label>
          <input
            id="disappearingCellsInpVal"
            type="checkbox"
            {...register("enableTurnsDisappearing")}
          />
          <p className="checkBoxLabelText">Five Cells Only</p>
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
                `pls type number more than ${
                  Number(watchedWinCombinationLength) * 2 - 1
                }`}
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
            const defaultValues = {
              boardSize: "3",
              enableTurnsDisappearing: false,
              winCombinationLength: "3",
              disappearingCellsInpVal: "5",
            };
            reset(defaultValues);
          }}
        >
          RESET SETTINGS
        </button>
      </form>
      {/* <div className="contBtn">
        <label>
          <p>Board size:</p>
          <input
            type="number"
            name="boardSize"
            className="inp"
            min={3}
            max={10}
            value={String(formData.boardSize)}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                boardSize: Number(e.target.value),
              }));
            }}
          />
          {<p className="red">{error.boardSize}</p>}
        </label>
        <label>
          <p> Win Combination Length:</p>
          <input
            type="number"
            name="winComb"
            className="inp"
            min={3}
            max={formData.boardSize}
            value={String(formData.winCombinationLength)}
            onChange={(e) => {
              setFormData((prev) => ({
                ...prev,
                winCombinationLength: Number(e.target.value),
              }));
            }}
          />
          {<p className="red">{error.winCombinationLength}</p>}
        </label>
        <label>
          <input
            type="checkbox"
            checked={formData.enableTurnDisappearing}
            onChange={(e) => {
              if (!e.target.checked)
                setError((prev) => ({
                  ...prev,
                  disappearingCellsInpVal: null,
                }));
              setFormData((prev) => ({
                ...prev,
                enableTurnDisappearing: !prev.enableTurnDisappearing,
              }));
            }}
            name="fiveCellsOnly"
          />
          <p className="checkBoxLabelText">Five Cells Only</p>
          {formData.enableTurnDisappearing && (
            <input
              type="number"
              name="disappCellsInp"
              className="inp"
              min={formData.winCombinationLength * 2 - 1}
              max={formData.boardSize * formData.boardSize - 1}
              value={String(formData.disappearingCellsInpVal)}
              onChange={(e) => {
                setFormData((prev) => ({
                  ...prev,
                  disappearingCellsInpVal: Number(e.target.value),
                }));
              }}
            />
          )}
          {<p className="red">{error.disappearingCellsInpVal}</p>}
        </label>

        <button className="btnApply" onClick={() => handleApply()}>
          Apply settings
        </button>

        <button
          className="btnRestart"
          onClick={() => {
            handleRestart();
            setFormData({
              boardSize: 3,
              enableTurnDisappearing: false,
              winCombinationLength: 3,
              disappearingCellsInpVal: 5,
            });
          }}
        >
          RESTART GAME
        </button>
        <button
          className="btnReset"
          onClick={() => {
            handleResetConfig();
            setFormData({
              boardSize: 3,
              enableTurnDisappearing: false,
              winCombinationLength: 3,
              disappearingCellsInpVal: 5,
            });
            setError({
              winCombinationLength: null,
              boardSize: null,
              disappearingCellsInpVal: null,
            });
          }}
        >
          RESET SETTINGS
        </button>
      </div> */}

      {winner && <h3 className="winner">the winner is: {winner} !!</h3>}
      {!winner && isBoardFilled && (
        <h3 className="winner">the winner is love</h3>
      )}

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
    </div>
  );
}

export default ContainerLeft;
