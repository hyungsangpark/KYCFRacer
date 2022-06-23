import React from "react";
import classes from "./ViewCodeContainer.module.css";
import SyntaxHighlighter from "react-syntax-highlighter";
import {anOldHope} from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface Props {
  code: string;
  language: string;
}

/**
 * This component is used to display the code block that is shown to the user in after
 * the end of a game.
 *
 * @param code - code block string
 * @param language - language of the code block
 */
function ViewCodeContainer({ code, language }: Props) {
  console.log(code);

  return (
    <div className={classes.MainContainer}>
      <SyntaxHighlighter
        language={"text"}
        style={anOldHope}
        customStyle={{
          fontSize: "30px",
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default ViewCodeContainer;