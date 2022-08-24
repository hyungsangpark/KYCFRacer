import React, { useEffect } from "react";
import ProfileContainer from "../../components/ProfileContainer";
import { useAuth0 } from "@auth0/auth0-react";
import { getAllAvatars, getUser, setUserAvatar } from "../../api/Api";
import { Avatar, UserProfile } from "../../utils/Types/ApiTypes";
import { CircularProgress } from "@mui/material";
import PageContainer from "../../components/PageContainer";
import { useNavigate } from "react-router-dom";

/**
 * Profile page for the user. This page contains the user's profile information and allows them to change their avatar,
 * as well as view their match history.
 * @constructor
 */
function ProfilePage() {
  const { getAccessTokenSilently } = useAuth0();
  const { isLoading, isAuthenticated } = useAuth0();

  const [profile, setProfile] = React.useState<UserProfile | null>(null);
  const [avatars, setAvatars] = React.useState<Avatar[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getAccessTokenSilently().then((token) => {
      getUser(token).then((user) => {
        console.log(user.data);
        setProfile(user.data);
      });
    });
  }, [isAuthenticated]);

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/");
    }

    getAllAvatars().then((avatars) => {
      setAvatars(avatars.data.avatars);
    });
  }, []);

  const setProfileImage = (avatarId: string) => {
    getAccessTokenSilently().then((token) => {
      setUserAvatar(token, avatarId).then((res) => {
        if (profile === null) {
          return;
        }

        const newUserProfile: UserProfile = {
          ...profile,
          profilePicture: res.data,
        };

        setProfile(newUserProfile);
      });
    });
  };

  return (
    <PageContainer
      style={{ margin: "0 5%", width: "auto", marginBottom: "3%" }}
    >
      {isLoading || !profile ? (
        <PageContainer>
          <CircularProgress />
        </PageContainer>
      ) : (
        <ProfileContainer
          imagesArray={avatars}
          setProfileImage={setProfileImage}
          profile={profile}
        />
      )}
    </PageContainer>
  );
}

export default ProfilePage;
