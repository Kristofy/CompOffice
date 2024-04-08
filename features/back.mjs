Feature: Visszalépés
	Scenario: A felhasználó visszalép az előző oldalra
		Given A felhasználó bejelentkezett AND Egy tetszőleges A oldalt majd B oldalt meglátogatott
		When A felhasználó visszalép
		Then A felhasználó az előző A oldalra kerül
