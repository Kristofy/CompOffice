Feature: Szerkesztő oldalak
	Scenario: A szerkesztő oldalakra navigálva megjelenítés jogosultsággal nem teszi lehetővé az adatok módosíttását csupán megtekintését
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a szerkesztő oldalon AND A felhasználónak nincs jogosultsága módosítani a szerkesztő oldalon
		Then A szerkesztő oldal betölt, de a módosíttás nem lehetséges

	Scenario: Új adat hozzáadása lehetséges
		Given A felhasználó bejelentkezett AND A felhasználónak van jogosultsága módosítani a szerkesztő oldalon
		When A felhasználó a hozzáadás ikonra kattint
		Then Új adat hozzáadása lehetséges

	Scenario: Szerkesztés lehetséges
		Given A felhasználó bejelentkezett AND A felhasználónak van jogosultsága módosítani a szerkesztő oldalon
		When A felhasználó a módosítás ikonra kattint
		Then Szerkesztés lehetséges

	Scenario: Módosíttás lehetséges
		Given Új adat hozzáadása lehetséges OR Szerkesztés lehetséges
		Then Módosíttás lehetséges

	Scenario: Egy mező módosíttása tartja az adatbázis megszorításait
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then Az adatbázis megszoríttásai a kliens oldalon ellenőrzésre kerülnek

	Scenario: Módosíttás után invalid mező jelzése
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then Az invalid mező jelzése megjelenik, hibaüzenettel

	Scenario: A mentés csak akkor lehetséges ha minden mező valid
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then A mentés csak akkor lehetséges ha minden mező valid

	Scenario: A tényleges változások csak a mentés pillanatában érvényesülnek
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then A tényleges változások csak a mentés pillanatában érvényesülnek
	
	Scenario: A mentés után az adatok azonnal frissülnek és visszanavigálunk az előző oldalra
		Given Módosíttás lehetséges
		When A felhasználó ment
		Then A mentés után az adatok azonnal frissülnek és visszanavigálunk az előző oldalra

	Scenario: Az igaz / hamis mezők checkbox-ként jelennek meg
		Given Módosíttás lehetséges
		Then Az igaz / hamis mezők checkbox-ként jelennek meg

	Scenario: A több de véges constrain-t ből származó lehetséges értékek kereshető dropdown-ként jelennek meg
		Given Módosíttás lehetséges
		Then A több de véges constrain-t ből származó lehetséges értékek kereshető dropdown-ként jelennek meg

	Scenario: Az adatbázis kapcsolatoknak megfelelően, ha egy módosíttás nem egyértelmű változásokat vonna maga után, a felhasználót értesítjük és kérjük megerősítését
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then Az adatbázis kapcsolatoknak megfelelően, ha egy módosíttás nem egyértelmű változásokat vonna maga után, a felhasználót értesítjük és kérjük megerősítését

	Scenario: A kapcsolt táblák mezői egy jól érthető a másik táblából kinyert értékkel jelennek meg
		Given Módosíttás lehetséges
		Then A kapcsolt táblák mezői egy jól érthető a másik táblából kinyert értékkel jelennek meg o
