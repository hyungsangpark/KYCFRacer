import React, { useEffect } from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { a11yLight } from "react-syntax-highlighter/dist/cjs/styles/hljs";
import { Typography } from "@mui/material";
import { Word } from "./Datastructures/Word";
import { Language } from "../../utils/Types/GameTypes";

interface Props {
  started: boolean;
  checkKeyPressed: (correct: boolean) => void;
  code: string;
  onGameOver: () => void;
  setProgress: (progress: number) => void;
  language?: Language;
}

/**
 * CodeInput is a component that allows the user to enter key events into the code input being rendered and
 * wrong and right inputs will be displayed differently on the screen. Different programming languages
 * are displayed in their own syntax highlighting. This component is the main driver
 *
 * @param started - boolean if true lets the user type otherwise does not register their events
 * @param checkKeyPressed - function that checks if the key pressed is correct or not
 * @param code - the code that is being displayed
 * @param onGameOver - function that is called when all the text has been typed
 * @param setProgress - function that updates the progress based on the user input
 * @param language - the programming language of the code
 * @constructor
 */
function CodeInput({
  started,
  checkKeyPressed,
  code,
  onGameOver,
  setProgress,
  language = "bible",
}: Props) {
  const codeRef = React.useRef<any>();

  const [words, setWords] = React.useState<Word[]>([]);
  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);

  const [showEnterMessage, setShowEnterMessage] = React.useState(false);

  const [inFocus, setInFocus] = React.useState(false);

  /**
   * This useEffect modifies the original html rendered by the SyntaxHighlighter component
   * to have a Span around every word (a word is defined as a string of characters separated by spaces)
   * and a <Letter> tag around every character.
   */
  useEffect(() => {
    const codeChildren = codeRef.current.childNodes;
    const codeTextNodes = Array.from(codeChildren).filter(
      (child: any) => child.nodeName !== "SPAN"
    );

    codeTextNodes.forEach((node: any) => {
      const span = document.createElement("span");
      span.textContent = node.textContent;
      // span.style.color = "#343434";
      node.parentNode.replaceChild(span, node);
    });

    const allSpans = Array.from(codeRef.current.childNodes);

    const newWords: Word[] = [];
    allSpans.forEach((span: any) => {
      newWords.push(new Word(span));
    });

    newWords[0].setCursor(0);

    setWords(newWords);
  }, [codeRef]);

  /**
   * Main logic for the key down event press with different functionality for backspace, enter, tab, shift and normal keys
   * Set progress is also called here to update the progress in the parent component.
   * @param keyValue
   */
  const onKeyDown = (keyValue: string) => {
    if (!started) {
      return;
    }

    setShowEnterMessage(false);

    // Whenever Backspace is called the previous character is removed from the word and the cursor is moved to the left,
    // if the cursor is at the beginning of the word then the previous word is removed and the cursor is moved to the left
    if (keyValue === "Backspace") {
      if (wordIndex <= 0 && charIndex <= 0) {
        return;
      }

      if (charIndex === 0) {
        const wordToRemoveFrom = words[wordIndex - 1];
        const prevWordLength = words[wordIndex - 1].getLength();

        words[wordIndex].remove(charIndex);
        wordToRemoveFrom.setCursor(prevWordLength - 1);

        setProgress(calculateProgress(wordIndex - 1, prevWordLength - 1));

        setWordIndex(wordIndex - 1);
        setCharIndex(prevWordLength - 1);
      } else {
        words[wordIndex].remove(charIndex);
        words[wordIndex].setCursor(charIndex - 1);

        setProgress(calculateProgress(wordIndex, charIndex - 1));

        setCharIndex(charIndex - 1);
      }
    } else if (words[wordIndex].isNewLineCharacter(charIndex)) {
      // Whenever Enter is called if cursor is not at end of line then it is registered as a normal character press
      // Otherwise it is registered as a new line press and the cursor is moved to the next line
      if (keyValue !== "Enter") {
        setShowEnterMessage(true);
        return;
      }

      words[wordIndex].letterTags[charIndex].setAsCorrect();
      words[wordIndex + 1].setCursor(0);

      setWordIndex(wordIndex + 1);
      setCharIndex(0);
    } else if (keyValue === "Tab") {
      // If it is a tab press then the cursor is attempted to move double spaces to the right
      const first = addKey(wordIndex, charIndex, " ");

      if (
        words[first.finalWordIndex].isNewLineCharacter(first.finalCharIndex)
      ) {
        setWordIndex(first.finalWordIndex);
        setCharIndex(first.finalCharIndex);

        return;
      }

      const { finalWordIndex, finalCharIndex } = addKey(
        first.finalWordIndex,
        first.finalCharIndex,
        " "
      );

      setWordIndex(finalWordIndex);
      setCharIndex(finalCharIndex);
    } else if (keyValue !== "Shift") {
      // If it is not shift then it is a normal character press so add it normally
      const { finalWordIndex, finalCharIndex } = addKey(
        wordIndex,
        charIndex,
        keyValue
      );

      setWordIndex(finalWordIndex);
      setCharIndex(finalCharIndex);
    }
  };

  /**
   * This method is a helper method to keyDown event handler whenever a key input should add a key.
   * It adds a character to the word and returns the final word index and character index after the key was added.
   * It also called the checkKeyPressed method with true or false depending on whether the key was pressed correctly or not
   * so the parent could use this information.
   * Set progress is also called here to update the progress in the parent component.
   * @param wordIndex
   * @param charIndex
   * @param key
   */
  const addKey = (wordIndex: number, charIndex: number, key: string) => {
    let finalWordIndex = wordIndex;
    let finalCharIndex = charIndex;

    const correct = words[finalWordIndex].add(finalCharIndex, key);
    checkKeyPressed(correct);

    if (words[finalWordIndex].letterTags.length <= finalCharIndex + 1) {
      if (finalWordIndex + 1 >= words.length) {
        setProgress(calculateProgress(finalWordIndex, finalCharIndex));

        checkKeyPressed(correct);

        onGameOver();

        return {
          finalWordIndex,
          finalCharIndex,
        };
      }

      words[finalWordIndex + 1].setCursor(0);

      finalWordIndex = finalWordIndex + 1;
      finalCharIndex = 0;
    } else {
      words[finalWordIndex].setCursor(finalCharIndex + 1);
      finalCharIndex++;
    }

    setProgress(calculateProgress(finalWordIndex, finalCharIndex));

    return {
      finalWordIndex,
      finalCharIndex,
    };
  };

  /**
   * This method is used to calculate the progress as a percentage of the code typed out whether wrong or right
   * and returns it as a number between 0 and 100.
   * @param wordIndex - Current word index
   * @param charIndex - Current character index
   */
  const calculateProgress = (wordIndex: number, charIndex: number) => {
    if (wordIndex === 0 && charIndex === 0) {
      return 0;
    }

    let currentProgress = 0;

    for (let i = 0; i < wordIndex; i++) {
      currentProgress += words[i].getLength();
    }

    currentProgress += charIndex;

    let totalLength = 0;
    for (let i = 0; i < words.length; i++) {
      totalLength += words[i].getLength();
    }

    return (currentProgress / totalLength) * 100;
  };

  return (
    <div
      style={{
        outline: "none",
        width: "100%",
        position: "relative",
        marginTop: 20,
        marginBottom: 20,
      }}
      tabIndex={-1}
      onKeyDown={(e) => {
        e.preventDefault();
        onKeyDown(e.key);
      }}
      onFocus={() => setInFocus(true)}
      onBlur={() => setInFocus(false)}
      id={"game-container"}
    >
      {(!started || !inFocus) && (
        <Typography
          style={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            fontSize: "2rem",
            zIndex: 10,
          }}
        >
          {!started ? "Game will start soon..." : "Click to focus"}
        </Typography>)}

      <div style={{ textAlign: "center", height: 15, marginBottom: 15 }}>
        {showEnterMessage && <Typography>Press Enter to continue</Typography>}
      </div>
      <SyntaxHighlighter
        language={"text"}
        style={a11yLight}
        customStyle={{
          borderRadius: "10px",
          fontSize: 28,
          paddingLeft: 30,
          paddingRight: 30,
          paddingBottom: 30,
          border: "2px solid #ccc",
          margin: 0,
          filter: !inFocus || !started ? "blur(5px)" : "none",
        }}
        codeTagProps={{
          ref: codeRef,
        }}
      >
        {code}
      </SyntaxHighlighter>
    </div>
  );
}

export default CodeInput;
