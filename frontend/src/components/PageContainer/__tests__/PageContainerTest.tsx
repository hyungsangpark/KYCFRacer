import { ThemeProvider } from "@mui/material";
import { render } from "@testing-library/react";
import theme from "../../../utils/Theme";
import PageContainer from "../PageContainer";

describe("PageContainer", () => {
  it("should render", () => {
    const { baseElement } = render(<PageContainer />);
    const pageContainer = baseElement.children[0].children[0];

    expect(pageContainer).toBeInTheDocument();
  });

  it("should render children", () => {
    const { baseElement } = render(
      <PageContainer>
        <div>Hello</div>
      </PageContainer>
    );

    expect(baseElement).toHaveTextContent("Hello");
  });

  it("should render with PageContainer styles", () => {
    const { baseElement } = render(
      <ThemeProvider theme={theme}>
        <PageContainer />
      </ThemeProvider>
    );

    const pageContainer = baseElement.children[0].children[0];

    expect(pageContainer).toBeInTheDocument();
    expect(pageContainer).toHaveStyle("display: flex");
    expect(pageContainer).toHaveStyle("flex-direction: column");
    expect(pageContainer).toHaveStyle("align-items: center");
    expect(pageContainer).toHaveStyle("justify-content: flex-start");
    expect(pageContainer).toHaveStyle("margin-top: 10vh");
    expect(pageContainer).toHaveStyle("width: 100%");
  });
});
