import React from "react";
import {
  Avatar as AvatarMUI,
  Button,
  IconButton,
  ImageList,
  ImageListItem,
  Popover,
  styled,
  Typography,
} from "@mui/material";
import CreateOutlinedIcon from "@mui/icons-material/CreateOutlined";
import AccountBoxIcon from "@mui/icons-material/AccountBox";
import styles from "./Profile.module.css";
import { Avatar } from "../../utils/Types/ApiTypes";

const Name = styled(Typography)({
  fontWeight: 700,
  fontSize: "32px",
  textAlign: "left",
  marginRight: "10px",
});

const ProfileImage = styled(AvatarMUI)({
  width: "18vw",
  height: "18vw",
  margin: "0 20px",
  marginBottom: 20,
});

const VerticalImageList = styled(ImageList)({
  width: "500px",
  margin: "5px 0px",
  gridAutoFlow: "column",
  gridTemplateColumns: "repeat(auto-fit, 1fr) !important",
  gridAutoColumns: "1fr",
});

const ChangeProfileImageButton = styled(IconButton)({
  position: "absolute",
  bottom: "10%",
  right: "10%",
  color: "white",
  backgroundColor: "#1f1f1f",
  "&:hover": {
    backgroundColor: "#1f1f1fdd",
  },
});

type Props = {
  profile: {
    username: string;
    profilePicture: string;
  };
  imagesArray: Avatar[];
  setProfileImage: (id: string) => void;
};

/**
 * This component is used in the profile screen to show profile information.
 *
 * @param profile - UserProfile object to store data of a profile
 * @param imagesArray - an array to hold all the images
 * @param setProfileImage - function that is called when setting profile image
 * @constructor
 */
function Profile({ profile, imagesArray, setProfileImage }: Props) {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  return (
    <div className={styles.MainContainer}>
      <div className={styles.ProfileImageContainer}>
        <ProfileImage
          alt={`Profile image of ${profile.username}`}
          src={profile.profilePicture}
        />
        <ChangeProfileImageButton onClick={handleClick}>
          <AccountBoxIcon fontSize="large" />
        </ChangeProfileImageButton>
        <Popover
          id={id}
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <div className={styles.PopoverContainer}>
            <Typography
              variant="h6"
              sx={{ marginLeft: "10px", fontWeight: 400 }}
            >
              Please select your new profile image.
            </Typography>
            <VerticalImageList>
              {imagesArray.map(({ _id, url }, index) => (
                <ImageListItem key={url}>
                  <Button
                    onClick={() => {
                      _id && setProfileImage(_id);
                      handleClose();
                    }}
                  >
                    <img
                      key={`profileImage${index}`}
                      alt={`Profile image ${index}`}
                      src={url}
                      height="80"
                      style={{ borderRadius: 4 }}
                      loading="lazy"
                    />
                  </Button>
                </ImageListItem>
              ))}
            </VerticalImageList>
          </div>
        </Popover>
      </div>
      <div className={styles.NameContainer}>
        <Name>{profile.username ?? "Unnamed Player"}</Name>
      </div>
    </div>
  );
}

export default Profile;
