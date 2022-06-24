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
        <Typography variant="h1" textAlign="center">
          웰컴 투 KYCF Racer!
        </Typography>
        {/* <div className={classes.WelcomeCodeContainer}>
          <WelcomeCode code={welcomeCodeText} language="python" />
        </div> */}
        <div>
          <Typography variant="h2">
            KYCF Racer에 오신 여러분을 환영합니다!
          </Typography>
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
