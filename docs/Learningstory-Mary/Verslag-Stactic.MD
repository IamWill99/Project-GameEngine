# Verslag over static variabelen en functies  

# Wat is een static variabele? 

* Een static variabele is een variabele in een programma die wordt gedeeld door alle instanties (objecten) van een bepaalde klasse. Dit betekent dat er slechts één stuk van deze variabele bestaat, ongeacht hoeveel objecten van die klasse worden gemaakt.

# Hoe maak je een static variabele aan?

* Om een static variabele aan te maken, gebruik je het keyword static bij de variabeledefinitie binnen de klasse

# Voorbeeld:

    class Car { 

	static totalCars: number = 0;

    }

Hier is totalCars een static variabele in de klasse Car.

# Hoe kan je een static variabele in een class van buitenaf gebruiken?

Je kunt een static variabele benaderen met de klassenaam gevolgd door een punt en de naam van de variabele.

# Voorbeeld:

    Car.totalCars = 10;
    
    console.log(Car.totalCars); // Output: 10

# Wat is een static functie?

Een static functie is een functie in een klasse die kan worden aangeroepen zonder dat je een instantie van die klasse hoeft te maken. Dit betekent dat je de functie kunt aanroepen met behulp van de klassenaam zelf.

# Hoe maak je een static functie aan?

Om een static functie aan te maken, gebruik je ook het keyword static, maar dan voor de functiedefinitie binnen de klasse.

# Voorbeeld:

    class Car {
	
    static totalCars: number = 0; 

	constructor() { 
	      Car.totalCars++;  
      }}

Hier is constructor() een methode, maar geen static functie.

# Hoe kan je een static functie aanroepen?

Je kunt een static functie aanroepen met behulp van de klassenaam gevolgd door een punt en de naam van de functie.

# Voorbeeld:

    Class Car {

    static totalCars: number = 0;

    constructor() {
        Car.totalCars++;

    } static getTotalCars(): number {

        return Car.totalCars;

    }
    
    }
    
    let a = new Car();
    
    let b = new Car();console.log(Car.
    
    getTotalCars()); // Output: 2



Dit zijn de basisprincipes van static variabelen en functies in TypeScript. Ze zijn handig voor het delen van gegevens en functionaliteit tussen verschillende instanties van een klasse zonder dat je een object hoeft te maken.

# Bronnen:

HBO-ICT HvA Knowledgebase. (2024). Static variabelen en functies. Geraadpleegd van https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/oop_static/

Microchip Technology Inc. (1998-2024). Static variabelen. Geraadpleegd van https://skills.microchip.com/fundamentals-of-the-c-programming-language-part-ii/699889#:~:text=A%20variable%20declared%20as%20static,the%20variable%20doesn%27t%20exist.



SheCodes. (2024). [TypeScript] - How to define and access static properties in TypeScript. Geraadpleegd van https://www.shecodes.io/athena/53001-how-to-define-and-access-static-properties-in-typescript#:~:text=Sure!,an%20instance%20of%20the%20class.


