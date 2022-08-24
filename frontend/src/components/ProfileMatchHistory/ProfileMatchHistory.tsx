import { styled, Typography } from "@mui/material";
import React from "react";
import { useNavigate } from "react-router-dom";
import PlayerCard from "../PlayerCard";
import PlayerCardStats from "../PlayerCardStats";
import { MatchHistoryItem } from "../../utils/Types/ApiTypes";
import { Player } from "../../utils/Types/SocketTypes";
import { useAuth0 } from "@auth0/auth0-react";

const Header = styled(Typography)({
  fontSize: "32px",
  fontWeight: 700,
  marginBottom: "10px",
});

type Props = {
  matches: MatchHistoryItem[];
};

/**
 * This component is used to render match history items for a user provided by the parent.
 * @param matches - The match history items to render
 * @constructor
 */
function ProfileMatchHistory({ matches }: Props) {
  const { user, isAuthenticated } = useAuth0();
  const navigate = useNavigate();

  /**
   * This function is used to format a match history item into a list of player cards
   * so that PlayerCard did not need to be changed to support this new type of data.
   * @param match
   */
  const formatMatch: (match: MatchHistoryItem) => Player[] = (
    match: MatchHistoryItem
  ) => {
    const players: Player[] = [];

    match.users.forEach((u) => {
      players.push({
        profilePicture: u.profilePicture,
        playerStats: {
          CPM: u.stats.avgCPM,
          Errors: u.stats.avgErrors,
          Accuracy: u.stats.avgAccuracy,
          Progress: 0,
        },
        isMe: isAuthenticated && user?.sub?.split("|")[1] === u.userId,
        isHost: false,
        isReady: false,
        playerName: u.username,
        socketID: "",
      });
    });

    console.log(players);
    return players;
  };

  return (
    <>
      <Header>Match History</Header>
      {[...matches]
        .reverse()
        .slice(0, 10)
        .map((match, index) => {
          const firstPlayer = match.users[0];
          return (
            <PlayerCard
              key={`match${index}`}
              playerName={`${firstPlayer.username}${
                match.users.length > 1 ? " and more" : ""
              }`}
              playerAvatar={firstPlayer.profilePicture ?? ""}
              rightChild={
                <PlayerCardStats
                  CPM={firstPlayer.stats.avgCPM}
                  Accuracy={firstPlayer.stats.avgAccuracy}
                  Errors={firstPlayer.stats.avgErrors}
                />
              }
              style={{ margin: "10px 0", width: "100%" }}
              onClick={() =>
                navigate(`/results`, {
                  state:
                    match.users.length === 1
                      ? {
                          cpm: match.users[0].stats.avgCPM,
                          accuracy: match.users[0].stats.avgAccuracy,
                          error: match.users[0].stats.avgErrors,
                          toMain: false,
                          codeBlockId: match.codeBlock,
                        }
                      : {
                          players: formatMatch(match),
                          toMain: false,
                          codeBlockId: match.codeBlock,
                        },
                })
              }
            />
          );
        })}
    </>
  );
}

export default ProfileMatchHistory;
