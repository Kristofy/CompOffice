Feature: Product oldal
	Scenario: A felhasználó meglátogathatja a product oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a product oldalt
		Then A product oldal betölt
	
	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A product oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: A kijelölt product részletesen megjelenik
		Given A product oldal betölt
		When A felhasználó kiválaszt egy productet
		Then A kijelölt product részletesen megjelenik a hozzáadott modulokkal együtt

	Scenario: A product módosíttása lehetséges
		Given A product oldal betölt AND felhasználónak van jogosultsága módosítani a product oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A product módosíttása lehetséges

	Scenario: Product hozzáadássa lehetséges
		Given A product oldal betölt AND felhasználónak van jogosultsága módosítani a product oldalon
		When A felhasználó a product hozzáadás ikonra kattint
		Then A product hozzáadása lehetséges
