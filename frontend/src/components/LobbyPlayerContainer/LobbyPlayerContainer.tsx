import React from "react";
import classes from "./LobbyPlayerContainer.module.css";
import PlayerCard from "../PlayerCard";
import { CircularProgress, Grid, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import PlayerCardStats from "../PlayerCardStats";
import { Player } from "../../utils/Types/SocketTypes";
import PageContainer from "../PageContainer";

const HeaderTypography = styled(Typography)({
  fontWeight: "bold",
  fontSize: 48,
  marginRight: 10,
  transform: "translate(0, 12.5%)",
});

interface Props {
  players: Player[];
  showStats?: boolean;
  includeNumbers?: boolean;
}

/**
 * This component is used to display the players in the lobby and at the end of the game,
 * it provides the ability to display their stats and a profile icon to signify which player you are
 * @param players - List of players of type Player
 * @param showStats - Whether or not to show the stats of each player
 * @param includeNumbers - Whether or not to show the number of each player on the left of the player card
 * @constructor
 */
function LobbyPlayerContainer({
  players,
  showStats = false,
  includeNumbers = false,
}: Props) {
  /**
   * If there are no players then display a loading screen as they are probably still loading
   */
  if (players.length == 0) {
    return (
      <PageContainer data-testid="loading-screen">
        <CircularProgress />
      </PageContainer>
    );
  }

  return (
    <div className={classes.MainContainer} data-testid="main-screen">
      <Grid
        container
        rowSpacing={3}
        columnSpacing={{ xs: 2, sm: 3, md: 4 }}
        direction="row"
        justifyContent="center"
        alignItems="center"
      >
        {players.slice(0).map((player, index) => (
          <Grid item xs={6} key={index} style={{ display: "flex" }}>
            {includeNumbers && <HeaderTypography>{index + 1}</HeaderTypography>}
            <PlayerCard
              isMe={player.isMe}
              style={{ flex: 1 }}
              playerName={player.playerName}
              playerAvatar={player.profilePicture}
              selected={player.isReady}
              rightChild={
                showStats ? (
                  <PlayerCardStats
                    CPM={player.playerStats.CPM}
                    Accuracy={player.playerStats.Accuracy}
                    Errors={player.playerStats.Errors}
                  />
                ) : null
              }
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default LobbyPlayerContainer;
