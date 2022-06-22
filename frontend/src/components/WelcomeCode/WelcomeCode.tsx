import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { anOldHope } from "react-syntax-highlighter/dist/cjs/styles/hljs";

interface WelcomeCodeProps {
  code: string;
  language: string;
}

/**
 * This component is used to display welcome code that is shown to the user in HomePage.
 *
 * @param code - WelcomeCode string
 * @param language - language of the WelcomeCode
 * @constructor
 */
function WelcomeCode({ code, language }: WelcomeCodeProps) {
  return (
    <SyntaxHighlighter
      language={language}
      style={anOldHope}
      customStyle={{
        // Just edit these styles for when making the home page
        fontSize: "30px",
      }}
    >
      {code}
    </SyntaxHighlighter>
  );
}

export default WelcomeCode;
