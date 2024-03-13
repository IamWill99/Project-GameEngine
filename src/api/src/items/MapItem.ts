import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";

export const MapItemAlias: string = "MapItem";

export class Mapitem extends Item implements Examine {
   public constructor() {
        super(MapItemAlias, ExamineActionAlias);
    }


    public name(): string {
        return "Map";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een kaart van het doolhof."]); 
    }

}