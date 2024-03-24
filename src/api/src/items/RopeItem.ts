import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import {Item} from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const RopeItemAlias: string = "rope";


export class RopeItem extends Item implements Examine, Pickup {

   public constructor() {
        super(RopeItemAlias, ExamineActionAlias, PickupActionAlias);
    }
    

    public name(): string {
        return "Rope";
    }

   
    public examine(): ActionResult | undefined {
       return new TextActionResult(["You have to pick up the rope first"]);
    }

   public pickup(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();
    
      
    if(!playerSession.inventory.includes(RopeItemAlias)){
        console.log("We'll pick him up :-)");
        
        playerSession.pickedUpRope = true;
        playerSession.inventory.push(RopeItemAlias);

        
        return new TextActionResult (["You pick up the rope."]);
    }
    console.log( "Pick up faild :-(" );
    
    

    return undefined;
    
    }
}