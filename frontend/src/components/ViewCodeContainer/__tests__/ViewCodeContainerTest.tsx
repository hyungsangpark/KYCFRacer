import { render } from "@testing-library/react";
import ViewCodeContainer from "../ViewCodeContainer";
import { CodeBlock } from "../../../utils/Types/ApiTypes";

describe("ViewCodeContainer", () => {
  const code = "test code";
  const language = "python";

  it("should render the container for viewing the code block post-game", () => {
    const { baseElement } = render(
      <ViewCodeContainer code={code} language={language} />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("should correctly render code block", () => {
    const { getByText } = render(
      <ViewCodeContainer code={code} language={language} />
    );

    expect(getByText("test code")).toBeInTheDocument();
  });
});
