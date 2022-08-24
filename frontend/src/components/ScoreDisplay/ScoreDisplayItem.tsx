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
 * @param nextLineLabel - Optional 2nd line in label
 * @param size - Size of the component
 * @constructor
 */
function ScoreDisplayItem({
  score,
  label,
  nextLineLabel,
  size = "large",
}: Props) {
  const scoreSize =
    size === "small" ? "2rem" : size === "large" ? "5rem" : "3rem";
  const labelSize =
    size === "small" ? "0.75rem" : size === "large" ? "2rem" : "1.12rem";

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
