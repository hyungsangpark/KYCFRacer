import { ThemeProvider } from "@mui/material";
import { getByRole, render } from "@testing-library/react";
import theme from "../../../utils/Theme";
import PlayerCard from "../PlayerCard";

describe("PlayerCard", () => {
  it("should render with a name", () => {
    const { getByText } = render(
      <PlayerCard playerName="name" playerAvatar="test" />
    );

    const playerCard = getByText("name");
    expect(playerCard).toBeInTheDocument();
  });

  it("should render with a player avatar image", () => {
    const imageUrl = "https://www.mock.com/image1.png";

    const { getByText, getByRole } = render(
      <PlayerCard playerName="test" playerAvatar={imageUrl} />
    );

    const playerCard = getByText("test");
    expect(playerCard).toBeInTheDocument();

    const playerAvatar = getByRole("img") as HTMLImageElement;
    expect(playerAvatar.src).toBe(imageUrl);
  });

  it("should render with a right child", () => {
    const rightChild = "<div>test</div>";

    const { getByRole } = render(
      <PlayerCard
        playerName="test"
        playerAvatar="test"
        rightChild={<div>test</div>}
      />
    );

    const playerCardBaseButton = getByRole("button");
    expect(playerCardBaseButton).toBeInTheDocument();
    expect(playerCardBaseButton).toContainHTML(rightChild);
  });

  it("should allow itself to be clickable as a button", () => {
    const onClick = jest.fn();
    const { getByRole } = render(
      <PlayerCard playerName="test" playerAvatar="test" onClick={onClick} />
    );

    const playerCardBaseButton = getByRole("button");
    expect(playerCardBaseButton).toBeInTheDocument();
    expect(onClick).not.toHaveBeenCalled();

    playerCardBaseButton.click();
    expect(onClick).toHaveBeenCalled();
  });

  it("should display a person icon if isMe is true", () => {
    const { getByTestId } = render(
      <PlayerCard playerName="test" playerAvatar="test" isMe />
    );

    const personIcon = getByTestId("PersonOutlineIcon");
    expect(personIcon).toBeInTheDocument();
  });

  it("should not display a person icon if isMe is false", () => {
    const { queryByTestId } = render(
      <PlayerCard playerName="test" playerAvatar="test" />
    );

    const personIcon = queryByTestId("PersonOutlineIcon");
    expect(personIcon).not.toBeInTheDocument();
  });

  it("should display a selected background if selected is true", () => {
    const selectedBackground = theme.palette.primary.main;

    const { getByRole } = render(
      <PlayerCard playerName="test" playerAvatar="test" selected />
    );

    const playerCardBasePaper = getByRole("button").children[0];
    expect(playerCardBasePaper).toHaveStyle(
      "background-color: " + selectedBackground
    );
  });
});
