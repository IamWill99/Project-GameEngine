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
import { BigslideRoom } from "./BigslideRoom";

export const EdsPushAlias: string = "EdsPush";

export class EdsPush extends Room {

    public constructor() {
        super(EdsPushAlias);
    }

    public name(): string {
        return "Ed's Push";
    }

    public images(): string[] {
        return ["eds"]; // Use the same images as BigslideRoom for now, you can update this later
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
        const PlayerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this];

        if (!PlayerSession.inventory.includes(FlashLightItemAlias)) {
            objects.push(new FlashLightItem());
        }

        if (!PlayerSession.inventory.includes(RopeItemAlias)) {
            objects.push(new RopeItem());
        }

        objects.push(new JohnCharacter()); // Change to JohnCharacter

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult([
            "Welcome to Ed's Push, a section of the Nutty Putty Cave.",
            "In this dimly lit cavern, the air feels heavy and damp, echoing with each footstep.",
            "You find yourself in a predicament; John, our brave spelunker, has become stuck in a narrow passage, known locally as 'Ed's Push.'",
            "The walls seem to close in around him, and his calls for help reverberate through the cavern, faint but desperate.",
            "It's evident that he needs assistance to escape this perilous predicament.",
            "Josh, his faithful companion, is nowhere to be seen.",
            "To navigate through this harrowing ordeal, John will require the ingenuity and assistance of his friend.",
            "The passage is dark and treacherous, but with the aid of a reliable light source and perhaps some sturdy equipment, salvation may yet be found.",
            "Time is of the essence; every moment spent in the confines of this cave increases the sense of urgency.",
            "A decision must be made swiftly. Will you attempt to rescue John, or will his fate remain entwined with the depths of Ed's Push?",
            "Remember, in the darkness of the Nutty Putty Cave, every action has consequences."
        ]);
    }

    public custom(alias: string, _gameObjects?: GameObject[]): ActionResult | undefined {
        if (alias === "go-to-bigslideroom") { // Check if the button for BigslideRoom is clicked
            const bigslideRoom: BigslideRoom = new BigslideRoom(); // Create a new instance of BigslideRoom
            getPlayerSession().currentRoom = bigslideRoom.alias; // Set the current room to BigslideRoom
            return bigslideRoom.examine(); // Return the examination result of BigslideRoom
        }

        return undefined;
    }
}
