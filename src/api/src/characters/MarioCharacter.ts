import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { FlashLightItemAlias } from "../items/FlashLightItem";
import { PlayerSession } from "../types";


// Definieert een constante genaamd MarioCharacterAlias met de waarde "mario"
export const MarioCharacterAlias: string = "mario";

// Definieert een klasse genaamd MarioCharacter die de klasse Character uitbreidt en de interface Examine implementeert
export class MarioCharacter extends Character implements Examine {
    // Constructor van MarioCharacter, roept de constructor van Character aan met de alias van het personage
    public constructor() {
        super(MarioCharacterAlias, ExamineActionAlias);
    }

    // Methode name retourneert de naam van het personage, in dit geval "mario"
    public name(): string {
        return "mario";
    }

    // Methode examine retourneert tekstuele informatie over het onderzoeken van het personage
    public examine(): ActionResult | undefined {
        return new TextActionResult(["its mario"]);
    }

    // Methode talk reageert op het gesprek met het personage en geeft verschillende antwoordopties
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        console.log(playerSession.inventory);
        // Controleert de keuze van de speler en geeft het bijbehorende antwoord
        if (choiceId === 1) {
            return new TextActionResult(["I'm stuck in the cave!" , "The darkness is overwhelming. I can hardly see a thing."]);
        } else if (choiceId === 2) {
            return new TextActionResult(["We need something sturdy to help us climb out of here, like a rope!"]);
        } else if (choiceId === 3) {
            // Leegt de inventaris van de speler
            playerSession.inventory = [];
            return new TextActionResult(["you gave the light to mario" , "Thanks, partner! With this, we'll have a better chance of navigating through this darkness."]);
        }

        // Creëert actieopties op basis van de inventaris van de speler
        const ChoiceAction: TalkChoiceAction[] = [
            new TalkChoiceAction(1, "Current situation."),
            new TalkChoiceAction(2, "Look for an item!")
        ];

        // Voegt een actieoptie toe om het licht aan te doen als de zaklamp niet in de inventaris zit
        if (playerSession.inventory.includes(FlashLightItemAlias)) {
            ChoiceAction.push(new TalkChoiceAction(3, "Give the flash-light to mario"));
        }
       
        // Retourneert een actie om met het personage te praten met de beschikbare antwoordopties
        return new TalkActionResult(
            this,
            ["<Ahh I just slid into the cave and now I'm stuck>", "I knew this cave seemed dangerous, but I never expected to find myself in this situation."],
            ChoiceAction
        );
    }
}


