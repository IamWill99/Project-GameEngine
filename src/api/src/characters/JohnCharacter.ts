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


// Definieert een constante genaamd JohnCharacterAlias met de waarde "The spirit of John Jones"
export const JohnCharacterAlias: string = "The spirit of John Jones";

// Definieert een klasse genaamd JohnCharacter die de klasse Character uitbreidt en de interface Examine implementeert
export class JohnCharacter extends Character implements Examine {
    // Constructor van JohnCharacter, roept de constructor van Character aan met de alias van het personage
    public constructor() {
        super(JohnCharacterAlias, ExamineActionAlias);
    }

    // Methode name retourneert de naam van het personage, in dit geval "The spirit of John Jones"
    public name(): string {
        return "The spirit of John Jones";
    }

    // Methode examine retourneert tekstuele informatie over het onderzoeken van het personage
    public examine(): ActionResult | undefined {
        return new TextActionResult(["Player: This cave looks deep!", " I think it's about 45 meter deep!"]);
    }

    // Methode talk reageert op het gesprek met het personage en geeft verschillende antwoordopties
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        console.log(playerSession.inventory);

        // Controleert de keuze van de speler en geeft het bijbehorende antwoord
        if (choiceId === 1) {
            return new TextActionResult(["Player: Ahh! I just slid into the cave and now I'm stuck. The jagged rocks scrape against my skin, causing sharp pains to shoot through my body."
         ]);


        } else if (choiceId === 2) {
            return new TextActionResult(["The spirit of John Jones: 'Seek the light, it will illuminate your path and lead you to safety.", "Move 6 steps forward and 1 step to the left, then kneel down and pick up the flashlight."]);

        } else if (choiceId === 3) {
            return new TextActionResult(["The spirit of John Jones: 'Find something strong, like a rope, to help you climb out of this cave.", "Explore the darkest corners of the cave with your flashlight. Look for any hidden openings or crevices. Reach carefully into the shadows and retrieve the rope."]);

        } else if (choiceId === 7) {
            return new TextActionResult(["In a forgotten cave, a brave explorer named Josh Jones once ventured. As he explored dark passages the cave collapsed. His body vanished, but his spirit remained guiding those who enter the cave."]);

        } else if (choiceId === 8) {
            return new TextActionResult(["You willl stay in this cave forever"]);

        } else if (choiceId === 9) {
            return new TextActionResult(["You have to find itmes the first"]);

        } else if (choiceId === 4) {
            // Leegt de inventaris van de speler
            playerSession.inventory = [];
            return new TextActionResult(["Player: 'Yes, I found a rope!", "The spirit of John Jones: 'Excellent! With this rope, you now have a chance to escape this darkness.'", "You can now climb out of the cave and proceed to the next area."]);

        } else if (choiceId === 5) {
            // Leegt de inventaris van de speler
            playerSession.inventory = [];
            return new TextActionResult(["Player: 'Ah ha! I found a flashlight! With this, we can navigate through this dark cave more easily."]);

        }


        if (!playerSession.talkedToJohn) {
            playerSession.talkedToJohn = true;
        }


        // Creëert actieopties op basis van de inventaris van de speler
        const ChoiceAction: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Current situation."),
            new TalkChoiceAction(2, "Look for an item!"),
            new TalkChoiceAction(3, "Look for a second item!"),
            new TalkChoiceAction(7, "Back Story of The spirit of John Jones "),
            new TalkChoiceAction(8, "Don't believe the spirit"),
            
        ];

        // Voegt een actieoptie toe om het licht aan te doen als de zaklamp niet in de inventaris zit
        if (playerSession.inventory.includes(FlashLightItemAlias)) {
            ChoiceAction.push(new TalkChoiceAction(5, "Give the flash-light to the player"));
        }

        if (playerSession.inventory.includes(RopeItemAlias)) {
            ChoiceAction.push(new TalkChoiceAction(4, "Give the rope to the player"));
        }

       
        // Retourneert een actie om met het personage te praten met de beschikbare antwoordopties
        return new TalkActionResult(
            this,
            ["Player: I'm stuck in the cave! The darkness is overwhelming. I can hardly see a thing.",
            "The spirit of John Jones: Welcome, traveler. I am here to guide you through the dark and treacherous caverns.",
            "Player: Am I hearing voices?  Or am I just being paranoid?"],
            ChoiceAction
        );
    }
}