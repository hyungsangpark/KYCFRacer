import {fireEvent, render} from "@testing-library/react";
import Profile from "../Profile";
import { Avatar, UserProfile } from "../../../utils/Types/ApiTypes";

describe("Profile", () => {

    const dummyAvatars: Avatar[] = [
        {
            url: "test1",
        },
        {
            url: "test2",
        }
    ]

    const dummyProfile: UserProfile={
        username: "username",
        profilePicture: "https://test.com/image1.png",
        avgStats: {
            avgCPM: 0,
            avgAccuracy: 1,
            avgErrors: 2,
            victories: 3
        },
        matchHistory: []
    }

    it("should render", () => {
        const { baseElement } = render(
          <Profile profile={dummyProfile} imagesArray={dummyAvatars} setProfileImage={jest.fn()} />);

        expect(baseElement).toBeDefined();
    })
    
    it("should render with user profile", () => {
        const { getByText, getByRole } = render(
        <Profile profile={dummyProfile} imagesArray={dummyAvatars} setProfileImage={jest.fn()} />);

        const username = getByText("username");
        const profilePicture = getByRole("img") as HTMLImageElement;

        expect(username).toBeInTheDocument();
        expect(profilePicture).toBeInTheDocument();
        expect(profilePicture.src).toEqual("https://test.com/image1.png");
    });

    it("should render container when button being clicked", () => { 
        const { getByText, getByRole } = render(
            <Profile profile={dummyProfile} imagesArray={dummyAvatars} setProfileImage={jest.fn()} />);
        
        const button = getByRole("button");
        fireEvent.click(button);
        expect(button).toBeInTheDocument();

        const changeProfileText = getByText("Please select your new profile image.");
        expect(changeProfileText).toBeInTheDocument();
    });
})