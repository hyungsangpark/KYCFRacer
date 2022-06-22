import {getByPlaceholderText, render} from "@testing-library/react";
import JoinLobbyContainer from "../JoinLobbyContainer";

describe("JoinLobbyContainer", () => {
    it("should render", () => {
        const {baseElement} = render(
            <JoinLobbyContainer onBackClick={() => {}} onJoinClick={() => {}}/>
        );

        expect(baseElement).toBeInTheDocument();
    })

    it("should correctly render texts", () => {
        const {getByText} = render(
            <JoinLobbyContainer onBackClick={() => {}} onJoinClick={() => {}}/>
        );

        expect(getByText("Enter Lobby Code")).toBeInTheDocument();
        expect(getByText("Lobby Code")).toBeInTheDocument();
    })

    it("should correctly render CustomInput", () => {
        const {getByPlaceholderText} = render(
            <JoinLobbyContainer onBackClick={() => {}} onJoinClick={() => {}}/>
        );

        const inputElement = getByPlaceholderText("") as HTMLInputElement;

        expect(inputElement).toBeInTheDocument();
        expect(inputElement.placeholder).toEqual("");
        expect(inputElement.value).toEqual("");
    })

    it("should correctly render the buttons", () => {
        const {getByText} = render(
            <JoinLobbyContainer onBackClick={() => {}} onJoinClick={() => {}}/>
        );

        expect(getByText("Back")).toBeInTheDocument();
        expect(getByText("Join Lobby")).toBeInTheDocument();
    })

    it("Back and Join Lobby button onClicks are correctly called", () => {
        const onBackClick = jest.fn();
        const onJoinClick = jest.fn();

        const {getByText} = render(
            <JoinLobbyContainer onBackClick={onBackClick} onJoinClick={onJoinClick}/>
        );

        getByText("Back").click();
        expect(onBackClick).toHaveBeenCalledTimes(1);

        getByText("Join Lobby").click();
        expect(onJoinClick).toHaveBeenCalledTimes(1);
    })
})