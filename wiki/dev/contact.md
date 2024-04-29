### Kapcsolattartók oldal


#### A felhasználó meglátogathatja a kapcsolattartók oldalt

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a kapcsolattartók oldalt

_Then_ A kapcsolattartók oldal betölt.

#### A szűrők megfelelően működnek, üres állapotból indulnak

_Given_ A kapcsolattartók oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.

#### A kijelölt kapcsolattartó részletesen megjelenik

_Given_ A kapcsolattartók oldal betölt

_When_ A felhasználó kiválaszt egy kapcsolattartót

_Then_ A kijelölt kapcsolattartó részletesen megjelenik.

#### A kapcsolattartó módosíttása lehetséges

_Given_ A kapcsolattartók oldal betölt AND felhasználónak van jogosultsága módosítani a kapcsolattartó oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A kapcsolattartó módosíttása lehetséges.

#### Kapcsolattartó hozzáadássa lehetséges

_Given_ A kapcsolattartók oldal betölt AND felhasználónak van jogosultsága módosítani a kapcsolattartó oldalon

_When_ A felhasználó a kapcsolattartó hozzáadás ikonra kattint

_Then_ A kapcsolattartó hozzáadása lehetséges.
