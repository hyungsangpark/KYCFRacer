import {render} from "@testing-library/react";
import WelcomeCode from "../WelcomeCode";

describe("WelcomeCode", () => {
    it("should render", () => {
        const {baseElement} = render(
            <WelcomeCode code={"Test"} language={"python"} />
        )

        expect(baseElement).toBeDefined();
    });

    it("should correctly render the code", () => {
        const {getByText} = render(
            <WelcomeCode code={"Test"} language={"python"} />
        )

        expect(getByText("Test")).toBeInTheDocument();
    })
});
