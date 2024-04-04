import { ActionResult } from "../base/actionResults/ActionResult";
import { Action } from "../base/actions/Action";
import { GameObject } from "../base/gameObjects/GameObject";
import { castTo, implementsInterface } from "../base/helpers";

export const PickupMapActionAlias: string = "pickup map";

export interface Pickup{
    pickup():ActionResult | undefined;
}

export class PickupMapAction extends Action {
    public constructor() {
        super(PickupMapActionAlias, "Pickup", true);
    }

    public static handle(gameObject: GameObject): ActionResult | undefined {
        if (implementsInterface(gameObject, PickupMapActionAlias)) {
            return castTo<Pickup>(gameObject).pickup();
            //return (gameObject as unknown as Pickup).pickup();
        }

        return undefined;
    }
}