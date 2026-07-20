---
title: "So deckst Du Auth0s Login-Formular mit Tests ab"
description: Viele Anwendungen setzen bei der Anmeldung auf Auth0, aber wie gehst Du damit beim Testen um? Lerne, wie Du den Standard-Login-Prozess in der Testautomatisierung mit Cypress abdeckst, inklusive Multi-Domain-Testing und dem Umgang mit Hydration-Fehlern.
img: a0-login/micah-williams-lmFJOx7hPc4-unsplash.webp
alt: Ein verwittertes Zahlenschloss, das an einem Maschendrahtzaun hängt
createdAt: 2024-12-23T00:00:00.000Z
canonical: https://auth0.com/blog/testing-auth0-login-with-cypress/
author:
  name: Ramona Schwering
  bio: https://auth0.com/blog/testing-auth0-login-with-cypress/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- Cypress
- End-To-End Tests
otherLanguages:
- locale: en
  name: english
  path: /blog/auth0-testing-login-with-cypress
---
*(Photo by [Micah Williams](https://unsplash.com/@mr_williams_photography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText))*

In diesem Beitrag erkundest Du, wie Du das Test-Framework Cypress nutzt, um Sicherheit und Nutzererlebnis zu verbessern. Dieser Artikel ist der erste Teil einer Serie, die einen der wichtigsten Aspekte genau unter die Lupe nimmt: das Login-Formular und den Standard-Anmeldeprozess.

## Warum müssen wir beim Testen an Auth0 denken?

Du fragst Dich vielleicht, warum Du überhaupt Login-Tests schreiben solltest. Schließlich meldest Du Dich täglich an Deiner Anwendung an. Und, noch wichtiger, Auth0s Universal Login, also sein Login-Formular, wird bereits von den zuständigen Teams getestet, oder?

Nun, das stimmt zwar, aber es ist wichtig, die Auth0-Integration innerhalb Deiner Anwendung im Blick zu behalten, damit Du sicher sein kannst, dass sie einwandfrei mit dem Code Deiner Anwendung zusammenspielt. Darüber hinaus ist das Testen der Login-Funktionalität entscheidend für die Qualitätssicherung, weil sie so häufig genutzt wird und ein Login-Ausfall erheblichen Schaden anrichten kann. Alles, was hinter dem Login geschützt ist, muss ebenfalls von Tests abgedeckt werden. Und um diese Teile Deiner Anwendung zu erreichen, musst Du in Deinen Tests auch durch die Authentifizierung kommen.

> **Hinweis:** Wenn Du Auth0s Funktionalität testest und automatisierte Tests in einer Pipeline ausführst, sei Dir bewusst, dass Du dabei möglicherweise echte Nutzer verwendest, was sich auf die monatlich aktiven Nutzer (MAUs) Deines Tarifs auswirken kann. Besonders relevant ist das, wenn Du über automatisierte Tests Nutzer registrierst. Verwende einen einzigen, dedizierten Testnutzer, um nicht zu viele Testnutzer anzulegen und die Kapazität Deines Tarifs aufzubrauchen.

## API-Testing und Password Grant

Wir sind uns also einig, dass wir eine Lösung brauchen, um den Login zu testen, oder zumindest einen Befehl, um uns anzumelden und danach das Verhalten Deiner Anwendung zu testen. Du kannst Dir vorstellen, dass dieses Anmelden etwas ist, das Du beim Schreiben von Tests für Deine Anwendung sehr oft tust, oder? Im Normalfall würde ich empfehlen, wiederkehrende Schritte wie das Anmelden in einen Custom Command zu packen und sich nicht durchzuklicken, um Zeit zu sparen. Auch Cypress hat das so empfohlen. In solchen Fällen würde ich üblicherweise dafür plädieren, sich per API anzumelden und mit solchen Abkürzungen die UI zu vermeiden. Ein hervorragendes Beispiel für diesen Ansatz liefert Cypress selbst.

Diese Empfehlung würde jedoch die Nutzung des Password Grant erfordern, der in OAuth 2.1 nicht mehr definiert ist, da OAuth von seiner Verwendung abrät. Diese Änderungen haben erhebliche Auswirkungen auf das API-Testing, weil dieser Ansatz möglicherweise nicht mehr praktikabel ist. Trotz des potenziellen Zeitaufwands wird uns geraten, die UI-Methode zu verwenden, da wir keine Praktiken unterstützen wollen, die von OAuth missbilligt werden.

## Dein Beispielprojekt einrichten

Für diesen Blogbeitrag verwendest Du Cypress als Framework für Deine Beispiele, weil es eine robuste, benutzerfreundliche Lösung für End-to-End-Tests bietet. Mit Live-Reloading, ausführlichen Fehlermeldungen und einer intuitiven API vereinfacht Cypress das Schreiben und Ausführen von Tests. Die Fähigkeit, direkt im Browser zu arbeiten, gibt Dir einen klaren Blick darauf, wie sich Deine Anwendung in realen Szenarien verhält, und macht Cypress zu einer ausgezeichneten Wahl, um sicherzustellen, dass Deine Login-Funktionalität zuverlässig und sicher ist. Ein zentraler Ansatz besteht darin, Cypress durch Login-Formulare zu führen, die typische Methode, um dieses entscheidende Feature zu testen. Praktischerweise bietet Cypress eingebaute Unterstützung für solche Tests, was den Prozess unkompliziert und effizient macht.

Um das Testen der Login-Funktionalität zu erleichtern, empfehle ich, ein GitHub-Repository zu verwenden, das ein sauberes Cypress-Projekt auf dem Main-Branch bereithält. Ich habe für diesen Blogbeitrag ein Beispiel-Repository vorbereitet, das Du als Referenz nutzen kannst.

Dieses Projekt basiert auf Cypress Version 13, sodass Du Zugriff auf die neuesten Funktionen und Verbesserungen hast. Du kannst das Projekt einrichten, indem Du das Repository klonst und den mitgelieferten Setup-Anweisungen folgst, so gelingt Dir der Einstieg ins Login-Testing ganz leicht.

## Eine Testbasis wählen

Um einen Test zu schreiben, brauchst Du naturgemäß eine Testbasis, etwas, gegen das Du testen kannst. Für diesen Blogbeitrag habe ich mich entschieden, die Demo-App für unser virtuelles Entwickler-Event zu verwenden, dev_day. Es fand am 24. September statt und bot eine Vielzahl an Talks, Spielen und weiteren Sessions, insbesondere Labs. Diese Labs sind ein workshop-ähnliches Format, tatsächlich eine geführte Erfahrung, um Dir Auth0s Funktionen näherzubringen.

Für diese Labs stellen wir eine Demo-App bereit, die all ihre Features zeigt, das macht sie perfekt als Testbasis für unseren Blogbeitrag.

![Dev_day Demo App](https://images.ctfassets.net/23aumh6u8s0i/5uKOqkX3aDOvdODdNxMkqQ/758129b7f53b3235d9676d20b4e33bdb/Dev_day_Demo_App.png)

### Der Tech-Stack unserer Demo-App:

Die in React gebaute Demo-App nutzt NextJS für Frontend und Backend. Die Anwendung ist so einfach wie möglich gehalten, etwa dadurch, dass sie eine Datenbank auf Basis von JSON-Dateien betreibt. Natürlich verwenden wir Auth0 in dieser Anwendung, zusammen mit OpenFGA.

## Der Standardweg, um die Login-UI zu testen

Was fällt Dir ein, wenn es darum geht, Deine Login-Prozesse zu testen, egal, ob Du Auth0 nutzt oder nicht? Wahrscheinlich das Ausfüllen und Absenden eines Login-Formulars, denn so bist Du es vom Anmelden gewohnt und testest es beim Programmieren üblicherweise auch manuell. Es ist vielleicht nicht die effizienteste Art des automatisierten Testens, aber nehmen wir es als unser erstes Beispiel. Kleiner Spoiler: Es wird einen effizienteren Weg geben, aber es ist wichtig, zuerst das Grundprinzip zu verstehen.

Bevor wir also in einen „Default“-Login-Test eintauchen, definieren wir, was wir mit „Default“ meinen. Der typische Login-Prozess besteht aus einem Formular mit zwei Eingabefeldern: einer E-Mail-Adresse oder einem Benutzernamen und einem Passwort. Diese Zugangsdaten sind eine Ein-Faktor-Authentifizierung. Sie werden zur Verifizierung an den Server gesendet; ist sie erfolgreich, wird der Nutzerin oder dem Nutzer Zugang gewährt. Das ist das, was wir als „Default“-Login betrachten. Beim Testen wird die Person in einem typischen End-to-End-Test durch einen Computer ersetzt, der sich wie ein Mensch durch ein Login-Formular klickt.

> **Tipp:** Wenn Du ein Login-Formular mit Tests abdeckst und diese in einer Pipeline ausführst, kenne die Rate Limits, um sie nicht auszulösen und Deine Testbemühungen zu behindern. Das Mocken von Responses oder das Erhöhen der Verzögerung zwischen Login-Versuchen kann helfen, dieses Problem zu umgehen.

Fangen wir an, den Test zu schreiben! Wie bei jedem Cypress-Test beginnst Du mit einem grundlegenden Test-Gerüst als Fundament. Das folgende Code-Snippet definiert eine Test-Suite, die mit Cypress den Standard-Login-Flow Deiner Anwendung überprüft.

```javascript
describe('Default Login Flow', () => {
    it('logs in', () => {
        cy.visit('/');
        cy.contains('Log in').click();
        cy.get('input#username').type(username);
    })
})
```

Dieses Snippet skizziert einen grundlegenden Login-Flow-Test, der sicherstellt, dass der Login-Button geklickt und der Benutzername in das passende Feld eingegeben werden kann. Die markierte Zeile funktioniert allerdings nicht, weil Auth0 auf eine neue Domain wechselt, und damit ist Multi-Domain-Testing nötig, damit Cypress fortfahren kann. Diese Art des Testens erlaubt es Dir, Authentifizierungsabläufe zu behandeln, die sich über mehrere Domains erstrecken, was für moderne Webanwendungen mit externen Authentifizierungsanbietern hilfreich ist.

Setze zunächst Umgebungsvariablen, um bequemer mit Auth0s Zugangsdaten zu arbeiten. Dafür verwenden wir dotenv: Installiere `dotenv` und lege in Deinem Wurzelverzeichnis eine `.env`-Datei an, wie folgt:

```bash
AUTH0_USERNAME=exampleusername
AUTH0_PASSWORD=examplepassword
DOMAIN=exampledomain
CLIENT_ID=examplecliendid
```

Anschließend kannst Du Deine Umgebungsvariablen nutzen und sie in `cypress.config.ts` wie folgt setzen:

```typescript
import { defineConfig } from 'cypress';
import dotenv from "dotenv";

dotenv.config({ path: `.env.local` });

export default defineConfig({
    env: {
        auth0_username: process.env.AUTH0_USERNAME,
        auth0_password: process.env.AUTH0_PASSWORD,
        auth0_domain: process.env.DOMAIN,
        auth0_client_id: process.env.CLIENT_ID,
    },
    e2e: {
        // weitere Konfigurationen
    }
});
```

Nach diesen Schritten kann es losgehen! Da Login-Schritte wahrscheinlich in mehreren Tests genutzt werden, ist es gute Praxis, Custom Commands zu verwenden, um Duplikate zu vermeiden und den Code sauber zu halten. Lege den Custom Command wie folgt an:

```typescript
Cypress.Commands.add('loginToAuth0', (username, password) => {
    cy.origin(
        Cypress.env('auth0_domain'),
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username);
            cy.get('input#password').type(password, { log: false });
            cy.contains('button[value=default]', 'Continue').click();
        }
    );
    cy.url().should('contain', Cypress.config('baseUrl'));
});
```

Als Nächstes schreibst Du den Custom Command, hier passiert die Magie. 🪄 Gehe dafür zu `cypress/support/e2e.ts`. Dort legen wir folgendes Command-Gerüst an:

```typescript
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Hier kommen die Schritte Deines Custom Commands hin ...
})
```

Der `cy.origin`-Befehl wird für Multi-Domain-Testing verwendet. Er ermöglicht es Cypress, den Wechsel auf die Domain zu handhaben, die den Login abwickelt, selbst wenn es die Standard-Domain von Auth0 ist. Binden wir ihn in Deinen Custom Command ein:

```typescript
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Origin für Multidomain
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      // Hier kommt der Login-Teil hin
    }
  );

  cy.url().should('contain', Cypress.config('baseUrl'));
})
```

Auf diese Weise können wir die Login-Seite wie unsere eigene Domain behandeln, sodass Cypress wie gewohnt mit ihr interagieren kann. Führen wir also abschließend unsere zuvor probierten Login-Schritte fort:

```typescript
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Origin für Multidomain
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input#username').type(username);
      cy.get('input#password').type(password, { log: false });
      cy.contains('button[value=default]', 'Continue').click();
    }
  );

  cy.url().should('contain', Cypress.config('baseUrl'));
})
```

Zurück in Deiner Testdatei verwendest Du den neuen Custom Command und fügst Assertions hinzu, um zu prüfen, ob sich der Test korrekt anmeldet. Hier ein Beispiel:

```typescript
describe('Default Login Flow', () => {
    it('logs in', () => {
        cy.visit('/');

        // Stelle sicher, dass der Login-Button vollständig gerendert und sichtbar ist, bevor Du interagierst
        cy.get('.bg-secondary').should('be.visible');
        cy.get('.bg-secondary').click();

        cy.loginToAuth0(
            Cypress.env('auth0_username'),
            Cypress.env('auth0_password')
        );

        // Prüfe, ob die Nutzerin oder der Nutzer vollständig eingeloggt ist
        cy.get('[href="/my-courses"]').should('be.visible');
        cy.get('.aspect-square').should('be.visible');
    });
});
```

Ist Dir etwas aufgefallen? Ich habe ein paar zusätzliche Assertions ergänzt, um den Test stabiler zu machen. Ich prüfe dabei Dinge, auf die auch eine echte Nutzerin oder ein echter Nutzer achten würde:

* Du stellst sicher, dass der Login-Button vollständig gerendert und sichtbar ist, bevor Du interagierst, um Flakiness zu vermeiden.
* Am Ende des Tests prüfst Du zwei Elemente, die nur sichtbar sind, wenn Du eingeloggt bist.

Lass uns nun unseren Test ausführen und schauen, ob er durchläuft. 🥁

![Test is passing](https://images.ctfassets.net/23aumh6u8s0i/43XLZDtl4CX61ew9YZFdLI/21a78acffd2af12a9444dcb89bae9045/Test_is_passing.png)

Das war’s! Du hast einen Multi-Domain-Test geschrieben, der einen Standard-Login-Prozess mit Auth0 abdeckt. 🚀

## Häufiges Problem: Hydration-Fehler in Cypress

Stand September 2024 gibt es noch ein offenes GitHub-Issue zu einem Fehler, dem ich selbst begegnet bin, als ich mit Cypress und unserer dev_day-Demo-App gearbeitet habe:

```
(uncaught exception)Error: Hydration failed because the initial UI does not match what was rendered on the server. See more info here: https://nextjs.org/docs/messages/react-hydration-error.

(uncaught exception)Error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
```

Dieser Fehler ist also ein bekanntes Problem in Cypress, und wir passen den Test an, um einen Workaround einzubauen, damit unser Test läuft. Er basiert teilweise auf dieser Antwort, die einen test-seitigen Workaround liefert. Du beginnst damit, das folgende Code-Snippet in Deine Datei `cypress/support/e2e.ts` einzufügen:

```typescript
Cypress.on("uncaught:exception", (err) => {
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});
```

> **Tipp:** Es ist wichtig, noch einmal zu erwähnen, dass es sich um einen Workaround handelt und keinen idealen, denn er verbirgt eine Fehlermeldung vollständig und könnte damit auch valide Fehler verdecken. Sobald das Problem behoben ist, wird dringend empfohlen, diesen Workaround zu entfernen.

Nachdem Du das Snippet auf `cypress/support/e2e.ts` angewendet hast, sind noch einige Anpassungen im Test selbst nötig: Wir müssen darauf warten, dass der Fehler auftritt. So takten wir die Testausführung genau richtig, um den Klick zum passenden Zeitpunkt auszuführen und diesen Fehler gezielt anzugehen.

```
(uncaught exception)Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

Um das Timing richtig hinzubekommen, kannst Du den Request des Fehlers abfangen (intercepten) und kurz vor dem Klick auf „Log In“ darauf warten:

```typescript
    it('logs in', () => {
      cy.intercept('/oauth/token').as('token');

      // Fange den Request der Fehlermeldung ab
      cy.intercept('/__nextjs_original-stack-frame?*').as('nextjs');
    
      cy.visit('/');

      // Warte, bis die Fehlermeldung auftaucht
      cy.wait('@nextjs').its('response.statusCode').should('equal', 200);

      // Fahre mit Deinem Test fort ...
    });
```

## Ein paar Worte zum Mocking

Gibt es also nur die Möglichkeit, UI-basierte End-to-End-Tests (e2e) zu verwenden, fragst Du Dich vielleicht? Das sieht ziemlich trübe aus, oder? Beim Arbeiten mit externen Abhängigkeiten innerhalb Deines Tests, einschließlich Auth0, könntest Du Dir eine weitere Alternative ansehen. Richtig, ich spreche vom Mocking.

Mocking in e2e-Tests ist eine Praxis, die das zu testende System von externen Abhängigkeiten isoliert. Sie stellt sicher, dass Deine Tests zuverlässig, schnell und unabhängig von externen Diensten laufen. Es hat jedoch einen erheblichen Nachteil: Übermäßiges Mocking in e2e-Tests kann den Sinn der End-to-End-Verifizierung zunichtemachen, weil reale Szenarien nicht mehr wirklich abgebildet werden. Deshalb ist ein ausgewogener Ansatz entscheidend. Du musst diese Optionen entsprechend abwägen; es hängt immer von Deinem Projekt ab, ob Mocking in Ordnung ist. Diese Frage beantworte ich vielleicht in einem späteren Artikel zum Mocken von Auth0.

## Zusammenfassung

Das war’s. Du hast einen Test für Auth0s Login-Formular und -Workflow geschrieben. Genauer gesagt hast Du gelernt …

* … warum es wichtig ist, den Login in Deinem Test zu berücksichtigen, selbst wenn er von einem Drittanbieter wie Auth0 abgedeckt ist oder Du ihn ständig nutzt.
* … über das Abraten vom Password Grant und die Auswirkungen auf das API-Testing.
* … was Multi-Domain-Testing ist und wie Du es nutzt, um durch Auth0s Login-Workflow zu kommen.
* … wie Du mit Hydration-Problemen in Deinem Cypress-Test umgehst, falls sie auftreten.

Danke fürs Lesen, und mögen Deine Tests immer grün bleiben. 💚

## Weiterführende Links

Dieser Artikel wurde ursprünglich auf [Auth0 Blog](https://auth0.com/blog/testing-auth0-login-with-cypress/) veröffentlicht.
