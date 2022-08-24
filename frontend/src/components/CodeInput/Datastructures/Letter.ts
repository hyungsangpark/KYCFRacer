import classes from "../CodeInput.module.css";

export class Letter {
  letter: HTMLElement;
  parent: HTMLSpanElement;

  constructor(letter: HTMLElement, parent: HTMLSpanElement) {
    this.letter = letter;
    this.parent = parent;
  }

  equals(other: string): boolean {
    return this.letter.textContent === other;
  }

  setAsCorrect(): void {
    this.reset();
    this.letter.classList.add(classes.correct);
  }

  setAsIncorrect(): void {
    this.reset();
    this.letter.classList.add(classes.incorrect);
  }

  setAsBlank(): void {
    this.reset();
    this.letter.style.color = this.parent.style.color
      ? this.parent.style.color.replace(")", ", 0.3)")
      : "rgb(0, 0, 0, 0.3)";
  }

  setCursor(): void {
    this.reset();
    this.setAsBlank();
    this.letter.classList.add(classes.current);
  }

  isNewLineCharacter(): boolean {
    return this.letter.textContent === "\n";
  }

  private reset(): void {
    this.letter.className = "";

    this.letter.style.color = this.parent.style.color;
  }
}
