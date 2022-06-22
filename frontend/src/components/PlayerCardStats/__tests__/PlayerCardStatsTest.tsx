import {render} from "@testing-library/react";
import PlayerCardStats from "../PlayerCardStats";

describe("PlayerCardStats", () => {
    it("should render", () => {
        const {baseElement} = render(
            <PlayerCardStats CPM={1} Accuracy={1} Errors={1}/>
        )

        expect(baseElement).toBeDefined();
    });

    it("should correctly render texts and numbers", () => {
        const {getByText} = render(
            <PlayerCardStats CPM={1} Accuracy={2} Errors={3}/>
        )

        expect(getByText("1")).toBeInTheDocument();
        expect(getByText("CPM")).toBeInTheDocument();
        expect(getByText("2")).toBeInTheDocument();
        expect(getByText("ACU")).toBeInTheDocument();
        expect(getByText("3")).toBeInTheDocument();
        expect(getByText("ERR")).toBeInTheDocument();
    })
});
