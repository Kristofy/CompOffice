Feature: Oktatók oldal
	Scenario: A felhasználó meglátogathatja az oktatók oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni az oktatók oldalt
		Then Az oktatók oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given Az oktatók oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Az oktató módosíttása lehetséges
		Given Az oktatók oldal betölt AND felhasználónak van jogosultsága módosítani az oktató oldalon
		When A felhasználó a módosítás ikonra kattint
		Then Az oktató módosíttása lehetséges

	Scenario: Oktató hozzáadássa lehetséges
		Given Az oktatók oldal betölt AND felhasználónak van jogosultsága módosítani az oktató oldalon
		When A felhasználó a oktató hozzáadás ikonra kattint
		Then Az oktató hozzáadása lehetséges

	Scenario: A kijelölt oktató részletesen megjelenik
		Given Az oktatók oldal betölt
		When A felhasználó kiválaszt egy oktatót
		Then A kijelölt oktató részletesen megjelenik
