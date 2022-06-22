import { render } from "@testing-library/react";
import MainContentsContainer from "../MainContentsContainer";

describe("MainContentsContainer", () => {
  it("should render", () => {
    const { baseElement } = render(<MainContentsContainer />);
    const mainContentsContainer = baseElement.children[0].children[0];

    expect(mainContentsContainer).toBeInTheDocument();
  });

  it("should renders with children", () => {
    const { getByText } = render(
      <MainContentsContainer>test</MainContentsContainer>
    );

    const mainContentsContainerRetrievedByText = getByText("test");
    expect(mainContentsContainerRetrievedByText).toBeInTheDocument();
  });

  it("renders with correct style", () => {
    const { baseElement } = render(<MainContentsContainer />);
    const mainContentsContainer = baseElement.children[0].children[0];

    expect(mainContentsContainer).toHaveStyle("display: flex");
    expect(mainContentsContainer).toHaveStyle("flex-direction: column");
    expect(mainContentsContainer).toHaveStyle("align-items: center");
    expect(mainContentsContainer).toHaveStyle("justify-content: flex-start");
    expect(mainContentsContainer).toHaveStyle("min-height: 60vh");
    expect(mainContentsContainer).toHaveStyle("width: 100%");
  });
});
