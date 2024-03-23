Feature: Általános műveletek nem lehetségesek a megfelelő jogosultság nélkü
	Scenario: Az oldal nem tölt be adatot, és hibát ad, ha a felhasználó megfelelő jogosultság nélkül látogat egy oldalt
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs megtekintés jogosultsága az A oldalhoz
		Then Az oldal nem tölt be adatot, és hibát ad
 
	Scenario: Az oldalakon nem módosíthat jogosultság nélkül
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs módosítás jogosultsága az A oldalhoz
		Then Az oldalakon nem módosíthat

	Scenario: Az oldalakon nem törölhet jogosultság nélkül
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs törlés jogosultsága az A oldalhoz
		Then Az oldalakon nem törölhet

	Scenario: Az oldalakon nem hozzáadhat jogosultság nélkül
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs hozzáadás jogosultsága az A oldalhoz
		Then Az oldalakon nem hozzáadhat

	Scenario: Törlés esetén mindig mergerősíttést kérünk
		Given A felhasználó bejelentkezett
		When A törlés ikonra kattint
		Then Törlés esetén mindig mergerősíttést kérünk
