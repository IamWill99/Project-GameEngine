import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { FlashLightItemAlias } from "../items/FlashLightItem";
import { RopeItemAlias } from "../items/RopeItem";
import { PlayerSession } from "../types";


// Definieert een constante genaamd JohnCharacterAlias met de waarde "mario"
export const JohnCharacterAlias: string = "John";

// Definieert een klasse genaamd JohnCharacter die de klasse Character uitbreidt en de interface Examine implementeert
export class JohnCharacter extends Character implements Examine {
    // Constructor van JohnCharacter, roept de constructor van Character aan met de alias van het personage
    public constructor() {
        super(JohnCharacterAlias, ExamineActionAlias);
    }

    // Methode name retourneert de naam van het personage, in dit geval "John"
    public name(): string {
        return "Josh Johns";
    }

    // Methode examine retourneert tekstuele informatie over het onderzoeken van het personage
    public examine(): ActionResult | undefined {
        return new TextActionResult(["John: This cave looks deep!", "Josh: it's about 45 meter deep!"]);
    }

    // Methode talk reageert op het gesprek met het personage en geeft verschillende antwoordopties
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        console.log(playerSession.inventory);

        // Controleert de keuze van de speler en geeft het bijbehorende antwoord
        if (choiceId === 1) {
            return new TextActionResult(["John: I'm stuck in the cave!", "Josh: The darkness is overwhelming. I can hardly see a thing."]);


        } else if (choiceId === 2) {
            return new TextActionResult([ "John: We need something to navigate through the darkness of the cave, like a flashlight!"]);

        } else if (choiceId === 3) {
            return new TextActionResult(["John: We need something sturdy to help us climb out of here, like a rope!"]);


        } else if (choiceId === 4) {
            // Leegt de inventaris van de speler
            playerSession.inventory = [];
            return new TextActionResult(["Josh: Yes I found a rope" , "John: I, can't belive this! , we now have a chance to climp through this this scary cave."]);

        } else if (choiceId === 5) {
            // Leegt de inventaris van de speler
            playerSession.inventory = [];
            return new TextActionResult(["John: Yes a flashlight" , "Josh: With this, we'll have a better chance of navigating through this darkness."]);

        }


        if (!playerSession.talkedToJohn) {
            playerSession.talkedToJohn = true;
        }


        // Creëert actieopties op basis van de inventaris van de speler
        const ChoiceAction: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Current situation."),
            new TalkChoiceAction(2, "Look for an item!"),
            new TalkChoiceAction(3, "Look for an second item!"),
            
        ];

        // Voegt een actieoptie toe om het licht aan te doen als de zaklamp niet in de inventaris zit
        if (playerSession.inventory.includes(FlashLightItemAlias)) {
            ChoiceAction.push(new TalkChoiceAction(5, "Give the flash-light to John"));
        }

        if (playerSession.inventory.includes(RopeItemAlias)) {
            ChoiceAction.push(new TalkChoiceAction(4, "Give the rope to Josh"));
        }
       
        // Retourneert een actie om met het personage te praten met de beschikbare antwoordopties
        return new TalkActionResult(
            this,
            ["John: Ahh! I just slid into the cave and now I'm stuck. The jagged rocks scrape against my skin, causing sharp pains to shoot through my body.", "Josh: I knew this cave seemed dangerous, but I never expected to find myself in this situation."],
            ChoiceAction
        );
    }
}


