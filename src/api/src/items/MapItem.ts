import { Pickup, PickupMapActionAlias } from "../actions/PickupMapAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";

export const MapItemAlias: string = "MapItem";

export class Mapitem extends Item implements Examine, Pickup {
   public constructor() {
        super(MapItemAlias, ExamineActionAlias, PickupMapActionAlias);
    }


    public name(): string {
        return "Map";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een kaart van het doolhof."]); 
    }

    public pickup(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!playerSession.pickedUpMapItem) {
            playerSession.pickedUpMapItem = true;
            playerSession.mapGepakt = true;
            playerSession.inventory.push(MapItemAlias);

            return new TextActionResult(["Je pakt de kaart op"]);
        }
 
       return undefined; 
    }


}