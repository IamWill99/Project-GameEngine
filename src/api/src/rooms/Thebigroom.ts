import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { SkeletonCharacter } from "../characters/SkeletonCharacter";
import { GemstoneItem } from "../items/GemstoneItem";

export const ThebigroomAlias: string = "thebigroom";

export class Thebigroom extends Room{

    public constructor (){
        super(ThebigroomAlias);
    }

    public name(): string {
        return "The big room";
    }

    public images(): string[] {
        return [
            "Thebigroom"
        ];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction() , new CustomAction("test me", "test", false)];
    }

    public objects(): GameObject[] {
        return [this, new GemstoneItem(), new SkeletonCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Grote kamer!","Donker."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test me"){
            return new TextActionResult(["Je schreeuwt in de kamer en je hoort een echo"]); 

        }

        return undefined;
    }


}

