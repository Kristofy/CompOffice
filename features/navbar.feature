Feature: A navigációs sáv a helyes adatokat tartalmazza és megfelelően funkcionál
	Scenario: A navigációs sáv betölt
		Given A felhasználó bejelentkezett
		When Oldal látogatása
		Then A navigációs sáv betölt
	
	Scenario: A navigációs sáv a megfelelő adatokat tartalmazza
		Given A felhasználó bejelentkezett
		When Oldal látogatása
		Then A navigációs sáv a felhasználó nevét és a számára elérhető oldalakat tartalmazza

	Scenario: A felhasználó a Home ikonra kattintva a főoldalra kerül
		Given A felhasználó bejelentkezett
		When Home ikonra kattint
		Then A főoldalra kerül

	Scenario: A felhasználó a Training Calendar ikonra kattintva a Training Calendar oldalra kerül
		Given A felhasználó bejelentkezett
		When Training Calendar ikonra kattint
		Then A Training Calendar oldalra kerül
