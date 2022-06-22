import { ThemeProvider } from "@mui/material";
import { render, screen } from "@testing-library/react";
import theme from "../../../utils/Theme";
import CustomButton from "../CustomButton";

describe("CustomButton", () => {
  it("display a custom button", () => {
    render(<CustomButton onClick={() => {}}>Test</CustomButton>);

    const linkElement = screen.getByText("Test");

    expect(linkElement).toBeInTheDocument();
  });

  it("click a custom button to run onClick function.", () => {
    const onClick = jest.fn();

    render(<CustomButton onClick={onClick}>Test</CustomButton>);

    const linkElement = screen.getByText("Test");
    linkElement.click();

    expect(onClick).toHaveBeenCalled();
    expect(linkElement).toBeInTheDocument();
  });

  it("display a large custom button by default with a large button dimensions.", () => {
    const widthExpected = "256px";
    const heightExpected = "64px";
    const fontSizeExpected = "20px";

    render(<CustomButton onClick={() => {}}>Test</CustomButton>);

    const linkElement = screen.getByText("Test");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle(`width: ${widthExpected}`);
    expect(linkElement).toHaveStyle(`height: ${heightExpected}`);
    expect(linkElement).toHaveStyle(`font-size: ${fontSizeExpected}`);
  });

  it("display a small button with a small button dimensions.", () => {
    const widthExpected = "96px";
    const heightExpected = "32px";
    const fontSizeExpected = "12px";

    render(
      <CustomButton size="small" onClick={() => {}}>
        Test
      </CustomButton>
    );

    const linkElement = screen.getByText("Test");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle(`width: ${widthExpected}`);
    expect(linkElement).toHaveStyle(`height: ${heightExpected}`);
    expect(linkElement).toHaveStyle(`font-size: ${fontSizeExpected}`);
  });

  it("display a medium button with a medium button dimensions.", () => {
    const widthExpected = "128px";
    const heightExpected = "48px";
    const fontSizeExpected = "16px";

    render(
      <CustomButton size="medium" onClick={() => {}}>
        Test
      </CustomButton>
    );

    const linkElement = screen.getByText("Test");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle(`width: ${widthExpected}`);
    expect(linkElement).toHaveStyle(`height: ${heightExpected}`);
    expect(linkElement).toHaveStyle(`font-size: ${fontSizeExpected}`);
  });

  it("display a non-selected button with default color and background color", () => {
    const backgroundColorExpected = theme.palette.secondary.dark;
    const colorExpected = theme.palette.secondary.light;

    render(
      <ThemeProvider theme={theme}>
        <CustomButton onClick={() => {}}>Test</CustomButton>
      </ThemeProvider>
    );

    const linkElement = screen.getByText("Test");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle(
      `background-color: ${backgroundColorExpected}`
    );
    expect(linkElement).toHaveStyle(`color: ${colorExpected}`);
  });

  it("display a selected button with special color and background color", () => {
    const backgroundColorExpected = theme.palette.primary.main;
    const colorExpected = theme.palette.background.default;

    render(
      <ThemeProvider theme={theme}>
        <CustomButton selected onClick={() => {}}>
          Test
        </CustomButton>
      </ThemeProvider>
    );

    const linkElement = screen.getByText("Test");

    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveStyle(
      `background-color: ${backgroundColorExpected}`
    );
    expect(linkElement).toHaveStyle(`color: ${colorExpected}`);
  });
});
