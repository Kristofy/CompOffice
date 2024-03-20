#### 3.3.3.1 As An **Un Authenticated User**. 
\
Bejelentkezési oldal látogatásakkor a felhasználó, ha még nem jelentkezett be, akkor a bejelentkezési oldalra irányítódik át, ahonnan sikeres bejelentkezés után a főoldalra irányítódik át, sikeretelen bejelentkezés esetén a bejelentkezési oldalon marad.


```mermaid
graph
    Dashboard["Főoldal"]

    subgraph AuthGroup["Authentication"]
        Aktor --> | Bejelentkez | Auth["Autentikáció"]
        Auth -->| Elutasítva | Aktor
        Auth -->| Bejelentkezve | Dashboard["Főoldal"]
    end
```


\pagebreak

#### 3.3.3.2 As An **Authenticated User** With **Email** privileges.

\

Amennyiben egy felhasználó rendelkezik az email(W) jogosultsággal akkor az alábbi funkciókat tudja elérni:  

- Küldhet emailt  

- Megtekintheti az emailküldés státuszát  

Ha csak olvasó jogosultsága van akkor csak megtekintésre nyithatja meg, amennyiben nincs jogosultsága, akkor nem tudja megnyitni az oldalt, a menüfülön nem is lesz látható az opció.


```mermaid
graph BT 
    subgraph AktorGroup["Email jogosultságokkal"]
        Aktor((Aktor))
    end

    subgraph ErrAktorGroup["Email jogosultság nélkül"]
        ErrAktor((Aktor))
    end

    subgraph EmailGroup["Email"]
        Aktor --> | Küld | Email["Emailek"]
        Aktor --> | Megtekint | Email["Emailek"]
    end

    ErrAktor --> | Interakciót kezdeményez | EmailGroup
    EmailGroup --> | Elutasít | ErrAktor
```

\pagebreak


#### 3.3.3.3 As An **Authenticated User** With **Order** privileges.
\
A felhasználó meg tudja tekinteni a futó projektekt és annak minden részletét beleértve a megrenelőket és a megrendelők résztvevőit, valamit a projektet tartó oktatókat. Ezen felül képes az ügyfeleket és kapcsolattartók adatait módosíttani.

- Módosíttás csak akkor ha van W jogosultsága

- Megtekintés csak akkor ha Olvasás(vagy írás) jogosultsága van.

- Ha nincs jogosultsága akkor nem tudja megnyitni az oldalt, a menüfülön nem is lesz látható az opció, ha a felhasználó mégis oda navigál akkor az oldal elutasítja a kérést.



```mermaid
graph

    subgraph ActorGroup["Email jog"]
        direction LR
        ProjectGroup --> | Elutasíthat | Aktor("Actor")
        OtherGroup --> | Elutasíthat | Aktor
    end

    subgraph ProjectGroup["Projektek"]
        direction BT
        Aktor --> | Megtekint | Project["Projektek"]
        Project --> | Megtekint | Order["Rendelések"]
        Order --> | Megtekint | Customer["Megrendelők"]
        Order --> | Megtekint | Trainer["Oktatók"]
        Order --> | Megtekint | Participant["Résztvevők"]

        Aktor --> | Módosít | Project["Projektek"]
        Project --> | Módosít | Order["Rendelések"]
        Order --> | Módosít | Customer["Megrendelők"]
        Order --> | Módosít | Trainer["Oktatók"]
        Order --> | Módosít | Participant["Résztvevők"]
    end


    subgraph OtherGroup["Egyéb"]
        Aktor --> | Megtekint | CompanyCustomer["Ügyfelek"]
        Aktor --> | Módosít | CompanyCustomer["Ügyfelek"]
        Aktor --> | Megtekint | CompanyContact["Kapcsolattartók"]
        Aktor --> | Módosít | CompanyContact["Kapcsolattartók"]
    end
```

\pagebreak

#### 3.3.3.4 As An **Authenticated User** With **Finance** privileges.
\
A felhasználó hozzáfér a pénzügyi adatokhoz és azokat módosíthatja is.  
A pézügyi adatok közé tartozik a költségek, bevételek, banki adatok, számlák és számla tételek, valamint az áfa jelentések.  

- Módosíttás csak akkor ha van W jogosultsága

- Megtekintés csak akkor ha Olvasás(vagy írás) jogosultsága van.

- Ha nincs jogosultsága akkor nem tudja megnyitni az oldalt, a menüfülön nem is lesz látható az opció, ha a felhasználó mégis oda navigál akkor az oldal elutasítja a kérést.



```mermaid
graph
    subgraph ActorGroup["Finance jog"]
        direction LR
        InvoiceGroup --> | Elutasíthat | Aktor("Actor")
        BankGroup --> | Elutasíthat | Aktor
        FinanceReport --> | Elutasíthat | Aktor
    end
    subgraph InvoiceGroup["Számlák"]
        Aktor --> | Megtekint | Invoice["Számlák"]
        Invoice --> | Megtekint | InvoiceLine["Számla tételek"]
        Aktor --> | Módosít | Invoice["Számlák"]
        Invoice --> | Módosít | InvoiceLine["Számla tételek"]

        Aktor --> | Módosít | InvoiceLineType["Számla Típus"]
        Aktor --> | Megtekint | InvoiceLineType
    end

    subgraph FinanceReport["Pénzügyi jelentések"]
        Aktor --> | Megtekint | FinanceReportVAT["Éves áfa jelentés"]
        Aktor --> | Megtekint | FinanceReportOUT["Kiadások"]
        Aktor --> | Megtekint | FinanceReportIN["Bevételek"]
    end


    subgraph BankGroup["Banki adatok"]
        Aktor --> | Megtekint | Bank["Banki adatok"]
        Bank --> | Megtekint | BankLine["Banki tételek"]
        Aktor --> | Módosít | Bank["Banki adatok"]
        Bank --> | Módosít | BankLine["Banki tételek"]
        BankLine --> | Módosít | FinanceReportVAT
        BankLine --> | Módosít | FinanceReportOUT
        BankLine --> | Módosít | FinanceReportIN
    end
```

\pagebreak

#### 3.3.3.5 As An **Authenticated User** With **General** privileges.
\
A felhasználó hozzáfér az általános adatokhoz.  
Az általános adatok közé tartozik a modulok, termékek, oktatók, céges szünetek, oktatási témák, iparágak és régiók.  

- Módosíttás csak akkor ha van W jogosultsága

- Megtekintés csak akkor ha Olvasás(vagy írás) jogosultsága van.

- Ha nincs jogosultsága akkor nem tudja megnyitni az oldalt, a menüfülön nem is lesz látható az opció, ha a felhasználó mégis oda navigál akkor az oldal elutasítja a kérést.



```mermaid
graph LR
    subgraph ActorGroup["General jog"]
        direction TB
        Aktor((Aktor))
    end

    subgraph CourseGroup["Kurzusok"]
        Product["Termékek"]
        Module["Modulok"]
        Trainer["Oktatók"]
    end

    subgraph HolidayGroup["Szünetek"]
        CompanyBreak["Céges szünet"]
        TrainerBreak["Oktatói szünet"]
    end

    subgraph GeneralGroup["Általános"]
        Training["Oktatási Témák"]
        Industry["Iparág"]
        Region["Régiók"]
    end

    CourseGroup --> | Elutasíthat | Aktor
    GeneralGroup --> | Elutasíthat | Aktor
    HolidayGroup --> | Elutasíthat | Aktor
    Aktor --> | Megtekint | Product["Termékek"]
    Aktor --> | Módosít | Product["Termékek"]
    Aktor --> | Megtekint | Module["Modulok"]
    Aktor --> | Módosít | Module["Modulok"]
    Aktor --> | Megtekint | Trainer["Oktatók"]
    Aktor --> | Módosít | Trainer["Oktatók"]
    Aktor --> | Módosít | TrainerBreak["Oktatói szünet"]
    Aktor --> | Megtekint | TrainerBreak["Oktatói szünet"]
    Aktor --> | Megtekint | CompanyBreak["Céges szünet"]
    Aktor --> | Módosít | CompanyBreak["Céges szünet"]
    Aktor --> | Megtekint | Training["Oktatási Témák"]
    Aktor --> | Módosít | Training["Oktatási Témák"]
    Aktor --> | Megtekint | Industry["Iparág"]
    Aktor --> | Módosít | Industry["Iparág"]
    Aktor --> | Megtekint | Region["Régiók"]
    Aktor --> | Módosít | Region["Régiók"]
```

\pagebreak

#### As An **Authenticated User** With **Info** privileges.
\
Minden felhasználó rendelkezik az Info jogosultsággal.  

Az Info jogosultság csak megtekintésre jogosítja fel a felhasználót.  

A Felhasználó megtekintheti a Training Calendár és a Főoldalon a közeljövőben esedékes eseményeket.  


```mermaid
graph LR
    subgraph ActorGroup["Info jog"]
        Aktor("Actor")
    end
    subgraph TrainingCalendarGroup["Training Calendar"]
        Aktor --> | Megtekint | TrainingCalendar["Training Calendar"]
    end
    subgraph DashboardGroup["Főoldal"]
        Aktor --> | Megtekint | Dashboard["Főoldal"]
    end
```

