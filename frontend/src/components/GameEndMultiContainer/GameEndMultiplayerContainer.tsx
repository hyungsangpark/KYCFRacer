import classes from "./GameEndMultiplayerContainer.module.css";
import LobbyPlayerContainer from "../LobbyPlayerContainer";
import { Player } from "../../utils/Types/SocketTypes";
import { CodeBlock } from "../../utils/Types/ApiTypes";
import ViewCodeContainer from "../ViewCodeContainer/ViewCodeContainer";

interface Props {
  players: Player[];
  isViewCode: boolean;
  codeBlock: CodeBlock;
}

/**
 * This component is to display the end game statistics and results for the multiplayer game mode. 
 * It includes the players and their game statistics, such as the CPM, Errors and Accuracy. 
 * It also includes the isViewCode and codeBlock props in order to render an alternate container 
 * called the ViewCodeContainer. 
 */
function GameEndMultiplayerContainer({
  players,
  isViewCode,
  codeBlock,
}: Props) {
  console.log(codeBlock.code);

  return (
    <div className={classes.MainContainer}>
      <LobbyPlayerContainer players={players} includeNumbers showStats />
      {isViewCode && (
        <ViewCodeContainer
          code={codeBlock?.code}
          language={codeBlock.language}
        />
      )}
    </div>
  );
}

export default GameEndMultiplayerContainer;
