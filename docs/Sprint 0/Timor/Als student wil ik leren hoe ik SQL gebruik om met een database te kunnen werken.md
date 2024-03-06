# Database

-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/

-- Host: 127.0.0.1:3366
-- Gegenereerd op: 14 feb 2024 om 14:42
-- Serverversie: 8.0.12
-- PHP-versie: 7.3.11
SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";
/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT /;
/!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS /;
/!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION /;
/!40101 SET NAMES utf8mb4 */;
--
-- Database: pb3b2324_riidiitiinoo42_eduard


--
-- Tabelstructuur voor tabel character

CREATE TABLE character (
id int(11) NOT NULL,
hp int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Gegevens worden geëxporteerd voor tabel character

INSERT INTO character (id, hp) VALUES
(1, 85),
(5, 1);

--
-- Tabelstructuur voor tabel gameobject

CREATE TABLE gameobject (
id int(11) NOT NULL,
alias varchar(255) NOT NULL,
name varchar(255) NOT NULL,
description text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Gegevens worden geëxporteerd voor tabel gameobject

INSERT INTO gameobject (id, alias, name, description) VALUES
(1, 'Character', 'Josh Edward Jones', 'Broer van John'),
(3, 'Item', 'Oxygen tank', 'Heb je nodig om te kunnen overleven'),
(4, 'Final room', 'Ed's push', 'Diepte punt van the cave. Je komt er niet meer uit!'),
(5, 'Main Character', 'John Edward Jones', 'Main character die vast zit in de cave en het niet heeft overleefd.');

--
-- Tabelstructuur voor tabel item

CREATE TABLE item (
id int(11) NOT NULL,
price decimal(10,2) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Gegevens worden geëxporteerd voor tabel item

INSERT INTO item (id, price) VALUES
(3, 50.00);

--
-- Tabelstructuur voor tabel room

CREATE TABLE room (
id int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
--
-- Gegevens worden geëxporteerd voor tabel room

INSERT INTO room (id) VALUES
(4);
--
-- Indexen voor geëxporteerde tabellen
--
-- Indexen voor tabel character

ALTER TABLE character
ADD PRIMARY KEY (id);
--
-- Indexen voor tabel gameobject

ALTER TABLE gameobject
ADD PRIMARY KEY (id),
ADD UNIQUE KEY alias (alias);
--
-- Indexen voor tabel item

ALTER TABLE item
ADD PRIMARY KEY (id);
--
-- Indexen voor tabel room

ALTER TABLE room
ADD PRIMARY KEY (id);
--
-- AUTO_INCREMENT voor geëxporteerde tabellen
--
-- AUTO_INCREMENT voor een tabel gameobject

ALTER TABLE gameobject
MODIFY id int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=27;
--
-- Beperkingen voor geëxporteerde tabellen
--
-- Beperkingen voor tabel character

ALTER TABLE character
ADD CONSTRAINT character_ibfk_1 FOREIGN KEY (id) REFERENCES gameobject (id);
--
-- Beperkingen voor tabel item

ALTER TABLE item
ADD CONSTRAINT item_ibfk_1 FOREIGN KEY (id) REFERENCES gameobject (id);
--
-- Beperkingen voor tabel room

ALTER TABLE room
ADD CONSTRAINT room_ibfk_1 FOREIGN KEY (id) REFERENCES gameobject (id);
COMMIT;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT /;
/!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS /;
/!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;