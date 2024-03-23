Feature: Ügyfél oldal
	Scenario: A felhasználó meglátogathatja az ügyfél oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni az ügyfél oldalt
		Then Az ügyfél oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given Az ügyfél oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Az ügyfél módosíttása lehetséges
		Given Az ügyfél oldal betölt AND felhasználónak van jogosultsága módosítani az ügyfél oldalon
		When A felhasználó a módosítás ikonra kattint
		Then Az ügyfél módosíttása lehetséges

	Scenario: Ügyfél hozzáadássa lehetséges
		Given Az ügyfél oldal betölt AND felhasználónak van jogosultsága módosítani az ügyfél oldalon
		When A felhasználó a ügyfél hozzáadás ikonra kattint
		Then Az ügyfél hozzáadása lehetséges
