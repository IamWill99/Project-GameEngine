import { ActionResult } from "../base/actionResults/ActionResult";
import { TalkActionResult } from "../base/actionResults/TalkActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import { TalkChoiceAction } from "../base/actions/TalkAction";
import { Character } from "../base/gameObjects/Character";
import { getPlayerSession } from "../instances";
import { DeurklinkItemAlias } from "../items/DeurklinkItem";
import { PlayerSession } from "../types";


export const BoomCharacterAlias: string = "pratendeBoom";

export class BoomCharacter extends Character implements Examine{

    public constructor(){
        super(BoomCharacterAlias, ExamineActionAlias);
    }

    public name(): string {
        return "Pratende boom";
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["Vreemd genoeg heeft de boom een gezicht. Zou het kunnen praten?"]);
    }

    

    public talk(choiceId?: number | undefined): ActionResult | undefined {
        const playerSession: PlayerSession = getPlayerSession();

        if(choiceId === 20){
            return new TextActionResult(["De boom wordt boos."]);
        }
        else if(choiceId === 21){
            return new TextActionResult(["\"Voorbij de schaduwen van de grot, rusten verborgen geheimen. Een licht is jouw gids door de duisternis, een baken van hoop in de diepten van de nacht.\" Zegt de boom."]);
        }
        else if(choiceId === 22){
            playerSession.inventory = [];
            
            return new TextActionResult(["Je geeft de deurklink aan de boom. Het eet de deurklink op. \"Mmmmmm.\""]);
        }
        
        const choiceActions : TalkChoiceAction[] = [new TalkChoiceAction(20, "Beledig de boom"), new TalkChoiceAction(21, "Vraag om advies")
    ];

        if(!playerSession.talkedToBoom){
            playerSession.talkedToBoom = true;
        }


        if(playerSession.inventory.includes(DeurklinkItemAlias)) {
            choiceActions.push(new TalkChoiceAction(22, "Geef de deurklink aan de boom"));

        }

        return new TalkActionResult(this, ["\"betreed de grot niet!\" Fluistert de oude boom op mysterieuze toon. \"Diepe schaduwen huizen binnenin, hun geheimen rusten in het duister. Keer om, reiziger, voor het pad dat je nu bewandelt, draagt de last van onbekende gevaren\"."],
        choiceActions
        );
    }




}