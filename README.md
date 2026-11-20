# Car Auto Clinic Stockholm – demonstrationshemsida

En komplett, statisk one-page-hemsida framtagen av KaltofixIT som försäljningsdemo för **CAR AUTO CLINIC STOCKHOLM AB**. Projektet använder endast HTML, CSS och JavaScript och är redo för GitHub Pages.

> Sidan är ett inofficiellt koncept. Den har `noindex, nofollow`, alla tjänster är markerade som förslag och galleribilderna är AI-genererade demonstrationsbilder.

## Projektstruktur

```text
car-auto-clinic/
├── index.html
├── README.md
└── assets/
    ├── css/style.css
    ├── js/main.js
    └── images/
```

## Lokal förhandsvisning

Sidan kan öppnas direkt genom att dubbelklicka på `index.html`. För en riktig lokal webbserver kan du från projektmappen köra:

```powershell
python -m http.server 8000
```

Öppna därefter `http://localhost:8000`.

## Publicera med GitHub Pages

1. Skapa ett privat repository, exempelvis `car-auto-clinic-demo`.
2. Lägg innehållet i den här mappen i repositoryts rot.
3. Kontrollera att inga uppgifter behöver ändras och pusha till `main`.
4. Gå till **Settings → Pages** i GitHub.
5. Under **Build and deployment**, välj **Deploy from a branch**.
6. Välj `main` och `/ (root)`, och spara.

Alla interna tillgångar använder relativa sökvägar och fungerar därför även under en GitHub Pages-projektsökväg.

## Kontaktformulär

Formuläret validerar endast i webbläsaren. Det skickar eller sparar inga personuppgifter och visar uttryckligen detta efter validering.

Före officiell lansering behöver en godkänd formulärlösning väljas, exempelvis Formspree eller en egen backend. Kontrollera dataskydd, mottagaradress, samtyckestext och personuppgiftsbiträdesavtal innan integrationen aktiveras.

## Kunden behöver bekräfta

- Telefonnummer: `072-217 29 02`.
- Slutlig tjänstelista och beskrivning av varje tjänst.
- Om service och reparation faktiskt ska marknadsföras mot kund och vilka arbeten som utförs.
- Priser eller offertupplägg, om detta ska visas.
- Öppettider.
- Logotyp, slutlig färgprofil och grafiska riktlinjer.
- Egna foton samt tillstånd att publicera dem.
- Kontaktväg för formuläret och e-postadress för inkommande förfrågningar.
- Eventuella bokningsfunktioner, sociala medier och företagskundserbjudanden.
- Godkännande av texter, adressuppgifter och juridisk information.

## Inför officiell lansering

- Ersätt demonstrationsbilder med företagets egna godkända bilder.
- Ta bort alla demoetiketter först när innehållet är verifierat.
- Ändra `<meta name="robots" content="noindex, nofollow">` till `index, follow` efter kundens uttryckliga godkännande.
- Lägg till korrekt canonical-URL och fullständig Open Graph-URL/bild.
- Koppla in och testa riktig formulärhantering.
- Lägg till integritetspolicy om personuppgifter samlas in.
- Testa på riktig domän, i flera webbläsare och på fysiska mobila enheter.

## Bildmaterial

De fyra rasterbilderna i `assets/images/` skapades med OpenAI:s inbyggda bildgenerering för detta demonstrationsprojekt. De ska inte beskrivas som verkliga kundarbeten. Alt-texter och synliga etiketter anger att de är exempelbilder.

## Teknik och tillgänglighet

- Semantisk HTML5 och korrekt rubrikhierarki.
- Responsiv layout för mobil, surfplatta och desktop.
- Tangentbordsstyrd mobilmeny och bilddialog.
- Fokusmarkeringar och valideringsmeddelanden.
- `prefers-reduced-motion` respekteras.
- Inga ramverk eller tredjepartsberoenden.
- Aktuell årtalsvisning sker automatiskt i JavaScript.

