import { render, screen } from "@testing-library/react";
import HomePage from "../HomePage";
import { BrowserRouter } from "react-router-dom";

describe("HomePage", () => {
  it("renders without crashing", () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );

    const linkElement = screen.getByText(
      /Learn Programming Through Competition/i
    );
    
    expect(linkElement).toBeInTheDocument();
  });
});
