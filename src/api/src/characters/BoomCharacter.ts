import { Pickup, PickupActionAlias } from "../actions/PickupAction";
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

export class BoomCharacter extends Character implements Examine, Pickup{

    public constructor(){
        super(BoomCharacterAlias, ExamineActionAlias, PickupActionAlias);
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

            return new TextActionResult(["\"Answer some riddles for me and i'll help you enter the cave!\" says the tree."]);
        }
        else if(choiceId === 22){
            playerSession.inventory = [];
            
            if(!playerSession.giveDoorknob){
                playerSession.giveDoorknob = true;
            }

            return new TextActionResult(["You give the doorknob to the tree. It eats the doorknob. \"Mmmmmm.\" You hear something clicking in the distance."]);
        }
        else if(choiceId === 23){

            if(!playerSession.askRiddle){
                playerSession.askRiddle = true;
            }

            return new TextActionResult(["I'm small and brown, with a fluffy tail, Among the trees, I often trail. I gather nuts and seeds with glee, In the forest, I'm as busy as can be. What am I?"]);
        }
        else if(choiceId === 24) {
            return new TextActionResult(["A deer? Wrong!"]);
        }
        else if(choiceId === 25) {
            return new TextActionResult(["A rabbit? Wrong!"]);
        }
        else if(choiceId === 26) {
            if(!playerSession.correctAnswerRiddle){
                playerSession.correctAnswerRiddle = true;
            }

            return new TextActionResult(["A squirrel? You are correct! You hear some roots moving in the distance."]);
            
        }
        else if(choiceId === 27) {
            return new TextActionResult(["A fox? Wrong!"]);
        }        

        const choiceActions : TalkChoiceAction[] = [new TalkChoiceAction(20, "Insult the tree"), new TalkChoiceAction(21, "Ask for help")
    ];

        if(!playerSession.talkedToBoom){
            playerSession.talkedToBoom = true;
        }

        
        if(playerSession.moveRoots) {
            choiceActions.push(new TalkChoiceAction(23, "Riddle"));
        }

        if(playerSession.askRiddle) {
            choiceActions.push(new TalkChoiceAction(24, "Riddle: A deer?"));
            choiceActions.push(new TalkChoiceAction(25, "Riddle: A rabbit?"));
            choiceActions.push(new TalkChoiceAction(26, "Riddle: A squirrel?"));
            choiceActions.push(new TalkChoiceAction(27, "Riddle: A fox?"));

        }

  

        if(playerSession.inventory.includes(DeurklinkItemAlias)) {
            choiceActions.push(new TalkChoiceAction(22, "Give the doorknob to the tree"));

        }

        return new TalkActionResult(this, ["\"So Hungry...\" whispers the old tree to itself. \"If you give me something to eat, i'll help you with anything...\"."],
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
        return new TextActionResult(["The tree became furious and used the surrounding tree roots to force you into it's mouth. Game over!"]);
    }


    public pickup(): ActionResult | undefined {
        return new TextActionResult(["You walk up to the tree knowing fully well you can't pick up the tree. You hug the tree with your arms to lift it up. The tree hugs you back."]);
    }

}