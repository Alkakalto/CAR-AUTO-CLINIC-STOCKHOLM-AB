# Publicera webbplatsen hos Miss Hosting

Den här guiden gäller CAR AUTO CLINIC STOCKHOLM AB:s statiska webbplats i detta repository. Sidan använder bara HTML, CSS, JavaScript och bilder. Den behöver därför varken WordPress, PHP eller databas.

Senast kontrollerad: **20 november 2026**.

## Rekommenderat paket

Välj **Web hosting Small** om Miss Hostings utbud fortfarande ser likadant ut när sidan ska publiceras.

Small är det billigaste praktiska alternativet för den här webbplatsen eftersom paketet enligt Miss Hostings aktuella jämförelse innehåller:

- cPanel
- webbaserad filhanterare
- ett FTP-konto och FTPS
- Let’s Encrypt SSL
- stöd för en webbplats
- mer än tillräckligt lagringsutrymme för detta projekt

Paketet **Mini** är billigare men saknar enligt jämförelsen cPanel, FTP och SSL. Kontrollera alltid aktuellt pris, förnyelsepris och innehåll innan beställning. Kampanjpriser gäller normalt bara den första perioden och priserna anges exklusive moms.

Officiella länkar:

- [Miss Hosting – webbhotell](https://misshosting.se/webbhotell)
- [Miss Hosting – jämför paket](https://misshosting.se/jamfor-planer)

## Innan du beställer

Ha följande klart:

1. Domännamnet som ska användas.
2. Vem som ska äga webbhotellskontot och domänen.
3. En fungerande administrativ e-postadress.
4. Om domänen ska köpas hos Miss Hosting eller flyttas/pekas från en annan leverantör.

Domännamn anges inte som inkluderat i Small-paketet på den aktuella produktsidan. Räkna därför med att domänen kan behöva beställas separat.

## Metod A – ladda upp med cPanel File Manager

Detta är den enklaste metoden och kräver inget FTP-program.

### 1. Hämta webbplatsen från GitHub

1. Öppna repositoryt:
   `https://github.com/Alkakalto/CAR-AUTO-CLINIC-STOCKHOLM-AB`
2. Klicka på **Code**.
3. Välj **Download ZIP**.
4. Packa upp ZIP-filen på datorn.

Kontrollera att den uppackade mappen innehåller följande direkt i projektets rot:

```text
index.html
README.md
DEPLOY-MISS-HOSTING.md
assets/
```

### 2. Logga in hos Miss Hosting

1. Logga in i Miss Hostings kundportal.
2. Öppna webbhotellstjänsten.
3. Starta **cPanel**.
4. Öppna **File Manager** eller **Filhanteraren**.

Namnen kan skilja sig något beroende på vilken version av kundportalen och cPanel som används.

### 3. Öppna rätt dokumentrot

För huvuddomänen är dokumentroten normalt:

```text
public_html/
```

Om flera domäner finns på kontot ska du i cPanel kontrollera domänens inställda **Document Root** och använda just den mappen. Ladda inte upp filerna i hemkatalogen ovanför dokumentroten.

### 4. Säkerhetskopiera befintligt innehåll

Om det redan finns en webbplats i dokumentroten:

1. Ladda ner en säkerhetskopia av filerna.
2. Kontrollera särskilt om det finns en befintlig `.htaccess` som behöver sparas.
3. Ta inte bort den gamla webbplatsen förrän säkerhetskopian är verifierad.

### 5. Ladda upp webbplatsen

1. Öppna `public_html` eller domänens dokumentrot.
2. Ladda upp **innehållet** i projektmappen.
3. Se till att `index.html` hamnar direkt i dokumentroten.
4. Se till att mapparna behåller denna struktur:

```text
public_html/
├── index.html
├── README.md
├── DEPLOY-MISS-HOSTING.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/
```

Viktigt: resultatet får inte bli `public_html/CAR-AUTO-CLINIC-STOCKHOLM-AB/index.html`. Om hela projektmappen laddas upp som en extra nivå kommer domänens startsida inte att hittas.

## Metod B – ladda upp med FTPS

Den här metoden är praktisk vid framtida uppdateringar.

### 1. Hämta anslutningsuppgifterna

I cPanel öppnar du **FTP Accounts**. Använd det befintliga FTP-kontot eller skapa ett konto om paketet tillåter det.

Du behöver:

- server/host
- användarnamn
- lösenord
- port
- dokumentrot

Välj **FTPS (FTP över TLS)** om alternativet finns. Vanlig okrypterad FTP bör undvikas.

### 2. Anslut med ett FTP-program

Du kan exempelvis använda FileZilla eller WinSCP. Programvara ska hämtas från leverantörens officiella webbplats.

1. Lägg in anslutningsuppgifterna.
2. Anslut med FTPS.
3. Öppna `public_html` eller domänens dokumentrot på servern.
4. Öppna den lokala projektmappen på datorn.
5. Ladda upp `index.html`, `assets/` och övriga önskade filer.
6. Behåll samma mappstruktur som i repositoryt.

Spara inte FTP-lösenord i GitHub, README-filer, JavaScript eller andra projektfiler.

## Koppla domänen

### Om domänen köps hos Miss Hosting

Domänen brukar kunna kopplas till webbhotellet från kundportalen. Kontrollera i cPanel under **Domains** att domänen använder rätt dokumentrot.

### Om domänen finns hos en annan leverantör

Du behöver använda de namnservrar eller DNS-poster som Miss Hosting visar för kontot. Kopiera värdena exakt från kundportalen eller välkomstmejlet; använd inte exempelvärden från internet.

DNS-ändringar kan ta från några minuter upp till 24–48 timmar att slå igenom globalt.

## Aktivera HTTPS

Small-paketet anges innehålla Let’s Encrypt SSL.

1. Öppna cPanel.
2. Leta efter **SSL/TLS Status**, **Let’s Encrypt** eller **AutoSSL**.
3. Kontrollera att certifikat är utfärdat för både domänen och `www`-varianten om båda ska användas.
4. Öppna webbplatsen med `https://` och kontrollera att webbläsaren inte visar certifikatfel.
5. Välj en huvudversion av adressen, exempelvis `https://domän.se`, och konfigurera omdirigering från övriga varianter i cPanel om det stöds.

## Kontroller efter publicering

Testa följande på både mobil och dator:

- startsidan öppnas utan `/index.html` i adressen
- CSS och alla bilder laddas
- mobilmenyn öppnas och stängs
- länkarna till sidans sektioner fungerar
- telefonlänken fungerar på mobil
- Google Maps-länken fungerar
- galleribilder kan öppnas och stängas
- inga 404-fel visas i webbläsarens utvecklarverktyg
- både domän och `www` leder till rätt webbplats
- HTTPS fungerar utan varning

## Viktigt om kontaktformuläret

Kontaktformuläret är fortfarande en demonstrationsfunktion. Det validerar fälten i webbläsaren men **skickar och sparar ingenting**.

Före officiell lansering behöver en godkänd lösning kopplas in, exempelvis:

- en serverbaserad formulärhanterare på webbhotellet
- Formspree eller motsvarande tjänst
- ett separat boknings- eller kontaktsystem

Aktivera inte insamling av personuppgifter förrän mottagaradress, dataskydd, integritetstext, spamfilter och kundens godkännande är klara.

## Gör sidan sökbar först efter godkännande

Projektets `index.html` innehåller:

```html
<meta name="robots" content="noindex, nofollow">
```

Detta ska ligga kvar under demo- och granskningsperioden. När kunden har godkänt webbplatsen och den ska bli officiell ändras det till:

```html
<meta name="robots" content="index, follow">
```

Lägg därefter till korrekt canonical-adress, Open Graph-URL och officiella företagsbilder.

## Framtida uppdateringar

Rekommenderat arbetsflöde:

1. Uppdatera och testa filerna lokalt.
2. Pusha ändringarna till GitHub.
3. Ladda ner den nya versionen eller synkronisera de ändrade filerna via FTPS.
4. Ta en säkerhetskopia av webbhotellets nuvarande version.
5. Ladda upp de nya filerna till dokumentroten.
6. Töm eventuell cache och testa webbplatsen.

GitHub och Miss Hosting synkroniseras inte automatiskt i detta upplägg. Automatisk driftsättning kan läggas till senare, men då måste FTP-/SFTP-hemligheter lagras som krypterade GitHub Secrets och aldrig skrivas direkt i repositoryt.

## När du bör kontakta Miss Hosting

Kontakta deras support om du är osäker på:

- korrekt dokumentrot
- namnservrar eller DNS-poster
- FTPS-server och port
- aktivering av Let’s Encrypt/AutoSSL
- om `www` ska vara alias eller separat domän
- säkerhetskopiering och återställning för det valda paketet

Miss Hosting uppger att support finns via chatt, e-post och telefon.

