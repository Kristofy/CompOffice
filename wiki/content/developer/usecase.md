#### 3.3.2.1 Jogosultsági szintek


A rendszerben a következő jogosultsági szinteket különböztetjük meg:   

- **Super**: Az alkalmazás teljes körű használatára jogosult, admin felhasználó.  

- **Test**: Az alkalmazás teljes körű használatára jogosult, fejlesztő és tesztelő felhasználó.  

- **Finance**: A cég pénzügyi adatainak kezelésére jogosult felhasználó.  

- **Operator**: A cég üzemi adatainak kezelésére jogosult felhasználó.  

- **Coordinator**: (Legacy) Az Operátor felhasználókkal ekvivalens jogosultságú felhasználó.  

> Kezdetben különbözőek jogosultságokkal rendelkeztek de a kialakulás alatt a kért változások miatt a végeredményben ugyanazok a jogosultságokkal rendelkeznek, de különböző embereknek vannak kiosztva.  

- **Instructor**: A cég egy belső oktatója, főként a felvitt project adatok ellenőrzésére jogosult.  

- **Support**: A cég egy külsős oktatója, a jogosultságai az Instructor felhasználóéval jelenleg megegyeznek.  

- **Bot**: Az automatikus rendszerekhez szükséges legszűkebb jogosultságú felhasználó / service account.  


#### 3.3.2.2 Jogosultsági körök


Az alkalmazásban elvégezhető műveleteket a következő csoportokba lehet beosztani:  

- **Email**: Az emlékeztető és értesítő levelek küldése  

- **Info**: A Dashboard és a Kalendár megtekintése  

- **Order**: A rendelések kezelése és új projectek kiírása  

- **Finance**: A pénzügyi adatok kezelése, a banki backlogok kezelése  

- **General**: Általános adatok kezelése  


Ezek a csoportok tartalma megtekinthető az Adatbázis leírásában

Továbbá a jogosultságok megvalósíttásakkor a jogosultsági körök minden oldalra külön felülírhatóak lesznek.


#### 3.3.2.3 Műveletek


A jogosultsági körök által meghatározott műveletek a következők lehetnek:  

- **Read**(R): Adatok megtekintése  

- **Write**(W): Adatok módosítása    

- **Restricted**(-): Az adott adatokhoz nincs hozzáférés  



| Jogosultságok \ Körök         | Super | Test | Finance | Operator | Coordinator | Instructor | Support |
|-------------------------------|-------|------|---------|----------|-------------|------------|---------|
| Email                         |  W    |  W   |   -     |    W     |     W       |     -      |    -    |
| Info                          |  W    |  W   |   W     |    W     |     W       |     R      |    R    |
| Order                         |  W    |  W   |   W     |    W     |     W       |     R      |    R    |
| Finance                       |  W    |  W   |   W     |    -     |     -       |     -      |    -    |
| General                       |  W    |  W   |   W     |    W     |     W       |     R      |    R    |


#### 3.3.2.4 Vendég jogosultságok  


Minden adat érzékeny így nem engedünk vendég felhasználót, kizárólag a Céges Azure AD-ban meghatározott felhasználók látogathatják az oldalt
