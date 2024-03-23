Feature: Résztvevők oldal
	Scenario: A felhasználó meglátogathatja a résztvevők oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a résztvevők oldalt
		Then A résztvevők oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A résztvevők oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: A résztvevő módosíttása lehetséges
		Given A résztvevők oldal betölt AND felhasználónak van jogosultsága módosítani a résztvevő oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A résztvevő módosíttása lehetséges

	Scenario: Résztvevő hozzáadássa lehetséges
		Given A résztvevők oldal betölt AND felhasználónak van jogosultsága módosítani a résztvevő oldalon
		When A felhasználó a résztvevő hozzáadás ikonra kattint
		Then A résztvevő hozzáadása lehetséges
	
	Scenario: Több részvevő importálása excel file-ból
		Given A résztvevők oldal betölt AND felhasználónak van jogosultsága módosítani a résztvevő oldalon
		When A felhasználó a importálás ikonra kattint
		Then Több részvevő importálása lehetséges
