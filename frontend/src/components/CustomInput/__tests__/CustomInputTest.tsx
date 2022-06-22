import { render, fireEvent } from "@testing-library/react";
import CustomInput from "../CustomInput";

describe("CustomInput", () => {
  it("should render a custom input with a placeholder text displayed by default", () => {
    const { getByPlaceholderText } = render(
      <CustomInput onChange={() => {}} placeholder="Test" />
    );

    const inputElement = getByPlaceholderText("Test") as HTMLInputElement;

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.placeholder).toEqual("Test");
    expect(inputElement.value).toEqual("");
  });

  it("should allows its input text to be changed.", () => {
    const { getByPlaceholderText } = render(
      <CustomInput onChange={() => {}} placeholder="Test" />
    );

    const inputElement = getByPlaceholderText("Test") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "Changed Text" } });

    expect(inputElement).toBeInTheDocument();
    expect(inputElement.value).toEqual("Changed Text");
  });

  it("should run onChange prop function when text is changed.", () => {
    const onChange = jest.fn();

    const { getByPlaceholderText } = render(
      <CustomInput onChange={onChange} placeholder="Test" />
    );

    const inputElement = getByPlaceholderText("Test") as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "Changed Text" } });

    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith("Changed Text");
  });
});
