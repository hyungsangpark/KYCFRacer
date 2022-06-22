import { styled } from "@mui/material";
import React from "react";
import { Player } from "../../utils/Types/GameTypes";
import Profile from "../Profile";
import ProfileMatchHistory from "../ProfileMatchHistory";
import ProfileStats from "../ProfileStats";
import styles from "./ProfileContainer.module.css";
import { Avatar, UserProfile } from "../../utils/Types/ApiTypes";
import MainContentsContainer from "../MainContentsContainer";

const Spacer = styled("div")({
  height: 60,
});

interface Props {
  profile: UserProfile;
  imagesArray: Avatar[];
  setProfileImage: (id: string) => void;
}

/**
 * This component is used to display the profile screen. It wraps MainContentContainer.
 *
 * @param profile - UserProfile object to store data of a profile
 * @param imagesArray - an array to hold all the images
 * @param setProfileImage - function that is called when setting profile image
 * @constructor
 */
function ProfileContainer({ profile, imagesArray, setProfileImage }: Props) {
  return (
    <MainContentsContainer style={{ flexDirection: "row", alignItems: "flex-start", justifyContent: "center" }}>
      <div className={styles.LeftContainer}>
        <Profile
          setProfileImage={setProfileImage}
          imagesArray={imagesArray}
          profile={profile}
        />
      </div>
      <div className={styles.RightContainer}>
        <ProfileStats
          averageCPM={Math.floor(profile.avgStats.avgCPM)}
          averageAccuracy={Math.floor(profile.avgStats.avgAccuracy)}
          averageErrors={Math.floor(profile.avgStats.avgErrors)}
          victories={profile.avgStats.victories}
        />
        <Spacer />
        <ProfileMatchHistory matches={profile.matchHistory} />
      </div>
    </MainContentsContainer>
  );
}

export default ProfileContainer;
