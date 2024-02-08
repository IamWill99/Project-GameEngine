import { GameObjectFormResult } from "../shared/GameObjectFormResult";

export async function addGameObject(formData: GameObjectFormResult): Promise<boolean> {
    try {
        const response: Response = await fetch("http://localhost:3001/gameobject/add", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(formData),
        });

        if (response.ok) {
            return true;
        } else {
            return false;
        }
    } catch (error: any) {
        console.error("Error adding game object:", error);
        return false;
    }
}