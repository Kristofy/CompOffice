## 3.1 Áttekintés


### 3.1.1 Élő dokumentáció
A dokumentáció nagy része "élő" dokumentációként lett tervezve, ígya dokumentáció nagy része integrált a kódbázisban.

Erre egy példa hogy az adatbázis modelje a `prisma/schema.prisma` file amely leírja a konkrét adatbázis táblákat és kapcsolatokat, képes legenerálni a hozzájuk tartozó entity-relationship diagramot és leírásokat is.
> Megjegyzés: A dokumentáció így "élő" hiszen csak a kód részét kell változtatnom és emiatt frissül a dokumentáció része is a projektnek.


A schema így néz ki:  
```
/// @namespace Instructor
/// Oktatók cégének adatai
model instructor_company {
  /// Elsődleges kulcs
  ///
  /// @format uuid
  id         Int          @id(map: "PK__instruct__3213E83FA0B8D54C")
  
  /// Cég neve
  name       String       @unique(map: "UQ__instruct__72E12F1BD9C014F0") @db.VarChar(100)
  instructor instructor[]
}
```

És ebből Markdown formátumú dokumentáció készül. A kódbázis minden dokumentációja Markdown formátumú, pontosabban Github Favoured Markdown formátumú, és elérhető a [githubon](https://github.com/Kristofy/CompOffice/blob/master/wiki/wiki.md). Ebből PDF is generálható.

### 3.1.2 Dokumentáció előállítása
A dokumentációs fájlok:

- __/wiki/__: Tartalmazza az öszes dokumentációt.   
- __/wiki/wiki.md/__: Az összevont dokumentáció   
- __/wiki/docs.md__: A dokumentáció kialakításához használt gyökér fájl.   
- __/wiki/dev/__: Tartalmazza a dokumentáció élő részét, ezek a generált dokumentációk.   
- __/wiki/content/__: Tartalmazza a dokumentáció statikus részét   


A Dokumentáció felépíttése a kódbázisból a következőként történik:

- **1.**: Az adatbázis dokumentációjának legenerálása   
- **2.**: A userstory-k dokumentációjának legenerálása   
- **3.**: A root fájlt használva egy md-be összevonja a dokumentáció részeit.   
- **4.**: Az összevont dokumentációból készítjük a PDF-et.   

> A megfelelő környezetben az `npm run docs` parancs ezeket hajtja végre

### 3.1.3 A használt eszközök

- Az adatbázis-t [Prisma](https://www.prisma.io/) Orm-el managelem, és ehhez egy (prisma-markdow)[https://github.com/samchon/prisma-markdown] generátorral készítem a dokumentációt.  

- A markdown dokumentációban található [Mermaid](https://github.com/mermaid-js/mermaid) formátumú diagrammokat a [mermaid-filter](https://github.com/raghur/mermaid-filter) cseréli le képre pdf esetén.   

- A md-merge-lés egy saját python eszköz amely megtalálható a `/tools/md_merge.py` fileban   

- A user-story-k a '/features` mappában találhatóak .feature kiterjesztéssel, ezek egy speciális Markdown formátumot követnek kifejezetten User-story-kra tervezve, a formátumot (Gherkin)[https://cucumber.io/docs/gherkin/reference/]-nek hívják.  

- A .features kiterjesztésű user story-k közönséges Markdown-ná alakíttását a [gherkin2markdown](https://github.com/raviqqe/gherkin2markdown) program végzi.   

- A végső PDF a [Pandoc](https://pandoc.org/) programmal készül az [eisvogel](https://github.com/enhuiz/eisvogel) template-t használva.   

