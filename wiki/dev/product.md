### Product oldal



**A felhasználó meglátogathatja a product oldalt**  

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a product oldalt

_Then_ A product oldal betölt.


**A szűrők megfelelően működnek, üres állapotból indulnak**  

_Given_ A product oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.


**A kijelölt product részletesen megjelenik**  

_Given_ A product oldal betölt

_When_ A felhasználó kiválaszt egy productet

_Then_ A kijelölt product részletesen megjelenik a hozzáadott modulokkal együtt.


**A product módosíttása lehetséges**  

_Given_ A product oldal betölt AND felhasználónak van jogosultsága módosítani a product oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A product módosíttása lehetséges.


**Product hozzáadássa lehetséges**  

_Given_ A product oldal betölt AND felhasználónak van jogosultsága módosítani a product oldalon

_When_ A felhasználó a product hozzáadás ikonra kattint

_Then_ A product hozzáadása lehetséges.
