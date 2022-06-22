import React from "react";
import { Typography } from "@mui/material";
import classes from "./HomePage.module.css";
import WelcomeCode from "../../components/WelcomeCode";
import CustomButton from "../../components/Buttons";
import { useNavigate } from "react-router-dom";
import PageContainer from "../../components/PageContainer";
import MainContentsContainer from "../../components/MainContentsContainer";

/**
 * Home page which is also the entry page of the application
 * @constructor
 */
function HomePage() {
  const navigate = useNavigate();

  const onPlaySoloClick = () => {
    navigate("/solo");
  };

  const onPlayMultiplayerClick = () => {
    navigate("/multiplayer");
  };

  const welcomeCodeText = `def codeRacerGreeting():
    print(“Hello, World!”)
    print(“CodeRacer welcomes you”)`;

  return (
    <PageContainer>
      <MainContentsContainer>
        <Typography variant="h4" textAlign="center">
          Learn Programming Through Competition
        </Typography>
        <div className={classes.WelcomeCodeContainer}>
          <WelcomeCode code={welcomeCodeText} language="python" />
        </div>
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onPlaySoloClick}>Play Solo</CustomButton>
        <CustomButton onClick={onPlayMultiplayerClick}>
          Play Multiplayer
        </CustomButton>
      </div>
    </PageContainer>
  );
}

export default HomePage;
