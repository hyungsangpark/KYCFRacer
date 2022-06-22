import { render } from "@testing-library/react";
import { PlayerStats } from "../../../utils/Types/SocketTypes";
import OtherPlayersLiveRaceStatsItem from "../OtherPlayersLiveRaceStatsItem";

describe("OtherPlayersLiveRaceStatsItem", () => {
  const playerStats: PlayerStats = {
    CPM: 12,
    Accuracy: 24,
    Errors: 33,
    Progress: 68,
  };

  it("should render without crashing", () => {
    const { container } = render(
      <OtherPlayersLiveRaceStatsItem
        playerName="testPlayer1"
        playerStats={playerStats}
      />
    );

    expect(container).toBeInTheDocument();
  });

  it("should render the player name", () => {
    const { getByText } = render(
      <OtherPlayersLiveRaceStatsItem
        playerName="testPlayer1"
        playerStats={playerStats}
      />
    );

    const playerName = getByText("testPlayer1");
    expect(playerName).toBeInTheDocument();
  });

  it("should render the progress bar", () => {
    const { getByRole } = render(
      <OtherPlayersLiveRaceStatsItem
        playerName="testPlayer1"
        playerStats={playerStats}
      />
    );

    const progressBar = getByRole("progressbar");
    expect(progressBar).toBeInTheDocument();
  });

  it("should render the progress bar with the correct progress", () => {
    const { getByRole } = render(
      <OtherPlayersLiveRaceStatsItem
        playerName="testPlayer1"
        playerStats={playerStats}
      />
    );

    const progressBar = getByRole("progressbar");
    expect(progressBar).toHaveAttribute("aria-valuenow", "68");
  });

  it("should render the CPM", () => {
    const { getByText } = render(
      <OtherPlayersLiveRaceStatsItem
        playerName="testPlayer1"
        playerStats={playerStats}
      />
    );

    const cpm = getByText("CPM: 12");
    expect(cpm).toBeInTheDocument();
  });
});
