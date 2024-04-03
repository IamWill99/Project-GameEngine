import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { CustomAction } from "../base/actions/CustomAction";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { MapItemAlias } from "../items/MapItem";
import { PlayerSession } from "../types";

export const KabouterCharacterAlias: string = "kabouter";

export class KabouterCharacter extends Character implements Examine {

    public constructor() {
        super(KabouterCharacterAlias, ExamineActionAlias);
    }


    public name(): string {
        return "Kabouter";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Het is een klein kaboutertje."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();


        if(choiceId === 500) {
            return new TextActionResult(["Kabouter: ik geef je de kaart van het doolhof als je mijn raadsel oplost."]);
        }
        else if(choiceId === 501){
            return new TextActionResult(["Kabouter: In duistere diepten, daar ben ik te vinden. Een schat van kennis, ver weg van het binden. Met ogen die fonkelen, maar nooit echt zien. Raad eens mijn naam, wat ben ik misschien? Een fluistering in de wind, een echo van tijd, In het hart van de aarde, waar geheimen zich bevrijden. Zoek me niet te ver, ik ben nabij, Raad eens mijn naam, en ik ben van jou en jij van mij. Wat ben ik?"]);
        }
        else if(choiceId === 502){
            return new TextActionResult(["Kabouter: Dat is goed!"]);
        }
        else if(choiceId === 503){
            return new TextActionResult(["Kabouter: Dat is fout"]);
        }
        else if(choiceId === 504) {
            playerSession.inventory = [];
            
            return new TextActionResult(["You take a look at the map."]);
        }
        else if(choiceId === 505) {
            return new TextActionResult(["raadsell"]);
        }
         

        else if(!playerSession.raadselGekregen) {
            playerSession.raadselGekregen = true;
    
           return new CustomAction("raadsel", "hetraadsel", false);
        }        

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(500, "Vraag de weg aan de kabouter"), 
        
            new TalkChoiceAction(501, "Vraag om het raadsel."), new TalkChoiceAction(502, "een geheim?"), new TalkChoiceAction(503, "een geur?")

        
        ];

        

        if(playerSession.inventory.includes(MapItemAlias)) {
            choiceActions.push(new TalkChoiceAction(504, "look at the map."));
        }

        if(!playerSession.talkedToKabouter) {
            playerSession.talkedToKabouter = true;

        }

        if(!playerSession.raadselGekregen) {
            playerSession.raadselGekregen = true;
        }
        
        return new TalkActionResult(this, ["Kabouter: hallo meneer."],
        choiceActions
           
        );
    }
}