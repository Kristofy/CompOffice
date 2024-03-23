### Általános műveletek nem lehetségesek a megfelelő jogosultság nélkü



**Az oldal nem tölt be adatot, és hibát ad, ha a felhasználó megfelelő jogosultság nélkül látogat egy oldalt**  

_Given_ A felhasználó bejelentkezett

_When_ A oldal látogatása AND A felhasználónak nincs megtekintés jogosultsága az A oldalhoz

_Then_ Az oldal nem tölt be adatot, és hibát ad.


**Az oldalakon nem módosíthat jogosultság nélkül**  

_Given_ A felhasználó bejelentkezett

_When_ A oldal látogatása AND A felhasználónak nincs módosítás jogosultsága az A oldalhoz

_Then_ Az oldalakon nem módosíthat.


**Az oldalakon nem törölhet jogosultság nélkül**  

_Given_ A felhasználó bejelentkezett

_When_ A oldal látogatása AND A felhasználónak nincs törlés jogosultsága az A oldalhoz

_Then_ Az oldalakon nem törölhet.


**Az oldalakon nem hozzáadhat jogosultság nélkül**  

_Given_ A felhasználó bejelentkezett

_When_ A oldal látogatása AND A felhasználónak nincs hozzáadás jogosultsága az A oldalhoz

_Then_ Az oldalakon nem hozzáadhat.


**Törlés esetén mindig mergerősíttést kérünk**  

_Given_ A felhasználó bejelentkezett

_When_ A törlés ikonra kattint

_Then_ Törlés esetén mindig mergerősíttést kérünk.
