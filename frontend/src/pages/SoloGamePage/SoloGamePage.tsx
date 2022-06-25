import React from "react";
import GameContainer from "../../components/GameContainer/GameContainer";
import SoloGameSettings from "../../components/SoloGameSettings";
import { SoloSettings } from "../../utils/Types/GameTypes";
import { useNavigate } from "react-router-dom";
import { getRandomCodeBlock, postSoloMatchHistoryResults } from "../../api/Api";
import { useAuth0 } from "@auth0/auth0-react";
import { CodeBlockWIthId } from "../../utils/Types/SocketTypes";
import PageContainer from "../../components/PageContainer";
import { CircularProgress } from "@mui/material";

/**
 * Solo game page. This page contains the solo game navigation as well as the game itself.
 * @constructor
 */
function SoloGamePage() {
  const { isAuthenticated, getAccessTokenSilently } = useAuth0();

  const [isLoading, setIsLoading] = React.useState(false);
  const [started, setStarted] = React.useState(false);
  const [gameSettings, setGameSettings] = React.useState<SoloSettings>({
    language: "bible",
    time: "30",
  });

  const [code, setCode] = React.useState<CodeBlockWIthId>({
    id: "",
    codeBlock: `In the beginning, God created the heavens and the earth.`,
  });

  const navigate = useNavigate();

  const onStartGame = (settings: SoloSettings) => {
    setIsLoading(true);
    setGameSettings(settings);

    getRandomCodeBlock({
      language: settings.language,
      time: settings.time,
    }).then((response) => {
      console.log(response);

      setCode({
        id: response.data.codeBlocks[0]._id,
        codeBlock: response.data.codeBlocks[0].code,
      });
      setStarted(true);
      setIsLoading(false);
    });
  };

  const onGameOver = (cpm: number, accuracy: number, error: number) => {
    console.log("Game ended");
    setIsLoading(true);

    isAuthenticated &&
      getAccessTokenSilently().then(async (token) => {
        try {
          if (code.id === undefined) {
            throw new Error("Code block id is undefined");
          }

          await postSoloMatchHistoryResults(
            {
              avgCPM: cpm,
              avgAccuracy: accuracy,
              avgErrors: error,
              codeBlockId: code.id,
            },
            token
          );
        } catch (e) {
          console.log(e);
        }
      });

    setIsLoading(true);

    navigate("/results", {
      state: { cpm, accuracy, error, codeBlockId: code.id },
    });
  };

  const onBackClick = () => {
    navigate("/");
  };

  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress />
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {started ? (
        <GameContainer
          language={gameSettings.language}
          started={started}
          code={code.codeBlock}
          totalGameTimeInSeconds={parseInt(gameSettings!.time)}
          onGameOver={onGameOver}
        />
      ) : (
        <SoloGameSettings onBackClick={onBackClick} onStartGame={onStartGame} />
      )}
    </PageContainer>
  );
}

export default SoloGamePage;
