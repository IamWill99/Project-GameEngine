import { PickupMapAction } from "../actions/PickupMapAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { KabouterCharacter } from "../characters/KabouterCharacter";
import { Mapitem } from "../items/MapItem";

export const theMazeRoomAlias: string = "theMaze";

export class theMazeRoom extends Room {
   public constructor(){
        super(theMazeRoomAlias);
    }

    public name(): string {
       return "theMaze";
    }

    public images(): string[] {

        return [
            "theMaze"
        ];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new PickupMapAction(), new CustomAction("test-me", "Test me", false)];
    }

    public objects(): GameObject[] {
        return [this, new Mapitem(), new KabouterCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een groot Doolhof."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test-me"){
            return new TextActionResult(["Je kijkt hoe groot het is"]);

        }
        return undefined;
    }
}