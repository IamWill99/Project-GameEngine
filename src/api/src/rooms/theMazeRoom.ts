import { PickupMapAction } from "../actions/PickupMapAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { KabouterCharacter } from "../characters/KabouterCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { MapItemAlias, Mapitem } from "../items/MapItem";
import { PlayerSession } from "../types";
import { BigRoom } from "./BigRoom";

export const theMazeRoomAlias: string = "theMaze";

export class theMazeRoom extends Room {
    public constructor() {
        super(theMazeRoomAlias);
    }

    public name(): string {
        return "theMaze";
    }

    public images(): string[] {

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.talkedToKabouter) {
            return [
                "kabouter"
            ];
        }

        else {
            return [
                "maze_1"
            ];

        }
    }

    public actions(): Action[] {

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.geheimGedrukt) {
            return [
                new ExamineAction(), new TalkAction(), new PickupMapAction(), new CustomAction("go-to-bigroom", "enter the bigroom", false)
            ];
        }

        else {
            return [
                new ExamineAction(), new TalkAction()
            ];

        }


    }


    public acties(): Action[] {

        const playerSession: PlayerSession = getPlayerSession();

        if (playerSession.mapGepakt) {
            return [
                new ExamineAction(), new TalkAction(), new PickupMapAction(), new CustomAction("go-to-bigroom", "enter the bigroom", false)
            ];
        }

        else {
            // Voeg hier een return statement toe voor het geval playerSession.mapGepakt niet waar is
            return [
                new ExamineAction(), new TalkAction()
            ];
    }
    }

    public objects(): GameObject[] {
        const playerSession: PlayerSession = getPlayerSession();

        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        if (!playerSession.inventory.includes(MapItemAlias)) {
            objects.push(new Mapitem());
        }

        objects.push(new KabouterCharacter());

        return objects;
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["There is a big maze in front of you."]);
    }

    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        if (alias === "test-me") {
            playerSession.mapGepakt = true;
            return new TextActionResult(["Je kijkt hoe groot het is"]);
        } else if (alias === "go-to-bigroom") { // Check if the button for BigRoom is clicked
            // Create a new instance of BigRoom
            const room: BigRoom = new BigRoom();
            // Set the current room to BigRoom
            getPlayerSession().currentRoom = room.alias;
            // Return the examination result of BigRoom
            return room.examine();
        }


        return undefined;
    }
}
