# Inlämning 1 - Webbshop

&nbsp;

Gottfrid Jästson är en kreativ och företagsam person i Snaskköping, som i många år har sålt munkar i butik. Tyvärr har han märkt av sjunkande försäljningssiffror på grund av allsköns "kurirer" som far runt på livsfarliga elsparkcyklar i staden. Det verkar som att ungdomarna inte längre orkar gå utanför dörren för att inhandla mat?!

Nåväl, Gottfrid misströstar inte mer än nödvändigt; en liten webbshop för munkar* vore på sin plats - och just ditt företag, Webbyrån Justin Time AB, har blivit utvald som leverantör för att bygga den! Det vilar nu på dina axlar att Gottfrid inte går i konkurs.

Oj, oj, oj! En webbshops-prototyp på bara fyra veckor?! Hur ska detta gå? 😵‍💫

Bra såklart!

\* Du får gärna ta ut de kreativa svängarna och kränga en annan produkt också, såklart (strumpor, säkerhetsdörrar, kottar) - så länge funktionsbeskrivningarna följs.  

&nbsp;
---
&nbsp;

## Innehåll

### Generellt
- Beställningssidan ska vara EN sida; du ska inte växla mellan kundkorg och produktöversikt t.ex. Det räcker alltså med EN HTML-fil och tillhörande JavaScript-kod.
- Webbshoppen ska vara responsiv. Hur design/utseende ser ut, är upp till er, men det ska fungera på mobil, tablet & desktop.
- Gränssnittet/sidans utseende ska vara intuitivt.
- Det ska gå att utföra hela beställningsförfarandet med hjälp av enbart tangentbordet (tillgängligt).
- Bredvid/i anslutning till varje munk ska det finnas knappar för att öka och minska antalet beställda munkar. Tänk på att dessa ska fungera även med tangentbordet.
- Munkarna är hårdkodade i filen (de behöver inte komma från ett API, en databas eller JSON-fil).
- När man tryckt på beställ-knappen så ska en bekräftelse-ruta visas med information om beställningen och leveranstid.
- Produkterna ska gå att sortera utifrån namn, pris, kategori och rating  
&nbsp;

      Optional
      - Det ska gå att filtrera produkter på prisintervall
      - När man trycker på beställ-knappen så ska möjligheten att ändra beställningen tas bort (hur du tolkar/löser detta är fritt - det kan t.ex. vara att låsa inputrutor eller dölja formuläret)   
  
&nbsp; 
---
&nbsp;

### Beställningssammanfattning

- Totalsumman ska uppdateras baserat på ändringar som sker i antal beställda munkar i realtid
- Det ska finnas en varukorgssammanställning som visar endast de munkar som har beställts. Denna ska alltså vara skild från själva beställningsformuläret. Se referensbilder längre ner.

&nbsp;
---
&nbsp;

### Produkterna

- Varje munk ska ha följande egenskaper:
  - Ett namn
  - Ett pris
  - En rating
  - En kategori
- Det ska finnas minst 10 munkar i webbshopen.  
&nbsp;

      Optional
      - Varje munk ska ha (minst) två bilder
      - Varje munk ska ha en kategori (du får hitta på själv), det ska finnas 3 kategorier.
      - Det ska gå att filtrera produkter på prisintervall och kategori.
      - I presentationen av produkterna ska det gå att växla mellan minst två bilder på respektive munk.  

&nbsp;
---
&nbsp;

### Gottfrids specialregler

- På måndagar innan kl. 10 ges 10 % rabatt på hela beställningssumman. Detta visas i varukorgssammanställningen som en rad med texten "Måndagsrabatt: 10 % på hela beställningen".
- På fredagar efter kl. 15 och fram till natten mellan söndag och måndag kl. 03.00 tillkommer ett helgpåslag på 15 % på alla munkar. Detta ska inte framgå för kunden att munkarna är dyrare, utan priset ska bara vara högre i "utskriften" av munkarna.
- Om kunden har beställt för totalt mer än 800 kr ska det inte gå att välja faktura som betalsätt.
- Om kunden har beställt minst 10 munkar av samma sort, ska munkpriset för just denna munksort rabatteras med 10 %
- Om kunden beställer totalt mer än 15 munkar så blir frakten gratis. I annat fall är fraktsumman 25 kr plus 10% av totalbeloppet i varukorgen.
- Om kunden inte har lagt beställningen inom 15 minuter så ska beställningsformuläret tömmas/rensas och kunden ska meddelas att denne är för långsam.  
&nbsp;

      Optional
      - Om det är jämn vecka och tisdag, så får man 25 kr rabatt på beställningen förutsatt att totalsumman överstiger 25 kr.
      - Om det är luciadagen, så läggs det automatiskt till en luciamunk i beställningen.
      - Om det är julafton, så ska alla priser visas med röd text och bakgrundsbilden på sidan ska ha jultema.
      - Om rabattkoden a_damn_fine-cup_of-coffee matas in, blir hela beställningen 0 kr oavsett övriga gällande specialregler.
      - Generellt levereras beställningar 30 minuter från då beställningen läggs, med följande undantag:
        - Om det är helg så levereras munkarna istället om 1,5 h
        - Om det är mitt i natten, så sker leverans om 45 min
        - Om beställningen läggs någon gång på fredag mellan kl. 11 och 13 (då har personalen veckomöte) så är leveranstiden kl. 15.  


&nbsp;
---
&nbsp;

### Formulär för kunduppgifter

Formuläret där köparen fyller i sina uppgifter skall ha:

- Fält för:
  - Förnamn
  - Efternamn
  - Adress (gata)
  - Postnummer
  - Postort
  - Ev. portkod
  - Telefon (mobil)
  - E-postadress
  - Val för betalsätt: kort eller faktura
    - Om faktura valts som betalsätt ska ett formulärfält för svenskt personnummer visas. Även detta fält ska valideras innan formuläret går att skicka iväg, dvs. att man fyllt i korrekt personnummer.
    - Om kort väljs som betalsätt, visas fält för kortnummer, datum/år och CVC. Dessa behöver inte valideras!
  - Checkbox för godkännande av behandling av personuppgifter
  - Checkbox för beställning av nyhetsbrev (ska vara iklickad som default)
- Samtliga formulärfält ska valideras och formuläret/beställningen ska inte gå att skicka om det finns några fel
- Felen ska markeras och kommuniceras tydligt (t.ex. ej enbart med röd färg, tag i beaktande a11y)
- När formuläret är korrekt ifyllt ska Skicka-/Beställ-knappen aktiveras, innan det är den utgråad
- Det ska finnas en "Rensa beställning"-knapp som återställer samtliga formulärfält liksom eventuella beställda munkar/produkter (alltså antalet återställs till 0)
- Det ska finnas ett fält för att mata in en rabattkod.

&nbsp;
---
&nbsp;

### Övrigt

- Det ska ges någon from av visuell feedback på när varukorgens totalsumma uppdateras. Med detta menas exempelvis någon visuell förändring, såsom en färg-skiftning, storleksskiftning, eller motsv.

&nbsp;
---
&nbsp;

### Tekniska anmärkningar

- CSS:en ska byggas med hjälp av Sass (alt. Tailwind)
- Ni ska endast använda "Vanilla JavaScript", dvs. ni FÅR inte göra detta med hjälp av ett ramverk.
- HTML kan skrivas i HTML-dokumentet; noder behöver INTE skapas med JavaScript mer än om det är absolut nödvändigt.

&nbsp;
---
&nbsp;

### Förslag på upplägg/arbetsgång
Vecka 1
- Skriv pseudokod för alla funktioner/krav INNAN DU BÖRJAR KODA. Du kan gott lägga 2-3 dagar på att bara skriva pseudokod, det vinner du på i tid senare, för att du har tänkt igenom hur du ska göra. Sällan blir det bra av att börja koda direkt så att fingrarna brinner. Rita flödesscheman för logik, gör wireframes, skriv upp funktionsnamn - ja, planera!
- Sätta upp kodbas/repo med nödvändiga filer.
- Se till att sidan publiceras online när ni gör uppdateringar.
- Ta fram design på sidan, minst wireframe men gärna en grundläggande design.
- Layouta upp HTML-strukturen & sätt upp CSS-strukturen.
- Diskutera programmets arkitektur och vilka metoder (funktioner) och variabler ni behöver för programmet.
- Skriv Issues i GitHub-repot som är tillräckligt små för att man ska kunna plocka en uppgift och tackla den.

Vecka 2
- Implementera logiken för beställningsformuläret (produktdelen)
- Implementera logiken för att beställa (kunduppgifter)

Vecka 3
- Animationer och effekter
- Strukturera om kod och flöde

Vecka 4
- Finlir och tid för att fixa de sista felen

&nbsp;
---
&nbsp;

### Examinerade områden

Använd följande lista för att förstå vilka saker ni ska använda för att lösa uppgiften. 
Det behöver alltså inte vara svårare än det som gås igenom under kursens fyra första veckor.

- Logik & programflöde
- Kommentarer och självdokumenterande kod
- Hög kodkvalitet, konventioner
- Conditionals (if-satser)
- Event
- DOM-manipulation
- Funktioner
- Variabler
- Aritmetik
- Objekt
- Arrayer
- Timers
- Loopar
- Datum
- SVG

&nbsp;
---
&nbsp;

### Bedömningsmall

För IG

- Namngivningen av variabler, funktioner, attribut är namngivna som vilda västern - ingen konsekvens
- HTML, CSS och JavaScript är blandat utan någon ordentlig struktur och logik. T.ex. används onclick-event i HTML-koden, det finns style-attribut inskrivna direkt i HTML-koden, istället för att använda CSS-klasser.
- Sidan är otillgänglig; \<div> har använts istället för \<button> exempelvis.
- Koden har inte validerats.
- Det har skrivits lite eller ingen JavaScript. Det är uppenbart att kunskaperna inte sitter.
- Alla standarder kring CSS, HTML och tillgänglighet har ignorerats och glömts bort.
- Koden saknar indentering och struktur.
- Koden saknar kommentarer.
- Det finns ingen ansträngning att göra sig av med kodupprepning.
- Spaghettikod: det innebär att t.ex. funktioner ligger i funktioner som ligger i funktioner. Kan även appliceras på if-satser; har man 4+ if-satser nästlade i varandra, så bör man se över sin kodstruktur.
- Ni har lagt loopar i loopar och skapar t.ex. event eller funktioner flera gånger (oftast ett indenteringsproblem).
- Koden är full med anonyma funktioner.


För G
- Cirka 80 % av kravlistan är gjord
- Logiken i programmet/på sidan är logisk
- Sidan är responsiv och fungerar på olika enheter på det stora hela, någon enstaka miss här och var är OK
- Sidan är publicerad live
- Det finns en README med skrämdumpar på sidan som beskriver projektet och visar upp slutresultatet (så att ni har ett portfolio case), samt namn på personerna som bidragit till projektet. Tips - kolla readme.so
- HTML:en är validerad
- CSS:en är validerad
- CSS:en har inte lika stor vikt i detta projekt, så sitt inte för länge med designen

För VG

Utöver kraven för G…

- Samtliga punkter på kravlistan är implementerade, testade och validerat att det fungerar. OBS! Ej automatiskt testade, men ni ska ha klickat er igenom programmet och säkerställt att logiken fungerar som det ska.
- Koden är väldokumenterad och/eller självdokumenterande; korrekt namngivning, kommentarer, struktur i dokumenten
- Koden är strukturerad på ett logiskt sätt
- Koden följer de konventioner ni har satt upp för formatering (inga indenteringsmissar)
- Best practice följs i den mån det går/är känt
- Sidan är responsiv och fungerar på olika enheter felfritt. Anpassningar har gjorts för mörkt tema i någon mån.
- HTML:en är semantisk och strukturen är logisk i förhållande till koden.
- När CSS/HTML/JS läses för sig är det intuitivt vad som är vad; namngivning och struktur går att "gissa lätt"
- Sidan är tillgänglig.
- Ni håller er till tidsramarna och gör prioriteringar utifrån tidsåtgång och viktighet
- Arbetet är självständigt (det betyder absolut inte att man inte ber om hjälp, men du ska också själv ha TÄNKT TILL och kan föra ett resonemang kring kod)
- Det är ingen swenglish i koden; variabler, attribut, funktioner, etc. är konsekvent namngivna

I README-filen har ni:

- Inkluderat bilder på valideringsrapporter
- Inkluderat bilder på Lighthouse-analys (eller motsv.)
- Länkat till live-versionen av projektet
- Lista teknikstack

Se readme.so - bra verktyg.


&nbsp;
---
&nbsp;

