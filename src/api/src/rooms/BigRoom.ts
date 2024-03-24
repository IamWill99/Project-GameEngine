import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { PickupAction } from "../actions/PickupAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { SkeletonCharacter } from "../characters/SkeletonCharacter";
import { GemstoneItem, GemstoneItemAlias } from "../items/GemstoneItem";
import { PlayerSession } from "../types";
import { getPlayerSession } from "../instances";
import { BigslideRoom } from "./BigslideRoom"; // Import BigslideRoomAlias from BigslideRoom

export const BigRoomAlias: string = "BigRoom";

export class BigRoom extends Room{

    public constructor (){
        super(BigRoomAlias);
    }

    public name(): string {
        return "The big room";
    }

    public images(): string[] {
        return [
            "bigroom2"
        ];
    }

    public actions(): Action[] {
        return [
            new ExamineAction(), 
            new PickupAction(),  
            new TalkAction(),
            new CustomAction("go-to-bigslideroom", "Go to BigslideRoom", false) // Add custom action to go to BigslideRoom
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this];

        if(!playerSession.inventory.includes(GemstoneItemAlias)){
            objects.push(new GemstoneItem());
        }
        
        objects.push(new SkeletonCharacter());

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["As you step into the cave, a chill runs down your spine. The narrow passage leads you deeper, the sound of dripping water echoing around you. At the end, illuminated by your flickering torch, a haunting sight awaits: a big skeleton, a silent sentinel of this forgotten realm."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if(alias === "test me"){
            return new TextActionResult(["Je schreeuwt in de kamer en je hoort een echo"]); 
        } else if (alias === "go-to-bigslideroom") { // Check if the button for BigslideRoom is clicked
            // Create a new instance of BigslideRoom
            const bigslideRoom: BigslideRoom = new BigslideRoom();
            // Set the current room to BigslideRoom
            getPlayerSession().currentRoom = bigslideRoom.alias;
            // Return the examination result of BigslideRoom
            return bigslideRoom.examine();
        }

        return undefined;
    }
}
