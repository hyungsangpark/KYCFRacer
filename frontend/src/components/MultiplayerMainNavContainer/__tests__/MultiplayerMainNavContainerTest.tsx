import { fireEvent, render } from "@testing-library/react";
import MultiplayerMainNavContainer from "../MultiplayerMainNavContainer";

describe("MultiplayerMainNavContainer", () => {
  it("should render", () => {
    const { baseElement } = render(
      <MultiplayerMainNavContainer
        onCreateClick={jest.fn}
        onJoinClick={jest.fn}
        onBackClick={jest.fn}
        setUsername={jest.fn}
        showAlert={false}
      />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("if showAlert is true then it should display an alert", () => {
    const { getByText } = render(
      <MultiplayerMainNavContainer
        onCreateClick={jest.fn}
        onJoinClick={jest.fn}
        onBackClick={jest.fn}
        setUsername={jest.fn}
        showAlert={true}
      />
    );

    expect(
      getByText("Username must be between 4 to 10 characters")
    ).toBeInTheDocument();
  });

  it("if showAlert is false then it will not be displayed", () => {
    const { queryByText } = render(
      <MultiplayerMainNavContainer
        onCreateClick={jest.fn}
        onJoinClick={jest.fn}
        onBackClick={jest.fn}
        setUsername={jest.fn}
        showAlert={false}
      />
    );

    expect(
      queryByText("Username must be between 4 to 10 characters")
    ).toBeNull();
  });

  it("if localstorage contains lastUserName then it is used as placeholder text for input", () => {
    localStorage.setItem("lastUserName", "test");

    const { getByPlaceholderText } = render(
      <MultiplayerMainNavContainer
        onCreateClick={jest.fn}
        onJoinClick={jest.fn}
        onBackClick={jest.fn}
        setUsername={jest.fn}
        showAlert={false}
      />
    );

    expect(getByPlaceholderText("test")).toBeInTheDocument();
  });

  it("create, join and back buttons are rendered", () => {
    const { getByText } = render(
      <MultiplayerMainNavContainer
        onCreateClick={jest.fn}
        onJoinClick={jest.fn}
        onBackClick={jest.fn}
        setUsername={jest.fn}
        showAlert={false}
      />
    );

    expect(getByText("Create Lobby")).toBeInTheDocument();
    expect(getByText("Join Lobby")).toBeInTheDocument();
    expect(getByText("Back")).toBeInTheDocument();
  });

  it("Create, join and back button onClicks are correctly called", () => {
    const onCreateClick = jest.fn();
    const onJoinClick = jest.fn();
    const onBackClick = jest.fn();

    const { getByText } = render(
      <MultiplayerMainNavContainer
        onCreateClick={onCreateClick}
        onJoinClick={onJoinClick}
        onBackClick={onBackClick}
        setUsername={jest.fn}
        showAlert={false}
      />
    );
    getByText("Create Lobby").click();
    expect(onCreateClick).toHaveBeenCalledTimes(1);

    getByText("Join Lobby").click();
    expect(onJoinClick).toHaveBeenCalledTimes(1);

    getByText("Back").click();
    expect(onBackClick).toHaveBeenCalledTimes(1);
  });

  it("typing into input correctly calls setUserName function", () => {
    const setUserName = jest.fn();
    const { baseElement } = render(
      <MultiplayerMainNavContainer
        onCreateClick={jest.fn}
        onJoinClick={jest.fn}
        onBackClick={jest.fn}
        setUsername={setUserName}
        showAlert={false}
      />
    );

    const input = baseElement.querySelector("input");

    expect(input).not.toBeNull();
    fireEvent.change(input!, { target: { value: "test" } });

    expect(setUserName).toHaveBeenCalledTimes(1);
  });
});
