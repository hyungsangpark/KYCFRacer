import { Letter } from "./Letter";
import classes from "../CodeInput.module.css";

export class Word {
  wordSpan: HTMLSpanElement;
  letterTags: Letter[];

  constructor(wordAsSpan: HTMLSpanElement) {
    this.wordSpan = wordAsSpan;
    this.letterTags = [];

    const text = this.wordSpan.textContent;

    if (!text || text.length === 0) return;

    const letters = text.split("");
    const newLetterTags = letters.map((letter: string) => {
      const letterDiv = document.createElement("letter");
      letterDiv.textContent = letter;

      const newLetter = new Letter(letterDiv, this.wordSpan);

      newLetter.setAsBlank();

      this.letterTags.push(newLetter);

      return letterDiv;
    });

    this.wordSpan.textContent = "";
    newLetterTags.forEach((letterDiv: any) => {
      this.wordSpan.appendChild(letterDiv);
    });
  }

  add(index: number, letter: string) {
    if (this.letterTags[index].equals(letter)) {
      this.letterTags[index].setAsCorrect();
      return true;
    }

    this.letterTags[index].setAsIncorrect();
    return false;
  }

  remove(index: number) {
    this.letterTags[index].setAsBlank();
  }

  setCursor(index: number) {
    this.letterTags[index].setCursor();
  }

  getLength() {
    return this.letterTags.length;
  }

  isNewLineCharacter(index: number) {
    return this.letterTags[index].isNewLineCharacter();
  }
}
