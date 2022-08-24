import React, { useEffect } from "react";
import { Typography } from "@mui/material";
import ProgressBar from "../ProgressBar";
import CodeInput from "../CodeInput";
import classes from "./GameContainer.module.css";
import { styled } from "@mui/material/styles";
import { useTimer } from "react-timer-hook";
import { PlayerStats } from "../../utils/Types/SocketTypes";
import { Language } from "../../utils/Types/GameTypes";
import MainContentsContainer from "../MainContentsContainer";

const TimerTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: 25,
  marginBottom: 10,
}));

const StatItemTypography = styled(Typography)(({ theme }) => ({
  marginLeft: 5,
  marginRight: 5,
  fontWeight: "bold",
  fontSize: "2rem",
}));

interface Props {
  started: boolean;
  onGameOver: (cpm: number, accuracy: number, error: number) => void;
  totalGameTimeInSeconds: number;
  code: string;
  updateStats?: (stats: PlayerStats) => void;
  language?: Language;
}

/**
 * This component acts as a wrapper for CodeInput in order to provide extra functionality of having a timer which starts
 * after started state prop is set to true and gives a 3 second count down timer. It also calculates the Accuracy, Errors and CPM stats
 * and displays it at the bottom.
 *
 * @param started - boolean if true lets the user type otherwise does not register their events
 * @param onGameOver - function that is called when all the text has been typed
 * @param totalGameTimeInSeconds - how long the timer will go on for
 * @param code - the code that is being displayed
 * @param updateStats - updates the PlayerStats of the parent
 * @param language - the programming language of the code
 * @constructor
 */
function GameContainer({
  started,
  onGameOver,
  totalGameTimeInSeconds = 90,
  code,
  updateStats,
  language,
}: Props) {
  const [progress, setProgress] = React.useState(0);
  const [correctKeyCount, setCorrectKeyCount] = React.useState(0);
  const [wrongKeyCount, setWrongKeyCount] = React.useState(0);
  const [gameOver, setGameOver] = React.useState(false);

  const { seconds, minutes, isRunning, start, pause } = useTimer({
    expiryTimestamp: new Date(Date.now() + totalGameTimeInSeconds * 1000),
    onExpire: () => {
      onGameOver(getCPM(), getAccuracy(), wrongKeyCount);
    },
    autoStart: false,
  });

  const preStartTimer = useTimer({
    expiryTimestamp: new Date(Date.now() + 3 * 1000),
    onExpire: () => start(),
    autoStart: false,
  });

  /**
   * As soon as started state is set to true a 3 seconds count down preStartTimer
   * will start which will enable the main timer once it is done by running start() method
   */
  useEffect(() => {
    if (started && !isRunning) {
      preStartTimer.start();
    }
  }, [started]);

  /**
   * When gave over is set to true this useEffect runs
   * and it updates the progress and the player stats then calls onGameOver method in the
   * parent and is used so that all the data is up to date before pushing it up to the parent
   */
  useEffect(() => {
    if (gameOver) {
      pause();

      setProgress(progress);
      updateStats &&
        updateStats({
          CPM: getCPM(),
          Accuracy: getAccuracy(),
          Errors: wrongKeyCount,
          Progress: progress,
          correctKeyCount,
          wrongKeyCount,
          timeLeftInSeconds: minutes * 60 + seconds,
        });

      onGameOver(getCPM(), getAccuracy(), wrongKeyCount);
    }
  }, [gameOver]);

  /**
   * Calculates the accuracy based on correct and wrong keys pressed by user
   */
  const getAccuracy = () => {
    if (correctKeyCount === 0 && wrongKeyCount === 0) {
      return 0;
    }
    return Math.floor(
      (correctKeyCount / (correctKeyCount + wrongKeyCount)) * 100
    );
  };

  /**
   * Calculates the characters per minute by getting the time elapsed since start
   * and total characters typed
   */
  const getCPM = () => {
    if (correctKeyCount === 0 && wrongKeyCount === 0) {
      return 0;
    }

    const timeElapsed = totalGameTimeInSeconds - (minutes * 60 + seconds);

    return Math.floor(((correctKeyCount + wrongKeyCount) / timeElapsed) * 60);
  };

  /**
   * Formats the seconds and minutes from timer into 00:00 format
   */
  const getTime = () => {
    if (!isRunning && preStartTimer.isRunning) {
      return new Date(preStartTimer.seconds * 1000).toISOString().slice(14, 19);
    }

    let totalSeconds = minutes * 60 + seconds;
    return new Date(totalSeconds * 1000).toISOString().slice(14, 19);
  };

  return (
    <MainContentsContainer
      style={{ minWidth: "60vw", maxWidth: "90vw", width: "auto" }}
    >
      <TimerTypography>Time: {getTime()}</TimerTypography>
      <ProgressBar progress={progress} />
      <CodeInput
        language={language}
        started={isRunning}
        setProgress={(num) => {
          setProgress(num);
          updateStats &&
            updateStats({
              CPM: getCPM(),
              Accuracy: getAccuracy(),
              Errors: wrongKeyCount,
              Progress: num,
              correctKeyCount,
              wrongKeyCount,
              timeLeftInSeconds: minutes * 60 + seconds,
            });
        }}
        code={code}
        onGameOver={() => {
          setProgress(100);
          setGameOver(true);
        }}
        checkKeyPressed={(correct: boolean) => {
          correct
            ? setCorrectKeyCount(correctKeyCount + 1)
            : setWrongKeyCount(wrongKeyCount + 1);
        }}
      />
      <div className={classes.statContainer}>
        <StatItemTypography>CPM: {getCPM()}</StatItemTypography>
        <StatItemTypography>Accuracy: {getAccuracy()}%</StatItemTypography>
        <StatItemTypography>Errors: {wrongKeyCount}</StatItemTypography>
      </div>
    </MainContentsContainer>
  );
}

export default GameContainer;
