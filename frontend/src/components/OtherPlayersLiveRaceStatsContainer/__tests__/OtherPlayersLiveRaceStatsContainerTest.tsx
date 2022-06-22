import { render } from "@testing-library/react";
import { Player } from "../../../utils/Types/SocketTypes";
import OtherPlayersLiveRaceStatsContainer from "../OtherPlayersLiveRaceStatsContainer";

describe("OtherPlayersLiveRaceStatsContainer", () => {
  const otherPlayers: Player[] = [
    {
      playerName: "testPlayer1",
      socketID: "testSocketId1",
      playerStats: {
        CPM: 10,
        Accuracy: 11,
        Errors: 12,
        Progress: 13,
      },
      isReady: false,
      isHost: true,
      profilePicture: "",
    },
    {
      playerName: "testPlayer2",
      socketID: "testSocketId2",
      playerStats: {
        CPM: 20,
        Accuracy: 21,
        Errors: 22,
        Progress: 23,
      },
      isReady: false,
      isHost: false,
      profilePicture: "",
    },
  ];

  it("should render without crashing", () => {
    const { container } = render(
      <OtherPlayersLiveRaceStatsContainer otherPlayers={[]} />
    );

    expect(container).toBeInTheDocument();
  });

  it("should render the other players", () => {
    const { getByText, getAllByRole } = render(
      <OtherPlayersLiveRaceStatsContainer otherPlayers={otherPlayers} />
    );

    const player1Name = getByText("testPlayer1");
    const player2Name = getByText("testPlayer2");
    const playersProgressBar = getAllByRole("progressbar");

    expect(player1Name).toBeInTheDocument();
    expect(player2Name).toBeInTheDocument();
    expect(playersProgressBar.length).toBe(2);
  });

  it("should render the other players with the correct stats (player1)", () => {
    const { getByText, getAllByRole } = render(
      <OtherPlayersLiveRaceStatsContainer otherPlayers={otherPlayers} />
    );

    const player1Name = getByText("testPlayer1");
    const player1ProgressBar = getAllByRole("progressbar")[0];
    const player1CPM = getByText("CPM: 10");

    expect(player1Name).toBeInTheDocument();
    expect(player1ProgressBar).toBeInTheDocument();
    expect(player1ProgressBar).toHaveAttribute("aria-valuenow", "13");
    expect(player1CPM).toBeInTheDocument();
  });

  it("should render the other players with the correct stats (player2)", () => {
    const { getByText, getAllByRole } = render(
      <OtherPlayersLiveRaceStatsContainer otherPlayers={otherPlayers} />
    );

    const player2Name = getByText("testPlayer2");
    const player2ProgressBar = getAllByRole("progressbar")[1];
    const player2CPM = getByText("CPM: 20");

    expect(player2Name).toBeInTheDocument();
    expect(player2ProgressBar).toBeInTheDocument();
    expect(player2ProgressBar).toHaveAttribute("aria-valuenow", "23");
    expect(player2CPM).toBeInTheDocument();
  });
});
