import { render } from "@testing-library/react";
import SettingSelector from "../SettingSelector";

describe("SoloGameSettings", () => {
  const onSelect = jest.fn();
  const options = ["option1", "option2", "option3"];

  it("should render", () => {
    const { baseElement } = render(
      <SettingSelector
        options={options}
        onSelect={onSelect}
        selectedIndex={0}
      />
    );

    expect(baseElement).toBeInTheDocument();
  });

  it("should render the option", () => {
    const { getByText } = render(
      <SettingSelector
        options={options}
        onSelect={onSelect}
        selectedIndex={0}
      />
    );

    expect(getByText("option1")).toBeInTheDocument();
  });
});
