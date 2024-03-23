Feature: A felhasználó be tud lépni az alkalmazásba
	Scenario: A felhasználó bejelentkezik
		Given A felhasználó fiókja Azure AD-ben megengedett
		When Oldal látogatása
		Then Automatikus bejelentkeztetés

	Scenario: A felhasználó nem jelentkezhet be
		Given A felhasználó fiókja Azure AD-ben nem megengedett
		When Oldal látogatása
		Then Az oldal visszautasítja a bejelentkezést

	Scenario: A bejelentkezett felhasználó a főoldalra kerül
		Given A felhasználó bejelentkezett
		When Oldal látogatása
		Then A főoldalra kerül

	Scenario: A bejelentkezett felhasználó kijelentkezik
		Given A felhasználó bejelentkezett
		When Kijelentkezés
		Then A bejelentkező oldalra kerül

	Scenario: A felhasználónak megfeleő jogosultságai vannak
		Given A felhasználó bejelentkezett
		When Oldal látogatása
		Then A felhasználó megfelelő jogosultságokkal rendelkezik
