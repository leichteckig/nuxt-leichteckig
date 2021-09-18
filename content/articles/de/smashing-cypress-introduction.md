---
title: Tauchen wir ein in Cypress für End-to-End-Tests
description: Ist End-to-End-Testing für Dich ein leidiges Thema? In diesem Artikel möchte ich Dir erklären, wie Du End-to-End-Tests mit Cypress Durchführen kannst, damit es für Dich nicht so mühsam und teuer wird, sondern Spaß macht.
img: smashing-cypress-intro/cy-plant-unsplash.jpg
alt: cypress introduction
createdAt: 2021-11-04T22:50:54.724Z
author:
  name: Ramona Schwering
  bio: https://www.smashingmagazine.com/2021/09/cypress-end-to-end-testing/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Smashing magazine
- Cypress
- End-To-End Tests
otherLanguages:
- locale: en
  name: english
  path: /smashing-cypress-introduction
---
*(Photo by [Aleksey Boev](https://unsplash.com/@alanveob?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/s/photos/cypress?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText))*

Automatisierte Tests sind aus der Softwareentwicklung nicht mehr wegzudenken. Eine gute Auswahl an verschiedenen Testverfahren sichert ein hohes Qualitätsniveau. Als Grundlage für das Testen können wir eine Reihe von Unit-Tests verwenden. Obendrauf, sozusagen in der Mitte der Pyramide, stehen Integrationstests. An der Spitze stehen End-to-End-Tests, die die kritischsten Anwendungsfälle abdecken. Diese dritte Art von Tests wird im Mittelpunkt dieses Artikels stehen.

End-to-End-Tests haben jedoch einige Tücken, die Grund zur Sorge geben:
* End-to-End-Tests sind langsam und stellen daher eine große Hürde in jeder Strategie für Continuous Integration und Continuous Deployment (CI/CD) dar. Und nicht nur das: Stell Dir vor, Du beendest eine Aufgabe, ein Feature oder eine andere Umsetzung - das Warten auf die Ausführung des Tests kann Deine Geduld strapazieren.
* Solche End-to-End-Tests sind schwer zu warten, fehleranfällig und aufgrund des Debugging-Aufwands in jeder Hinsicht teuer. Verschiedene Faktoren können dafür verantwortlich sein. Dein Test sollte sich wie ein Assistent anfühlen, niemals wie ein Hindernis.
* Der größte Albtraum für Entwickler ist ein [flaky Test](https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/), d.h. ein Test, der immer wieder auf die gleiche Weise ausgeführt wird, aber zu unterschiedlichen Ergebnissen führt. Das ist wie ein "Heisenbug", der nur dann auftritt, wenn man die getestete Anwendung nicht überwacht - das heißt, wenn man sie nicht anschaut.

![The infamous heisenfail](/smashing-cypress-intro/5-cypress-end-to-end-testing.png)

Aber keine Sorge: Du musst Dir diese Fallen nicht bieten lassen. **Lasst uns schauen, wie man viele von ihnen vermeiden kann**. Aber ich werde nicht einfach das Blaue vom Himmel versprechen und dann nichts halten. In diesem Leitfaden werden wir gemeinsam einige Tests schreiben, die ich für Dich in einem [GitHub-Repository](https://github.com/leichteckig/smashing-example) veröffentlicht habe. Ich hoffe, dass ich Dir auf diese Weise zeigen kann, dass End-End-Tests Spaß machen können! Legen wir los.

## Was sind End-To-End-Tests?

Wenn ich über End-to-End-Tests (oder E2E-Tests) spreche, bezeichne ich sie gerne als "workflowbasiert". Dieser Ausdruck fasst End-to-End-Tests gut zusammen: Sie simulieren tatsächliche Benutzer-Workflows und sollten so viele Funktionsbereiche und Teile des in der Anwendung verwendeten Technologie-Stacks wie möglich umfassen. Letztendlich tut der Computer so, als wäre er ein Kunde und versucht, sich wie ein echter Benutzer zu verhalten. Diese Tests eignen sich am besten, um das gesamte System Deiner Anwendung unter Dauerstress zu setzen und sind daher **eine großartige Maßnahme zur Qualitätssicherung**, wenn der gesamte Anwendungsstapel vorhanden ist.

![End-to-end tests are executed by a computer simulating a real user](/smashing-cypress-intro/cypress-end-to-end-testing-8.png)

Erinnern wir uns daran, was wir mit all dem erreichen wollen. Wir wissen, dass Front-End-Tests eine Reihe von Maßnahmen zum Testen der Benutzeroberfläche einer Webanwendung sind, einschließlich ihrer Funktionalität. Das ergibt Sinn - mit diesen Maßnahmen können wir sicherstellen, dass unsere Anwendung korrekt funktioniert und dass keine zukünftigen Änderungen unseren Code zerstören. Um dies effizient zu erreichen, fragst Du sich vielleicht, was und wie viel Du testen sollst.

Das ist eine berechtigte Frage. Eine mögliche Antwort findest Du in einer Metapher: Die [Testautomatisierungspyramide] (https://martinfowler.com/articles/practical-test-pyramid.html), die zuerst von Mike Cohn eingeführt und von Martin Fowler weiter spezifiziert wurde, zeigt, wie man Tests effizient gestalten kann. Auf der untersten Ebene der Pyramide finden wir schnelle und kostengünstige Unit-Tests, während an der Spitze zeitaufwändige und teure UI-Tests (End-to-End-Tests) stehen.

![The automation test pyramid](/smashing-cypress-intro/cypress-end-to-end-testing-1.png)

Dies und seine Vor- und Nachteile zu erläutern, würde einen eigenen Artikel füllen. Ich möchte mich auf eine einzige Ebene konzentrieren. Insbesondere End-to-End-Tests können erhebliche Qualitätsverbesserungen bringen, wenn sie effizient priorisiert werden. Dabei können wir unser System ständig unter Stress setzen und sicherstellen, dass die Hauptfunktionen unserer Anwendung korrekt funktionieren.

## Meine Reise zu Cypress

Als ich anfing zu lernen, wie man End-to-End-Tests schreibt, verwendete ich [Mink](https://mink.behat.org/en/latest/), eine PHP-Bibliothek, die auf [Behat](https://docs.behat.org/en/latest/) aufbaut, einem szenario-orientierten Framework für behavior-driven development (BDD). Ich begann mit [Selenium](https://www.selenium.dev/), mit all seinen Vor- und Nachteilen. Da mein Team begonnen hatte, viel mit [Vue.js](https://vuejs.org/) zu arbeiten, wechselten wir zu einem JavaScript-basierten Testframework, um eine einwandfreie Integration und Kompatibilität zu gewährleisten. Unsere Wahl fiel damals auf [Nightwatch.js](https://nightwatchjs.org/), so dass ich unsere neue Testsuite von Grund auf neu erstellte.

Während dieser Zeit stießen wir **häufig auf Kompatibilitätsprobleme**. Man könnte es als Dependency Hell bezeichnen - ganz zu schweigen von all den Einschränkungen, die wir mit Selenium und später mit [WebDriver](https://www.w3.org/TR/webdriver/) gesehen haben.
* In unserem Team konnten wir die Chrome-Version unseres CIs nicht festlegen. Wenn also Updates für Chrome veröffentlicht wurden, war Nightwatch.js nicht schnell genug, um damit kompatibel zu werden, was zu vielen Fehlern in unseren Testpipelines führte.
* Die Anzahl der test seitigen Ursachen für fehlerhafte Tests begann zu steigen, da die Möglichkeiten von Nightwatch.js zum Warten nicht optimal zu unserem Produkt passten.

So kamen wir auf die Idee, unsere Testsuite neu zu bauen. Nach dem Besuch einer Unkonferenz entdeckte ich [Cypress](https://www.cypress.io/).

Cypress ist ein All-in-One-Testing-Framework, das weder Selenium noch WebDriver verwendet. Das Tool verwendet Node.js, um einen Browser unter besonderer Kontrolle zu starten. Die Tests in diesem Framework werden auf der Browserebene ausgeführt und nicht nur ferngesteuert. Das bietet mehrere Vorteile.

Kurz gesagt, hier sind die Gründe, warum ich mich für dieses Framework entschieden habe:
* **Hervorragende Debugging-Fähigkeit** Der Test runner von Cypress kann über Snapshots zu jedem beliebigen Zustand der Anwendung zurückspringen. So können wir einen Fehler und alle Schritte davor direkt sehen. Darüber hinaus gibt es vollen Zugriff auf die Entwickler-Tools von Chrome (DevTools), und Klicks werden vollständig aufgezeichnet.
* **Bessere Möglichkeiten zum Warten auf Aktionen im Test oder in der Benutzeroberfläche oder in den Antworten der API** Cypress bietet implizites Warten, so dass keine entsprechenden Prüfungen erforderlich sind. Du kannst den Test auch auf Animationen und API-Antworten warten lassen.
  **Tests werden in JavaScript geschrieben** Dies verringert die Lernkurve beim Schreiben von Tests. Der Test-Runner von Cypress ist Open-Source und passt somit zu unserer Produktstrategie.

Da es sich bei diesem Artikel jedoch um einen Guide handelt, lassen wir es bei diesen allgemeinen Informationen und legen endlich los.

## Erste Schritte

### Cypress installieren und starten

Fangen wir bei null an. In meinen Vorträgen über Cypress beginne ich in der Regel damit, dass ich mit `mkdir` ein neues Verzeichnis anlege und Cypress dann sofort installiere. Der einfachste Weg zur Installation ist in dieser Zeichnung dargestellt:

![Cypress uses Node.js](/smashing-cypress-intro/2-cypress-end-to-end-testing.png)

Ein kleiner Tipp: Wenn Du npm nicht verwenden möchtest, kannst Du Cypress auch über Yarn installieren:

```bash
yarn add cypress --dev
```

Eine Alternative ist der direkte Download mit den ZIP-Ordnern, die Cypress zur Verfügung stellt. Das war's! Sobald die Installation abgeschlossen ist, kannst Du loslegen.

Es gibt zwei Möglichkeiten, Cypress-Tests auszuführen. Die erste besteht darin, Cypress in der Konsole zu starten und die Tests headless auszuführen:

```bash
./node_modules/.bin/cypress run
```

Die zweite Möglichkeit besteht darin, eine der nützlichen Funktionen von Cypress zu nutzen, nämlich den integrierten Test-Runner. Der Test-Runner ist eine Benutzeroberfläche für die Ausführung von Tests. Um ihn zu starten, kannst Du einen ähnlichen Befehl verwenden:

```bash
./node_modules/.bin/cypress open
```

Mit diesem Befehl wird der Test Runner geöffnet. Wenn Du Cypress zum ersten Mal öffnest, siehst Du diese Oberfläche:

![Cypress’ test runner at first sight.](/smashing-cypress-intro/12-cypress-end-to-end-testing.png)

Cypress stellt einige vorgefertigte Beispieltests zur Verfügung, um seine Funktionen zu präsentieren und Dir einige Ansatzpunkte zu geben - dies ist der Grund für die verfügbaren Tests. Ignorieren wir diese vorerst, denn wir wollen ja bald unsere eigenen Tests schreiben. Behalte jedoch diesen Bereich "Integrationstests" im Hinterkopf, denn er wird für einen Großteil des späteren Zaubers stehen.

### Erster Eindruck von Cypress' Struktur

Nun ist es an der Zeit, unser neu erstelltes Projekt in der integrierten Entwicklungsumgebung (IDE) Ihrer Wahl zu öffnen. Wenn Du zu diesem Ordner navigierst, wirst Du die folgende Teststruktur sehen:

```
smashing-example
  └── cypress
      └── fixtures
      └── integration
      └── plugins
      └── support
  └── cypress.json
```
Schauen wir uns diese Ordner an:
* `Fixtures`: Hier findest Du feste Testdaten, die keine Beziehung zu den anderen Entitäten haben. Hier werden also keine IDs gespeichert, die sich je nach lokalem Zustand ändern können.
* "Integration": Hier findest Du die eigentlichen Tests.
* `Plugins`: Hier kannst Du Cypress erweitern, sei es mit bestehenden Cypress-Plugins oder mit Deinen eigenen.
* `Support`: Hier kannst Du Cypress selbst erweitern. Eigene Befehle und Hilfsprogramme sind hier zu finden.
* `cypress.json`: Ändere hier Konfigurationen, auch für die Umgebung.

Nun gut, ich denke, wir können uns jetzt in Cypress zurechtfinden, sei es mit dem Test-Runner oder dem Quellcode. Aber wie fangen wir an? Was wollen wir testen?

## Einen Testfall auswählen

Ein typischer End-to-End-Test kann sehr komplex werden, insbesondere wenn er viele Schritte umfasst. Eine manuelle Ausführung würde viel Zeit in Anspruch nehmen. Aufgrund dieser Komplexität können E2E-Tests schwierig zu automatisieren sein und nur sehr langsam ausgeführt werden. Daher müssen wir sorgfältig entscheiden, welche Fälle wir automatisieren wollen.

Meiner Meinung nach ist **der Begriff "workflowbasiert" der Schlüssel**: Wir würden Testfälle auf der Grundlage typischer User Stories auswählen. Aufgrund der Laufzeiten ist es jedoch nicht ratsam, jeden einzelnen verfügbaren Workflow abzudecken. Daher brauchen wir eine Möglichkeit, unsere Testfälle zu priorisieren.

In meinem Team hatten wir mehrere Kriterien für unser Projekt. Der Testfall sollte:
* decken die allgemeinsten und am häufigsten verwendeten Arbeitsabläufe einer Funktion ab, wie z. B. CRUD-Operationen (der Begriff "Happy Path" beschreibt diese Arbeitsabläufe recht gut);
* Risikoanalyse, die die am stärksten gefährdeten Arbeitsabläufe mit E2E-Tests abdeckt (d. h. wo Fehler den größten Schaden verursachen würden);
* doppelte Abdeckung vermeiden;
* nicht unbedingt verwendet werden, wenn Unit-Tests besser geeignet sind (verwende einen E2E-Test, um die Reaktion Deiner Software auf einen Fehler zu testen, nicht den Fehler selbst).

Der zweitwichtigste Punkt, den Du beachten solltest, ist, dass Du nur den Arbeitsablauf testest, den Du ausdrücklich testen willst. Alle anderen Schritte, die erforderlich sind, damit Dein Test funktioniert, sollten mit API-Vorgängen außerhalb des Tests durchgeführt werden, um diese nicht zu testen. Auf diese Weise gewährleistest Du minimale Testlaufzeiten und erhältst ein klares Ergebnis Deines Testfalls, falls er fehlschlägt. Stell Dir sich diesen Arbeitsablauf so vor, wie es ein Endbenutzer tun würde: Konzentriere Dich auf die Nutzung der Funktion und nicht auf die technische Implementierung.

> Beispiel: Wenn Du den Checkout-Prozess in einem Online-Shop testen willst, solltest Du alle anderen Schritte, wie das Anlegen von Produkten und Kategorien, nicht per Klick durchführen, obwohl Du sie für die Abwicklung des Checkouts benötigst. Verwende z. B. eine API oder einen Datenbank-Dump, um diese Dinge automatisch zu erstellen, und führe den Test nur für die Kaufabwicklung durch.

### Beispiel: Suche nach meinen Artikeln im Smashing Magazine

Ich möchte einen Test für diese Website des Originalartikels, Smashing Magazine, schreiben. Ich kann nicht garantieren, dass dieser Test für immer aktuell sein wird, aber hoffen wir, dass er lange Bestand haben wird. Wie auch immer, Du kannst dieses Beispiel in einem [GitHub Repository](https://github.com/leichteckig/smashing-example) finden.

## Erstellen unseres ersten Cypress-Tests

Im Ordner `integration` erstellen wir zunächst eine neue Datei. Nennen wir sie `find-author.spec.js`. Das Suffix `.spec` steht für "Spezifikation". Im Hinblick auf einen Test bezieht sich dies auf die technischen Details einer bestimmten Funktion oder Anwendung, die Ihre Anwendung erfüllen muss.

Um diese leere JavaScript-Datei in das Zuhause eines Tests zu verwandeln, beginnen wir damit, der Testsuite ihre Struktur zu geben. Wir werden die Methode `describe` verwenden. Die Methode `describe()`, oder `context()`, wird verwendet, um die Tests zu strukturieren. Mit anderen Worten, diese Methode dient als Rahmen für unsere Tests. Unsere Testdatei wird also wie folgt aussehen:

```javascript
// find-author.spec.js
describe('Find authors at smashing', () => {
  //...
});
```

Der nächste Schritt besteht darin, den eigentlichen Test zu erstellen. Wir werden die Methode `it` verwenden. `it()`, oder `specify()`, wird verwendet, um den eigentlichen Test darzustellen. Wie Du sehen kannst, können wir mehrere Tests in einer Datei zusammenfassen, was einige großartige Strukturierungsmöglichkeiten bietet.

```javascript
// find-author.spec.js
describe('Find authors at smashing', () => {
  it('Find the author Ramona Schwering', () => {
    cy.log('This is our brand-new test');
  });
});
```

<hint type="info" title="Little hint">
Wenn Du mit Mocha vertraut bist, hast Du vielleicht einige Ähnlichkeiten bemerkt. Cypress baut auf Mocha auf, die Syntax ist also die gleiche.
</hint>

Gut, fahren wir fort. Wenn wir unseren Test in Cypress' Test Runner ausführen, werden wir feststellen, dass Cypress einen Browser öffnet, um den Test auszuführen. Dieser Browser ist auf dem folgenden Screenshot zu sehen:

![Our first test, executed in Cypress’ test runner.](/smashing-cypress-intro/cypress-end-to-end-testing-4.png)

Herzlichen Glückwunsch! Wir haben unseren ersten Test geschrieben! Sicher, er bringt nicht viel. Wir müssen noch weiter machen. Füllen wir unseren Test mit Leben.

## Füllt den Test mit Leben

Was muss man als Erstes tun, wenn man eine Website testet? Richtig, wir müssen die Website öffnen. Das können wir mit einem Cypress-Befehl tun. Was ist das für ein Befehl, fragst Du Dich jetzt vielleicht?

### Mit Befehlen arbeiten

Es gibt hauptsächlich zwei Arten von Befehlen, die in einem E2E-Test verwendet werden. Die erste Art von Anweisung, die Befehle, stellt die einzelnen Schritte des Tests dar. Im Kontext von Cypress sind Befehle alles, was Cypress tut, um mit Deiner Website zu interagieren. Diese Interaktion kann alles Mögliche sein - ein Klick, das Scrollen auf der Website oder sogar das Auffinden eines Elements. Daher sind Befehle eines der wichtigsten Elemente, mit denen wir unseren Test füllen werden.

Unser erster Befehl wird also derjenige sein, mit dem wir zur Website [smashingmagazine.com](https://www.smashingmagazine.com/) navigieren. Dieser Befehl wird visit genannt.

Unser Test sieht dann wie folgt aus:

```javascript
// find-author.spec.js
describe('Find authors at smashing', () => {
  it('Find the author Ramona Schwering', () => {
    cy.visit('https://www.smashingmagazine.com/');
  });
});
```

Es gibt einen Befehl, den ich oft verwende - und Du wirst ihn sicher auch verwenden. Er heißt "get":

```javascript
cy.get('selector');
```

[Dieser Befehl](https://docs.cypress.io/api/commands/get) gibt ein Element entsprechend seinem Selektor zurück - ähnlich wie jQuery's `$(...)`. Du würdest also diesen Befehl verwenden, um die Teile zu finden, mit denen Du interagieren willst. Normalerweise würde man ihn verwenden, um eine Kette von Befehlen zu starten. Aber warte - was ist mit einer Kette von Befehlen gemeint?

Wie bereits zu Beginn dieses Artikels erwähnt, werden alle Tests und alles, was dazu gehört, in JavaScript geschrieben. Sie können die Befehle in den Tests (d. h. die Anweisungen) in eine [chain](https://docs.cypress.io/guides/core-concepts/introduction-to-cypress#Chains-of-Commands) (mit anderen Worten: verkettet) einfügen. Das bedeutet, dass die Befehle ein Subjekt (oder einen Rückgabewert) eines Befehls an den folgenden Befehl weitergeben können, wie wir es von vielen Test-Frameworks kennen.

Also gut, wir beginnen eine Kette von Befehlen mit dem Befehl "get". Um ein Element mit "get" zu finden, müssen wir zuerst seinen Selektor finden. Die Suche nach einem eindeutigen Selektor ist wichtig, da Cypress sonst alle übereinstimmenden Elemente zurückgeben würde.

### Interaktion mit Elementen

Cypress selbst verfügt über eine Funktion, die Dir hilft, die Selektoren der Elemente zu finden, mit denen Du arbeiten möchtest. Diese Funktion heißt [Selector Playground] (https://docs.cypress.io/guides/core-concepts/test-runner#Selector-Playground) und hilft dir, eindeutige Selektoren einer Komponente zu finden oder alle übereinstimmenden Elemente für einen Selektor oder einen Textstring zu sehen. Diese Funktion kann Dir also bei dieser Aufgabe sehr helfen. Um sie zu aktivieren, klicke einfach auf das Fadenkreuz-Symbol in der Kopfzeile der Benutzeroberfläche Deines Tests und bewege dann den Mauszeiger über das gewünschte Element:

![Using the Selector Playground to identify unique selectors.](/smashing-cypress-intro/cypress-end-to-end-testing-11.png)

Wie im obigen Screenshot zu sehen ist, zeigt ein Tooltip den Selektor an, wenn der Mauszeiger über dem Element schwebt, oder in dieser kleinen Leiste unter dem Fadenkreuz-Symbol, das erscheint, wenn das Element angeklickt wird. In dieser Leiste kannst Du auch sehen, wie viele Elemente mit dem angegebenen Selektor übereinstimmen würden - was in unserem Fall seine Einmaligkeit gewährleistet.

Manchmal sind diese automatisch generierten Selektoren nicht die, die Du verwenden möchtest (z. B. wenn sie lang oder schwer zu lesen sind oder Deine anderen Kriterien nicht erfüllen). Der unten generierte Selektor ist meiner Auffassung nach schwer zu verstehen und zu lang:

![This selector might not be ideal to use.](/smashing-cypress-intro/3-cypress-end-to-end-testing.png)

In diesem Fall würde ich auf die DevTools des Browsers zurückgreifen, um meine eindeutigen Selektoren zu finden. Vielleicht bist Du mit diesen Tools vertraut; in meinem Fall wähle ich oft Chrome für diesen Zweck. Andere [unterstützte Browser](https://docs.cypress.io/guides/guides/launching-browsers#Browsers) bieten jedoch wahrscheinlich ähnliche Funktionen. Der Prozess ähnelt dem Selector Playground, mit dem Unterschied, dass wir die Funktionen der [DevTools](https://developer.chrome.com/docs/devtools/dom/) auf der Registerkarte "Element" verwenden.

![Using the browser’s developer tools to find unique selectors.](/smashing-cypress-intro/cypress-end-to-end-testing-10.png)

Um sicherzustellen, dass ein Selektor eindeutig ist, empfehle ich, in der Codeansicht von DevTools nach ihm zu suchen. Wenn Du nur ein Ergebnis findest, kannst Du sicher sein, dass er eindeutig ist.

Wusstest Du, dass es **viele Selektortypen** gibt? Je nach Sorte können die Tests ganz unterschiedlich aussehen und sich auch ganz unterschiedlich verhalten. Einige Varianten sind für End-to-End-Tests besser geeignet als andere. Wenn Du wissen möchtest, welche Selektoren Du verwenden solltest, um Deine Tests stabil und sauber zu halten, kann ich Dich auf [einen meiner Artikel](https://www.smashingmagazine.com/2021/07/frontend-testing-pitfalls/#look-at-selectors-you-must) verweisen, der dieses Thema behandelt. Die Entwickler von Cypress selbst geben in ihren [Best Practices](https://docs.cypress.io/guides/references/best-practices#Selecting-Elements) ebenfalls einige Hinweise zu diesem Thema.

### Unser Test als Abfolge von Befehlen

OK, zurück zu unserem Test. Darin wollen wir unseren Workflow darstellen:

> “Ich als Nutzer suche nach dem Artikel des Autors und navigiere über den Referenzbereich in einem der Artikel zur Seite des Autors. ”

Wir werden die Schritte reproduzieren, die ein Benutzer mit Hilfe von Befehlen ausführen würde. Ich füge unten den fertigen Test mit Kommentaren ein, die die Schritte erklären:

```javascript
// find-author.spec.js
it('Find the author Ramona Schwering', () => {
  // Aufruf der Website
  cy.visit('https://www.smashingmagazine.com');

  // Eingabe des Namens des Autors in das Suchfeld
  cy.get('#js-search-input').type('Ramona Schwering');

  // Zum Artikel des Autors navigieren
  cy.get('h2 > a').first().click();

  // Die Seite des Autors öffnen
  cy.get('.author-post__author-title').click();
});
```

In diesem Beispiel geht es um den Arbeitsablauf, den wir testen wollen. Cypress wird diesen Test ausführen. Ist es also an der Zeit, "Glückwunsch" zu sagen? Haben wir endlich unseren ersten Test fertig geschrieben?

Schaue Dir sich das bitte **noch einmal genauer an**. Cypress führt den Test aus, aber er tut nur das, was der Test ihm sagt, also das, was Du geschrieben hast. Wenn Du ihn im Test Runner ausführst, kannst Du sehen, ob er bestanden hat - aber nicht, wenn Du ihn headless ausgeführt hast. Bei diesem Test wissen wir nur, ob Cypress unsere Befehle erfolgreich ausführen konnte - und nicht, ob wir auf der Website des Autors gelandet sind. Wir müssen also unserem Test beibringen, das zu überprüfen.

### Arbeiten mit Assertions

Der zweite Anweisungstyp kümmert sich um die Beschreibungen des gewünschten Zustands der Benutzeroberfläche, d. h. ob etwas vorhanden, sichtbar oder nicht mehr sichtbar sein soll. Die Assertions in Cypress basieren auf [Chai](https://www.chaijs.com/) und [Sinon-Chai](https://github.com/domenic/sinon-chai) Assertions, was in der Syntax erkennbar ist.

Denke daran, dass wir prüfen wollen, ob wir uns auf der Profilseite des Autors befinden - in diesem Beispiel auf meiner. Wir müssen also eine Assertion für genau das hinzufügen:

```javascript
// find-author.spec.js
it('Find the author Ramona Schwering', () => {
  // Aufruf der Website
  cy.visit('https://www.smashingmagazine.com');

  // Eingabe des Namens des Autors in das Suchfeld
  cy.get('#js-search-input').type('Ramona Schwering');

  // Zum Artikel des Autors navigieren
  cy.get('h2 > a').first().click();

  // Die Seite des Autors öffnen
  cy.get('.author-post__author-title').click();

  // Prüfen, ob wir uns auf der Website des Autors befinden
  cy.contains('.author__title', 'Ramona Schwering').should('be.visible');
});
```

Also gut, jetzt haben wir einen Test geschrieben, der einen Nutzen hat. Also, ja, herzlichen Glückwunsch zum Schreiben Ihres ersten Tests... auch wenn er noch nicht perfekt ist.

## Machen wir unseren Test hübsch

Selbst wenn es uns gelungen ist, einen ersten aussagekräftigen Test zu schreiben und dabei das zentrale Konzept zu lernen, würde ich diesen noch nicht mergen, wenn er in einem Pull Request vorgeschlagen wird. Es sind noch ein paar Dinge zu tun, damit er glänzen kann.

### Nimm Dir Zeit

Cypress verfügt in fast jedem Befehl über eine eingebaute Wiederholungsoption, so dass Du nicht warten musst, um zu sehen, ob z. B. ein Element bereits existiert. Dabei wird jedoch nur geprüft, ob ein Element im DOM vorhanden ist, und nichts darüber hinaus. Cypress kann nicht alles vorhersehen, was Ihre Anwendung tut, so dass es zu einer gewissen [Unbeständigkeit](https://www.smashingmagazine.com/author/ramona-schwering) kommen kann, wenn Sie sich ausschließlich auf diese Funktion verlassen.

![Time is an important aspect in end-to-end tests.](/smashing-cypress-intro/cypress-end-to-end-testing-9.png)

Was würde ein User tun, wenn er eine Website sehen möchte, die noch geladen wird? Er würde höchstwahrscheinlich warten, bis einige Teile der Website sichtbar werden (also geladen sind) und dann mit ihnen interagieren. In unserem Test wollen wir genau das nachahmen: Wir wollen **auf Änderungen in der Benutzeroberfläche warten, bevor wir mit der Interaktion beginnen**. In den meisten Fällen würden wir dieses Verhalten auf die Elemente beschränken, die wir benötigen, also Assertions für diese Elemente verwenden.

Wie Du sehen kannst, müssen wir unseren Test mehrmals warten lassen. Allerdings ist es auch nicht gut, zu oft zu warten. Als Faustregel würde ich vorschlagen, eine Assertion zu verwenden, um zu prüfen, ob das Element, mit dem interagiert werden soll, vollständig geladen ist - als ersten Schritt, um festzustellen, ob die zu testende Website geladen ist.

Schauen wir uns einen solchen Teil unseres Tests als Beispiel an. Ich habe eine Assertion hinzugefügt, um **sicherzustellen, dass unsere Seite vollständig geladen wurde**:

```javascript
// find-author-assertions.spec.js
// Aufruf der Website
cy.visit('https://www.smashingmagazine.com');

// Sicherstellen, dass die Website vollständig geladen ist
cy.get('.headline-content').should('be.visible');

// Eingabe des Namens des Autors in das Suchfeld
cy.get('#js-search-input').type('Ramona Schwering');
```

Füge auf diese Weise weiterhin Assertions für alle Fälle hinzu, in denen unsere Website Ladezeiten hat oder mehrere Elemente neu gerendert werden müssen. Die vollständige Testdatei findest Du im [entsprechenden Test](https://github.com/leichteckig/smashing-example/blob/main/cypress/integration/find-authors-assertions.spec.js) im GitHub-Repository.

Damit Du nicht in die Falle der fehlerhaften Tests tappst, möchte ich Dir noch einen letzten Tipp geben: [Verwende niemals feste Wartezeiten](https://www.smashingmagazine.com/2021/07/frontend-testing-pitfalls/#wait-for-it), wie `cy.wait(500)` oder ähnliches.

### API-Antworten sind Deine Freunde

Es gibt vor allem eine hübsche Möglichkeit des Wartens, die ich in meinen Tests gerne nutze. In Cypress ist es möglich, mit [Netzwerkfunktionen](https://docs.cypress.io/guides/guides/network-requests) zu arbeiten - eine weitere hilfreiche Möglichkeit, in Deiner Anwendung zu warten, ist die **Nutzung dieser Funktionen für die Arbeit mit Netzwerkanfragen**. Auf diese Weise kannst Du den Test auf eine erfolgreiche API-Antwort warten lassen.

Wenn wir uns an unseren Arbeitsablauf als Beispiel erinnern, könnte ein Schritt eine API-Wartungsmöglichkeit sehr gut nutzen. Ich denke dabei an die Suche. Eine entsprechende User-Story könnte wie folgt aussehen:

> "Ich als Entwickler möchte sicherstellen, dass unsere Suchergebnisse vollständig geladen sind, damit kein Artikel mit älteren Ergebnissen unseren Test in die Irre führt."

Wenden wir das auf unseren Test an. Zunächst müssen wir die Route definieren, auf die wir später warten wollen. Hierfür können wir den Befehl "intercept" verwenden. Ich würde nach der Anfrage suchen und die Daten mitbringen, die ich brauche - in diesem Fall die Suchergebnisse.

Um dieses Beispiel einfach zu halten, verwende ich einen Platzhalter für die URL. Danach verwende ich einen [alias](https://docs.cypress.io/guides/core-concepts/variables-and-aliases#Aliases), damit Cypress später mit dieser Route arbeiten kann.

```javascript
// find-author-hooks.spec.js
// Festlegen der Route
it('Find the author Ramona Schwering', () => {

  // Route, auf die wir später warten können
  cy.intercept({
    url: '*/indexes/smashingmagazine/*',
    method: 'POST'
  }).as('search'); // Mit diesem Alias findet Cypress die Anfrage wieder

  //...
```

In Cypress werden alle definierten Routen am Anfang des Tests angezeigt. Ich möchte also auch diese "Intercept"-Befehle an den Anfang meines Tests stellen.

![The API route will be displayed at the top of our test.](/smashing-cypress-intro/13-cypress-end-to-end-testing.png)

Jetzt können wir diesen Routen-Alias in Assertions verwenden. Der eleganteste Weg, dies zu tun, wäre die Verwendung des Cypress-Befehls `wait`, direkt mit dem zuvor erwähnten Alias. Die Verwendung dieses Befehls allein würde jedoch dazu führen, dass auf die Antwort gewartet wird, unabhängig von ihrem Erfolg. Selbst Fehlercodes wie 400 oder 500 würden als erfolgreich gewertet, während Ihre Anwendung höchstwahrscheinlich abbrechen würde. Ich würde daher empfehlen, eine weitere Assertion wie diese hinzuzufügen:

```javascript
// find-author-hooks.spec.js

// Später: Überprüfung des Statuscodes der Suchanfrage
cy.wait('@search')
   .its('response.statusCode').should('equal', 200);
```

![Assertion on the API response, as seen in Cypress’ test runner.](/smashing-cypress-intro/7-cypress-end-to-end-testing.png)

Auf diese Weise können wir präzise auf die Daten, Änderungen usw. der Software warten, ohne Zeit zu verlieren oder Probleme zu bekommen, wenn die Anwendung stark belastet wird. Auch hier findest Du die vollständige Beispieldatei in meinem GitHub-Repository.

### Cypress konfigurieren

Ich habe ein kleines Detail ausgelassen. Wenn Du Dir das vollständige Testbeispiel genauer ansiehst, unterscheidet es sich geringfügig von denen, die wir hier in diesem Leitfaden verwendet haben.

```javascript
// Cypress
describe('Find author at smashing', () => {
  beforeEach(() => {
    // Aufruf der Website
    cy.visit('https://www.smashingmagazine.com');
  });

//...
```

Ich benutze nur einen Schrägstrich, um die Website des Smashing Magazine zu öffnen. Wie funktioniert das? Nun, wenn Du diesen Befehl so verwendest, navigierst Du zu der `baseUrl` unserer Tests. Die "baseUrl" ist ein Konfigurationswert, der als Präfix für die URL des Befehls "cy.visit()` oder "cy.request()`" verwendet werden kann. [Neben anderen Werten](https://docs.cypress.io/guides/references/configuration#cypress-json) können wir diesen Wert in der Datei `cypress.json` definieren. Für unseren Test werden wir die `baseUrl` wie folgt festlegen:

```javascript
// cypress.json
{
  "baseUrl": "https://www.smashingmagazine.com"
}
```

### Ehrenhafte Nennung: Hooks

Ein Thema möchte ich noch erwähnen, auch wenn unser Beispieltest dafür nicht geeignet ist. Wie in anderen Test-Frameworks üblich, können wir über sogenannte Lifecycle Hooks festlegen, was vor und nach unseren Tests passiert. Genauer gesagt, gibt es diese, um Code vor oder nach einem oder allen Tests auszuführen:

```javascript
// Cypress
describe('Hooks', function() {
  before(() =>  {
    // Läuft einmalig vor allen Tests
  });

  after(() =>  {
    // Läuft einmal nach allen Tests
  });

  beforeEach(() =>  {
    // Läuft vor jedem Test
  });

  afterEach(() => {
    // Läuft nach jedem Test
  });
});
```

Wir wollen unsere Testdatei mit mehr als einem Test füllen, also sollten wir nach gemeinsamen Schritten suchen, die wir vor oder nach den Tests ausführen wollen. Unsere erste Zeile ist ein typisches Beispiel, nämlich der Befehl `visit`. Angenommen, wir wollen diese Website vor jedem dieser Tests öffnen, dann würde ein `beforeEach`-Hook in unserem Beispiel wie folgt aussehen:

```javascript
// Cypress
describe('Find author at smashing', () => {
  beforeEach(() => {
    // Aufruf der Website
    cy.visit('https://www.smashingmagazine.com');
  });

  //...
```

![The beforeEach hook is displayed in the test runner’s log.](/smashing-cypress-intro/6-cypress-end-to-end-testing.png)

Ich verwende dies häufig in meiner täglichen Arbeit, um zum Beispiel sicherzustellen, dass meine Anwendung vor dem Test **auf den Standardzustand zurückgesetzt wird**, wodurch der Test von anderen Tests isoliert wird. (Verlasse Dich nie auf frühere Tests!) Führe Deine Tests isoliert voneinander aus, um die Kontrolle über den Zustand der Anwendung zu behalten.

Jeder Test sollte für sich alleine laufen können - unabhängig von anderen Tests. Dies ist von entscheidender Bedeutung, um **gültige Testergebnisse** zu gewährleisten. Einzelheiten dazu findest Du im Abschnitt [Data We Used to Share](https://www.smashingmagazine.com/2021/07/frontend-testing-pitfalls/#data-we-used-to-share) in einem meiner letzten Artikel. Wenn Du den gesamten Test sehen willst, schau Dir das vollständige Beispiel auf [GitHub](https://github.com/leichteckig/smashing-example/blob/main/cypress/integration/find-authors-hooks.spec.js) an.

## Fazit

Meiner Meinung nach sind End-to-End-Tests ein wesentlicher Bestandteil von CI, um die Qualität der Anwendungen auf einem hohen Niveau zu halten und gleichzeitig die Tester zu entlasten. **Cypress ist mein Tool der Wahl, um End-to-End-Tests** schnell, stabil und effizient zu debuggen und sie parallel zu jedem Pull-Request als Teil von CI laufen zu lassen. Die Lernkurve ist sanft, wenn man sich mit JavaScript bereits auskennt.

Ich hoffe, ich konnte Dich ein wenig an die Hand nehmen und Dir einen Ausgangspunkt für das Schreiben von Cypress-Tests und einige praktische Tipps für den Einstieg geben. Natürlich sind alle Code-Beispiele im [GitHub Repository](https://github.com/leichteckig/smashing-example) verfügbar, also schaue ruhig mal rein.

Natürlich ist dies nur ein Ausgangspunkt; es gibt noch viele weitere Dinge zu lernen und über Cypress-Tests zu diskutieren - ich werde Dir einige Vorschläge machen, was Du als nächstes lernen solltest. In diesem Sinne: Viel Spaß beim Testen!

## Further reading

Dieser Artikel wurde ursprünglich veröffentlicht im [Smashing magazine](https://www.smashingmagazine.com/2021/09/cypress-end-to-end-testing/)
