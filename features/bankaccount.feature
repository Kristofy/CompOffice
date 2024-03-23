Feature: BankAccount oldal
	Scenario: A felhasználó meglátogathatja a bankaccount oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a bankaccount oldalt
		Then A bankaccount oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A bankaccount oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Megjelenik a backlog
		Given A bankaccount oldal betölt
		Then Megjelenik a backlog

	Scenario: Megjelenik a backlog aggregálása per nap
		Given A bankaccount oldal betölt
		Then Megjelenik a backlog aggregálása per nap

	Scenario: A backlog módosíttása lehetséges
		Given A bankaccount oldal betölt AND felhasználónak van jogosultsága módosítani a bankaccount oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A backlog módosíttása lehetséges

	Scenario: Backlog hozzáadássa lehetséges
		Given A bankaccount oldal betölt AND felhasználónak van jogosultsága módosítani a bankaccount oldalon
		When A felhasználó a backlog hozzáadás ikonra kattint
		Then A backlog hozzáadása lehetséges
