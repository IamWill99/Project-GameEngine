# Verslag Generics 

* Generics zijn een functie in TypeScript waarmee we verschillende soorten gegevens kunnen gebruiken en code kunnen hergebruiken voor verschillende invoeren. Ze laten ons tijdelijke typen definiëren die later worden vervangen door de echte typen wanneer de code wordt uitgevoerd.

* Generics werken als een soort model dat keer op keer kan worden gebruikt voor dezelfde code, maar de waarde ervan is niet afhankelijk van een specifieke aanroep van de functie.

# Voorbeeld:

    // We definiëren een generieke waarde genaamd T with <T>

    function accessFirstItem<T>(arr: T[]): T {
     return arr[0];
    }

    const numberArray: number[] = [1, 2, 3, 4, 5];

    const stringArray: string[] = ['apple', 'banana', 'orange'];

    //  De generieke waarden worden doorgegeven in <number> & <string>

    const firstNum = accessFirstItem<number>(numberArray);

    const firstStr = accessFirstItem<string>(stringArray);

# Uitleg:

In deze code hebben we een generieke klasse Container gedefinieerd, die een waarde van het generieke type T opslaat en de methode getValue heeft om deze waarde op te halen. We hebben ook deze klasse gebruikt om containerinstanties te maken voor zowel numerieke als tekenreekswaarden. Ten slotte hebben we de generieke functie accessFirstItem gebruikt om het eerste item in de gegeven arrays op te halen.

# Bronnen:

Coner Murphy. (2023). Generics Geraadpleegd van https://prismic.io/blog/typescript-generics



