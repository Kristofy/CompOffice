Feature: Email oldal
	Scenario: A felhasználó meglátogathatja az email oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni az email oldalt
		Then Az email oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given Az email oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Az email-ek automatikusan legenerálódnak
		Given Az email oldal betölt
		When A felhasználó a generálás ikonra kattint
		Then Az email-ek automatikusan legenerálódnak

	Scenario: Az email-eket egyesével lehetséges módosíttani
		Given Az email-ek automatikusan legenerálódnak
		Then Az email-eket egyesével lehetséges módosíttani

	Scenario: Az emaileknél bejelölhető hogy ne legyenek elküldve
		Given Az email-ek automatikusan legenerálódnak
		Then Az emaileknél bejelölhető hogy ne legyenek elküldve

	Scenario: Az email-eket áttnézését követően az emailek egy gombnyomásra kiküldhetőek és  ezekről azonnali visszajelzés van
		Given Az email-ek automatikusan legenerálódnak
		When A felhasználó a kiküldés ikonra kattint
		Then Az email-eket áttnézését követően az emailek egy gombnyomásra kiküldhetőek és  ezekről azonnali visszajelzés van

	Scenario: Az email kiküldés egy összesíttést küld a céges @support email-re
		Given Az email-ek automatikusan legenerálódnak
		When A felhasználó a kiküldés ikonra kattint
		Then Az email kiküldés egy összesíttést küld a céges @support email-re
