import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const StoneCharacterAlias: string = "Stone";
export class StoneCharacter extends Character implements Examine {

    public constructor() {
        super(StoneCharacterAlias, ExamineActionAlias); 
    }

    public name(): string {
        return "Stone";
    }
    
    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();


        if(!playerSession.examineStone){
            playerSession.examineStone = true;
        }

        else if (playerSession.pickedUpDeurklink) {
            return new TextActionResult(["Just an ordinary rock."]);
        }

        return new TextActionResult(["You see something shiny under the stone."]);
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return undefined;
    }

}