import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";


export const GemstoneItemAlias: string = "Gemstone";

export class GemstoneItem extends Item implements Examine, Pickup{

    public constructor (){
        super(GemstoneItemAlias, ExamineActionAlias, PickupActionAlias);
    }
    
    public name(): string {
        return "Gemstone";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a shiny gemstone."]);
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!playerSession.inventory.includes(GemstoneItemAlias)){
            playerSession.pickedUpGemstone = true;
            playerSession.inventory.push(GemstoneItemAlias);

            return new TextActionResult(["You pickup the gemstone."]);
        }

        return undefined;
    }
}