### BankAccount oldal



**A felhasználó meglátogathatja a bankaccount oldalt**  

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a bankaccount oldalt

_Then_ A bankaccount oldal betölt.


**A szűrők megfelelően működnek, üres állapotból indulnak**  

_Given_ A bankaccount oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.


**Megjelenik a backlog**  

_Given_ A bankaccount oldal betölt

_Then_ Megjelenik a backlog.


**Megjelenik a backlog aggregálása per nap**  

_Given_ A bankaccount oldal betölt

_Then_ Megjelenik a backlog aggregálása per nap.


**A backlog módosíttása lehetséges**  

_Given_ A bankaccount oldal betölt AND felhasználónak van jogosultsága módosítani a bankaccount oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A backlog módosíttása lehetséges.


**Backlog hozzáadássa lehetséges**  

_Given_ A bankaccount oldal betölt AND felhasználónak van jogosultsága módosítani a bankaccount oldalon

_When_ A felhasználó a backlog hozzáadás ikonra kattint

_Then_ A backlog hozzáadása lehetséges.
