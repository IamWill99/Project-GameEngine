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
            new CustomAction("go-to-bigroom", "OPEN DOOR", false) // Add custom action to go to BigRoom
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
        return new TextActionResult(["Je loopt verder in het duistere bos, waar aan het einde van het pad een mysterieuze deur te zien is. Een stille spanning vult de lucht."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test me"){
            return new TextActionResult(["Je probeert de deur open te duwen. De magische deur blijft gesloten, ongevoelig voor je pogingen."]);
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
