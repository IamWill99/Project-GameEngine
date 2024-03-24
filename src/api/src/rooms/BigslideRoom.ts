import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { PickupAction } from "../actions/PickupAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { JohnCharacter } from "../characters/JohnCharacter";
import { getPlayerSession } from "../instances";
import { FlashLightItem, FlashLightItemAlias } from "../items/FlashLightItem";
import { RopeItem, RopeItemAlias } from "../items/RopeItem";
import { PlayerSession } from "../types";
import { BigRoom } from "./BigRoom";
import { EdsPush } from "./EdsPush"; // Import EdsPush

export const BigslideRoomAlias: string = "bigslide";

export class BigslideRoom extends Room {
    public constructor() {
        super(BigslideRoomAlias);
    }

    public name(): string {
        return "Bigslide";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();
        if (playerSession.talkedToJohn) {
            return ["john"];
        } else {
            return ["bigslide"];
        }
    }

    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new TalkAction(),
            new CustomAction("test-me", "Test the slide", false),
            new CustomAction("go-to-bigroom", "Go to BigRoom", false), // Add custom action to go to BigRoom
            new CustomAction("go-to-edspush", "Go to Ed's Push", false) // Add custom action to go to Ed's Push
        ];
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();
        const objects: GameObject[] = [this];
        if (!playerSession.inventory.includes(FlashLightItemAlias)) {
            objects.push(new FlashLightItem());
        }
        if (!playerSession.inventory.includes(RopeItemAlias)) {
            objects.push(new RopeItem());
        }
        objects.push(new JohnCharacter()); // Change to JohnCharacter
        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "In darkness deep, a tale unfolds, Josh and Jones, their courage bold.",
            "Within the Slide's winding way, Echoes sound, shadows sway.",
            "One seeks light, the other a rope, Choices critical offering hope.",
            "In shadows deep, fears they face, Outcome beyond, this cave's embrace."
        ]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        if (alias === "test-me") {
            return new TextActionResult(["The slide looks dangerous", "and it's rough"]);
        } else if (alias === "go-to-bigroom") { // Check if the button for BigRoom is clicked
            // Create a new instance of BigRoom
            const bigRoom: BigRoom = new BigRoom();
            // Set the current room to BigRoom
            getPlayerSession().currentRoom = bigRoom.alias;
            // Return the examination result of BigRoom
            return bigRoom.examine();
        } else if (alias === "go-to-edspush") { // Check if the button for Ed's Push is clicked
            // Create a new instance of EdsPush
            const edsPush: EdsPush = new EdsPush();
            // Set the current room to EdsPush
            getPlayerSession().currentRoom = edsPush.alias;
            // Return the examination result of EdsPush
            return edsPush.examine();
        }
        return undefined;
    }
}
