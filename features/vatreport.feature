Feature: ÁfaReport oldal
	Scenario: A felhasználó meglátogathatja az áfareport oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni az áfareport oldalt
		Then Az áfareport oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given Az áfareport oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Az áfareport oldal megfelelően aggregálja az adatokat és jelenitti meg az intervallumon összegzett áfa rétéket
		Given Az áfareport oldal betölt
		Then Az áfareport oldal megfelelően aggregálja az adatokat és jelenitti meg teljes áfa érétéket
