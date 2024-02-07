import { html, LitElement, TemplateResult } from "lit";
import { customElement, } from "lit/decorators.js";

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {

    public render(): TemplateResult<1> {
        return html`
            <p>Hello world!</p>
        `;
    }
}