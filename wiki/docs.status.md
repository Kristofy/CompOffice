A következő funkciókat teljesítti a program:

A funkcionális követelményeket egyesével nem vizsgáljuk, mert azokközül a legtöbb az általános listázás funkcióval teljesül, a végső állapotban azonban az összes funkció saját részt kap az e2e tesztekben.

- [x] Létezik autentikáció, két fajta, egy dev (amely csak mockok és tesztelésre való) és egy éles Azure Authentikáció.
- [ ] Autorizáció még nincs
- [x] Létezik általnos listázás funkció, így az összes oldal látogatható és a lista megjelnik.
- [x] Létezik egy általános form, így az összes elem szerkeszthető.
- [x] Az általános form validációval rendelkezik.
- [x] Az általános form hibakezeléssel rendelkezik.
- [x] Az általános form módosíttása a szerveren is ellenőrzés után megtörténik.
- [ ] Optimisztikus módosíttás még nincs
- [x] Több réteges cachelés
- [x] A lista kijelzése gyors és dinamikus
- [x] Listában az oszlopok rendezhetőek
- [x] Listában az oszlopok szűrhetőek
- [x] Listában az oszlopok megjeleníthetőek / elrejthetőek
- [x] A lista rendezése / szűrése / megjeleníttése megtörténik, valamint gyors, közel azonnali visszajelzést adnak
- [x] List elemre jobbkikkelve megjelenik egy kontextus menü
- [x] kontextus menúből a felhasználó módosítthat
- [x] kontextus menúből a felhasználó törölhet
- [ ] kontextus menúből a felhasználó klónozhat
- [x] kontextus menúből a felhasználó Új elemet létrehozat
- [x] (A kontextus menü gyors, csak egy mindig regisztrált event listener van a teljes listán)
- [x] A navigációs sáv létezik és a menüpontok működnek

- [ ] Főoldal nincs
- [ ] A komplikált oldalk, amelyeken nem használható az általános megoldások nincsenek
  > Ezek a project listázás oldal, valamint a kurzus szerkesztő oldal.
  > Továbbá a kalendár nézet, valamint az email küldő oldal.
  > (A kalendár nézet mögötti kód már elérhető, viszont kliens oldalon még nincs megjelenítve)
- [x] Automatikus tesztelés van
  > A tesztek Gherskin formátumban íródnak, majd js-ben kóddal definiálják a tesztelendő funkciókat.
  > A tesztek a `cypress` keretrendszerrel működnek a `cucumber` bővítménnyel(gherskinhez)
- [x] A dokumnetáció teljes mértékben "élő", tehát a kódbázis változásával változik
- [x] Típushelyesség elérhető az adatbázis - szerver - kliens között
- [x] Kód formátum, igyekszem a kódot tisztán tartani, és managelhető részekre bontani
  > A kód nagy része a jövőben JSDoc formátummal lesz kommentelve, így a kódbázis dokumentációja is teljesen élő lesz.
- [ ] Az oldalak nagy része nem reszponzív, ennek javíttása sok időt igényel, és a probléma alacsony prioritású
  > Sok időt igényel, mert a listák virtualizálása a pozición múllik. (A form már reszponzív)
  > Alacsony prioritású, mert a felhasználók nagy része kizárólag asztali gépen használja az alkalmazást.

## Külön kitérve a nem funckionális követelményekre

**Hatékonyság**:

- [x] Az alkalmazás gyors
- [x] A nagy mennyiségű adatokat nem pagerrel hanem lista virtualizálással megoldja
- [ ] Az adatmódosíttás nem optimisztikusan történik
- [x] Van kliensoldali gyorsítótár

**Biztonság**:

- [x] Minden kommunkációt csak autentikát felhasználó végezhet (természetesen a bejelentkezést kivéve)
- [x] Ismert támadási módszerek ellen védett
  > Ez nem az én érdemem én, csak kipróbáltam és utánna olvastam, a keretrendszerek végzik a munkát.
  > SQL Injection nem lehetséges, mert a paraméterek nem stringként kerülnek átadásra, és felhasználás előtt helyesen fel vannak dolgozva az ORM által.
  > XSS React garantálja hogy a <> {} </> formátumban beillesztett adatok előzőleg helyesen transformálva lesznek
  > CSRF nem lehetséges, Auth.js (régebben NextAuth) lekezeli
  > Brute force támadások ellen nem védett a dev verzió, de az éles verzió igen, hiszen a bejelentkeztetést az éles verzióban kizárólag az Azur Microsoft Authentikáció végzi.
  > DDOS támadások ellen nem védett, ha szükséges akkor deployment után betehető CloudeFlare ddos véddelem mögé

**Megbízhatóság**:

- [x] A kommunikáció típushelyes, és a tRCP rest api-t is biztosít
- [ ] Az események nincsenek naplózva

**Felhasználói felület**:

- [x] A felület ergonomikus és könnyen kezelhető.
- [ ] A felület kényelmes új felhasználók számára
- [x] lehetőséget ad a gyorsabb munkára a tapasztalt felhasználók számára.
- [ ] Még nem lehetőséget ad a gyorsabb munkára a tapasztalt
      felhasználók számára.
  > A kódbázisban kezdetleges global search és shortcut support már van, de még nincs megjelenítve
- [ ] Az alkalmazásnak reszponzívnak kellene lennie

**Platformfüggetlenség**:

- [x] Az alkalmazás kliens oldala Chromium alapú böngészőkön és Firefoxon működik, ezekhez külön külön futtatható az e2e test.
- [x] A server oldal tetszőleges linux szerveren működik.

**Szükséges Erőforrások**:

- [x] Jelenleg minden követelmény teljesítt, de ez nem reprezentaív a végleges állapotra nézve, hiszen az alkalmazás még nem teljes
