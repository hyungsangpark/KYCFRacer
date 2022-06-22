import {render} from "@testing-library/react";
import GameEndSoloContainer from "../GameEndSoloContainer";
import { CodeBlock } from "../../../utils/Types/ApiTypes";

describe("GameEndSoloContainer", () => {
    const codeBlock: CodeBlock= 
        {
          _id: "123",
          language: "python",
          time: "30",
          code: "test code",
        }
    const playerStats: {cpm: number, accuracy: number, error: number}= 
        {
            cpm: 100,
            accuracy: 95,
            error: 5,
        };
    
  it("should render the container for the end screen results", () => {
    const {baseElement} = render(<GameEndSoloContainer playerStats={playerStats} isViewCode= {true} codeBlock= {codeBlock} />);

    expect(baseElement).toBeInTheDocument();
  });


  it("should correctly render code block", () => {
    const {getByText} = render(<GameEndSoloContainer playerStats={playerStats} isViewCode= {true} codeBlock= {codeBlock}/>);

    expect(getByText("test code")).toBeInTheDocument();
  });

  it("should correctly render the player's statistics in the end game screen", () => {
    const {getByText} = render(<GameEndSoloContainer playerStats={playerStats} isViewCode= {false} codeBlock= {codeBlock}/>);
    
    expect(getByText("CPM")).toBeInTheDocument();
    expect(getByText("Accuracy")).toBeInTheDocument();
    expect(getByText("Errors")).toBeInTheDocument();

    expect(getByText("100")).toBeInTheDocument();
    expect(getByText("95")).toBeInTheDocument();
    expect(getByText("5")).toBeInTheDocument();
  });

})