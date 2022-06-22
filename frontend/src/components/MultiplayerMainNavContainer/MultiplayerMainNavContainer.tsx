import React from "react";
import classes from "./MultiplayerMainNavContainer.module.css";
import { Alert, Typography } from "@mui/material";
import CustomButton from "../Buttons";
import { styled } from "@mui/material/styles";
import CustomInput from "../CustomInput";
import MainContentsContainer from "../MainContentsContainer";

const SubheaderTypography = styled(Typography)({
  fontWeight: "400",
  fontSize: 21,
  marginRight: 15,
});

interface Props {
  onCreateClick: () => void;
  onJoinClick: () => void;
  onBackClick: () => void;
  setUsername: (userName: string) => void;
  showAlert: boolean;
}

/**
 * This component is used as the first screen of joining multiplayer lobby page.
 * Here they see a username input and buttons to create or join a lobby and a back to home screen button.
 * SetUsername function sets the username state in the parent but before this it is meant to be checked
 * and if it is not a certain format determined by the parent then showAlert is set to true
 * and an alert is shown with the error message.
 * @param onCreateClick - function to be called when create button is clicked
 * @param onJoinClick - function to be called when join button is clicked
 * @param onBackClick - function to be called when back button is clicked
 * @param setUsername - function to be called when username input is changed
 * @param showAlert - boolean to determine if alert should be shown
 * @constructor
 */
function MultiplayerMainNavContainer({
  onCreateClick,
  onJoinClick,
  onBackClick,
  setUsername,
  showAlert,
}: Props) {
  return (
    <>
      <MainContentsContainer>
        <Typography variant="h2">Play Multiplayer</Typography>
        {showAlert && (
          <Alert severity="error" sx={{ marginBottom: 3 }}>
            Username must be between 4 to 10 characters
          </Alert>
        )}
        <div className={classes.UsernameInputContainer}>
          <SubheaderTypography>Username:</SubheaderTypography>
          <CustomInput
            placeholder={localStorage.getItem("lastUserName")}
            onChange={(text) => {
              setUsername(text);
              localStorage.setItem("lastUserName", text);
            }}
          />
        </div>
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onCreateClick}>Create Lobby</CustomButton>
        <CustomButton onClick={onJoinClick}>Join Lobby</CustomButton>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
      </div>
    </>
  );
}

export default MultiplayerMainNavContainer;
