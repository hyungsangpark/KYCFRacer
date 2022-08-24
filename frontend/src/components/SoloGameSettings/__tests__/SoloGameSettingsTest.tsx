import { render } from "@testing-library/react";
import { SoloSettings } from "../../../utils/Types/GameTypes";
import SoloGameSettings from "../SoloGameSettings";

describe("SoloGameSettings", () => {
  const onStartClick = jest.fn();
  const onBackClick = jest.fn();

  it("should render the solo game settings", () => {
    const { baseElement } = render(
      <SoloGameSettings onStartGame={onStartClick} onBackClick={onBackClick} />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("should correctly render settings components", () => {
    const { getByText } = render(
      <SoloGameSettings onStartGame={onStartClick} onBackClick={jest.fn} />
    );

    expect(getByText("Solo Game Settings")).toBeInTheDocument();
    expect(getByText("Time Limit")).toBeInTheDocument();
    expect(getByText("Language")).toBeInTheDocument();
  });

  it("should correctly render buttons", () => {
    const { getByText } = render(
      <SoloGameSettings onStartGame={onStartClick} onBackClick={onBackClick} />
    );
    getByText("Back").click();
    expect(onBackClick).toHaveBeenCalledTimes(1);

    getByText("Start").click();
    expect(onStartClick).toHaveBeenCalledTimes(1);
  });
});
