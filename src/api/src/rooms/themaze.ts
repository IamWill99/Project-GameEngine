import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Room } from "../base/gameObjects/Room";

export const theMazeRoomAlias: string = "theMaze";

export class theMaze extends Room {
   public constructor(){
        super(theMazeRoomAlias);
    }

    public name(): string {
       return "theMaze";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een groot Doolhof."]);
    }
}