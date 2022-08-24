import { render } from "@testing-library/react";
import ProfileContainer from "../ProfileContainer";
import { Avatar, UserProfile } from "../../../utils/Types/ApiTypes";
import { MemoryRouter } from "react-router-dom";

describe("ProfileContainer", () => {
  const dummyAvatars: Avatar[] = [
    {
      url: "test1",
    },
    {
      url: "test2",
    },
  ];

  const dummyProfile: UserProfile = {
    username: "username",
    profilePicture: "test1",
    avgStats: {
      avgCPM: 0,
      avgAccuracy: 0,
      avgErrors: 0,
      victories: 0,
    },
    matchHistory: [],
  };

  it("should render", () => {
    const { baseElement } = render(
      <MemoryRouter>
        <ProfileContainer
          profile={dummyProfile}
          imagesArray={dummyAvatars}
          setProfileImage={jest.fn()}
        />
      </MemoryRouter>
    );

    expect(baseElement).toBeDefined();
  });
});
