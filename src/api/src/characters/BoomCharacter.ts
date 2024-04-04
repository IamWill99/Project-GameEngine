import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession, resetPlayerSession } from "../instances";
import { DeurklinkItemAlias } from "../items/DeurklinkItem";
import { StartupRoom } from "../rooms/StartupRoom";
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
        return new TextActionResult(["Strangely, the tree has a face. When you start walking closer to the tree, you hear it saying: \"Hungry... So hungry...\" Best to be careful. "]);
    }


    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(choiceId === 20){
            return this.gameOver();
            
        }
        else if(choiceId === 21){
            if(!playerSession.moveRoots){
                playerSession.moveRoots = true;
            }

            return new TextActionResult(["\"Beyond the shadows of the cave, lie hidden secrets. A light is your guide through the darkness, a beacon of hope in the depths of the night\" says the tree."]);
        }
        else if(choiceId === 22){
            playerSession.inventory = [];
            
            if(!playerSession.giveDoorknob){
                playerSession.giveDoorknob = true;
            }

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

    private gameOver(): ActionResult {
        // Reset the player session by calling the resetPlayerSession function instead of resetGame
        resetPlayerSession();
        // Send the player back to the StartupRoom
        const startupRoom: StartupRoom = new StartupRoom();
        getPlayerSession().currentRoom = startupRoom.alias;
        // Return a TextActionResult with the game over message
        return new TextActionResult(["The tree became furious and ate you... Game over!"]);
    }


}