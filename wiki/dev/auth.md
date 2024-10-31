### A felhasználó be tud lépni az alkalmazásba


#### A felhasználó bejelentkezik

_Given_ A felhasználó fiókja Azure AD-ben megengedett

_When_ Oldal látogatása

_Then_ Automatikus bejelentkeztetés.

#### A felhasználó nem jelentkezhet be

_Given_ A felhasználó fiókja Azure AD-ben nem megengedett

_When_ Oldal látogatása

_Then_ Az oldal visszautasítja a bejelentkezést.

#### A bejelentkezett felhasználó a főoldalra kerül

_Given_ A felhasználó bejelentkezett

_When_ Oldal látogatása

_Then_ A főoldalra kerül.

#### A bejelentkezett felhasználó kijelentkezik

_Given_ A felhasználó bejelentkezett

_When_ Kijelentkezés

_Then_ A bejelentkező oldalra kerül.

#### A felhasználónak megfeleő jogosultságai vannak

_Given_ A felhasználó bejelentkezett

_When_ Oldal látogatása

_Then_ A felhasználó megfelelő jogosultságokkal rendelkezik.
