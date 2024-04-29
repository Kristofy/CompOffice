---
title: 'Szakdolgozat'
author: Osztopáni Kristóf
date: '2024-03-20'
subject: 'Markdown'
keywords: [Markdown, Example]
subtitle: 'CompOffice  - Kurzus és pénzügyi adminisztárció'
lang: 'hu'
titlepage: true,
titlepage-text-color: '424242'
titlepage-rule-color: '360049'
titlepage-rule-height: 0
---

[{(content/title.md)}]

\pagebreak

# A szoftver architektúra terve

## Az adatbázis

Az adatbázis tervezésekor a következő szempontokat vettük figyelembe:

- A lehető legkevesebb redundancia, viszont a használat alatt különböző workaroundokhoz bekerültek redundáns / aggregált adatok.

  - Az adatbázis a cég tulajdona így a sémáját mósosíttani a dolgozatomnak nem része, azonban amint a régi megoldásokat átültetjük az új rendszerbe, a redundáns adatokat tartalmazó mezőket eltávolítjuk.

- Az adatbázist Azure Ms SQL valósítja meg, viszont ezt az adatbázis ORM elfedi, és lehetővé teszi bármely más adatbázis használatát is a későbbiekben, a kód módosítása nélkül.

- Az adatbázit **entity-relationship diagrammal** modelleztük, így ezzel is lessz bemutatva

[{(dev/database.md)}]

## Az "üzelti logika"

Az alkalmazás alapja egy egyszerű réteg az addatbázis fölé, ahol a felhasználó egyszerűen tudja kezelni az adatokat, és a felhasználói felületen keresztül tudja azokat módosítani.

**GET**  
A szerver oldal így a legtöbb esetben egy-az-egyben visszaadja a táblák tartalmát, általában a kapcsolt táblák tartalmával együtt.

**POST**
A felület minden esetben ellenőrzi az adatbázis megszoríttásait, és a típuson kívül semmi mást, így az adatbázis a "source of truth".

Ennél fogva az üzleti logika nem tartalmaz semmilyen bonyolult számíttást, vagy adat aggregációt, hiszen ha szükséges, akkor ezeket az adatbázisban valósítjuk meg.

Habár van pár plusz funkció, amely nem a felettébb leírt módon műkködik, ezek a következők:

- A felhasználó bejelentkeztetése
- A felhasználó jogosultságainak ellenőrzése
- Automatikus emailek küldése
- A kalendárhoz szükséges adatok felépíttése
  > Ez nagyon sok számíttás, ezért a nagy részét nem az adatbázis, hanem a szerver valósítja meg.

A szerver oldallal ellentétben a kliens oldal felépíttése sokkal bonyolultabb, hiszen a felhasználói felületnek sokkal több funkciót kell ellátnia, mint a szerver oldalnak.

A kliens oldalnak fel kell tudni dolgozni effektíven a szerver által küldött adatokat, melyek a teljes táblákat tarttalmazza. Ez a következő okokból történik így:

**Az egyben küldés előnyei:**

- A legtöbb adatunk nem "time-series" adat, így nem éri meg szerver oldalon darabolni és csak részleteket küldeni, mert a kliens oldalon keresés / rendezés esetén más adatokra lesz szükségünk.
- Habár ilyenkor lehetne újabb kérést küldeni a szervernek, azonban ez sokkal lassabb lenne, mint egyszerre az összes adatot elküldeni.
- Egy küldés során client -> server -> db -> server -> client úton megy az adat, ami lassú válaszidőhöz vezet, főként a szerver és a db közötti kapcsolat miatt.
- A teljes tábla elküldése nem jelent nagy terhelést a szerverre, hiszen a legtöbb esetben a táblák mérete nem nagy, és a szerver könnyen tudja ezeket a kéréseket kezelni.
- Ebben az esetben a kliens oldal nem küld network requesteket keresés vagy rendezés esetén, így a felhasználói élmény sokkal jobb lesz.

**Az egyben küldés hátrányai:**

- Az oldal betöltése lassabb lesz, mivel a kliens oldalnak meg kell várnia az összes adatot, mielőtt megjelenítené az oldalt.

  > Itt a JSON packet mérete a probléma, amit különböző módszerekkel lehetne csökkenteni, mint például a gzip használata, vagy a felesleges mezők kihagyása vagy teljes serializálás formátumát lecsréletjük Protobuf-ra. Azonban jeleneleg erre nem volt még szükség.
  > A táblák mérete miatt ez nem nagy probléma, továbbá, többrétegű cache implementációt használunk, így a kliens oldalnak nem kell minden kérésnél újra lekérnie az adatokat.

- Az adatok módosíttása, esetén le kellene kérni ismételten az adatokat.

  > Ezt optimisztikus frissíttéssel megoldhatjuk, úgy hogy a frissítést kliens oldali ellenőrzés után elküldjük a szervernek, de ameddig a válasz nem érkezik meg, addig a kliens oldal már a módosíttott adatokat mutatja(A kliens optimisztikus). És a szerver oldal ilyenkor visszaküldi az új adatot / hibát, és a kliens leköveti a változásokat.

- A kliens oldali gyorsíttótár elavulhat, és ezt nem vesszük észre

  > Az oldal betültésekkor a kliens feliratkozik a változásokra, így a kliens értesül a változásokról, és frissíti a gyorsíttótárat. Így a kliens oldal mindig naprakész lesz.
  > Ez a gyakorlatban egy web socket ideális esetben, ha nem elérhető akkor valami azonos funkciót "trükk rest api-on keresztül"(pl. long polling).

- A felhasználói élmény érdekében a kliens oldal sem végez darabolást a hagyományos értelemben("pagination"), habár ez nem elvárás, viszont ha megvalósíttjuk naívan, akkor a kliens oldal lassú lesz, a rengeteg DOM elem miatt. És a keresések és rendezések is lassúak lesznek, mivel a DOM manipuláció sok időt vesz igénybe.
  > A teljes tábla megjeleníttése helyett, a domot folyamatosan módosíttjuk úgy hogy csak a látható elemeket töltjük be dinamikusan a DOM-ba.

## A kliens

A kliens oldal az előbbiek alapján egy elég bonyolult rendszer, mely sok különböző folyamatból áll.

Ezeket a folyamatokat a következő pontokban jobban kifejtem

[{(content/developer/flows.md)}]

## Drótváztervek

[{(content/developer/wireframes.md)}]

## A képernyők közötti navigáció

Ez a point nem releváns, mert minen képernyő a navigációs sávból lesz elérhető, és a képernyő minden funkciót megvalósítt (például a listázás képernyőn van a szerkesztés)
