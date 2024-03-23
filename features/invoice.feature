Feature: Számlák oldal
	Scenario: A felhasználó meglátogathatja a számlák oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a számlák oldalt
		Then A számlák oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A számlák oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Elérhető 3 féle presen a sűrők gyors állítására
		Given A számlák oldal betölt
		Then Elérhető 3 féle presen a sűrők gyors állítására

	Scenario: A kijelölt számla részletesen megjelenik
		Given A számlák oldal betölt
		When A felhasználó kiválaszt egy számlát
		Then A kijelölt számla részletesen megjelenik a számla tételeivel együtt

	Scenario: A számla módosíttása lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A számla módosíttása lehetséges

	Scenario: Számla hozzáadássa lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a számla hozzáadás ikonra kattint
		Then A számla hozzáadása lehetséges

	Scenario: Számla törlése lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a törlés ikonra kattint
		Then A számla törlése lehetséges

	Scenario: Számla Tétel törlése lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a törlés ikonra kattint
		Then A számla törlése lehetséges

	Scenario: Számla Tétel hozzáadássa lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a hozzáadás ikonra kattint
		Then A számla hozzáadása lehetséges

	Scenario: Számla Tétel módosíttása lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A számla módosíttása lehetséges

	Scenario: Számla klónozása lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a klónozás ikonra kattint
		Then A számla klónozása lehetséges
