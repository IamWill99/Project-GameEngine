//import { PickupMapAction } from "../actions/PickupMapAction";
import { PickupMapAction } from "../actions/PickupMapAction";
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
        return new TextActionResult(["There is a small gnome."]);
    }

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();
        playerSession.raadselGekregen = true;


        if(choiceId === 500) {
            return new TextActionResult(["Gnome: I will give you the map if you solve my riddle."]);
        }
        else if(choiceId === 501){
            return new TextActionResult(["Gnome:I speak without a mouth and hear without ears I am not alive, yet I conquer fears. In darkness I dwell, yet light I reveal, Invisible to eyes, yet my presence you feel. What am I?"]);
        }
        else if(choiceId === 502){
            playerSession.geheimGedrukt = true;
            return new TextActionResult(["Gnome: The answer is correct! Pick up the map and find your way out"]) ;
        }
        else if(choiceId === 503){
            return new TextActionResult(["Gnome: that is the wrong answer"]);
        }
        else if(choiceId === 504) {
            playerSession.inventory = [];
            
            return new TextActionResult(["You take a look at the map."]);
        }
        else if(choiceId === 505) {
            return new TextActionResult(["raadsell"]);
        }
         

        else if(!playerSession.raadselGekregen) {
    
           return new CustomAction("raadsel", "hetraadsel", false);
        }        

        const choiceActions: TalkChoiceAction[] = [
            new TalkChoiceAction(500, "Ask the gnome for a way out"), 
        
            new TalkChoiceAction(501, "Ask for the riddle."), new TalkChoiceAction(502, "a voice?"), new TalkChoiceAction(503, "a smell?")

        
        ];

        

        if(playerSession.inventory.includes(MapItemAlias)) {
            choiceActions.push(new TalkChoiceAction(504, "look at the map."));
        }

        if(!playerSession.talkedToKabouter) {
            playerSession.talkedToKabouter = true;

        }
        
        return new TalkActionResult(this, ["Kabouter: hello stranger."],
        choiceActions
           
        );

     //   if(!playerSession.raadselOpgelost) {
     //       playerSession.raadselOpgelost = true;
      //  }

     //   return new PickupMapAction
    }
}