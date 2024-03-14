import { PickupAction } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { CustomAction } from "../base/actions/CustomAction";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { MarioCharacter } from "../characters/MarioCharacter";
import { getGameObjectsFromInventory, getPlayerSession } from "../instances";
import { FlashLightItem, FlashLightItemAlias } from  "../items/FlashLightItem";
import { PlayerSession } from "../types";

// Definieert een constante genaamd BigslideRoomAlias met de waarde "bigslide"
export const BigslideRoomAlias: string = "bigslide";

// Definieert een klasse genaamd BigslideRoom die de klasse Room uitbreidt
export class BigslideRoom extends Room {

    // Constructor van BigslideRoom, roept de constructor van Room aan met de alias van de kamer
    public constructor() {
        super(BigslideRoomAlias);
    }

    // Methode name retourneert de naam van de kamer, in dit geval "Bigslide"
    public name(): string {
        return "Bigslide";
    }

    // Methode images retourneert een array met afbeeldingsnamen, hier alleen "bigslide"
    public images(): string[] {
        return ["bigslide",];
    }

    // Methode actions retourneert een array van acties die beschikbaar zijn in de kamer
    public actions(): Action[] {
        return [
            new ExamineAction(),
            new PickupAction(),
            new TalkAction(),
            new CustomAction("test-me", "Test the slide", false)
        ];
    }

    // Methode objects retourneert een array van spelobjecten die in de kamer aanwezig zijn
    public objects(): GameObject[] {
        // Haalt de speler op uit de sessie
        const PlayerSession: PlayerSession = getPlayerSession();

        // Initialiseert een array van spelobjecten met de kamer zelf en objecten uit de inventory
        const objects: GameObject[] = [this, ...getGameObjectsFromInventory()];

        // Controleert of de zaklamp niet in de inventory van de speler zit en voegt deze toe aan de objecten
        if (!PlayerSession.inventory.includes(FlashLightItemAlias)) {
            objects.push(new FlashLightItem());
        }

        // Voegt een MarioCharacter toe aan de objecten
        objects.push(new MarioCharacter());

        return objects;
    }

    // Methode examine retourneert tekstuele informatie over het onderzoeken van de kamer
    public examine(): ActionResult | undefined {
        return new TextActionResult(["This cave looks deep!", "it's about 45 meter deep!"]);
    }

    // Methode custom voert aangepaste acties uit op basis van de meegegeven alias
    
    public custom(alias: string, _gameObjects: GameObject[] | undefined): ActionResult | undefined {
        
        // Controleert of de alias "test-me" is en retourneert bijbehorende tekstuele informatie
        if(alias === "test-me") {
            return new TextActionResult(["The slide looks dangerous", "and its rough"]);
        }

        return undefined;
    }
}
