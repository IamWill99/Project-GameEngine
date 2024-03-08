import { Pickup, PickupActionAlias } from "../actions/PickupAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Examine, ExamineActionAlias } from "../base/actions/ExamineAction";
import {Item} from "../base/gameObjects/Item";
import { getPlayerSession } from "../instances";
import { PlayerSession } from "../types";


// Definieert een constante genaamd FlashLightItemAlias met de waarde "flas-light"
export const FlashLightItemAlias: string = "flas-light";

// Definieert een klasse genaamd FlashLightItem die de klasse Item uitbreidt en implementeert interfaces Examine en Pickup
export class FlashLightItem extends Item implements Examine, Pickup {

     // Constructor van FlashLightItem, roept de constructor van Item aan met de alias van de zaklamp
   public constructor() {
        super(FlashLightItemAlias, ExamineActionAlias, PickupActionAlias);
    }
    
   // Methode name retourneert de naam van de zaklamp, in dit geval "Flas-Light"
    public name(): string {
        return "Flas-Light";
    }

    // Methode examine retourneert tekstuele informatie over het onderzoeken van de zaklamp
    public examine(): ActionResult | undefined {
       return new TextActionResult(["You have to pick up the flash-light first"]);
    }

     // Methode pickup controleert of de speler de zaklamp kan oppakken en voegt deze toe aan de inventory van de speler
   public pickup(): ActionResult | undefined {
    const playerSession: PlayerSession = getPlayerSession();
    
    // console.log("zaklamp");
    // console.log(playerSession.inventory.includes(FlashLightItemAlias));

        // Controleert of de zaklamp niet al in de inventory van de speler zit
    if(!playerSession.inventory.includes(FlashLightItemAlias)){
        console.log("We pakken hem op");
        
         // Voegt de zaklamp toe aan de inventory van de speler
        playerSession.inventory.push(FlashLightItemAlias);

         // Retourneert een tekstuele boodschap dat de speler de zaklamp heeft opgepakt
        return new TextActionResult (["You pick up the flash-light."]);
    }
    console.log("oppakken mislukt :-(");
    
    
    // Geeft undefined terug als de zaklamp al in de inventory van de speler zit
    return undefined;
    
    }
}