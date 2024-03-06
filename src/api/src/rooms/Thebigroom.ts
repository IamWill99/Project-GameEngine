import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";

export const ThebigroomAlias: string = "thebigroom";

export class Thebigroom extends Room{

    public constructor (){
        super(ThebigroomAlias);
    }

    public name(): string {
        return "The big room";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Grote kamer!","Donker."]);
    }

    public images(): string[] {
        return [
            "Thebigroom"
        ];
    }

    public objects(): GameObject[] {
        return [];
    }


}

