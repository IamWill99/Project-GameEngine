# Verslag  over abstract Class:

* Abstract Class is een type klasse in OOP's die een of meer abstracte methoden declareert. Deze klassen kunnen zowel abstracte methoden als concrete methoden bevatten. Een normale klasse kan geen abstracte methoden hebben. Een abstracte klasse is een klasse die ten minste één abstracte methode bevat.

# voorbeeld:

    abstract class Animal {

    abstract animalSound(): void;

     // Regular method

     sleep(): void {

    console.log("Zzz");

        }

    }   

    // Subclass (inherit from Animal)

    class Pig extends Animal {

     animalSound(): void {

    // The body of animalSound() is provided here

    console.log("The pig says: wee wee");

        }

    }

    class Main {

    static main(): void {

    const myPig: Pig = new Pig(); // Create a Pig object

    myPig.animalSound();

    myPig.sleep();

        }   

    }

    // Calling the main function

    Main.main();

# Korte uitleg: 

* De klasse Pig is een subklasse van Animal en implementeert de abstracte methode animalSound() door de geluiden van een varken weer te geven. Hierdoor kan Pig worden geïnstantieerd en de methoden van zowel de superklasse (sleep()) als de subklasse (animalSound()) worden aangeroepen.


# Bronnen:

Hartman, J. (2023). What is Abstraction in OOPs? Java Abstract Class & Method. Geraadpleegd vanhttps://www.guru99.com/java-data-abstraction.html#:~:text=Abstract%20Class%20is%20a%20type,at%20least%20one%20abstract%20method


W3Schools. (1999-2024). Java Abstraction. Geraadpleegd van https://www.w3schools.com/java/java_abstract.asp


