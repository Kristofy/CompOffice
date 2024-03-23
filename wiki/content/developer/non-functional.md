## 3.2 Nem funkcionális követelmények

### 3.2.1 Hatékonyság

- A gyors válaszidő fontos, de nem priorítás.

- Az alkalmazás ahol tehet nagy mennyiségű adatokat pager-rel jeleníttmeg    

- Az adat módisíttás optimisztikus módon történik, azaz ha a kliens oldalon el lett fogadva akkor a kliens folytatja a működésést még mielőtt a szerver válaszolna, a ritka alkalmankét amikor a szerver válasza, hogy helytelen a kliens oldali változás akkor a kliens oldalán is visszaállítja a változást.   

- Ammenyiben szükséges egy Gyorsítóttár réteg is bevezethető, az  adatbázis tűlterheltségének csökkentésére. Feltehetően mivel az alkalmazást egyszerre csak 5-10 ember használja, ezért nem lesz szükség rá.  

### 3.2.2 Biztonság

- Minden kommunikáció MS MFA Azure AD mögött történik.  

- Az ismert támadási technikák (SQL Injection, XSS, stb.)  nem működnek az alkalmazásban.  


### 3.2.3 Megbízhatóság

- Az alkalmazás tRPC-t használ a kliens oldalon, de REST stílusú "publikus" api-t is biztosítt. nem vezethet hibás viselkedéshez.  

- Minden fontos esemény az alkalmazásban naplózásra kerül.  


### 3.2.4 Felhasználói felület

- A felület ergonomikus és könnyen kezelhető.  

- A felület kényelmes új felhasználók számára és lehetőséget ad a gyorsabb munkára a tapasztalt felhasználók számára.  

- Az alkalmazásnak reszponzívnak kell lennie, azaz minden eszközön jól használhatónak kell lennie, habár az alkalmazás irodai környezetben való munkára (Számítógépen) készül.  

### 3.2.5 Platformfüggetlenség

- Az alkalmazás kliens oldala Chromium alapú böngészőkön és Firefoxon működik.  

- A server oldal tetszőleges linux szerveren működik.  

### 3.2.6 Szükséges erőforrások

**Hardveres erőforrások**:  


- Az alkalmazás kliens oldala egy átlagos számítógépen is futtatható.  
- Az alkalmazás szerver oldala egy átlagos szerveren is futtatható.  
- Fejlesztés alatt a gyors fejlesztéshez egy erősebb számítógép ajánlott 8+ GB rammal és 4+ magos processzorral.  

**Szoftveres erőforrások**:  


- Az alkalmazás kliens oldala egy átlagos böngészőn futtatható.   
- Az alkalmazás szerver oldala egy átlagos linux szerveren futtatható.   
- Fejlesztés alatt a package.json-ben devDependencies-ben megadott szoftverek szükségesek, valamint egyéb csomagok ezek:   
  - git, nodejs, npm, pandoc, go, python3, texlive latex csomagok    
  - fejlesztői környezet, lehetőleg ami integrálja a formázó és lintelő eszközöket pl.: VSCode vagy nvim   
- Adatbázis szerver

**Üzemeltetés és karbantartás**:  


- Az karbantartáshoz egy naplózó rendszer beüzemelése előnyös de nem szükséges
- Az üzemeltetés a számítógép költségén kívül nem igényel egyéb költséget.  
- A karbantartás egyszerűsíttése a dolgozatom egyik fő célja. Reményeim szerint az erre fordíttandó költéségek minimálisak lesznek.  

### 3.2.7 Megvalósíttás és használt technológiák


TBD



