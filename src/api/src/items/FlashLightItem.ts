import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import {Item} from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const FlashLightItemAlias: string = "flash-light";


export class FlashLightItem extends Item implements Examine, Pickup {

   public constructor() {
        super(FlashLightItemAlias, ExamineActionAlias, PickupActionAlias);
    }
    

    public name(): string {
        return "Flash-Light";
    }

   
    public examine(): ActionResult | undefined {
       return new TextActionResult(["You have to pick up the flash-light first"]);
    }

   public pickup(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();
    
  
    if(!playerSession.inventory.includes(FlashLightItemAlias)){
        console.log( "We'll pick him up :-)" );
        
        playerSession.pickedUpFlashLight = true;
        playerSession.inventory.push(FlashLightItemAlias);

        
        return new TextActionResult (["You pick up the flash-light."]);
    }
    console.log( "Pick up faild :-(" );
    
    

    return undefined;
    
    }
}