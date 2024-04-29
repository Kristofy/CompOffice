### Projekt oldal


#### A felhasználó meglátogathatja a projekt oldalt

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a projekt oldalt

_Then_ A projekt oldal betölt.

#### A projekt oldalon a megfelelő adatok jelennek meg

_Given_ A projekt oldal betölt

_Then_ A Projekt oldalon a megfelelő adatok jelennek meg.

#### A törlés ikonok megfelelően működnek

_Given_ A projekt oldal betölt

_When_ felhasználónak van jogosultsága módosítani a projekt oldalon

_Then_ A törlés ikon megjelenik minden projekt mellett.

#### A törlés ikonra kattintva a projekt törlődik

_Given_ A projekt oldal betölt

_When_ felhasználó törölni próbál egy projektet

_Then_ A projekt törlődik, minden hozzá tartozó adattal együtt.

#### A felhasználónak nincs jogosultsága módosíttani a projekt oldalon

_Given_ A projekt oldal betölt

_When_ A felhasználónak nincs jogosultsága módosíttani a projekt oldalon

_Then_ A projekt oldalon törlés ikon nem jelenik meg.

#### A szűrők megfelelően működnek, üres állapotból indulnak

_Given_ A projekt oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.

#### Projektek kiválaszthatóak, és ezek megjelennek részletesen

_Given_ A projekt oldal betölt

_When_ A felhasználó kiválaszt egy projektet

_Then_ A projekt részletesen megjelenik.

#### Összesített oldal megfelelő adatokat jelenítt meg

_Given_ A projekt részletesen megjelenik

_When_ A felhasználó kiválasztja az összesített oldalt

_Then_ A összesített oldal megfelelő adatokat jelenítt meg.

#### Modulok oldal megfelelő adatokat jelenítt meg

_Given_ A projekt részletesen megjelenik

_When_ A felhasználó kiválasztja a modulok oldalt

_Then_ A modulok oldal megfelelő adatokat jelenítt meg.

#### A Rendelések oldal megfelelő adatokat jelenítt meg

_Given_ A projekt részletesen megjelenik

_When_ A felhasználó kiválasztja a rendelések oldalt

_Then_ A rendelések oldal megfelelő adatokat jelenítt meg.

#### A felhasználó klónoz egy projectet

_Given_ A felhasználó kiválasztja az összesített oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a klónozás ikonra kattint

_Then_ A projekt klónozása lehetséges.

#### Egységes módosíttás

_Given_ A felhasználó kiválasztja az összesített oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A projekt moduljai egyszerre módosíthatóak.

#### Megrendelés törlése

_Given_ A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a törlés ikonra kattint

_Then_ A rendelés törlése lehetséges.

#### Megrendelés módosíttása

_Given_ A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A rendelés módosíttása lehetséges.

#### A Modulok törlése lehetséges

_Given_ A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a törlés ikonra kattint

_Then_ A modulok törlése lehetséges.

#### A Modulok módosíttása lehetséges

_Given_ A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A modulok módosíttása lehetséges.

#### Order hozzáadássa lehetséges

_Given_ A felhasználó kiválasztja a rendelések oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a rendelés hozzáadás ikonra kattint

_Then_ A rendelés hozzáadása lehetséges.

#### Modul hozzáadássa lehetséges

_Given_ A felhasználó kiválasztja a modulok oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon AND a kiválasztott projektnek még nincs minden modulja hozzáadva

_When_ A felhasználó a modul hozzáadás ikonra kattint

_Then_ A modul hozzáadása lehetséges.

#### Új projekt hozzáadássa lehetséges

_Given_ A felhasználó kiválasztja a projekt oldalt AND felhasználónak van jogosultsága módosítani a projekt oldalon

_When_ A felhasználó a projekt hozzáadás ikonra kattint

_Then_ A projekt hozzáadása lehetséges.
