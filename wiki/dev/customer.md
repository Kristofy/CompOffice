### Ügyfél oldal


#### A felhasználó meglátogathatja az ügyfél oldalt

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni az ügyfél oldalt

_Then_ Az ügyfél oldal betölt.

#### A szűrők megfelelően működnek, üres állapotból indulnak

_Given_ Az ügyfél oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.

#### Az ügyfél módosíttása lehetséges

_Given_ Az ügyfél oldal betölt AND felhasználónak van jogosultsága módosítani az ügyfél oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ Az ügyfél módosíttása lehetséges.

#### Ügyfél hozzáadássa lehetséges

_Given_ Az ügyfél oldal betölt AND felhasználónak van jogosultsága módosítani az ügyfél oldalon

_When_ A felhasználó a ügyfél hozzáadás ikonra kattint

_Then_ Az ügyfél hozzáadása lehetséges.
