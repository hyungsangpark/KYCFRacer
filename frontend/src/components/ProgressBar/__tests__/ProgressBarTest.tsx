import {render} from "@testing-library/react";
import ProgressBar from "../ProgressBar";

describe("ProgressBar", () => {
    it("should render", () => {
        const {baseElement} = render(
            <ProgressBar progress={50} />
        )

        expect(baseElement).toBeDefined();
    });

    it("should render the progress bat with the correct stats", () => {
        const { getAllByRole } = render(
            <ProgressBar progress={50} />
        );
        
        const progressBar = getAllByRole("progressbar")[0];
        expect(progressBar).toHaveAttribute("aria-valuenow", "50");
      });
});
