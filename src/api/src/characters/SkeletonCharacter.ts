import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { GemstoneItemAlias } from "../items/GemstoneItem";
import { PlayerSession } from "../types";

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
        const playersession: PlayerSession = getPlayerSession();

        if(choiceId === 1){
            return new TextActionResult(["The skeleton hits you"]);
        }
        else if(choiceId === 2){
            return new TextActionResult(["You leaved the skeleton alone"]);
        }
        else if(choiceId === 3){
            playersession.inventory = [];

            return new TextActionResult(["You gave the gemstone to the skeleton"]);
        }

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Pet the skeleton"), new TalkChoiceAction(2, "Leave the skeleton alone")
        ];


        if(playersession.inventory.includes(GemstoneItemAlias)){
            choiceActions.push(new TalkChoiceAction(3, "Give the gemstone to the skeleton"));
        }

        return new TalkActionResult(
            this,
            ["<Skeleton sounds>"],
            choiceActions
        );
    }
}