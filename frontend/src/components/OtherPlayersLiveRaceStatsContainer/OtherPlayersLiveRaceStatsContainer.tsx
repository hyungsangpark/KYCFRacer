import OtherPlayersLiveRaceStatsItem from "./OtherPlayersLiveRaceStatsItem";
import { Grid } from "@mui/material";
import { Player } from "../../utils/Types/SocketTypes";

interface Props {
  otherPlayers: Player[];
}

/**
 * Component for displaying the stats of other players in multiplayer game.
 *
 * @param otherPlayers The other players in the game
 * @returns The component to display the live race stats of other players.
 */
function OtherPlayersLiveRaceStatsContainer({ otherPlayers }: Props) {
  return (
    <Grid
      container
      rowSpacing={3}
      columnSpacing={{ xs: 2, sm: 3, md: 4 }}
      direction="row"
      justifyContent="center"
      alignItems="center"
    >
      {otherPlayers.map((otherPlayer, index) => (
        <Grid xs={3} item key={index}>
          <OtherPlayersLiveRaceStatsItem
            playerName={otherPlayer.playerName}
            playerStats={otherPlayer.playerStats}
          />
        </Grid>
      ))}
    </Grid>
  );
}

export default OtherPlayersLiveRaceStatsContainer;
