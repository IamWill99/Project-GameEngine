import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { BoomCharacter } from "../characters/BoomCharacter";
import { StoneCharacter } from "../characters/StoneCharacter";
import { getPlayerSession } from "../instances";
import { DeurklinkItem } from "../items/DeurklinkItem";
import { PlayerSession } from "../types";
import {theMazeRoom} from "./theMazeRoom";


export const CaveEntranceAlias: string = "caveentrance";

export class CaveEntrance extends Room{

    public constructor (){
        super(CaveEntranceAlias);
    }

    public name(): string {
        return "Cave Entrance";
    }

    

    public images(): string[] {
 
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.talkedToBoom) {
            return ["forest6"];
        } else if (playerSession.examineCave) {
            return ["forest7"];
        }
    
        return [];
    }

    


    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.giveDoorknob) {
            return [
                new ExamineAction(),
                new PickupAction(),
                new TalkAction(),
                new CustomAction("go-to-bigroom", "Enter Cave", false) // Add custom action to go to BigRoom
            ];
        }
        
        else {
        return [
            new ExamineAction(),
            new PickupAction(),
            new TalkAction(),
            
        ];
        }
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this];

        if(playerSession.correctAnswerRiddle && playerSession.examineStone) {
            objects.push(new DeurklinkItem());
        }

        objects.push(new BoomCharacter(), new StoneCharacter());

        return objects;
    }

    

    public examine(): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(!playerSession.examineCave){
            playerSession.examineCave = true;
        }
        
        return new TextActionResult(["You walk into the dark forest, at the end of the path, a mysterious door comes into view. A silent tension fills the air."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test me"){
            return new TextActionResult(["You try to push the door open. The magical door remains closed, unaffected by your attempts."]);
        } else if (alias === "go-to-bigroom") { // Check if the button for BigRoom is clicked
            // Create a new instance of BigRoom
            const room: theMazeRoom = new theMazeRoom();
            // Set the current room to BigRoom
            getPlayerSession().currentRoom = room.alias;
            // Return the examination result of BigRoom
            return room.examine();
        }

        return undefined;
    }

    
}
