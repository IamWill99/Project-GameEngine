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
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { DeurklinkItem, DeurklinkItemAlias } from "../items/DeurklinkItem";
import { PlayerSession } from "../types";
import { BigRoom } from "./BigRoom";

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
            return [
                "forest6"
            ];
        }
 
        else {
            return [
                "forest7"
            ];
 
        }
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new TalkAction(),
            new CustomAction("go-to-bigroom", "Open Door", false) // Add custom action to go to BigRoom
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if(!playerSession.inventory.includes(DeurklinkItemAlias)) {
            objects.push(new DeurklinkItem());
        }

        objects.push(new BoomCharacter());

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["You walk into the dark forest, at the end of the path, a mysterious door comes into view. A silent tension fills the air."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test me"){
            return new TextActionResult(["You try to push the door open. The magical door remains closed, unaffected by your attempts."]);
        } else if (alias === "go-to-bigroom") { // Check if the button for BigRoom is clicked
            // Create a new instance of BigRoom
            const bigRoom: BigRoom = new BigRoom();
            // Set the current room to BigRoom
            getPlayerSession().currentRoom = bigRoom.alias;
            // Return the examination result of BigRoom
            return bigRoom.examine();
        }

        return undefined;
    }
}
