### Szerkesztő oldalak



**A szerkesztő oldalakra navigálva megjelenítés jogosultsággal nem teszi lehetővé az adatok módosíttását csupán megtekintését**  

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a szerkesztő oldalon AND A felhasználónak nincs jogosultsága módosítani a szerkesztő oldalon

_Then_ A szerkesztő oldal betölt, de a módosíttás nem lehetséges.


**Új adat hozzáadása lehetséges**  

_Given_ A felhasználó bejelentkezett AND A felhasználónak van jogosultsága módosítani a szerkesztő oldalon

_When_ A felhasználó a hozzáadás ikonra kattint

_Then_ Új adat hozzáadása lehetséges.


**Szerkesztés lehetséges**  

_Given_ A felhasználó bejelentkezett AND A felhasználónak van jogosultsága módosítani a szerkesztő oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ Szerkesztés lehetséges.


**Módosíttás lehetséges**  

_Given_ Új adat hozzáadása lehetséges OR Szerkesztés lehetséges

_Then_ Módosíttás lehetséges.


**Egy mező módosíttása tartja az adatbázis megszorításait**  

_Given_ Módosíttás lehetséges

_When_ A felhasználó módosítja a mezőt

_Then_ Az adatbázis megszoríttásai a kliens oldalon ellenőrzésre kerülnek.


**Módosíttás után invalid mező jelzése**  

_Given_ Módosíttás lehetséges

_When_ A felhasználó módosítja a mezőt

_Then_ Az invalid mező jelzése megjelenik, hibaüzenettel.


**A mentés csak akkor lehetséges ha minden mező valid**  

_Given_ Módosíttás lehetséges

_When_ A felhasználó módosítja a mezőt

_Then_ A mentés csak akkor lehetséges ha minden mező valid.


**A tényleges változások csak a mentés pillanatában érvényesülnek**  

_Given_ Módosíttás lehetséges

_When_ A felhasználó módosítja a mezőt

_Then_ A tényleges változások csak a mentés pillanatában érvényesülnek.


**A mentés után az adatok azonnal frissülnek és visszanavigálunk az előző oldalra**  

_Given_ Módosíttás lehetséges

_When_ A felhasználó ment

_Then_ A mentés után az adatok azonnal frissülnek és visszanavigálunk az előző oldalra.


**Az igaz / hamis mezők checkbox-ként jelennek meg**  

_Given_ Módosíttás lehetséges

_Then_ Az igaz / hamis mezők checkbox-ként jelennek meg.


**A több de véges constrain-t ből származó lehetséges értékek kereshető dropdown-ként jelennek meg**  

_Given_ Módosíttás lehetséges

_Then_ A több de véges constrain-t ből származó lehetséges értékek kereshető dropdown-ként jelennek meg.


**Az adatbázis kapcsolatoknak megfelelően, ha egy módosíttás nem egyértelmű változásokat vonna maga után, a felhasználót értesítjük és kérjük megerősítését**  

_Given_ Módosíttás lehetséges

_When_ A felhasználó módosítja a mezőt

_Then_ Az adatbázis kapcsolatoknak megfelelően, ha egy módosíttás nem egyértelmű változásokat vonna maga után, a felhasználót értesítjük és kérjük megerősítését.


**A kapcsolt táblák mezői egy jól érthető a másik táblából kinyert értékkel jelennek meg**  

_Given_ Módosíttás lehetséges

_Then_ A kapcsolt táblák mezői egy jól érthető a másik táblából kinyert értékkel jelennek meg o.
