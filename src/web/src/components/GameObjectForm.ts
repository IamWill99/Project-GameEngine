import { html, LitElement, css, nothing } from "lit";
import { customElement } from "lit/decorators.js";
import { GameObjectFormResult } from "../shared/GameObjectFormResult";
import { addGameObject } from "../services/routeService";

// Definieer interfaces voor events
interface HTMLInputEvent extends Event {
    target: HTMLInputElement;
}

interface HTMLSelectEvent extends Event {
    target: HTMLSelectElement;
}

// Decorator om het element te registreren in de browser
@customElement("gameobject-form")
export class GameObjectForm extends LitElement {
    // Formuliergegevens
    private formData: GameObjectFormResult = {
        alias: "",
        name: "",
        description: "",
        type: "",
        price: 0,
        hp: 0,
    };

    // Variabelen om zichtbaarheid van berichten bij te houden
    private successMessageVisible = false;
    private errorMessageVisible = false;

    // Event handlers voor inputwijzigingen
    private handleAliasChange(event: HTMLInputEvent): void {
        this.formData.alias = event.target.value;
    }

    private handleNameChange(event: HTMLInputEvent): void {
        this.formData.name = event.target.value;
    }

    private handleDescriptionChange(event: HTMLInputEvent): void {
        this.formData.description = event.target.value;
    }

    // Event handler voor wijziging van het type
    private handleTypeChange(event: HTMLSelectEvent): void {
        this.formData.type = event.target.value;
        // Reset de form wanneer een ander type wordt gekozen
        this.formData.alias = "";
        this.formData.name = "";
        this.formData.description = "";
        this.formData.price = 0;
        this.formData.hp = 0;

        // Maak inputvelden leeg
        const aliasInput: HTMLInputElement | null = this.shadowRoot?.getElementById("alias") as HTMLInputElement;
        if (aliasInput) aliasInput.value = "";

        const nameInput: HTMLInputElement | null = this.shadowRoot?.getElementById("name") as HTMLInputElement;
        if (nameInput) nameInput.value = "";

        const descriptionInput: HTMLTextAreaElement | null = this.shadowRoot?.getElementById("description") as HTMLTextAreaElement;
        if (descriptionInput) descriptionInput.value = "";

        const priceInput: HTMLInputElement | null = this.shadowRoot?.getElementById("price") as HTMLInputElement;
        if (priceInput) priceInput.value = "";

        const hpInput: HTMLInputElement | null = this.shadowRoot?.getElementById("hp") as HTMLInputElement;
        if (hpInput) hpInput.value = "";

        this.requestUpdate();
    }

    // Event handlers voor prijs- en HP-wijzigingen
    private handlePriceChange(event: HTMLInputEvent): void {
        const price: number = parseFloat(event.target.value.replace(",", "."));
        this.formData.price = isNaN(price) || price < 0 ? 0 : price;
    }

    private handleHpChange(event: HTMLInputEvent): void {
        const hp: number = parseInt(event.target.value);
        this.formData.hp = isNaN(hp) || hp < 0 ? 0 : hp;
    }

    // Event handler voor toevoegen van een game object
    private async handleAddButtonClick(): Promise<void> {
        const success: boolean = await addGameObject(this.formData);
        this.successMessageVisible = success;
        this.errorMessageVisible = !success;
        this.requestUpdate();
        console.log("Formulier ingevulde gegevens:", this.formData);
    }

    // CSS voor de component
    public static styles = css`
        .message {
            font-weight: bold;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
        }

        .success-message {
            color: green;
            background-color: lightgreen;
        }

        .error-message {
            color: red;
            background-color: lightcoral;
        }
    `;

    // Render functie voor het weergeven van de component
    public render(): ReturnType<LitElement["render"]> {
        return html`
            ${this.successMessageVisible ? html`
                <div class="message success-message">Spelobject succesvol toegevoegd</div>
            ` : nothing}
            ${this.errorMessageVisible ? html`
                <div class="message error-message">Toevoegen van spelobject mislukt</div>
            ` : nothing}
            <div>
                <label for="type">Type:</label>
                <select id="type" @change="${this.handleTypeChange}">
                    <option value="" disabled selected>Kies een optie</option>
                    <option value="Item">Item</option>
                    <option value="Room">Room</option>
                    <option value="Character">Character</option>
                </select>
            </div>
            <div>
                <label for="alias">Alias:</label>
                <input id="alias" type="text" @input="${this.handleAliasChange}">
            </div>
            <div>
                <label for="name">Naam:</label>
                <input id="name" type="text" @input="${this.handleNameChange}">
            </div>
            <div>
                <label for="description">Beschrijving:</label>
                <textarea id="description" @input="${this.handleDescriptionChange}"></textarea>
            </div>
            ${this.formData.type === "Item" ? html`
                <div>
                    <label for="price">Prijs:</label>
                    <input id="price" type="number" min="0" step="0.01" @input="${this.handlePriceChange}">
                </div>
            ` : nothing}
            ${this.formData.type === "Character" ? html`
                <div>
                    <label for="hp">HP:</label>
                    <input id="hp" type="number" min="0" step="1" @input="${this.handleHpChange}">
                </div>
            ` : nothing}
            <button @click="${this.handleAddButtonClick}">Toevoegen ${this.formData.type}</button>
        `;
    }
}
