import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const StoneCharacterAlias: string = "Stone";
export class StoneCharacter extends Character implements Examine, Pickup {

    public constructor() {
        super(StoneCharacterAlias, ExamineActionAlias, PickupActionAlias); 
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

        else if (playerSession.correctAnswerRiddle){
            return new TextActionResult(["You see something glistening behind the stone."]);
        }
    
        return new TextActionResult(["You see a stone covered in tree roots on the side of the road. When you walk up to the stone, you see something glistening. The roots are blocking your way so you can't see what's under the stone."]);
    }

    public talk(_choiceId?: number | undefined): ActionResult | undefined {
        return undefined;
    }

    public pickup(): ActionResult | undefined {
        return new TextActionResult(["You try to pick up the stone. You almost break your back trying to lift it. Probably best to leave it alone..."]);
    }

}