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


Feature: Általános műveletek nem lehetségesek a megfelelő jogosultság nélkü
	Scenario: Az oldal nem tölt be adatot, és hibát ad, ha a felhasználó megfelelő jogosultság nélkül látogat egy oldalt
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs megtekintés jogosultsága az A oldalhoz
		Then Az oldal nem tölt be adatot, és hibát ad
 
	Scenario: Az oldalakon nem módosíthat jogosultság nélkül
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs módosítás jogosultsága az A oldalhoz
		Then Az oldalakon nem módosíthat

	Scenario: Az oldalakon nem törölhet jogosultság nélkül
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs törlés jogosultsága az A oldalhoz
		Then Az oldalakon nem törölhet

	Scenario: Az oldalakon nem hozzáadhat jogosultság nélkül
		Given A felhasználó bejelentkezett
		When A oldal látogatása AND A felhasználónak nincs hozzáadás jogosultsága az A oldalhoz
		Then Az oldalakon nem hozzáadhat

	Scenario: Törlés esetén mindig mergerősíttést kérünk
		Given A felhasználó bejelentkezett
		When A törlés ikonra kattint
		Then Törlés esetén mindig mergerősíttést kérünk


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


Feature: Visszalépés
	Scenario: A felhasználó visszalép az előző oldalra
		Given A felhasználó bejelentkezett AND Egy tetszőleges A oldalt majd B oldalt meglátogatott
		When A felhasználó visszalép
		Then A felhasználó az előző A oldalra kerül


Feature: Projekt oldal
	Scenario: A felhasználó meglátogathatja a projekt oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a projekt oldalt
		Then A projekt oldal betölt

	Scenario: A projekt oldalon a megfelelő adatok jelennek meg
		Given A projekt oldal betölt
		Then A Projekt oldalon a megfelelő adatok jelennek meg
	
	Scenario: A törlés ikonok megfelelően működnek
		Given A projekt oldal betölt
		When felhasználónak van jogosultsága módosítani a projekt oldalon
		Then A törlés ikon megjelenik minden projekt mellett

	Scenario: A törlés ikonra kattintva a projekt törlődik
		Given A projekt oldal betölt
		When felhasználó törölni próbál egy projektet
		Then A projekt törlődik, minden hozzá tartozó adattal együtt

	Scenario: A felhasználónak nincs jogosultsága módosíttani a projekt oldalon
		Given A projekt oldal betölt
		When A felhasználónak nincs jogosultsága módosíttani a projekt oldalon
		Then A projekt oldalon törlés ikon nem jelenik meg

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A projekt oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: Projektek kiválaszthatóak, és ezek megjelennek részletesen
		Given A projekt oldal betölt
		When A felhasználó kiválaszt egy projektet
		Then A projekt részletesen megjelenik
	
	Scenario: Összesített oldal megfelelő adatokat jelenítt meg
		Given A projekt részletesen megjelenik
		When A felhasználó kiválasztja az összesített oldalt
		Then A összesített oldal megfelelő adatokat jelenítt meg

	Scenario: Modulok oldal megfelelő adatokat jelenítt meg
		Given A projekt részletesen megjelenik
		When A felhasználó kiválasztja a modulok oldalt
		Then A modulok oldal megfelelő adatokat jelenítt meg

	Scenario: A Rendelések oldal megfelelő adatokat jelenítt meg
		Given A projekt részletesen megjelenik
		When A felhasználó kiválasztja a rendelések oldalt
		Then A rendelések oldal megfelelő adatokat jelenítt meg

	Scenario: A felhasználó klónoz egy projectet
		Given A felhasználó kiválasztja az összesített oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a klónozás ikonra kattint
		Then A projekt klónozása lehetséges

	Scenario: Egységes módosíttás
		Given A felhasználó kiválasztja az összesített oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A projekt moduljai egyszerre módosíthatóak

	Scenario: Megrendelés törlése
		Given A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a törlés ikonra kattint
		Then A rendelés törlése lehetséges

	Scenario: Megrendelés módosíttása
		Given A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A rendelés módosíttása lehetséges

	Scenario: A Modulok törlése lehetséges
		Given A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a törlés ikonra kattint
		Then A modulok törlése lehetséges

	Scenario: A Modulok módosíttása lehetséges
		Given A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A modulok módosíttása lehetséges

	Scenario: Order hozzáadássa lehetséges
		Given A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a rendelés hozzáadás ikonra kattint
		Then A rendelés hozzáadása lehetséges

	Scenario: Modul hozzáadássa lehetséges
		Given A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon AND a kiválasztott projektnek még nincs minden modulja hozzáadva
		When A felhasználó a modul hozzáadás ikonra kattint
		Then A modul hozzáadása lehetséges

	Scenario: Új projekt hozzáadássa lehetséges
		Given A felhasználó kiválasztja a projekt oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon
		When A felhasználó a projekt hozzáadás ikonra kattint
		Then A projekt hozzáadása lehetséges

Feature: Modulok oldal
	Scenario: A felhasználó meglátogathatja a modulok oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a modulok oldalt
		Then A modulok oldal betölt

	Scenario: A Szűrők megfelelően működnek, üres állapotból indulnak
		Given A modulok oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: A kijelölt modul részletesen megjelenik
		Given A modulok oldal betölt
		When A felhasználó kiválaszt egy modult
		Then A kijelölt modul részletesen megjelenik

	Scenario: Modulok módosíttása
		Given A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A modulok módosíttása lehetséges

	Scenario: Modulok hozzáadássa lehetséges
		Given A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon
		When A felhasználó a modul hozzáadás ikonra kattint
		Then A modul hozzáadása lehetséges

Feature: Product oldal
	Scenario: A felhasználó meglátogathatja a product oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a product oldalt
		Then A product oldal betölt
	
	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A product oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak
	
	Scenario: A kijelölt product részletesen megjelenik
		Given A product oldal betölt
		When A felhasználó kiválaszt egy productet
		Then A kijelölt product részletesen megjelenik a hozzáadott modulokkal együtt

	Scenario: A product módosíttása lehetséges
		Given A product oldal betölt AND felhasználónak van jogosultsága módosítani a product oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A product módosíttása lehetséges

	Scenario: Product hozzáadássa lehetséges
		Given A product oldal betölt AND felhasználónak van jogosultsága módosítani a product oldalon
		When A felhasználó a product hozzáadás ikonra kattint
		Then A product hozzáadása lehetséges


Feature: Ügyfél oldal
	Scenario: A felhasználó meglátogathatja az ügyfél oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni az ügyfél oldalt
		Then Az ügyfél oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given Az ügyfél oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Az ügyfél módosíttása lehetséges
		Given Az ügyfél oldal betölt AND felhasználónak van jogosultsága módosítani az ügyfél oldalon
		When A felhasználó a módosítás ikonra kattint
		Then Az ügyfél módosíttása lehetséges

	Scenario: Ügyfél hozzáadássa lehetséges
		Given Az ügyfél oldal betölt AND felhasználónak van jogosultsága módosítani az ügyfél oldalon
		When A felhasználó a ügyfél hozzáadás ikonra kattint
		Then Az ügyfél hozzáadása lehetséges

Feature: Kapcsolattartók oldal
	Scenario: A felhasználó meglátogathatja a kapcsolattartók oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a kapcsolattartók oldalt
		Then A kapcsolattartók oldal betölt
	
	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A kapcsolattartók oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: A kijelölt kapcsolattartó részletesen megjelenik
		Given A kapcsolattartók oldal betölt
		When A felhasználó kiválaszt egy kapcsolattartót
		Then A kijelölt kapcsolattartó részletesen megjelenik

	Scenario: A kapcsolattartó módosíttása lehetséges
		Given A kapcsolattartók oldal betölt AND felhasználónak van jogosultsága módosítani a kapcsolattartó oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A kapcsolattartó módosíttása lehetséges

	Scenario: Kapcsolattartó hozzáadássa lehetséges
		Given A kapcsolattartók oldal betölt AND felhasználónak van jogosultsága módosítani a kapcsolattartó oldalon
		When A felhasználó a kapcsolattartó hozzáadás ikonra kattint
		Then A kapcsolattartó hozzáadása lehetséges

Feature: Oktatók oldal
	Scenario: A felhasználó meglátogathatja az oktatók oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni az oktatók oldalt
		Then Az oktatók oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given Az oktatók oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Az oktató módosíttása lehetséges
		Given Az oktatók oldal betölt AND felhasználónak van jogosultsága módosítani az oktató oldalon
		When A felhasználó a módosítás ikonra kattint
		Then Az oktató módosíttása lehetséges

	Scenario: Oktató hozzáadássa lehetséges
		Given Az oktatók oldal betölt AND felhasználónak van jogosultsága módosítani az oktató oldalon
		When A felhasználó a oktató hozzáadás ikonra kattint
		Then Az oktató hozzáadása lehetséges

	Scenario: A kijelölt oktató részletesen megjelenik
		Given Az oktatók oldal betölt
		When A felhasználó kiválaszt egy oktatót
		Then A kijelölt oktató részletesen megjelenik


Feature: Résztvevők oldal
	Scenario: A felhasználó meglátogathatja a résztvevők oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a résztvevők oldalt
		Then A résztvevők oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A résztvevők oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: A résztvevő módosíttása lehetséges
		Given A résztvevők oldal betölt AND felhasználónak van jogosultsága módosítani a résztvevő oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A résztvevő módosíttása lehetséges

	Scenario: Résztvevő hozzáadássa lehetséges
		Given A résztvevők oldal betölt AND felhasználónak van jogosultsága módosítani a résztvevő oldalon
		When A felhasználó a résztvevő hozzáadás ikonra kattint
		Then A résztvevő hozzáadása lehetséges
	
	Scenario: Több részvevő importálása excel file-ból
		Given A résztvevők oldal betölt AND felhasználónak van jogosultsága módosítani a résztvevő oldalon
		When A felhasználó a importálás ikonra kattint
		Then Több részvevő importálása lehetséges

Feature: Számlák oldal
	Scenario: A felhasználó meglátogathatja a számlák oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a számlák oldalt
		Then A számlák oldal betölt

	Scenario: A szűrők megfelelően működnek, üres állapotból indulnak
		Given A számlák oldal betölt
		Then A szűrők megfelelően működnek, üres állapotból indulnak

	Scenario: Elérhető 3 féle presen a sűrők gyors állítására
		Given A számlák oldal betölt
		Then Elérhető 3 féle presen a sűrők gyors állítására

	Scenario: A kijelölt számla részletesen megjelenik
		Given A számlák oldal betölt
		When A felhasználó kiválaszt egy számlát
		Then A kijelölt számla részletesen megjelenik a számla tételeivel együtt

	Scenario: A számla módosíttása lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A számla módosíttása lehetséges

	Scenario: Számla hozzáadássa lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a számla hozzáadás ikonra kattint
		Then A számla hozzáadása lehetséges

	Scenario: Számla törlése lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a törlés ikonra kattint
		Then A számla törlése lehetséges

	Scenario: Számla Tétel törlése lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a törlés ikonra kattint
		Then A számla törlése lehetséges

	Scenario: Számla Tétel hozzáadássa lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a hozzáadás ikonra kattint
		Then A számla hozzáadása lehetséges

	Scenario: Számla Tétel módosíttása lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A számla módosíttása lehetséges

	Scenario: Számla klónozása lehetséges
		Given A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon
		When A felhasználó a klónozás ikonra kattint
		Then A számla klónozása lehetséges

Feature: Suppliers oldal
	Scenario: A felhasználó meglátogathatja a suppliers oldalt
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a suppliers oldalt
		Then A suppliers oldal betölt


	Scenario: A kijelölt supplier részletesen megjelenik
		Given A suppliers oldal betölt
		When A felhasználó kiválaszt egy supplieret
		Then A kijelölt supplier részletesen megjelenik

	Scenario: A supplier módosíttása lehetséges
		Given A suppliers oldal betölt AND felhasználónak van jogosultsága módosítani a supplier oldalon
		When A felhasználó a módosítás ikonra kattint
		Then A supplier módosíttása lehetséges

	Scenario: Supplier hozzáadássa lehetséges
		Given A suppliers oldal betölt AND felhasználónak van jogosultsága módosítani a supplier oldalon
		When A felhasználó a supplier hozzáadás ikonra kattint
		Then A supplier hozzáadása lehetséges


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


Feature: Szerkesztő oldalak
	Scenario: A szerkesztő oldalakra navigálva megjelenítés jogosultsággal nem teszi lehetővé az adatok módosíttását csupán megtekintését
		Given A felhasználó bejelentkezett
		When A felhasználónak van jogosultsága megtekinteni a szerkesztő oldalon AND A felhasználónak nincs jogosultsága módosítani a szerkesztő oldalon
		Then A szerkesztő oldal betölt, de a módosíttás nem lehetséges

	Scenario: Új adat hozzáadása lehetséges
		Given A felhasználó bejelentkezett AND A felhasználónak van jogosultsága módosítani a szerkesztő oldalon
		When A felhasználó a hozzáadás ikonra kattint
		Then Új adat hozzáadása lehetséges

	Scenario: Szerkesztés lehetséges
		Given A felhasználó bejelentkezett AND A felhasználónak van jogosultsága módosítani a szerkesztő oldalon
		When A felhasználó a módosítás ikonra kattint
		Then Szerkesztés lehetséges

	Scenario: Módosíttás lehetséges
		Given Új adat hozzáadása lehetséges OR Szerkesztés lehetséges
		Then Módosíttás lehetséges

	Scenario: Egy mező módosíttása tartja az adatbázis megszorításait
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then Az adatbázis megszoríttásai a kliens oldalon ellenőrzésre kerülnek

	Scenario: Módosíttás után invalid mező jelzése
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then Az invalid mező jelzése megjelenik, hibaüzenettel

	Scenario: A mentés csak akkor lehetséges ha minden mező valid
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then A mentés csak akkor lehetséges ha minden mező valid

	Scenario: A tényleges változások csak a mentés pillanatában érvényesülnek
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then A tényleges változások csak a mentés pillanatában érvényesülnek
	
	Scenario: A mentés után az adatok azonnal frissülnek és visszanavigálunk az előző oldalra
		Given Módosíttás lehetséges
		When A felhasználó ment
		Then A mentés után az adatok azonnal frissülnek és visszanavigálunk az előző oldalra

	Scenario: Az igaz / hamis mezők checkbox-ként jelennek meg
		Given Módosíttás lehetséges
		Then Az igaz / hamis mezők checkbox-ként jelennek meg

	Scenario: A több de véges constrain-t ből származó lehetséges értékek kereshető dropdown-ként jelennek meg
		Given Módosíttás lehetséges
		Then A több de véges constrain-t ből származó lehetséges értékek kereshető dropdown-ként jelennek meg

	Scenario: Az adatbázis kapcsolatoknak megfelelően, ha egy módosíttás nem egyértelmű változásokat vonna maga után, a felhasználót értesítjük és kérjük megerősítését
		Given Módosíttás lehetséges
		When A felhasználó módosítja a mezőt
		Then Az adatbázis kapcsolatoknak megfelelően, ha egy módosíttás nem egyértelmű változásokat vonna maga után, a felhasználót értesítjük és kérjük megerősítését

	Scenario: A kapcsolt táblák mezői egy jól érthető a másik táblából kinyert értékkel jelennek meg
		Given Módosíttás lehetséges
		Then A kapcsolt táblák mezői egy jól érthető a másik táblából kinyert értékkel jelennek meg o
	
