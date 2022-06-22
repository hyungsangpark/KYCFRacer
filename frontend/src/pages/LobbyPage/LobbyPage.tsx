import React, {useEffect} from "react";
import {styled} from "@mui/material/styles";
import {CircularProgress, Grid, Typography} from "@mui/material";
import LobbyPlayerContainer from "../../components/LobbyPlayerContainer";
import CustomButton from "../../components/Buttons";
import {useLocation, useNavigate} from "react-router-dom";
import {SocketContext} from "../../api/sockets/Sockets";
import {Language, MultiplayerSettings} from "../../utils/Types/GameTypes";
import MultiplayerGameSettings from "../../components/MultiplayerGameSettings/MultiplayerGameSettings";
import MultiplayerGamePlayContainer from "../../components/MultiplayerGamePlayContainer";
import {
  CodeBlockWIthId,
  Player,
  PlayerStats,
} from "../../utils/Types/SocketTypes";
import PageContainer from "../../components/PageContainer";
import MainContentsContainer from "../../components/MainContentsContainer";

const GridButtonItem = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "fit-content",
});

interface propState {
  lobbyID?: string;
}

/**
 * Lobby page for multiplayer games. This page contains the settings, players container and the navigation
 * buttons at the bottom of the page.
 * @constructor
 */
function LobbyPage() {
  const socketContext = React.useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [isLoading, setIsLoading] = React.useState(false);
  const [isHost, setIsHost] = React.useState(false);
  const [gameStarted, setGameStarted] = React.useState(false);
  const [players, setPlayers] = React.useState<Player[]>([]);
  const [ready, setReady] = React.useState(false);
  const [showSettings, setShowSettings] = React.useState(false);
  const [lobbyCode, setLobbyCode] = React.useState("");
  const [gameSettings, setGameSettings] = React.useState<MultiplayerSettings>({
    language: "random",
    time: "30",
    playerAmount: "5",
  });
  const [code, setCode] = React.useState<CodeBlockWIthId>({
    id: "",
    codeBlock: `const function() {
  const test = 1;
};`,
  });

  useEffect(() => {
    if (!socketContext!!.connected) {
      navigate("/");
    }

    if (location.state) {
      const state = location.state as propState;

      if (state.lobbyID) {
        setLobbyCode(state.lobbyID);
      }
    } else {
      navigate("/multiplayer");
    }

    socketContext!.onCreateLobby((data) => {
      console.log(data);
      setIsHost(true);
      setLobbyCode(data.lobbyID);
    });

    socketContext!.onJoinLobby((data) => {
      console.log(data);

      setPlayers(data.players);
      for (const player of data.players) {
        if (player.isMe) {
          if (player.isHost) {
            setIsHost(true);
          } else {
            setIsHost(false);
          }
        }
      }
    });

    socketContext!.onLobbyError((data) => {
      console.log(data);
      navigate("/multiplayer", {state: {error: data.error}});
    });

    socketContext!.onUpdatePlayerProgress((data) => {
      console.log("Update ", data);

      setPlayers(data.players);
    });

    socketContext!.onStartGame((data) => {
      console.log("Start ", data.code._id);

      setCode({
        id: data.code._id,
        codeBlock: data.code.code,
      });

      setGameSettings({...gameSettings, language: data.language as Language});

      setPlayers(data.players);
      setGameStarted(true);
      setIsLoading(false);
    });

    socketContext!.onGameComplete((data) => {
      console.log("Game Complete ", data);

      data.players.forEach((p) => {
        p.isMe = p.socketID === socketContext!.getId();
        p.isReady = false;
      });

      navigate("/results", {
        state: {players: data.players, codeBlockId: code.id},
      });
    });

    return () => {
      socketContext!.removeListeners();
    };
  }, [code.id]);

  const onLeaveClick = () => {
    // Go to multiplayer page
    if (socketContext!.connected) {
      socketContext!.leaveLobby();
      socketContext!.disconnect();
    }

    navigate("/multiplayer");
  };

  const onSettingsClick = () => {
    setShowSettings(!showSettings);
  };

  const onStartClick = () => {
    for (let i = 0; i < players.length; i++) {
      const player = players[i];
      if (!player.isReady) {
        return;
      }
    }

    setIsLoading(true);

    const LanguageSettingsOptions: Language[] = ["random", "javascript", "java", "python"];
    let selectedLanguage = gameSettings.language;

    if (selectedLanguage === "random") {
      const randomLanguage =
        Math.floor(Math.random() * (LanguageSettingsOptions.length - 1)) + 1;
      selectedLanguage = LanguageSettingsOptions[randomLanguage];
    }

    socketContext!.startGame({
      lobbyID: lobbyCode, settings: {
        language: selectedLanguage,
        time: gameSettings.time,
        playerAmount: gameSettings.playerAmount,
      }
    });
  };

  const onReadyClick = () => {
    setReady(!ready);

    socketContext!.readyLobby({lobbyID: lobbyCode});
  };

  const onGameOver = () => {
    console.log("Game Over Called");
    socketContext!.completeGame({lobbyID: lobbyCode});
  };

  const updateStats = (stats: PlayerStats) => {
    socketContext!.updatePlayerProgress({...stats, lobbyID: lobbyCode});
  };

  if (isLoading) {
    return (
      <PageContainer>
        <CircularProgress/>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      {gameStarted ? (
        <MultiplayerGamePlayContainer
          language={gameSettings.language}
          updateStats={updateStats}
          otherPlayers={players.filter(
            (p) => p.socketID !== socketContext!.getId()
          )}
          started={gameStarted}
          onGameOver={onGameOver}
          gameSettings={gameSettings}
          code={code.codeBlock}
        />
      ) : (
        <>
          <MainContentsContainer>
            <Typography variant="h2">
              Lobby Code: {lobbyCode.toUpperCase()}
            </Typography>
            {showSettings ? (
              <MultiplayerGameSettings updateSettings={setGameSettings}/>
            ) : (
              <LobbyPlayerContainer
                players={(() => {
                  if (!players) return [];

                  players.forEach((p) => {
                    p.isMe = p.socketID === socketContext!.getId();
                  });

                  return players;
                })()}
              />
            )}
          </MainContentsContainer>
          <Grid
            container
            sx={{
              width: "fit-content",
              marginBottom: "30px",
              justifyContent: "center",
              alignItems: "center",
            }}
            direction="row"
          >
            <GridButtonItem item xs={6} lg={isHost ? 3 : 6}>
              <CustomButton onClick={onLeaveClick}>Leave</CustomButton>
            </GridButtonItem>
            {isHost && (
              <GridButtonItem item xs={6} lg={3}>
                <CustomButton onClick={onSettingsClick}>
                  {showSettings ? "Lobby" : "Settings"}
                </CustomButton>
              </GridButtonItem>
            )}
            {isHost && (
              <GridButtonItem item xs={6} lg={3}>
                <CustomButton onClick={onStartClick}>Start</CustomButton>
              </GridButtonItem>
            )}
            <GridButtonItem item xs={6} lg={isHost ? 3 : 6}>
              <CustomButton onClick={onReadyClick} selected={ready}>
                Ready
              </CustomButton>
            </GridButtonItem>
          </Grid>
        </>
      )}
    </PageContainer>
  );
}

export default LobbyPage;
