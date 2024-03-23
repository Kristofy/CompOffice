Feature: Projekt oldal
	Scenario: A felhasználó meglátogathatja a projekt oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a projekt oldalt
		Then A projekt oldal betölt

	Scenario: A projekt oldalon a megfelelő adatok jelennek meg
		Given A projekt oldal betölt
		Then A Projekt oldalon a megfelelő adatok jelennek meg
	
	Scenario: A törlés ikonok megfelelően működnek
		Given A projekt oldal betölt
		When felhasználónak van jogosultsága módosítani a projekt oldalon
		Then A törlés ikon megjelenik minden projekt mellett

	Scenario: A törlés ikonra kattintva a projekt törlődik
		Given A projekt oldal betölt
		When felhasználó törölni próbál egy projektet
		Then A projekt törlődik, minden hozzá tartozó adattal együtt

	Scenario: A felhasználónak nincs jogosultsága módosíttani a projekt oldalon
		Given A projekt oldal betölt
		When A felhasználónak nincs jogosultsága módosíttani a projekt oldalon
		Then A projekt oldalon törlés ikon nem jelenik meg

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A projekt oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: Projektek kiválaszthatóak, és ezek megjelennek részletesen
		Given A projekt oldal betölt
		When A felhasználó kiválaszt egy projektet
		Then A projekt részletesen megjelenik
	
	Scenario: Összesített oldal megfelelő adatokat jelenítt meg
		Given A projekt részletesen megjelenik
		When A felhasználó kiválasztja az összesített oldalt
		Then A összesített oldal megfelelő adatokat jelenítt meg

	Scenario: Modulok oldal megfelelő adatokat jelenítt meg
		Given A projekt részletesen megjelenik
		When A felhasználó kiválasztja a modulok oldalt
		Then A modulok oldal megfelelő adatokat jelenítt meg

	Scenario: A Rendelések oldal megfelelő adatokat jelenítt meg
		Given A projekt részletesen megjelenik
		When A felhasználó kiválasztja a rendelések oldalt
		Then A rendelések oldal megfelelő adatokat jelenítt meg

	Scenario: A felhasználó klónoz egy projectet
		Given A felhasználó kiválasztja az összesített oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a klónozás ikonra kattint
		Then A projekt klónozása lehetséges

	Scenario: Egységes módosíttás
		Given A felhasználó kiválasztja az összesített oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A projekt moduljai egyszerre módosíthatóak

	Scenario: Megrendelés törlése
		Given A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a törlés ikonra kattint
		Then A rendelés törlése lehetséges

	Scenario: Megrendelés módosíttása
		Given A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A rendelés módosíttása lehetséges

	Scenario: A Modulok törlése lehetséges
		Given A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a törlés ikonra kattint
		Then A modulok törlése lehetséges

	Scenario: A Modulok módosíttása lehetséges
		Given A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A modulok módosíttása lehetséges

	Scenario: Order hozzáadássa lehetséges
		Given A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a rendelés hozzáadás ikonra kattint
		Then A rendelés hozzáadása lehetséges

	Scenario: Modul hozzáadássa lehetséges
		Given A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon AND a kiválasztott projektnek még nincs minden modulja hozzáadva
		When A felhasználó a modul hozzáadás ikonra kattint
		Then A modul hozzáadása lehetséges

	Scenario: Új projekt hozzáadássa lehetséges
		Given A felhasználó kiválasztja a projekt oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a projekt hozzáadás ikonra kattint
		Then A projekt hozzáadása lehetséges
