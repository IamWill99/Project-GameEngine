import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";


// Definieert een constante genaamd PickupActionAlias met de waarde "pickup"
export const PickupActionAlias: string = "pickup";

// Interface Pickup definieert een methode pickup() die een ActionResult of undefined retourneert
export interface Pickup{
    pickup(): ActionResult | undefined;
}

// Definieert een klasse genaamd PickupAction die de klasse Action uitbreidt
export class PickupAction extends Action {

// Constructor van PickupAction, roept de constructor van Action aan met de alias van de actie, naam en of het een directe actie is

  public constructor (){
        super(PickupActionAlias, "Pickup", true);
    }


 // Statische methode handle voert de pickup-actie uit op een GameObject
    public static handle(gameObject: GameObject): ActionResult | undefined {

// Controleert of het GameObject de interface Pickup implementeert
        if (implementsInterface(gameObject, PickupActionAlias)) {

// Voert de pickup-methode uit op het GameObject en retourneert het resultaat
            return castTo<Pickup>(gameObject).pickup();
        }

        return undefined;
    }
}