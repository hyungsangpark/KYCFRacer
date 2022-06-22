import React from "react";
import { Typography } from "@mui/material";

interface Props {
  score: number;
  label: string;
  nextLineLabel?: string;
  size?: "small" | "medium" | "large";
}

/**
 * This component is used to display the score of a player.
 *
 * @param score - The score of the player
 * @param label - The type of score
 * @constructor
 */
function ScoreDisplayItem({
  score,
  label,
  nextLineLabel,
  size = "large",
}: Props) {
  const scoreSize = size === "small" ? 30 : size === "large" ? 80 : 45;
  const labelSize = size === "small" ? 10 : size === "large" ? 20 : 12;

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
      }}
    >
      <Typography sx={{ fontSize: scoreSize, fontWeight: "bold" }}>
        {Math.round(score)}
      </Typography>
      <Typography
        sx={{
          fontSize: labelSize,
          fontWeight: "bold",
          textAlign: "center",
        }}
      >
        {label}
      </Typography>
      {nextLineLabel && (
        <Typography
          sx={{
            fontSize: labelSize,
            fontWeight: "bold",
            textAlign: "center",
          }}
        >
          {nextLineLabel}
        </Typography>
      )}
    </div>
  );
}

export default ScoreDisplayItem;
