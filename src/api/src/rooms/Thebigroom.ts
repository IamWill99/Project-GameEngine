import { Example, ExampleAction, ExampleActionAlias } from "../actions/ExampleAction";
import { ActionResult } from "../base/actionResults/ActionResult";
import { TextActionResult } from "../base/actionResults/TextActionResult";
import { Action } from "../base/actions/Action";
import { ExamineAction } from "../base/actions/ExamineAction";
import { TalkAction } from "../base/actions/TalkAction";
import { GameObject } from "../base/gameObjects/GameObject";
import { Room } from "../base/gameObjects/Room";
import { ExampleCharacter } from "../characters/ExampleCharacter";
import { getGameObjectsFromInventory } from "../instances";
import { ExampleItem } from "../items/ExampleItem";

export const ExampleRoomAlias: string = "the-big-room";

export class ExampleRoom extends Room implements Example {
    public constructor() {
        super(ExampleRoomAlias, ExampleActionAlias);
    }

    public name(): string {
        return "THE BIG ROOM - LEVEL : DANGER";
    }

    public images(): string[] {
        return ["eds"];
    }

    public actions(): Action[] {
        return [new ExamineAction(), new TalkAction(), new ExampleAction()];
    }

    public objects(): GameObject[] {
        const inventoryItems: GameObject[] = getGameObjectsFromInventory();

        return [this, ...inventoryItems, new ExampleItem(), new ExampleCharacter()];
    }

    public examine(): ActionResult | undefined {
        return new TextActionResult(["The big room"]);
    }

    public example(): ActionResult | undefined {
        return new TextActionResult(["This is an example action executed on a room."]);
    }
}