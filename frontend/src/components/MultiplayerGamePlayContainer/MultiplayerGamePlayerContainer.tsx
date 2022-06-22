import React from 'react';
import classes from './MultiplayerGamePlayerContainer.module.css';
import GameContainer from "../GameContainer/GameContainer";
import {Language, MultiplayerSettings} from "../../utils/Types/GameTypes";
import OtherPlayersLiveRaceStatsContainer from "../OtherPlayersLiveRaceStatsContainer";
import {Player, PlayerStats} from "../../utils/Types/SocketTypes";

interface Props {
  started: boolean;
  onGameOver: () => void;
  gameSettings: MultiplayerSettings;
  code: string;
  language?: Language;
  otherPlayers: Player[];
  updateStats: (stats: PlayerStats) => void;
}

/**
 * This component is used to display the multiplayer game screen. It wraps list of the players and GameContainer.
 *
 * @param started - boolean if true lets the user type otherwise does not register their events
 * @param onGameOver - function that is called when all the text has been typed
 * @param gameSettings - component that holds language, time, and playerAmount
 * @param code - code that will be used for the game
 * @param otherPlayers - array that stores other players involved in the game
 * @param updateStats - function that updates the players stats based on their performance in the game
 * @param language - programming language of the code that will be used for the game
 */
function MultiplayerGamePlayerContainer({ started, onGameOver, gameSettings, code, otherPlayers, updateStats, language = "javascript" }: Props) {

  return (
    <div className={classes.MainContainer}>
      <OtherPlayersLiveRaceStatsContainer otherPlayers={otherPlayers}/>
      <GameContainer language={language} started={started} onGameOver={onGameOver} totalGameTimeInSeconds={parseInt(gameSettings.time)} code={code} updateStats={updateStats}/>
    </div>
  );
}

export default MultiplayerGamePlayerContainer;