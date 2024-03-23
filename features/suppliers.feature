Feature: Suppliers oldal
	Scenario: A felhasználó meglátogathatja a suppliers oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a suppliers oldalt
		Then A suppliers oldal betölt


	Scenario: A kijelölt supplier részletesen megjelenik
		Given A suppliers oldal betölt
		When A felhasználó kiválaszt egy supplieret
		Then A kijelölt supplier részletesen megjelenik

	Scenario: A supplier módosíttása lehetséges
		Given A suppliers oldal betölt AND felhasználónak van jogosultsága módosítani a supplier oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A supplier módosíttása lehetséges

	Scenario: Supplier hozzáadássa lehetséges
		Given A suppliers oldal betölt AND felhasználónak van jogosultsága módosítani a supplier oldalon
		When A felhasználó a supplier hozzáadás ikonra kattint
		Then A supplier hozzáadása lehetséges
