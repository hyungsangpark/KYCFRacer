import { render } from "@testing-library/react";
import ProfileStats from "../ProfileStats";

describe("ProfileStats", () => {
  it("display a profile stats", () => {
    const { baseElement, getByText, getAllByText } = render(
      <ProfileStats
        averageCPM={0}
        averageAccuracy={1}
        averageErrors={2}
        victories={3}
      />
    );

    const mainContainer = baseElement.children[0].children[0];

    expect(mainContainer).toBeInTheDocument();
    expect(mainContainer.className).toContain("MainContainer");

    const average = getAllByText("Average");
    const averageCPM = getByText("CPM");
    const averageAccuracy = getByText("Accuracy");
    const averageErrors = getByText("Errors");
    const victories = getByText("Victories");

    // Three labels that says "Average"
    expect(average.length).toEqual(3);
    expect(averageCPM).toBeInTheDocument();
    expect(averageAccuracy).toBeInTheDocument();
    expect(averageErrors).toBeInTheDocument();
    expect(victories).toBeInTheDocument();

    const averageCPMValue = getByText("0");
    const averageAccuracyValue = getByText("1");
    const averageErrorsValue = getByText("2");
    const victoriesValue = getByText("3");

    expect(averageCPMValue).toBeInTheDocument();
    expect(averageAccuracyValue).toBeInTheDocument();
    expect(averageErrorsValue).toBeInTheDocument();
    expect(victoriesValue).toBeInTheDocument();
  });
});
