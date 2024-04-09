Feature: Modulok oldal
	Scenario: A felhasználó meglátogathatja a modulok oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a modulok oldalt
		Then A modulok oldal betölt

	Scenario: A Szűrők megfelelően működnek, üres állapotból indulnak
		Given A modulok oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: A kijelölt modul részletesen megjelenik
		Given A modulok oldal betölt
		When A felhasználó kiválaszt egy modult
		Then A kijelölt modul részletesen megjelenik

	Scenario: Modulok módosíttása
		Given A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A modulok módosíttása lehetséges

	Scenario: Modulok hozzáadássa lehetséges
		Given A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon
		When A felhasználó a modul hozzáadás ikonra kattint
		Then A modul hozzáadása lehetséges
