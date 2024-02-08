import { html, LitElement } from "lit";
import { nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

interface HTMLInputEvent extends Event {
    target: HTMLInputElement;
}

interface HTMLSelectEvent extends Event {
    target: HTMLSelectElement;
}

@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    private formData: GameObjectFormResult = {
        alias: "",
        name: "",
        description: "",
        type: "",
        price: 0,
        hp: 0,
    };

    private handleAliasChange(event: HTMLInputEvent): void {
        this.formData.alias = event.target.value;
    }

    private handleNameChange(event: HTMLInputEvent): void {
        this.formData.name = event.target.value;
    }

    private handleDescriptionChange(event: HTMLInputEvent): void {
        this.formData.description = event.target.value;
    }

    private handleTypeChange(event: HTMLSelectEvent): void {
        this.formData.type = event.target.value;
        this.requestUpdate();
    }

    private handlePriceChange(event: HTMLInputEvent): void {
        const price: number = parseFloat(event.target.value.replace(",", "."));
        this.formData.price = isNaN(price) || price < 0 ? 0 : price;
    }

    private handleHpChange(event: HTMLInputEvent): void {
        const hp: number = parseInt(event.target.value);
        this.formData.hp = isNaN(hp) || hp < 0 ? 0 : hp;
    }

    private async handleAddButtonClick(): Promise<void> {
        const success: boolean = await addGameObject(this.formData);
        if (success) {
            console.log("Game object added successfully");
        } else {
            console.error("Failed to add game object");
        }
    }    

    public render(): ReturnType<LitElement["render"]> {
        return html`
            <div>
                <label for="alias">Alias:</label>
                <input id="alias" type="text" @input="${this.handleAliasChange}">
            </div>
            <div>
                <label for="name">Name:</label>
                <input id="name" type="text" @input="${this.handleNameChange}">
            </div>
            <div>
                <label for="description">Description:</label>
                <textarea id="description" @input="${this.handleDescriptionChange}"></textarea>
            </div>
            <div>
                <label for="type">Type:</label>
                <select id="type" @change="${this.handleTypeChange}">
                    <option value="Item">Item</option>
                    <option value="Room">Room</option>
                    <option value="Character">Character</option>
                </select>
            </div>
            ${this.formData.type === "Item" ? html`
                <div>
                    <label for="price">Price:</label>
                    <input id="price" type="number" min="0" step="0.01" @input="${this.handlePriceChange}">
                </div>
            ` : nothing}
            ${this.formData.type === "Character" ? html`
                <div>
                    <label for="hp">HP:</label>
                    <input id="hp" type="number" min="0" step="1" @input="${this.handleHpChange}">
                </div>
            ` : nothing}
            <button @click="${this.handleAddButtonClick}">Add ${this.formData.type}</button>
        `;
    }
}
