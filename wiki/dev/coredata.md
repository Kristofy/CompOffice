### A Core data alá tartozó (Holidays, Instructor, InvoiceLineType, Topics, Industries) oldalakon megfejelő jogosultság melett lehetséges a törlés és módosíttás



**A felhasználó meglátogathatja a CoreData oldalakon**  

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a CoreData oldalt

_Then_ A megfelelő CoreData oldal betölt.


**A megfelelő CoreData oldalon a törlés lehetséges**  

_Given_ A megfelelő CoreData oldal betölt AND A megfelelő CoreData oldal betölt

_When_ A felhasználó a törlés ikonra kattint

_Then_ A törlés lehetséges.


**A megfelelő CoreData oldalon a módosíttás lehetséges**  

_Given_ A megfelelő CoreData oldal betölt AND A megfelelő CoreData oldal betölt

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A módosíttás lehetséges.


**A megfelelő CoreData oldalon a hozzáadás lehetséges**  

_Given_ A megfelelő CoreData oldal betölt AND A megfelelő CoreData oldal betölt

_When_ A felhasználó a hozzáadás ikonra kattint

_Then_ A hozzáadás lehetséges.
