import React from "react";
import classes from "./PlayerCardStats.module.css";
import { styled } from "@mui/material/styles";
import { Typography } from "@mui/material";

const MainStatTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "1.75rem",
  marginRight: 3,
}));

const SubStatTypography = styled(Typography)(({ theme }) => ({
  fontSize: "1.25rem",
  marginRight: 12,
  fontWeight: "lighter",
}));

interface Props {
  CPM: number;
  Accuracy: number;
  Errors: number;
}

/**
 * This component is used to render the following player statistics: CPM, Accuracy, and Errors.
 *
 * @param CPM - Characters per minute
 * @param Accuracy - Accuracy of the player's typing
 * @param Errors - Number of errors made by the player
 * @constructor
 */
function PlayerCardStats({ CPM, Accuracy, Errors }: Props) {
  return (
    <div className={classes.MainContainer}>
      <MainStatTypography>{CPM}</MainStatTypography>
      <SubStatTypography>CPM</SubStatTypography>
      <MainStatTypography>{Accuracy}</MainStatTypography>
      <SubStatTypography>ACU</SubStatTypography>
      <MainStatTypography>{Errors}</MainStatTypography>
      <SubStatTypography>ERR</SubStatTypography>
    </div>
  );
}

export default PlayerCardStats;
