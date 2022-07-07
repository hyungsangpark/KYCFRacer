import React, { useEffect } from "react";
import { Player } from "../../utils/Types/SocketTypes";
import { useLocation, useNavigate } from "react-router-dom";
import GameEndMultiplayerContainer from "../../components/GameEndMultiContainer";
import GameEndSoloContainer from "../../components/GameEndSoloContainer";
import { CodeBlock } from "../../utils/Types/ApiTypes";
import { getCodeBlock } from "../../api/Api";
import PageContainer from "../../components/PageContainer";
import CustomButton from "../../components/Buttons";
import MainContentsContainer from "../../components/MainContentsContainer";
import { CircularProgress, Typography } from "@mui/material";
import classes from "./GameEndPage.module.css";

interface multiPropState {
  players: Player[];
  codeBlockId?: string;
  toMain?: boolean;
}

interface soloPropState {
  cpm: number;
  accuracy: number;
  error: number;
  codeBlockId?: string;
  toMain?: boolean;
}

/**
 * Results page for solo and multiplayer games. This page contains the results of the game which is shown
 * differently depending on whether it's solo or multiplayer. This page can also be reached via user profile
 * when looking at their match history.
 * @constructor
 */
function GameEndPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isMulti, setIsMulti] = React.useState(false);
  const [isViewCode, setViewCode] = React.useState(false);
  const [toMain, setToMain] = React.useState(true);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [stats, setStats] = React.useState<soloPropState>({
    cpm: 0,
    accuracy: 0,
    error: 0,
  });
  const [codeBlock, setCodeBlock] = React.useState<CodeBlock | undefined>(
    undefined
  );

  useEffect(() => {
    if (location.state) {
      console.log(location.state);

      const state = location.state as multiPropState;

      setToMain(state.toMain ?? true);

      if (state.players) {
        setPlayers(state.players);
        setIsMulti(true);

        if (state.codeBlockId) {
          console.log(state.codeBlockId);
          getCodeBlock(state.codeBlockId).then((codeBlock) => {
            setCodeBlock(codeBlock.data.codeBlock);
          });
        }
      } else {
        const state = location.state as soloPropState;

        setStats({
          cpm: state.cpm,
          accuracy: state.accuracy,
          error: state.error,
        });

        if (state.codeBlockId) {
          getCodeBlock(state.codeBlockId).then((codeBlock) => {
            setCodeBlock(codeBlock.data.codeBlock);
          });
        }
      }
    }
    else {
      navigate("/");
    }
  }, [location]);

  const onBackClick = () => {
    if (toMain) {
      navigate(isMulti ? "/multiplayer" : "/");
    } else {
      navigate(-1);
    }
  };

  console.log(codeBlock);

  if (codeBlock === undefined) {
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <MainContentsContainer>
        <Typography variant="h1">Assigment Complete!</Typography>
        {isMulti ? (
          <GameEndMultiplayerContainer
            codeBlock={codeBlock}
            players={players}
            isViewCode={isViewCode}
          />
        ) : (
          <GameEndSoloContainer
            codeBlock={codeBlock}
            playerStats={stats}
            isViewCode={isViewCode}
          />
        )}
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
        <CustomButton onClick={() => setViewCode(!isViewCode)} size="large">
          {isViewCode ? "Close Text" : "View Text"}
        </CustomButton>
      </div>
    </PageContainer>
  );
}

export default GameEndPage;
