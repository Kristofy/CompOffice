### Számlák oldal


#### A felhasználó meglátogathatja a számlák oldalt

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni a számlák oldalt

_Then_ A számlák oldal betölt.

#### A szűrők megfelelően működnek, üres állapotból indulnak

_Given_ A számlák oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.

#### Elérhető 3 féle presen a sűrők gyors állítására

_Given_ A számlák oldal betölt

_Then_ Elérhető 3 féle presen a sűrők gyors állítására.

#### A kijelölt számla részletesen megjelenik

_Given_ A számlák oldal betölt

_When_ A felhasználó kiválaszt egy számlát

_Then_ A kijelölt számla részletesen megjelenik a számla tételeivel együtt.

#### A számla módosíttása lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A számla módosíttása lehetséges.

#### Számla hozzáadássa lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a számla hozzáadás ikonra kattint

_Then_ A számla hozzáadása lehetséges.

#### Számla törlése lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a törlés ikonra kattint

_Then_ A számla törlése lehetséges.

#### Számla Tétel törlése lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a törlés ikonra kattint

_Then_ A számla törlése lehetséges.

#### Számla Tétel hozzáadássa lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a hozzáadás ikonra kattint

_Then_ A számla hozzáadása lehetséges.

#### Számla Tétel módosíttása lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a módosítás ikonra kattint

_Then_ A számla módosíttása lehetséges.

#### Számla klónozása lehetséges

_Given_ A számlák oldal betölt AND felhasználónak van jogosultsága módosítani a számla oldalon

_When_ A felhasználó a klónozás ikonra kattint

_Then_ A számla klónozása lehetséges.
