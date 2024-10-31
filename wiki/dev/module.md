### Modulok oldal


#### A felhasználó meglátogathatja a modulok oldalt

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a modulok oldalt

_Then_ A modulok oldal betölt.

#### A Szűrők megfelelően működnek, üres állapotból indulnak

_Given_ A modulok oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.

#### A kijelölt modul részletesen megjelenik

_Given_ A modulok oldal betölt

_When_ A felhasználó kiválaszt egy modult

_Then_ A kijelölt modul részletesen megjelenik.

#### Modulok módosíttása

_Given_ A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A modulok módosíttása lehetséges.

#### Modulok hozzáadássa lehetséges

_Given_ A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon

_When_ A felhasználó a modul hozzáadás ikonra kattint

_Then_ A modul hozzáadása lehetséges.
