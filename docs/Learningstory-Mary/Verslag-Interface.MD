# Verslag over Interface


* Interfaces zijn een concept in de programmeertaal TypeScript (en ook in andere programmeertalen) die je in staat stellen om een contract te definiëren voor objecten. 
* Dit contract specificeert welke methoden en eigenschappen een object moet hebben als het een bepaalde interface implementeert. Met andere woorden, een interface
* beschrijft welke acties een object moet kunnen uitvoeren, maar geeft niet aan hoe die acties moeten worden uitgevoerd.

# Hoe gebruik je interfaces in je code?

Laten we zeggen dat je een interface genaamd Animal wilt maken die specificeert dat elk dier een methode makeSound() moet hebben. Je zou de interface als volgt kunnen definiëren:
 
# Voorbeeld:

    interface Animal {

     makeSound(): void;

    }


* Nu kun je deze interface gebruiken om verschillende dierenklassen te maken, zoals Dog, Cat, enzovoort. Elke klasse die de Animal-interface implementeert, moet de makeSound()-methode bevatten. Hier is een voorbeeld van hoe je een Dog-klasse kunt maken die de Animal-interface implementeert:



# Voorbeeld:

    class Dog implements Animal {

    makeSound(): void {

    console.log("Woof woof!");

    }

    }

* En je kunt deze Dog-klasse vervolgens gebruiken in je code om geluid te maken:

# Voorbeeld:

        const myDog = new Dog();

        myDog.makeSound(); // Dit zal "Woof woof!" uitvoeren


* Op deze manier zorgt het gebruik van interfaces ervoor dat je code gestructureerd blijft en dat verschillende objecten gelijksoortige methoden kunnen implementeren, wat handig is voor herbruikbaarheid en onderhoudbaarheid.



# Bronnen:

HBO-ICT HvA Knowledgebase. (2024). Interface. Geraadpleegd van https://knowledgebase.hbo-ict-hva.nl/1_beroepstaken/software/ontwerpen/oop/oop_concepten/oop_interface/

Bro Code. (2021). Interface Geraadpleegd van https://youtu.be/RuhGv81tpoU?si=ol6dTQ-oFWEHemCt


