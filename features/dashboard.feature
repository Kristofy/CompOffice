Feature: A főoldal megfelelően betölt
	Scenario: A főoldalon megjelennek a jövőbeli események
		Given A felhasználó bejelentkezett
		When Főoldal látogatása
		Then A főoldalon megjelennek a jövőbeli események

	Scenario: A jelenlegi hét inforációi töltenekbe
		Given A felhasználó bejelentkezett
		When Főoldal látogatása
		Then A főoldal a jelenlegi hét információit tartalmazza

	Scenario: A főoldalon a hetek között navigálva az információ helyesen frissül
		Given A felhasználó bejelentkezett
		When Főoldal látogatása
		Then A főoldalon a hetek között navigálva az információ helyesen frissül
