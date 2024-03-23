Feature: Kapcsolattartók oldal
	Scenario: A felhasználó meglátogathatja a kapcsolattartók oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a kapcsolattartók oldalt
		Then A kapcsolattartók oldal betölt
	
	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A kapcsolattartók oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: A kijelölt kapcsolattartó részletesen megjelenik
		Given A kapcsolattartók oldal betölt
		When A felhasználó kiválaszt egy kapcsolattartót
		Then A kijelölt kapcsolattartó részletesen megjelenik

	Scenario: A kapcsolattartó módosíttása lehetséges
		Given A kapcsolattartók oldal betölt AND felhasználónak van jogosultsága módosítani a kapcsolattartó oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A kapcsolattartó módosíttása lehetséges

	Scenario: Kapcsolattartó hozzáadássa lehetséges
		Given A kapcsolattartók oldal betölt AND felhasználónak van jogosultsága módosítani a kapcsolattartó oldalon
		When A felhasználó a kapcsolattartó hozzáadás ikonra kattint
		Then A kapcsolattartó hozzáadása lehetséges
