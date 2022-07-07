import React from "react";
import { styled } from '@mui/material/styles';
import LinearProgress, { linearProgressClasses } from '@mui/material/LinearProgress';

interface Props {
  progress: number;
  style?: React.CSSProperties;
}

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 25,
  borderRadius: "6px",
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.secondary.main,
  },
  [`& .${linearProgressClasses.bar}`]: {
    backgroundColor: theme.palette.primary.main,
  },
}));

/**
 *
 * @param progress the progress state of a player in game
 * @param style the CSSProperties of the progress bar
 * @constructor
 */
function ProgressBar({ progress, style }: Props) {
  return (
    <BorderLinearProgress style={{ ...style, width: "100%" }} variant="determinate" value={progress}/>
  );
}

export default ProgressBar;