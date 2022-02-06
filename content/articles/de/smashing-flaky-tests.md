---
title: Flaky Tests - Ein lebender Albtraum beim Testen wird überwunden
description: Unzuverlässige Tests sind ein lebendiger Alptraum für jeden, der automatisierte Tests schreibt oder auf die Ergebnisse achtet. Unzuverlässige Tests haben schon so manchem Alpträume und schlaflose Nächte bereitet. In diesem Artikel möchte ich meine Erfahrungen weitergeben, um dir zu helfen, aus dieser Hölle herauszukommen oder sie zu vermeiden.
img: smashing-flakiness/heisenbug.png
alt: flaky test
createdAt: 2021-04-07T22:50:54.724Z
author:
  name: Ramona Schwering
  bio: https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Smashing magazine
- Flakiness
- Unit Tests
- End-To-End Tests
- Integration Tests
otherLanguages:
- locale: en
  name: english
  path: /smashing-flaky-tests
---

Es gibt eine Fabel, über die ich in diesen Tagen oft nachdenke. Die Fabel wurde mir als Kind erzählt. Sie heißt "Der Junge, der Wolf rief" von Aesop. Sie handelt von einem Jungen, der die Schafe in seinem Dorf hütet. Er langweilt sich und gibt vor, dass ein Wolf die Herde angreift, und ruft die Dorfbewohner um Hilfe - nur damit diese enttäuscht feststellen, dass es ein falscher Alarm ist und den Jungen dann alleine lassen. Als dann tatsächlich ein Wolf auftaucht und der Junge um Hilfe ruft, glauben die Dorfbewohner, dass es sich um einen weiteren Fehlalarm handelt, und kommen nicht zu Hilfe, so dass die Schafe schließlich vom Wolf gefressen werden.

Die Moral der Geschichte fasst der Autor selbst am besten zusammen:

> “A liar will not be believed, even when he speaks the truth.” = Wer einmal lügt, dem glaubt man nicht, und wenn er auch die Wahrheit spricht

A wolf attacks the sheep, and the boy cries for help, but after numerous lies, no one believes him anymore. This moral can be applied to testing: Aesop’s story is a nice allegory for a matching pattern that I stumbled upon: flaky tests that fail to provide any value.

## Front-End-Tests: Warum sich überhaupt die Mühe machen?

Die meisten meiner Tage verbringe ich mit Front-End-Tests. Es sollte dich also nicht überraschen, dass die Code-Beispiele in diesem Artikel hauptsächlich aus Front-End-Tests stammen, die ich bei meiner Arbeit kennengelernt habe. In den meisten Fällen lassen sie sich jedoch leicht in andere Sprachen übersetzen und auf andere Frameworks anwenden. Ich hoffe also, dass der Artikel für dich nützlich sein wird - egal, welche Kenntnisse du hast.

Es lohnt sich, daran zu denken, was Front-End-Testing bedeutet. Im Wesentlichen handelt es sich bei Frontend-Tests um eine Reihe von Verfahren zum Testen der Benutzeroberfläche einer Webanwendung, einschließlich ihrer Funktionalität.

Als Ingenieur für Qualitätssicherung kenne ich die Schmerzen endloser manueller Tests anhand einer Checkliste kurz vor einer Veröffentlichung. Neben dem Ziel, sicherzustellen, dass eine Anwendung bei aufeinander folgenden Updates fehlerfrei bleibt, war ich bemüht, die Arbeitsbelastung durch Tests zu verringern, die durch Routineaufgaben verursacht werden, für die man eigentlich keinen Menschen braucht. Jetzt, als Entwickler, finde ich das Thema immer noch relevant, zumal ich versuche, Benutzern und Mitarbeitern gleichermaßen gezielt zu helfen. Und es gibt vor allem ein Problem mit dem Testen, das uns Alpträume bereitet hat.

## Die Lehre von den unzuverlässigen Tests

Ein unzuverlässiger Test ist ein Test, der nicht jedes Mal das gleiche Ergebnis liefert, wenn die gleiche Analyse ausgeführt wird. Der Build wird nur gelegentlich fehlschlagen: Einmal gelingt er, ein andermal nicht, und das nächste Mal klappt es wieder, ohne dass irgendwelche Änderungen am Build vorgenommen wurden.

Wenn ich mich an meine Test-Albträume erinnere, kommt mir ein Fall besonders in den Sinn. Es handelte sich um einen UI-Test. Wir haben ein benutzerdefiniertes Auswahlfeld (d. h. eine auswählbare Liste mit Eingabefeld) erstellt:

![A custom selector in a project I worked on every day.](/smashing-flakiness/1-custom-select.png "Custom combo box")

Mit diesem Feld konnten die Benutzer nach einem Produkt suchen und eines oder mehrere der Ergebnisse auswählen. An vielen Tagen verlief dieser Test problemlos, aber irgendwann änderte sich die Lage. In einem der etwa zehn Builds in unserem kontinuierlichen Integrationssystem (CI) schlug der Test für die Suche und Auswahl eines Produkts in diesem Kombinationsfeld fehl.

Der Screenshot des Fehlers zeigt, dass die Ergebnisliste nicht gefiltert wurde, obwohl die Suche erfolgreich war:

![Flaky test in action: why did it fail only sometimes and not always?](/smashing-flakiness/2-flakiness-in-log.png "Flakiness in log")

Ein solcher fehlerhafter Test kann die kontinuierliche Deployment-Pipeline blockieren und die Bereitstellung von Funktionen langsamer als geplant werden lassen. Darüber hinaus ist ein unzuverlässiger Test problematisch, weil er nicht mehr deterministisch ist, was ihn unbrauchbar macht. Schließlich würdest du einem solchen Test genauso wenig trauen wie einem Lügner.

Außerdem sind fehlerhafte Tests teuer in der Reparatur, da die Fehlersuche oft Stunden oder sogar Tage in Anspruch nimmt. Auch wenn End-to-End-Tests häufiger fehlerhaft sind, habe ich das bei allen Arten von Tests erlebt: Unit-Tests, funktionale Tests, End-to-End-Tests und alles dazwischen.

Ein weiteres großes Problem mit fehlerhaften Tests ist die Einstellung, die sie uns Entwicklern vermitteln. Als ich anfing, im Bereich der Testautomatisierung zu arbeiten, hörte ich oft, wie Entwickler als Reaktion auf einen fehlgeschlagenen Test Folgendes sagten:

> “Ahh, that build. Nevermind, just kick it off again. It will eventually pass, somewhen.” = "Ahh, dieser Build. Vergiss ihn, stoß ihn einfach wieder an. Irgendwann wird er durchlaufen."

Das ist für mich ein großes Warnsignal. Es zeigt mir, dass der Fehler im Build nicht ernst genommen wird. Es wird davon ausgegangen, dass ein fehlerhafter Test kein echter Fehler ist, sondern "nur" flaky ist, ohne dass man sich darum kümmern oder ihn gar debuggen muss. Der Test wird doch später sowieso wieder erfolgreich sein, oder? Nein! Wenn ein solcher Commit gemergt wird, haben wir im schlimmsten Fall einen neuen fehlerhaften Test im Produkt.

## Die Ursachen

Fehlerhafte Tests sind also problematisch. Was sollten wir dagegen tun? Nun, wenn wir das Problem kennen, können wir eine Gegenstrategie entwerfen.

Im Alltag stoße ich oft auf Ursachen. Sie können in den Tests selbst zu finden sein. Die Tests könnten suboptimal geschrieben sein, falsche Annahmen enthalten oder schlechte Praktiken beinhalten. Aber nicht nur das. Unzuverlässige Tests können ein Hinweis auf etwas viel Schlimmeres sein.

In den folgenden Abschnitten gehen wir auf die häufigsten Fehler ein, die mir begegnet sind.

### 1. Testseitige Ursachen

In einer perfekten Welt sollte der Ausgangszustand Ihrer Anwendung makellos und zu 100 % vorhersehbar sein. In der Realität weißt Du nie, ob die ID, die Du in Ihrem Test verwendet hast, immer dieselbe sein wird.

Sehen wir uns zwei Beispiele für einen einzelnen Fehler meinerseits an. Fehler Nummer eins war die Verwendung einer ID in meinen Testfixtures:

```json
{
   "id": "f1d2554b0ce847cd82f3ac9bd1c0dfca",
   "name": "Variant product",
}
```

Fehler Nummer zwei war die Suche nach einem eindeutigen Selektor zur Verwendung in einem UI-Test und der Gedanke: "Ok, diese ID scheint eindeutig zu sein. Ich werde sie verwenden."

```html
<!-- Das folgende Textfeld stammt aus einem Projekt, an dem ich gearbeitet habe -->
<input type="text" id="sw-field--f1d2554b0ce847cd82f3ac9bd1c0dfca" />
```

Wenn ich den Test jedoch auf einer anderen Installation oder später auf mehreren Builds in CI ausführe, könnten diese Tests fehlschlagen. Unsere Anwendung würde die IDs neu generieren und sie zwischen den Builds ändern. Die erste mögliche Ursache liegt also in hart kodierten IDs.

Die zweite Ursache kann in zufällig (oder anderweitig) generierten Demodaten liegen. Sicherlich könntest Du denken, dass dieser "Fehler" gerechtfertigt ist - schließlich werden die Daten nach dem Zufallsprinzip generiert -, aber bedenke die Fehlersuche bei diesen Daten. Es kann sehr schwierig sein, zu erkennen, ob ein Fehler in den Tests selbst oder in den Demodaten liegt.

Als Nächstes steht ein testseitiges Problem an, mit dem ich schon oft zu kämpfen hatte: Tests mit wechselseitigen Abhängigkeiten. Einige Tests können möglicherweise nicht unabhängig voneinander oder in einer zufälligen Reihenfolge ausgeführt werden, was problematisch ist. Außerdem können frühere Tests die nachfolgenden Tests beeinträchtigen. Diese Szenarien können durch die Einführung von Seiteneffekten zu fehlerhaften Tests führen.

Vergiss aber nicht, dass es bei Tests darum geht, Annahmen zu überprüfen. Was passiert, wenn Ihre Annahmen von vornherein fehlerhaft sind? Ich habe diese Erfahrung schon oft gemacht, am liebsten mit fehlerhaften Annahmen über die Zeit.

Ein Beispiel ist die Verwendung von ungenauen Wartezeiten, insbesondere in UI-Tests - zum Beispiel durch die Verwendung fester Wartezeiten. Die folgende Zeile stammt aus einem Nightwatch.js-Test.

```javascript
// Bitte tue das nie, es sei denn, Du hast einen sehr guten Grund!
// Wartet 1 Sekunde lang
browser.pause(1000);
```

Eine weitere falsche Annahme bezieht sich auf die Zeit selbst. Ich habe einmal entdeckt, dass ein fehlerhafter PHPUnit-Test nur in unseren nächtlichen Builds fehlschlug. Nach einiger Fehlersuche fand ich heraus, dass die Zeitverschiebung zwischen gestern und heute der Übeltäter war. Ein weiteres gutes Beispiel sind Fehlschläge aufgrund von Zeitzonen.

Falsche Annahmen sind aber noch nicht alles. Wir können auch falsche Annahmen über die Reihenfolge der Daten machen. Stell' Dir eine Tabelle oder Liste vor, die mehrere Einträge mit Informationen enthält, z. B. eine Liste mit Währungen:

![A custom list component used in our project.](/smashing-flakiness/3-listing.png "Listing")

Wir möchten mit der Information des ersten Eintrags, der Währung "Tschechische Krone", arbeiten. Kannst du sicher sein, dass deine Anwendung bei jeder Ausführung deines Tests diese Daten immer als ersten Eintrag platziert? Könnte es sein, dass in manchen Fällen der "Euro" oder eine andere Währung der erste Eintrag ist?

Gehe nie davon aus, dass deine Daten in der von dir gewünschten Reihenfolge erscheinen. Ähnlich wie bei fest kodierten IDs kann sich die Reihenfolge zwischen den Builds ändern, je nach dem Design der Anwendung.

### 2. Umgebungsbedingte Ursachen

Die nächste Kategorie von Ursachen bezieht sich auf alles außerhalb Ihrer Tests. Konkret geht es um die Umgebung, in der die Tests ausgeführt werden, die CI- und Docker-bezogenen Abhängigkeiten außerhalb Ihrer Tests - all die Dinge, die Du kaum beeinflussen kannst, zumindest in Ihrer Rolle als Tester.

Eine häufige Ursache auf der Seite der Umgebung sind Ressourcenprobleme: Oft handelt es sich dabei um eine Anwendung unter Last, die unterschiedliche Ladezeiten oder unerwartetes Verhalten verursacht. Große Tests können leicht Leaks verursachen, die viel Speicher verbrauchen. Ein weiteres häufiges Problem ist das Fehlen von Bereinigungsfunktionen.

Vor allem Inkompatibilitäten zwischen Abhängigkeiten bereiten mir Alpträume. Ein Alptraum trat auf, als ich mit Nightwatch.js für UI-Tests arbeitete. Nightwatch.js verwendet WebDriver, das natürlich auf Chrome angewiesen ist. Als Chrome mit einem Update vorpreschte, gab es ein Kompatibilitätsproblem: Chrome, WebDriver und Nightwatch.js selbst arbeiteten nicht mehr zusammen, was dazu führte, dass unsere Builds von Zeit zu Zeit fehlschlugen.

Apropos Abhängigkeiten: Eine lobende Erwähnung geht an alle npm-Probleme, wie z. B. fehlende Berechtigungen oder dass npm nicht verfügbar ist. All das habe ich bei der Beobachtung von CI erlebt.

Bei Fehlern in UI-Tests aufgrund von Umgebungsproblemen solltest du bedenken, dass du den gesamten Application Stack benötigst, damit die Tests funktionieren. Je mehr Faktoren involviert sind, desto größer ist die Fehleranfälligkeit. JavaScript-Tests sind daher die am schwierigsten zu stabilisierenden Tests in der Webentwicklung, da sie eine große Menge an Code abdecken.

### 3. Produktseitige Ursachen

Last but not least, we really have to be careful about this third area — an area with actual bugs. I’m talking about product-side causes of flakiness. One of the most well-known examples is the race conditions in an application. When this happens, the bug needs to be fixed in the product, not in the test! Trying to fix the test or the environment will have no use in this case.

## Ways To Fight Flakiness

Wir haben drei Ursachen für die Flakigkeit identifiziert. Darauf können wir unsere Gegenstrategie aufbauen! Natürlich hast du schon viel gewonnen, wenn du die drei Ursachen im Hinterkopf behältst, wenn du auf fehlerhafte Tests stößt. Du wirst bereits wissen, worauf du achten musst und wie du die Tests verbessern kannst. Darüber hinaus gibt es jedoch einige Strategien, die uns beim Entwerfen, Schreiben und Debuggen von Tests helfen und die wir uns in den folgenden Abschnitten gemeinsam ansehen werden.

### Fokus auf Dein Team

Dein Team ist der wohl wichtigste Faktor. Als ersten Schritt solltest Du zugeben, dass Du ein Problem mit fehlerhaften Tests hast. Das Engagement des gesamten Teams ist entscheidend! Dann müsst Ihr als Team entscheiden, wie Ihr mit fehlerhaften Tests umgehen wollen.

In den Jahren, in denen ich in der Technologiebranche gearbeitet habe, bin ich auf vier Strategien gestoßen, die Teams anwenden, um der Unzuverlässigkeit zu begegnen:

#### 1. Nichts tun und das fehlerhafte Testergebnis akzeptieren

Natürlich ist diese Strategie überhaupt keine Lösung. Der Test ist wertlos, weil man ihm nicht mehr trauen kann - selbst wenn man die Unbeständigkeit akzeptiert. Also können wir das hier ziemlich schnell überspringen.

#### 2. Wiederhole den Test, bis er erfolgreich ist

Diese Strategie war zu Beginn meiner Laufbahn üblich und führte zu der bereits erwähnten Reaktion. Es gab eine Art Akzeptanz, Tests so lange zu wiederholen, bis sie durchgelaufen waren. Diese Strategie erfordert kein Debugging, aber sie ist faul. Sie verdeckt nicht nur die Symptome des Problems, sondern verlangsamt auch die Testsuite noch mehr, so dass diese Lösung nicht praktikabel ist. Es kann jedoch einige Ausnahmen von dieser Regel geben, die ich später erläutern werde.

#### 3. Den Test löschen und vergessen

Dieser Schritt ist selbsterklärend: Lösche den fehlerhaften Test einfach, so dass er deine Testsuite nicht mehr stört. Sicher, das spart Geld, weil du den Test nicht mehr debuggen und korrigieren musst. Aber das geht auf Kosten einer geringeren Testabdeckung und potenzieller Fehlerkorrekturen. Der Test existiert aus einem bestimmten Grund! "Don't shoot the messenger", indem Du den Test löschst.

#### 4. Unter Quarantäne stellen und beheben

Mit dieser Strategie hatte ich den größten Erfolg. In diesem Fall haben wir den Test vorübergehend übersprungen und die Testsuite hat uns ständig daran erinnert, dass ein Test übersprungen wurde. Um sicherzustellen, dass die Korrektur nicht übersehen wird, haben wir ein Ticket für den nächsten Sprint geplant. Bot-Erinnerungen funktionieren ebenfalls gut. Sobald das Problem, das die Unregelmäßigkeiten verursacht hat, behoben ist, integrieren wir den Test wieder (d. h. wir heben das Überspringen auf). Leider werden wir dadurch vorübergehend die Coverage verlieren, aber sie wird mit der Korrektur zurückkehren, so dass dies nicht lange dauern wird.

![Skipped tests, taken from a report from our CI](//smashing-flakiness4-skipped-tests.png "Skipped tests")

Diese Strategien helfen uns bei der Bewältigung von Testproblemen auf Workflow-Ebene, und ich bin nicht der Einzige, der auf sie gestoßen ist. In seinem Artikel kommt Sam Saffron zu einem ähnlichen Schluss. Aber in unserer täglichen Arbeit helfen sie uns nur bedingt weiter. Wie gehen wir also vor, wenn eine solche Aufgabe auf uns zukommt?

### Tests isoliert halten

Bei der Planung deiner Testfälle und -struktur solltest du darauf achten, dass deine Tests von anderen Tests isoliert sind, damit sie in einer unabhängigen oder zufälligen Reihenfolge ausgeführt werden können. Der wichtigste Schritt ist dabei die Wiederherstellung einer sauberen Installation zwischen den Tests. Teste außerdem nur den Arbeitsablauf, den Du testen willst, und erstelle Mock-Daten nur für den Test selbst. Ein weiterer Vorteil dieser Abkürzung ist, dass sie die Testleistung verbessert. Wenn du diese Punkte befolgst, werden dir keine Seiteneffekte von anderen Tests oder Datenreste in die Quere kommen.

Das folgende Beispiel stammt aus den UI-Tests einer E-Commerce-Plattform und behandelt die Anmeldung des Kunden im Schaufenster des Shops. (Der Test ist in JavaScript geschrieben und verwendet das Cypress-Framework).
```javascript
// File: customer-login.spec.js
let customer = {};

beforeEach(() => {
    // Anwendung in einen sauberen Zustand versetzen
    cy.setInitialState()
      .then(() => {
        // Erstelle gezielt Testdaten für den Test
        return cy.setFixture('customer');
      })
});
```

Der erste Schritt ist das Zurücksetzen der Anwendung auf eine saubere Installation. Dies geschieht als erster Schritt im `beforeEach` Lifecycle Hook, um sicherzustellen, dass das Zurücksetzen bei jeder Durchführung eines Tests ausgeführt wird. Danach werden die Testdaten speziell für den Test erstellt - für diesen Testfall würde ein Kunde über einen benutzerdefinierten Befehl erstellt werden. Anschließend können wir mit dem einen Workflow beginnen, den wir testen wollen: die Anmeldung des Kunden.

#### Weitere Optimierung der Teststruktur

Wir können einige weitere kleine Änderungen vornehmen, um unsere Teststruktur stabiler zu machen. Die erste ist ganz einfach: Beginne mit kleineren Tests. Wie schon gesagt, je mehr man in einem Test macht, desto mehr kann schief gehen. Halte die Tests so einfach wie möglich und vermeiden Sie eine Menge Logik in jedem einzelnen Test.

Wenn es darum geht, die Reihenfolge der Daten nicht vorauszusetzen (z. B. wenn es um die Reihenfolge der Einträge in einer Liste bei UI-Tests geht), können wir einen Test so gestalten, dass er unabhängig von der Reihenfolge funktioniert. Um auf das Beispiel des Rasters mit den darin enthaltenen Informationen zurückzukommen, würden wir keine Pseudoselektoren oder andere CSS verwenden, die stark von der Reihenfolge abhängig sind. Anstelle des `nth-child(3)`-Selektors könnten wir Text oder andere Dinge verwenden, für die die Reihenfolge keine Rolle spielt. Wir könnten zum Beispiel eine Assertion wie "Finde mir das Element mit dieser einen Textzeichenfolge in dieser Tabelle" verwenden.

### Moment, Testwiederholungen sind manchmal in Ordnung?

Die Wiederholung von Tests ist ein kontroverses Thema, und das zu Recht. Ich halte es immer noch für ein Anti-Pattern, wenn ein Test blindlings wiederholt wird, bis er erfolgreich ist. Es gibt jedoch eine wichtige Ausnahme: Wenn man Fehler nicht kontrollieren kann, kann die Wiederholung ein letzter Ausweg sein (zum Beispiel, um Fehler durch externe Abhängigkeiten auszuschließen). In diesem Fall können wir die Fehlerquelle nicht beeinflussen. Sei dabei jedoch besonders vorsichtig: Werde nicht blind für Schwächen, wenn Du einen Test erneut versuchst, und verwende Benachrichtigungen, um Dich daran zu erinnern, wenn ein Test übersprungen wird.

Das folgende Beispiel ist eines, das ich in unserer CI mit GitLab verwendet habe. Andere Umgebungen haben möglicherweise eine andere Syntax für Wiederholungsversuche, aber dieses Beispiel sollte dir einen Eindruck vermitteln:
```yaml
test:
    script: rspec
    retry:
        max: 2
        when: runner_system_failure
```

In diesem Beispiel konfigurieren wir, wie viele Wiederholungsversuche unternommen werden sollen, wenn der Auftrag fehlschlägt. Interessant ist die Möglichkeit, den Versuch zu wiederholen, wenn ein Fehler im Runner-System vorliegt (z. B. wenn die Einrichtung des Auftrags fehlgeschlagen ist). Wir entscheiden uns dafür, unseren Auftrag nur dann zu wiederholen, wenn etwas im Docker-Setup fehlschlägt.

Beachte, dass dadurch der gesamte Job erneut ausgeführt wird, wenn er ausgelöst wird. Wenn du nur den fehlerhaften Test wiederholen möchtest, musst du nach einer Funktion in deinem Testframework suchen, die dies unterstützt. Im Folgenden findest Du ein Beispiel von Cypress, das seit Version 5 die Wiederholung eines einzelnen Tests unterstützt:

```json
{
    "retries": {
        // Konfiguriere Wiederholungsversuche für'cypress run`
        "runMode": 2,
        // Konfiguriere Wiederholungsversuche für 'cypress open`
        "openMode": 2
    }
}
```

Du kannst Testwiederholungen in der Konfigurationsdatei von Cypress, `cypress.json`, aktivieren. Dort kannst du die Wiederholungsversuche im Test-Runner und im Headless-Modus definieren.

## Dynamische Wartezeiten nutzen

Dieser Punkt ist für alle Arten von Tests wichtig, insbesondere aber für UI-Tests. Ich kann das nicht genug betonen: **Verwende niemals feste Wartezeiten** - zumindest nicht ohne einen sehr guten Grund. Wenn doch, dann bedenke die möglichen Ergebnisse. Im besten Fall wählt man zu lange Wartezeiten, was die Testsuite langsamer macht, als sie sein müsste. Im schlimmsten Fall wartest du nicht lange genug, so dass der Test nicht fortgesetzt werden kann, weil die Anwendung noch nicht bereit ist, was dazu führt, dass der Test fehlerhaft abläuft. Nach meiner Erfahrung ist dies die häufigste Ursache für fehlerhafte Tests.

Du solltest stattdessen dynamische Wartezeiten verwenden. Es gibt viele Möglichkeiten, dies zu tun, aber Cypress beherrscht sie besonders gut.

Alle Cypress-Befehle besitzen eine implizite Wartezeitmethode: Sie prüfen bereits, ob das Element, auf das der Befehl angewendet wird, für die angegebene Zeit im DOM existiert - ein Hinweis auf die Wiederholbarkeit von Cypress. Allerdings wird nur das Vorhandensein geprüft, mehr nicht. Ich empfehle daher, einen Schritt weiter zu gehen und auf alle Änderungen in der Benutzeroberfläche Ihrer Website oder Anwendung zu warten, die auch ein echter Benutzer sehen würde, z. B. Änderungen in der Benutzeroberfläche selbst oder in der Animation.

![A fixed waiting time, found in Cypress’ test log.](/smashing-flakiness/5-waiting-times.png "Waiting times")

In diesem Beispiel wird eine explizite Wartezeit für das Element mit dem Selektor `.offcanvas` verwendet. Der Test wird nur durchgeführt, wenn das Element bis zur angegebenen Wartezeit, die Du konfigurieren kannst, sichtbar ist:

```javascript
// Warten auf Änderungen in der Benutzeroberfläche (bis das Element sichtbar ist)
cy.get(#element).should('be.visible');
```

Eine weitere schöne Möglichkeit in Cypress für dynamisches Warten sind die Netzwerkfunktionen. Ja, wir können auf das Auftreten von API Anfragen und die Ergebnisse ihrer Antworten warten. Ich verwende diese Art des Wartens besonders häufig. Im folgenden Beispiel definieren wir die Anfrage, auf die gewartet werden soll, verwenden einen `wait`-Befehl, um auf die Antwort zu warten, und geben ihren Statuscode an:

```javascript
// File: checkout-info.spec.js

// Anfrage definieren, auf die gewartet werden soll
cy.intercept({
    url: '/widgets/customer/info',
    method: 'GET'
}).as('checkoutAvailable');

// Stelle dir hier weitere Prüfschritte vor...

// Prüfen des Statuscodes der Antwort auf die Anfrage
cy.wait('@checkoutAvailable').its('response.statusCode')
  .should('equal', 200);
```

Auf diese Weise können wir genau so lange warten, wie unsere Anwendung benötigt, was die Tests stabiler und weniger anfällig für Ausfälle aufgrund von Ressourcenmangel oder anderen Umgebungsproblemen macht.

### Debugging flaky tests

Wir wissen jetzt, wie man fehlerhafte Tests durch Design verhindern kann. Was aber, wenn du bereits mit einem fehlerhaften Test zu tun hast? Wie kannst du ihn loswerden?

Bei der Fehlersuche half es mir sehr, den fehlerhaften Test in einer Schleife laufen zu lassen, um Schwachstellen aufzudecken. Wenn du zum Beispiel einen Test 50 Mal ausführst und er jedes Mal besteht, kannst du dir sicherer sein, dass der Test stabil ist - vielleicht hat deine Korrektur funktioniert. Wenn nicht, kannst du zumindest einen besseren Einblick in den fehlerhaften Test bekommen.

```javascript
// Verwende im Build Lodash, um den Test 100 Mal zu wiederholen
Cypress._.times(100, (k) => {
    it(`typing hello ${k + 1} / 100`, () => {
        // Schreibe hier deine Testschritte hinein
    })
})
```

Mehr Einblick in diesen fehlerhaften Test zu bekommen, ist besonders schwierig in CI. Schaue nach, ob dein Test-Framework in der Lage ist, mehr Informationen über deinen Build zu erhalten. Wenn es um Front-End-Tests geht, kannst Du normalerweise eine console.log in Ihren Tests verwenden:

```javascript
it('should be a Vue.JS component', () => {
    // Mock Komponente durch eine zuvor definierte Methode
    const wrapper = createWrapper();


    // Ausgabe des HTML der Komponente
    console.log(wrapper.html());

    expect(wrapper.isVueInstance()).toBe(true);
})
```

Dieses Beispiel stammt aus einem Jest-Unit-Test, in dem ich ein `console.log` verwende, um die Ausgabe des HTML der getesteten Komponente zu erhalten. Wenn du diese Logging-Möglichkeit im Cypress Test Runner nutzt, kannst du die Ausgabe sogar in den Entwickler-Tools deiner Wahl überprüfen. Wenn du Cypress in CI einsetzt, kannst du diese Ausgabe außerdem mit einem Plugin in das Log deines CIs einlesen.

Achte immer auf die Funktionen deines Test-Frameworks, um Support für die Protokollierung zu finden. Bei UI-Tests bieten die meisten Frameworks Screenshot-Funktionen - zumindest bei einem Fehler wird automatisch ein Screenshot erstellt. Einige Frameworks bieten sogar die Möglichkeit der Videoaufzeichnung, was eine große Hilfe sein kann, um einen Einblick in die Vorgänge in deinem Test zu erhalten.

## Bekämpfe die Alpträume der Flakiness!

Es ist wichtig, ständig nach fehlerhaften Tests zu suchen, sei es, indem man sie von vornherein verhindert oder indem man sie debuggt und behebt, sobald sie auftreten. Wir müssen sie ernst nehmen, denn sie können auf Probleme in Ihrer Anwendung hindeuten.

### Erkennen der Warnsignale

Am besten ist es natürlich, fehlerhafte Tests von vornherein zu verhindern. Um es kurz zusammenzufassen: Hier sind einige Warnsignale:

* Der Test ist umfangreich und enthält eine Menge Logik.
* Der Test umfasst viel Code (z. B. bei UI-Tests).
* Der Test macht von festen Wartezeiten Gebrauch.
* Der Test hängt von früheren Tests ab.
* Der Test bestätigt Daten, die nicht zu 100 % vorhersehbar sind, wie z. B. die Verwendung von IDs, Zeiten oder Demodaten, insbesondere zufällig generierten Daten.
* Wenn du die Hinweise und Strategien aus diesem Artikel beachtest, kannst du fehlerhafte Tests verhindern, bevor sie auftreten. Und wenn sie doch auftreten, weißt Du, wie Du sie debuggen und beheben kannst.

Diese Schritte haben mir wirklich geholfen, das Vertrauen in unsere Testsuite wiederherzustellen. Unser Testpaket scheint im Moment stabil zu sein. In der Zukunft könnte es Probleme geben - nichts ist 100%ig perfekt. Dieses Wissen und diese Strategien werden mir helfen, mit ihnen umzugehen. So wächst meine Zuversicht, dass ich in der Lage sein werde, diese Albträume von Flaky Tests zu bekämpfen.

Ich hoffe, ich konnte dir zumindest einen Teil deines Leids und deiner Sorgen über Flakiness nehmen!

## Weiterführende Literatur

* Dieser Artikel wurde ursprünglich veröffentlicht in [Smashing magazine](https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/):
* Artikel über "[flake](https://cypress.io/blog/tag/flake/)", Cypress.io
* [Retrying Your Tests Is Actually a Good Thing (If Your Approach Is Right)](https://www.cypress.io/blog/2020/09/25/guest-post-retrying-your-tests-is-actually-a-good-thing-if-your-approach-is-right/), Filip Hric, Cypress.io
* [Test Flakiness: Methods for Identifying and Dealing With Flaky Tests Jason Palmer](https://engineering.atspotify.com/2019/11/18/test-flakiness-methods-for-identifying-and-dealing-with-flaky-tests/), Spotify R&D Engineering
* [Flaky Tests at Google and How We Mitigate Them John Micco](https://testing.googleblog.com/2016/05/flaky-tests-at-google-and-how-we.html), Google Testing Blog
