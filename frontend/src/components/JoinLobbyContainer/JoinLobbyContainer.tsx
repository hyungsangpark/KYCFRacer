import React from "react";
import classes from "./JoinLobbyContainer.module.css";
import { styled } from "@mui/material/styles";
import { Alert, Typography } from "@mui/material";
import CustomInput from "../CustomInput";
import CustomButton from "../Buttons";
import MainContentsContainer from "../MainContentsContainer";

const SubHeaderTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  marginBottom: 2,
}));

interface Props {
  onBackClick: () => void;
  onJoinClick: (lobbyId: string) => void;
  error?: string;
}

/**
 * This component is used to display the screen that the user will see when trying to join a lobby using lobby code.
 *
 * @param onBackClick - function to be called when back button is clicked
 * @param onJoinClick - function to be called when join button is clicked
 * @param error - string of the error message
 * @constructor
 */
function JoinLobbyContainer({ onBackClick, onJoinClick, error }: Props) {
  const [lobbyInput, setLobbyInput] = React.useState("");

  return (
    <>
      <MainContentsContainer>
        <Typography variant="h2">Enter Lobby Code</Typography>
        <SubHeaderTypography>Lobby Code</SubHeaderTypography>
        <CustomInput onChange={(text) => setLobbyInput(text)} />
        {error !== undefined && error?.length > 0 && (
          <Alert sx={{ marginTop: 2 }} severity="error">
            {error}
          </Alert>
        )}
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
        <CustomButton onClick={() => onJoinClick(lobbyInput)}>
          Join Lobby
        </CustomButton>
      </div>
    </>
  );
}

export default JoinLobbyContainer;
