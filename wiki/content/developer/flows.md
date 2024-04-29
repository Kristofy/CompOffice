### Hálózati interakciók

Egy általános bármilyen kérés a szerver felé így néz ki:

![Általános kérés](./content/general_request.svg)

- A kliens elküldi a kérést a szervernek.
- Ha a kliens már be van jelentkeztetve (JWT), akkor a kérést megkapja a szerver.
- Ha a kliens nincs bejelentkezve, akkor a szerver áttirányítja a bejelentkezési oldalra, amely majd bejelentkezés után vissza irányítja a klienst a kívánt oldalra.
- A bejelentkezés részletei provider üggőek, az ábra az Azure Authentikációt mutatja be.
- Ha a kliens bejelentkezve van, akkor a szerver ellenőrzi, hogy a kliens jogosult-e a kérésre. Ha nem akkor elutasítja a kérést.
  > Ez úgy valósíttható meg, hogy a JWT tartalmazza a felhasználó azonosítóját, és a szerver ezt ellenőrzi (mondjuk az adatbázisban tárolt jogosultságokkal).
- Ha minden rendben van, akkor a szerver a kérést végrehajtja, és a választ visszaküldi a kliensnek.

### Form interakciók

Egy adat mósoíttásának, vagy hozzáadásának folyamata

![Form interakciók](./content/form_flow.svg)

- A felhasználó elkezdi szerkeszteni az egyik adatot.
- Ammennyiben a módosíttás hibás, akár a kliens alapján, akár a szerver alapján, akkor a hibaüzenetet megjelenítjük.
- A kliens alapján a hibát a mezőnél jelenítjük meg, a szerver alapján a hibaüzenetet a form tetején.
- A szerver ellenőrzése a kliensen történik (ez megtehető hiszen a kódbázis ugyan az)
- Ha a kliens oldalon minden rendben van, akkor a szerverhez küldjük a módosíttást és optimisztikusan, úgy tekintjük, hogy a módosíttás sikeres volt.
- A szerver ellenőrzi, hogy a felhasználó jogosult-e a módosíttásra, ha nem egyből hibát küld vissza.
- A szerver ellenőrzi a módosíttást, és ha minden rendben van, akkor a módosíttást végrehajtja. Majd a módosíttott adatot vagy hibát visszaküldi a kliensnek.
- A kliens a válasz alapján frissíti a megjelenített adatokat.

### Listázás folyamata

Az applikáció egyik leggyakrabban használt funkciója a listázás, ezért ezt a folyamatot is érdemes külön megvizsgálni, hiszen a listázás optimális megvalósítása bonyolult folyamat.

\pagebreak
![Listázás folyamata](./content/list_flow.svg)
\pagebreak

A listázás folyamata a következő:
A listázás egy teljes mértékben kliens oldali folyamat.

- Az adatokat lekérjük a szerverről, majd egyből le is mentjük a gyorsíttótárba.
- Az adatokat áttalíkítjuk olyan formába, hogy a filterelés a lehető leggyorsabb legyen.
  > minden rekordhoz hozzátesszük a filterelés eredményét is, úgy, hogy, ha a `j` edik filter alapján az adat nem elfogadott, akkor egy maszkban, a maszk `j` edik bitje 0, egyébként 1.
  > Így egy filter módosíttása O(n) és a teljes filter kiszámmítása is O(n) az O(n \* filterek_száma) helyett.
- Rendezés esetén a teljes listát rendezzük egy stabil rendezéssel, így elérhető a többszörös rendezés is.

**Adatok kijelzése**

Az adatok kijelzése, betöltéskor, filter vagy rendezés változásakor történik, így gyorsnak kell lennie.

- Filter módosíttása esetén a kliens várakozik egy rövid időt, hogy a felhasználó befejezze a gépelést(debounce), újra futtatjuk az adatok kijelzését.

- A rendezés esetén az újrafuttatás azonnali.

- A filterek számítta után az optimizációs lépések megszakítthatóak, ha a felhasználó újra módosíttja a filtereket.

- Egyből a kijelzés után a kliens dinamikusan betölti, csak a látható elemeket, ezeket az elemeket a kliens futás közben készítti, majd beszúrja a DOM-ba.

- Egy kis idő elteltével, ha nem volt megszaakítás, akkor a kliens növeli a betöltött elemek számát(overscan), így görgetés esetén ritkábban fog előfordulni, hogy az elem éppen töltődik be.

- További idő elteltével, ha nem volt megszakítás, akkor a kliens elmenti az összes eleme egy részének Node reprezentációját.

- Toavábbi idő elteltével, ha nem volt megszakítás, akkor a kliens elmenti az összes elem teljes Node reprezentációját.

#### A listázás sebességének asszimpotikus vizsgálata

A fenti ábrából kiindulva, a listázás sebességét az alábbi módon vizsgálhatjuk:

| Esemény                   | Első megjeleníttés komplexitása | Görgetés (1 elemre) Komplexitása |
| ------------------------- | ------------------------------- | -------------------------------- |
| betöltéskor               | O(N(n) + n + kR)                | O(R)                             |
| filtereléskor             | O(nf_j + n + kR)                | O(R)                             |
| rendezéskor               | O(n\*log(n) + KR)               | O(R)                             |
| kis idő elteltével 1.     | O(n \* r)                       | O(r)                             |
| még kis idő elteltével 2. | O(n \* R)                       | O(1)                             |

### Oldalon interakciók

Egy megjeleníttő oldalon a felhasználó interakciók által kiváltott események

![Felhasználói interakciói](./content/user_interaction.svg)
