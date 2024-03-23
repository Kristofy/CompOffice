### Oktatók oldal



**A felhasználó meglátogathatja az oktatók oldalt**  

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni az oktatók oldalt

_Then_ Az oktatók oldal betölt.


**A szűrők megfelelően működnek, üres állapotból indulnak**  

_Given_ Az oktatók oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.


**Az oktató módosíttása lehetséges**  

_Given_ Az oktatók oldal betölt AND felhasználónak van jogosultsága módosítani az oktató oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ Az oktató módosíttása lehetséges.


**Oktató hozzáadássa lehetséges**  

_Given_ Az oktatók oldal betölt AND felhasználónak van jogosultsága módosítani az oktató oldalon

_When_ A felhasználó a oktató hozzáadás ikonra kattint

_Then_ Az oktató hozzáadása lehetséges.


**A kijelölt oktató részletesen megjelenik**  

_Given_ Az oktatók oldal betölt

_When_ A felhasználó kiválaszt egy oktatót

_Then_ A kijelölt oktató részletesen megjelenik.
