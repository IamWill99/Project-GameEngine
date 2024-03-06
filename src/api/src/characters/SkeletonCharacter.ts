import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";

export const SkeletonCharacterAlias: string = "Skeleton";

export class SkeletonCharacter extends Character implements Examine{

    public constructor(){
        super(SkeletonCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Skeleton";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["It's a big skeleton!"]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        if(choiceId === 1){
            return new TextActionResult(["The skeleton hits you"]);
        }
        return new TalkActionResult(this, ["Give me a shiny object"],  [
            new TalkChoiceAction(1, "Fight the big skeleton")
        ]);
    }
}