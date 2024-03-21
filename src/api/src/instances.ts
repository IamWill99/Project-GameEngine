import { GameObject } from "./base/gameObjects/GameObject";
import { Room } from "./base/gameObjects/Room";
import { getPlayerSessionFromContext, resetPlayerSessionInContext } from "./base/playerSessionMiddleware";
import { ExampleCharacter, ExampleCharacterAlias } from "./characters/ExampleCharacter";
import { SkeletonCharacter, SkeletonCharacterAlias } from "./characters/SkeletonCharacter";
import { ExampleItem, ExampleItemAlias } from "./items/ExampleItem";
import { GemstoneItem, GemstoneItemAlias } from "./items/GemstoneItem";
import { ExampleRoom, ExampleRoomAlias } from "./rooms/ExampleRoom";
import { StartupRoom, StartupRoomAlias } from "./rooms/StartupRoom";
import { Thebigroom, ThebigroomAlias } from "./rooms/Thebigroom";
import { PlayerSession } from "./types";
import { MapItemAlias, Mapitem } from "./items/MapItem";
import { theMazeRoom, theMazeRoomAlias } from "./rooms/theMazeRoom";
import { KabouterCharacter, KabouterCharacterAlias } from "./characters/KabouterCharacter";

/**
 * Create a new player session object
 *
 * @returns New player session object
 */
export function createNewPlayerSession(): PlayerSession {
    return {
        currentRoom: "startup",
        inventory: [],
        pickedUpMapItem: false,
        talkedToKabouter: false,
        raadselGekregen: false,
    };
}

/**
 * Get the player session from the current request
 *
 * @returns Player session from the current request
 */
export function getPlayerSession(): PlayerSession {
    return getPlayerSessionFromContext<PlayerSession>();
}

/**
 * Reset the player session
 */
export function resetPlayerSession(): void {
    resetPlayerSessionInContext(createNewPlayerSession);
}

/**
 * Get the instance of a room by its alias
 *
 * @param alias Alias of the room
 *
 * @returns Instance of the room
 */
export function getRoomByAlias(alias: string): Room | undefined {
    switch (alias) {
        case StartupRoomAlias:
            return new StartupRoom();

        case ExampleRoomAlias:
            return new ExampleRoom();
        
        case ThebigroomAlias:
            return new Thebigroom();

            
        case theMazeRoomAlias:
            return new theMazeRoom();
    
    
    }

    

    return undefined;
}

/**
 * Get the instance of a game object by its alias
 *
 * @param alias Alias of the game object
 *
 * @returns Instance of the game object
 */
export function getGameObjectByAlias(alias: string): GameObject | undefined {
    switch (alias) {
        case ExampleItemAlias:
            return new ExampleItem();

        case ExampleCharacterAlias:
            return new ExampleCharacter();
        
        case GemstoneItemAlias:
            return new GemstoneItem();

        case SkeletonCharacterAlias:
            return new SkeletonCharacter();

        case MapItemAlias:
                return new Mapitem();

        case KabouterCharacterAlias:
            return new KabouterCharacter();
    

        //NOTE: Fall back to rooms, since those are game objects too.
        default:
            return getRoomByAlias(alias);
    }
}

/**
 * Get a list of game objects instances by their alias
 *
 * @param alias List of game object aliases
 *
 * @returns List of game object instances
 */
export function getGameObjectsByAliases(objectAliases?: string[]): GameObject[] {
    return objectAliases?.map((e) => getGameObjectByAlias(e)!).filter((e) => e) || [];
}

/**
 * Get a list of game object instances based on the inventory of the current player session
 *
 * @returns List of game object instances
 */
export function getGameObjectsFromInventory(): GameObject[] {
    return getGameObjectsByAliases(getPlayerSession().inventory);
}
