Feature: A Core data alá tartozó (Holidays, Instructor, InvoiceLineType, Topics, Industries) oldalakon megfejelő jogosultság melett lehetséges a törlés és módosíttás
	Scenario: A felhasználó meglátogathatja a CoreData oldalakon
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a CoreData oldalt
		Then A megfelelő CoreData oldal betölt

	Scenario: A megfelelő CoreData oldalon a törlés lehetséges
		Given  A megfelelő CoreData oldal betölt AND A megfelelő CoreData oldal betölt
		When A felhasználó a törlés ikonra kattint
		Then A törlés lehetséges

	Scenario: A megfelelő CoreData oldalon a módosíttás lehetséges
		Given  A megfelelő CoreData oldal betölt AND A megfelelő CoreData oldal betölt
		When A felhasználó a módosítás ikonra kattint
		Then A módosíttás lehetséges

	Scenario: A megfelelő CoreData oldalon a hozzáadás lehetséges
		Given  A megfelelő CoreData oldal betölt AND A megfelelő CoreData oldal betölt
		When A felhasználó a hozzáadás ikonra kattint
		Then A hozzáadás lehetséges
