import React, { useState } from "react";
import classes from "./SoloGameSettings.module.css";
import { Typography } from "@mui/material";
import SettingSelector from "../SettingSelector";
import { Language, SoloSettings, Time } from "../../utils/Types/GameTypes";
import { styled } from "@mui/material/styles";
import CustomButton from "../Buttons";
import MainContentsContainer from "../MainContentsContainer";

const SettingKeyTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "normal",
  fontSize: "2.5rem",
  // marginBottom: "1rem",
  flex: 2,
}));

interface Props {
  onStartGame: (settings: SoloSettings) => void;
  onBackClick: () => void;
}

/**
 * This component is used to show the settings of the single player mode and also serves as a
 * 'lobby' screen in which the user is able to adjust the settings and then start immediately.
 * There is an onStartGame function that takes in the settings selection of the user and starts the
 * game when the onStartClick button is clicked.
 * The onBackClick button will navigate the user back to the home page.
 * @param onStartGame - function to be called when start button is clicked
 * @param onBackClick - function to be called when back button is clicked
 */
function SoloGameSettings({ onStartGame, onBackClick }: Props) {
  const TimeSettingOptions: Time[] = ["30", "60", "90", "120"];
  const LanguageSettingsOptions: Language[] = ["random", "bible", "kycf"];

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);

  const onStartClick = () => {
    let selectedLanguage = LanguageSettingsOptions[selectedLanguageIndex];

    if (selectedLanguageIndex === 0) {
      const randomLanguage =
        Math.floor(Math.random() * (LanguageSettingsOptions.length - 1)) + 1;
      selectedLanguage = LanguageSettingsOptions[randomLanguage];
    }

    const settings: SoloSettings = {
      time: TimeSettingOptions[selectedTimeIndex],
      language: selectedLanguage,
    };

    onStartGame(settings);
  };

  return (
    <>
      <MainContentsContainer>
        <Typography variant="h2">Start Single Player</Typography>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Time Limit (sec)</SettingKeyTypography>
          <SettingSelector
            style={{ flex: 1 }}
            options={TimeSettingOptions}
            selectedIndex={selectedTimeIndex}
            onSelect={(option) => setSelectedTimeIndex(option)}
          />
        </div>
        <div className={classes.SettingItem}>
          <SettingKeyTypography>Texts</SettingKeyTypography>
          <SettingSelector
            style={{ flex: 1 }}
            options={LanguageSettingsOptions}
            selectedIndex={selectedLanguageIndex}
            onSelect={(option) => setSelectedLanguageIndex(option)}
          />
        </div>
      </MainContentsContainer>
      <div className={classes.ButtonContainer}>
        <CustomButton onClick={onBackClick}>Back</CustomButton>
        <CustomButton onClick={onStartClick} selected>
          Start
        </CustomButton>
      </div>
    </>
  );
}

export default SoloGameSettings;
