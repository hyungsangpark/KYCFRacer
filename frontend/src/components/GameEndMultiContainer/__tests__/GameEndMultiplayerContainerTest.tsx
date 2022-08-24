import { render } from "@testing-library/react";
import GameEndMultiplayerContainer from "../GameEndMultiplayerContainer";
import { CodeBlock } from "../../../utils/Types/ApiTypes";
import { Player } from "../../../utils/Types/SocketTypes";

describe("GameEndMultiplayerContainer", () => {
  const codeBlock: CodeBlock = {
    _id: "123",
    language: "python",
    time: "30",
    code: "test code",
  };

  const dummyPlayers: Player[] = [
    {
      playerName: "player1",
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
      playerName: "player2",
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
  it("should render the container for the end screen results", () => {
    const { baseElement } = render(
      <GameEndMultiplayerContainer
        players={[]}
        isViewCode={true}
        codeBlock={codeBlock}
      />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("should correctly render code block", () => {
    const { getByText } = render(
      <GameEndMultiplayerContainer
        players={[]}
        isViewCode={true}
        codeBlock={codeBlock}
      />
    );

    expect(getByText("test code")).toBeInTheDocument();
  });

  it("should correctly render the players in the end game screen", () => {
    const { getByText } = render(
      <GameEndMultiplayerContainer
        players={dummyPlayers}
        isViewCode={false}
        codeBlock={codeBlock}
      />
    );

    expect(getByText("player1")).toBeInTheDocument();
    expect(getByText("player2")).toBeInTheDocument();
  });
});
