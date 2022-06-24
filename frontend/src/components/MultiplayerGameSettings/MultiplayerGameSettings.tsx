import React, { useEffect, useState } from "react";
import classes from "./MultiplayerGameSettings.module.css";
import { Typography } from "@mui/material";
import SettingSelector from "../SettingSelector";
import {
  Language,
  MultiplayerSettings,
  Time,
  PlayerAmount,
} from "../../utils/Types/GameTypes";
import { styled } from "@mui/material/styles";
import CustomButton from "../Buttons";

const SettingKeyTypography = styled(Typography)(({ theme }) => ({
  fontWeight: "bold",
  fontSize: "2.5rem",
  flex: 2,
}));

interface Props {
  updateSettings: (settings: MultiplayerSettings) => void;
}

/**
 * This component is used to show the settings of the multiplayer game mode where the user can change
 * the time limit or the language of the code block they would have to type.
 * There is an updateSettings function that takes in the settings selection of the user and updates it
 * so that it is applied to the game.
 * @param updateSettings - function to be called when the settings of the game is changed/selected.
 */
function MultiplayerGameSettings({ updateSettings }: Props) {
  const TimeSettingOptions: Time[] = ["30", "60", "90", "120"];
  const LanguageSettingsOptions: Language[] = ["random", "bible", "kycf"];
  const PlayerAmountOptions: PlayerAmount[] = ["2", "3", "4", "5"];

  const [selectedTimeIndex, setSelectedTimeIndex] = useState(0);
  const [selectedLanguageIndex, setSelectedLanguageIndex] = useState(0);
  const [selectedPlayerAmountIndex, setSelectedPlayerAmountIndex] = useState(0);

  useEffect(() => {
    let selectedLanguage = LanguageSettingsOptions[selectedLanguageIndex];

    if (selectedLanguageIndex === 0) {
      const randomLanguage =
        Math.floor(Math.random() * (LanguageSettingsOptions.length - 1)) + 1;
      selectedLanguage = LanguageSettingsOptions[randomLanguage];
    }

    updateSettings({
      time: TimeSettingOptions[selectedTimeIndex],
      language: selectedLanguage,
      playerAmount: PlayerAmountOptions[selectedPlayerAmountIndex],
    });
  }, [selectedTimeIndex, selectedLanguageIndex, selectedPlayerAmountIndex]);

  return (
    <div className={classes.MainContainer}>
      <div className={classes.SettingItem}>
        <SettingKeyTypography>Time Limit</SettingKeyTypography>
        <SettingSelector
          style={{ flex: 1 }}
          options={TimeSettingOptions}
          selectedIndex={selectedTimeIndex}
          onSelect={(option) => setSelectedTimeIndex(option)}
        />
      </div>
      <div className={classes.SettingItem}>
        <SettingKeyTypography>Language</SettingKeyTypography>
        <SettingSelector
          style={{ flex: 1 }}
          options={LanguageSettingsOptions}
          selectedIndex={selectedLanguageIndex}
          onSelect={(option) => setSelectedLanguageIndex(option)}
        />
      </div>
    </div>
  );
}

export default MultiplayerGameSettings;
