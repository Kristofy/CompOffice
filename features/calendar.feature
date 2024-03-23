Feature: Training Kalendár
	Scenario: A training kalendár megfelelően betölt
		Given A felhasználó bejelentkezett
		When Training Kalendár látogatása
		Then A Training Kalendár betölt

	Scenario: A training kalendár navigálásra megfelelően frissül
		Given A felhasználó bejelentkezett
		When A Training Kalendár betölt
		Then A Training Kalendár navigálásra megfelelően frissül

	Scenario: A training kalendár a jelenlegi hónapról indul
		Given A felhasználó bejelentkezett
		When A Training Kalendár betölt
		Then A Training Kalendár a jelenlegi hónapról indul
