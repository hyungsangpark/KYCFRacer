import React, { useEffect } from "react";
import classes from "./MultiplayerGamePage.module.css";
import MultiplayerMainNavContainer from "../../components/MultiplayerMainNavContainer";
import JoinLobbyContainer from "../../components/JoinLobbyContainer";
import { useLocation, useNavigate } from "react-router-dom";
import { SocketContext } from "../../api/sockets/Sockets";
import Alert from "@mui/material/Alert";
import { setDefaultResultOrder } from "dns/promises";
import { useAuth0 } from "@auth0/auth0-react";
import PageContainer from "../../components/PageContainer";

interface propState {
  error?: string;
}

/**
 * This is the multiplayer entry page which contains the join and create lobby buttons.
 * @constructor
 */
function MultiplayerGamePage() {
  const { user } = useAuth0();
  const socketContext = React.useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();

  const [username, setUsername] = React.useState("");
  const [showJoinLobby, setShowJoinLobby] = React.useState(false);
  const [showAlert, setAlert] = React.useState(false);
  const [lobbyError, setLobbyError] = React.useState("");

  useEffect(() => {
    !socketContext!.connected && socketContext!.connect();
    console.log("connected");

    if (location.state) {
      const state = location.state as propState;

      if (state.error) {
        setShowJoinLobby(true);
        setLobbyError(state.error);
      }
    }
  }, []);

  const onCreateClick = () => {
    if (
      username.length !== 0 &&
      (username.length < 4 || username.length > 10)
    ) {
      setAlert(true);
    } else {
      const savedUserName = localStorage.getItem("lastUserName");

      socketContext!.createLobby({
        playerName: username === "" ? savedUserName ?? "" : username,
        sub: user?.sub,
      });

      navigate("/lobby", { state: { lobbyID: "" } });
    }
  };

  const onJoinClick = (lobbyID: string) => {
    setAlert(false);

    const savedUserName = localStorage.getItem("lastUserName");

    socketContext!.joinLobby({
      playerName: username === "" ? savedUserName ?? "" : username,
      lobbyID: lobbyID.toUpperCase(),
      sub: user?.sub,
    });

    navigate("/lobby", { state: { lobbyID: lobbyID.toUpperCase() } });
  };

  const onBackClick = () => {
    navigate("/");
  };

  return (
    <PageContainer>
      {showJoinLobby ? (
        <JoinLobbyContainer
          error={lobbyError}
          onBackClick={() => setShowJoinLobby(false)}
          onJoinClick={onJoinClick}
        />
      ) : (
        <MultiplayerMainNavContainer
          setUsername={setUsername}
          onCreateClick={onCreateClick}
          onJoinClick={() => {
            if (
              username.length !== 0 &&
              (username.length < 4 || username.length > 10)
            ) {
              setAlert(true);
            } else {
              setShowJoinLobby(true);
            }
          }}
          onBackClick={onBackClick}
          showAlert={showAlert}
        />
      )}
    </PageContainer>
  );
}

export default MultiplayerGamePage;
