import classes from "./GameEndSoloContainer.module.css";
import ScoreDisplayItem from "../ScoreDisplay";
import { CodeBlock } from "../../utils/Types/ApiTypes";
import ViewCodeContainer from "../ViewCodeContainer/ViewCodeContainer";
import { Box, Divider, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";

interface Props {
  playerStats: {
    cpm: number;
    accuracy: number;
    error: number;
  };
  isViewCode: boolean;
  codeBlock: CodeBlock;
}

const ScoreSpecification = styled(Typography)({
  fontSize: "2.1rem",
  fontWeight: "lighter",
  margin: 4,
  textAlign: "center",
  lineHeight: 1,
});

/**
 * This component is to display the end game statistics and results for the single player game mode.
 * It includes the players and their game statistics, such as the CPM, Errors and Accuracy.
 * It also includes the isViewCode and codeBlock props in order to render an alternate container
 * called the ViewCodeContainer.
 */

function GameEndSoloContainer({ playerStats, codeBlock, isViewCode }: Props) {
  const finalScore =
    ((playerStats.cpm - playerStats.error) * playerStats.accuracy) / 100;

  return (
    <div className={classes.MainContainer}>
      <div className={classes.ScoreDisplayContainer}>
        <ScoreDisplayItem score={finalScore} label="Final Score" />
        <Box
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="flex-end"
          marginTop={"1rem"}
        >
          <ScoreSpecification>
            CPM: <span style={{ fontWeight: "bold" }}>{playerStats.cpm}</span>
          </ScoreSpecification>
          <ScoreSpecification>
            Accuracy:{" "}
            <span style={{ fontWeight: "bold" }}>{playerStats.accuracy}</span>
          </ScoreSpecification>
          <ScoreSpecification>
            Errors:{" "}
            <span style={{ fontWeight: "bold" }}>{playerStats.error}</span>
          </ScoreSpecification>
        </Box>
      </div>
      <Divider sx={{ width: "18rem", margin: "2rem 0 1rem 0" }} />
      <Typography variant={"h5"} fontWeight={"lighter"}>
        *Final score를 부스 담당자에게 보여주세요!*
      </Typography>
      <Divider sx={{ width: "18rem", margin: "1rem 0 2rem 0" }} />
      {isViewCode && (
        <ViewCodeContainer
          code={codeBlock.code}
          language={codeBlock.language}
        />
      )}
    </div>
  );
}

export default GameEndSoloContainer;
