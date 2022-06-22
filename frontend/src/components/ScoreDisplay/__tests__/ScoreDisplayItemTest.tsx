import {render} from "@testing-library/react";
import ScoreDisplayItem from "../ScoreDisplayItem";

describe("ScoreDisplayItem", () => {
    it("should render", () => {
        const {baseElement} = render(
            <ScoreDisplayItem score={100} label={"Test"} />
        )

        expect(baseElement).toBeDefined();
    });

    it("should correctly render the code", () => {
        const {getByText} = render(
            <ScoreDisplayItem score={100} label={"Test"} />
        )

        expect(getByText("Test")).toBeInTheDocument();
    })
});
