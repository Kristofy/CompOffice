### Email oldal


#### A felhasználó meglátogathatja az email oldalt

_Given_ A felhasználó bejelentkezett

_When_ A felhasználónak van jogosultsága megtekinteni az email oldalt

_Then_ Az email oldal betölt.

#### A szűrők megfelelően működnek, üres állapotból indulnak

_Given_ Az email oldal betölt

_Then_ A szűrők megfelelően működnek, üres állapotból indulnak.

#### Az email-ek automatikusan legenerálódnak

_Given_ Az email oldal betölt

_When_ A felhasználó a generálás ikonra kattint

_Then_ Az email-ek automatikusan legenerálódnak.

#### Az email-eket egyesével lehetséges módosíttani

_Given_ Az email-ek automatikusan legenerálódnak

_Then_ Az email-eket egyesével lehetséges módosíttani.

#### Az emaileknél bejelölhető hogy ne legyenek elküldve

_Given_ Az email-ek automatikusan legenerálódnak

_Then_ Az emaileknél bejelölhető hogy ne legyenek elküldve.

#### Az email-eket áttnézését követően az emailek egy gombnyomásra kiküldhetőek és  ezekről azonnali visszajelzés van

_Given_ Az email-ek automatikusan legenerálódnak

_When_ A felhasználó a kiküldés ikonra kattint

_Then_ Az email-eket áttnézését követően az emailek egy gombnyomásra kiküldhetőek és  ezekről azonnali visszajelzés van.

#### Az email kiküldés egy összesíttést küld a céges @support email-re

_Given_ Az email-ek automatikusan legenerálódnak

_When_ A felhasználó a kiküldés ikonra kattint

_Then_ Az email kiküldés egy összesíttést küld a céges @support email-re.
