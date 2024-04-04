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
import { getPlayerSession, resetPlayerSession } from "../instances"; // Import resetPlayerSession instead of resetGame
import { FlashLightItem, FlashLightItemAlias } from "../items/FlashLightItem";
import { RopeItem, RopeItemAlias } from "../items/RopeItem";
import { PlayerSession } from "../types";
import { BigslideRoom } from "./BigslideRoom";
import { StartupRoom } from "./StartupRoom"; // Import StartupRoom

export const EdsPushAlias: string = "EdsPush";

export class EdsPush extends Room {

    public constructor() {
        super(EdsPushAlias);
    }

    public name(): string {
        return "Ed's Push";
    }

    public images(): string[] {
        const playerSession: PlayerSession = getPlayerSession();

        // Check if the player has given the rope to John
        if (playerSession.gaveRopeToJohn) {
            // If the rope is given to John, change the room picture to "edspush1"
            return ["edspush1"];
        } else {
            // If the rope is not given to John, keep the original room picture "eds"
            return ["eds"];
        }
    }

    public actions(): Action[] {
        const playerSession: PlayerSession = getPlayerSession();

        // Check if the player has the rope or flashlight in their inventory
        if (playerSession.inventory.includes(RopeItemAlias) || playerSession.inventory.includes(FlashLightItemAlias)) {
            // If the player has the rope or flashlight, include the corresponding custom actions
            const actions: Action[] = [
                new ExamineAction(),
                new PickupAction(),
                new TalkAction(),
                new CustomAction("go-to-bigslideroom", "Go to BigslideRoom", false) // Add custom action to go to BigslideRoom
            ];

            // Check if the player has the rope in their inventory
            if (playerSession.inventory.includes(RopeItemAlias)) {
                // If the player has the rope, include the custom action to give the rope to John
                actions.push(new CustomAction("give-rope-to-john", "Give rope to John", false));
            }

            // Check if the player has the flashlight in their inventory
            if (playerSession.inventory.includes(FlashLightItemAlias)) {
                // If the player has the flashlight, include the custom action to give the flashlight to John
                actions.push(new CustomAction("give-flashlight-to-john", "Give flashlight to John", false));
            }

            return actions;
        } else {
            // If the player doesn't have the rope or flashlight, exclude the custom actions to give items to John
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
        const playerSession: PlayerSession = getPlayerSession();

        if (alias === "give-rope-to-john") {
            // Check if the player has the rope in their inventory
            if (playerSession.inventory.includes(RopeItemAlias)) {
                // If the player has the rope, remove it from the inventory and set the flag indicating that the rope has been given to John
                playerSession.inventory = playerSession.inventory.filter(item => item !== RopeItemAlias);
                playerSession.gaveRopeToJohn = true;
                return new TextActionResult(["You give the sturdy rope to John. He nods appreciatively, ready to put it to good use."]);
            } else {
                // If the player doesn't have the rope, display a message indicating so
                return new TextActionResult(["You don't have the rope to give to John."]);
            }
        } else if (alias === "give-flashlight-to-john") {
            // Check if the player has the flashlight in their inventory
            if (playerSession.inventory.includes(FlashLightItemAlias)) {
                // If the player has the flashlight, remove it from the inventory and trigger game over
                playerSession.inventory = playerSession.inventory.filter(item => item !== FlashLightItemAlias);
                return this.gameOver(); // Call the gameOver method
            } else {
                // If the player doesn't have the flashlight, display a message indicating so
                return new TextActionResult(["You don't have the flashlight to give to John."]);
            }
        } else if (alias === "go-to-bigslideroom") { // Check if the button for BigslideRoom is clicked
            const bigslideRoom: BigslideRoom = new BigslideRoom(); // Create a new instance of BigslideRoom
            getPlayerSession().currentRoom = bigslideRoom.alias; // Set the current room to BigslideRoom
            return bigslideRoom.examine(); // Return the examination result of BigslideRoom
        }

        return undefined;
    }

    private gameOver(): ActionResult {
        // Reset the player session by calling the resetPlayerSession function instead of resetGame
        resetPlayerSession();
        // Send the player back to the StartupRoom
        const startupRoom: StartupRoom = new StartupRoom();
        getPlayerSession().currentRoom = startupRoom.alias;
        // Return a TextActionResult with the game over message
        return new TextActionResult(["Game over! You gave the flashlight to John, and he died. Restarting the game..."]);
    }
}