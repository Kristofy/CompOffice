Feature: CashFlow oldal
	Scenario: A felhasználó meglátogathatja a cashflow oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a cashflow oldalt
		Then A cashflow oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A cashflow oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: A CacheFlow oldal megfelelően aggregálja az adatokat és jelenitti meg a kiadásokat és bevételeket
		Given A cashflow oldal betölt
		Then A CacheFlow oldal megfelelően aggregálja az adatokat és jelenitti meg a kiadásokat és bevételeket
