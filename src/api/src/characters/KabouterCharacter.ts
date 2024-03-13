import { ActionResult } from "../base/actionResults/ActionResult";
import { Character } from "../base/gameObjects/Character";

export const KabouterCharacterAlias: string = "kabouter";

export class KabouterCharacter extends Character {
    public talk(choiceId?: number | undefined): ActionResult | undefined {
        throw new Error("Method not implemented.");
    }
    public name(): string {
        throw new Error("Method not implemented.");
    }
    public constructor() {
        super(KabouterCharacterAlias);
    }
}