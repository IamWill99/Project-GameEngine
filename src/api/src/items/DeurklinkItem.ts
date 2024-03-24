import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";


export const DeurklinkItemAlias: string = "Deurklink";

export class DeurklinkItem extends Item implements Examine, Pickup{

    public constructor (){
        super(DeurklinkItemAlias, ExamineActionAlias, PickupActionAlias);
    }

    public name(): string {
        return "Deurklink";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een gouden deurklink. Waar zou dit gebruikt kunnen worden?"]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        
        if(!playerSession.pickedUpDeurklink) {
            playerSession.pickedUpDeurklink = true;
            playerSession.inventory.push(DeurklinkItemAlias);

            return new TextActionResult(["Je pakt de deurklink op."]);
        }

        return new TextActionResult(["Je hebt de deurklink al opgepakt."]);
    }


}