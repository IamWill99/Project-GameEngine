import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { Item } from "../base/gameObjects/Item";


export const GemstoneItemAlias: string = "Gemstone";

export class GemstoneItem extends Item implements Examine{

    public constructor (){
        super(GemstoneItemAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Gemstone";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Dit is een edelsteen."]);
    }

}