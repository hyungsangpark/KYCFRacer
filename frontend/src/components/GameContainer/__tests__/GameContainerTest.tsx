import { render } from "@testing-library/react";
import GameContainer from "../GameContainer";

/**
 * NOTE:
 * This component is a wrapper for CodeInput to provide some further functionality such as
 * displaying timer and stats while typing therefore more in depth tests are found in CodeInputTest.tsx
 */
describe("GameContainer", () => {
  it("should render", () => {
    const { baseElement } = render(
      <GameContainer
        started={true}
        onGameOver={jest.fn}
        totalGameTimeInSeconds={30}
        code="test code"
        updateStats={jest.fn}
        language={"javascript"}
      />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("if not started it should have a text of passed in timer", () => {
    const { getByText } = render(
      <GameContainer
        started={false}
        onGameOver={jest.fn}
        totalGameTimeInSeconds={30}
        code="test code"
        updateStats={jest.fn}
        language={"javascript"}
      />
    );

    expect(getByText("Time: 00:30")).toBeInTheDocument();
  });

  it("if started then it should have a 3 second timer", () => {
    const { getByText } = render(
      <GameContainer
        started={true}
        onGameOver={jest.fn}
        totalGameTimeInSeconds={30}
        code="test code"
        updateStats={jest.fn}
        language={"javascript"}
      />
    );

    expect(getByText("Time: 00:03")).toBeInTheDocument();
  });

  it("Should display CPM: 0, Accuracy: 0 and Errors: 0 at the start", () => {
    const { getByText } = render(
      <GameContainer
        started={false}
        onGameOver={jest.fn}
        totalGameTimeInSeconds={30}
        code="test code"
        updateStats={jest.fn}
        language={"javascript"}
      />
    );

    expect(getByText("CPM: 0")).toBeInTheDocument();
    expect(getByText("Accuracy: 0%")).toBeInTheDocument();
    expect(getByText("Errors: 0")).toBeInTheDocument();
  });
});
