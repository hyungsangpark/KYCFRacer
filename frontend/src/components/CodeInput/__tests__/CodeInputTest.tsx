import {fireEvent, render} from "@testing-library/react";
import CodeInput from "../CodeInput";

describe("CodeInput", () => {

  it("should render", () => {
    const {baseElement} = render(<CodeInput started={true} checkKeyPressed={jest.fn} code="test code" onGameOver={jest.fn} setProgress={jest.fn} language="javascript"/>);

    expect(baseElement).toBeInTheDocument();
  });

  it("should render the correct code", () => {
    const codeText = "test code";

    const {container} = render(<CodeInput started={true} checkKeyPressed={jest.fn} code={codeText} onGameOver={jest.fn} setProgress={jest.fn} language="javascript"/>);

    const letters = container.getElementsByTagName("letter");

    expect(letters.length).toBe(codeText.length);

    for (let i = 0; i < letters.length; i++) {
      expect(letters[i].textContent).toBe(codeText[i]);
      expect(letters[i].parentElement!.tagName).not.toBeNull();
      expect(letters[i].parentElement!.tagName).toBe("SPAN");
    }
  });

  it("checkKeyPressed correctlyReturns true", () => {
    const codeText = "test code";
    const correctResult = true;

    const checkKeyPressedMock = jest.fn();
    const checkKeyPressed = (actualResult: boolean) => {
      checkKeyPressedMock();
      expect(actualResult).toBe(correctResult);
    };

    const {container} = render(<CodeInput started={true} checkKeyPressed={checkKeyPressed} code={codeText} onGameOver={jest.fn} setProgress={jest.fn} language="javascript"/>);

    const div = container.getElementsByTagName("div")[0];

    fireEvent.keyDown(div, {key: "t"});
    expect(checkKeyPressedMock).toHaveBeenCalledTimes(1);
  });

  it("checkKeyPressed correctlyReturns false", () => {
    const codeText = "test code";
    const correctResult = false;

    const checkKeyPressedMock = jest.fn();
    const checkKeyPressed = (actualResult: boolean) => {
      checkKeyPressedMock();
      expect(actualResult).toBe(correctResult);
    };

    const {container} = render(<CodeInput started={true} checkKeyPressed={checkKeyPressed} code={codeText} onGameOver={jest.fn} setProgress={jest.fn} language="javascript"/>);

    const div = container.getElementsByTagName("div")[0];

    fireEvent.keyDown(div, {key: "x"});
    expect(checkKeyPressedMock).toHaveBeenCalledTimes(1);
  });

  it("once keydown event is fired setProgress is called", () => {
    const codeText = "test code";

    const setProgressMock = jest.fn();
    const setProgress = (progress: number) => {
      setProgressMock();
      expect(progress).toBeCloseTo(1/codeText.length * 100);
    };

    const {container} = render(<CodeInput started={true} checkKeyPressed={jest.fn} code={codeText} onGameOver={jest.fn} setProgress={setProgress} language="javascript"/>);

    const div = container.getElementsByTagName("div")[0];

    fireEvent.keyDown(div, {key: "t"});
    expect(setProgressMock).toHaveBeenCalledTimes(1);
  });

  it("once all of code text is pressed then onGameOver is called", () => {
    const codeText = "test code";

    const onGameOver = jest.fn();

    const {container} = render(<CodeInput started={true} checkKeyPressed={jest.fn} code={codeText} onGameOver={onGameOver} setProgress={jest.fn} language="javascript"/>);

    const div = container.getElementsByTagName("div")[0];

    for (let i = 0; i < codeText.length; i++) {
      fireEvent.keyDown(div, {key: codeText[i]});
    }

    expect(onGameOver).toHaveBeenCalled();
  });
});