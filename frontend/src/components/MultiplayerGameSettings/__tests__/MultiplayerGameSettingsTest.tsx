import { render } from "@testing-library/react";
import MultiplayerGameSettings from "../MultiplayerGameSettings";

describe("MultiplayerGameSettings", () => {
  const updateSettings = jest.fn();

  it("should render the multiplayer game settings", () => {
    const { baseElement } = render(
      <MultiplayerGameSettings updateSettings={updateSettings} />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("should correctly render settings components", () => {
    const { getByText } = render(
      <MultiplayerGameSettings updateSettings={updateSettings} />
    );

    expect(getByText("Time Limit")).toBeInTheDocument();
    expect(getByText("Language")).toBeInTheDocument();
  });

  it("should correctly update settings when user changes settings", () => {
    const { getByText } = render(
      <MultiplayerGameSettings updateSettings={updateSettings} />
    );
    expect(updateSettings).toHaveBeenCalledTimes(1);
  });
});
