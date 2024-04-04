import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { DeurklinkItemAlias } from "../items/DeurklinkItem";
import { PlayerSession } from "../types";


export const BoomCharacterAlias: string = "pratendeBoom";

export class BoomCharacter extends Character implements Examine{

    public constructor(){
        super(BoomCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Talking Tree";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Strangely, the tree has a face. Could it possibly talk?"]);
    }


    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(choiceId === 20){
            return new TextActionResult(["The tree becomes angry."]);
        }
        else if(choiceId === 21){
            return new TextActionResult(["\"Beyond the shadows of the cave, lie hidden secrets. A light is your guide through the darkness, a beacon of hope in the depths of the night\" says the tree."]);
        }
        else if(choiceId === 22){
            playerSession.inventory = [];
            
            return new TextActionResult(["You give the doorknob to the tree. It eats the doorknob. \"Mmmmmm.\" You hear something clicking in the distance."]);
        }
        
        const choiceActions : TalkChoiceAction[] = [new TalkChoiceAction(20, "Insult the tree"), new TalkChoiceAction(21, "Ask for advice")
    ];

        if(!playerSession.talkedToBoom){
            playerSession.talkedToBoom = true;
        }


        if(playerSession.inventory.includes(DeurklinkItemAlias)) {
            choiceActions.push(new TalkChoiceAction(22, "Give the doorknob to the tree"));

        }

        return new TalkActionResult(this, ["\"Do not enter the cave!\" whispers the old tree in a mysterious tone. \"Deep shadows dwell within, their secrets resting in the darkness. Turn back, traveler, for the path you tread now bears the burden of unknown dangers.\"."],
        choiceActions
        );
    }




}