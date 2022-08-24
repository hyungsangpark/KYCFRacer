import { render } from "@testing-library/react";
import MultiplayerGamePlayerContainer from "../MultiplayerGamePlayerContainer";
import { Player } from "../../../utils/Types/SocketTypes";
import React from "react";
import { MultiplayerSettings } from "../../../utils/Types/GameTypes";

describe("MultiplayerGamePlayerContainer", () => {
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
  ];

  const dummyMultiplayerSettings: MultiplayerSettings = {
    language: "javascript",
    time: "30",
    playerAmount: "2",
  };

  it("should render", () => {
    const { baseElement } = render(
      <MultiplayerGamePlayerContainer
        started
        onGameOver={jest.fn}
        gameSettings={dummyMultiplayerSettings}
        code={"Test"}
        otherPlayers={[dummyPlayers[0]]}
        updateStats={jest.fn}
      />
    );

    expect(baseElement).toBeDefined();
  });
});
