import { render } from "@testing-library/react";
import LobbyPlayerContainer from "../LobbyPlayerContainer";
import { Player } from "../../../utils/Types/SocketTypes";

describe("LobbyPlayerContainer", () => {
  const dummyPlayers: Player[] = [
    {
      playerName: "test1",
      socketID: "test",
      isReady: false,
      isMe: true,
      playerStats: {
        Accuracy: 0,
        CPM: 0,
        Errors: 0,
        Progress: 0,
      },
      isHost: false,
      profilePicture: "",
    },
    {
      playerName: "test2",
      socketID: "test",
      isReady: false,
      isMe: false,
      playerStats: {
        Accuracy: 0,
        CPM: 0,
        Errors: 0,
        Progress: 0,
      },
      isHost: false,
      profilePicture: "",
    },
  ];

  it("should render", () => {
    const { baseElement } = render(<LobbyPlayerContainer players={[]} />);

    expect(baseElement).toBeInTheDocument();
  });

  it("if players of length 0 is passed in then a loading screen should be rendered", () => {
    const { baseElement } = render(<LobbyPlayerContainer players={[]} />);

    expect(
      baseElement.querySelector("[data-testid='loading-screen']")
    ).toBeInTheDocument();
  });

  it("if players of length more than 1 is passed in then main screen is rendered", () => {
    const { baseElement } = render(
      <LobbyPlayerContainer players={[dummyPlayers[0]]} />
    );

    expect(
      baseElement.querySelector("[data-testid='main-screen']")
    ).toBeInTheDocument();
  });

  it("it renders every player correctly", () => {
    const { getByText } = render(
      <LobbyPlayerContainer players={dummyPlayers} />
    );

    expect(getByText("test1")).toBeInTheDocument();
    expect(getByText("test2")).toBeInTheDocument();
  });

  it("showStats and includeNumbers correctly render", () => {
    const { getByText } = render(
      <LobbyPlayerContainer
        players={[dummyPlayers[0]]}
        includeNumbers={true}
        showStats={true}
      />
    );

    expect(getByText("1")).toBeInTheDocument();
    expect(getByText("CPM")).toBeInTheDocument();
    expect(getByText("ACU")).toBeInTheDocument();
    expect(getByText("ERR")).toBeInTheDocument();
  });
});
