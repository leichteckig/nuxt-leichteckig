---
title: Eine (Front-End-Test-) Falle!
description: Beim Schreiben von Front-End-Tests gibt es viele Fallstricke, die sich auf den Weg machen. In der Summe können sie zu schlechter Wartbarkeit, langsamen Ausführungszeiten und - im schlimmsten Fall - zu Tests führen, denen Du nicht vertrauen kannst. Aber das muss nicht so sein.
img: smashing-testing-pitfalls/1-frontend-testing-pitfalls.png
alt: common testing traps
createdAt: 2021-07-01T22:50:54.724Z
author:
  name: Ramona Schwering
  bio: https://www.smashingmagazine.com/2021/07/frontend-testing-pitfalls/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Unit Tests
- End-To-End Tests
otherLanguages:
- locale: en
  name: english
  path: /smashing-common-pitfall-traps
---
Als ich mir einen Film, den ich als Kind geliebt habe, erneut ansah, fiel mir ein Zitat besonders auf. Es stammt aus dem Star-Wars-Film von 1983 ["Die Rückkehr der Jedi"](https://en.wikipedia.org/wiki/Return_of_the_Jedi). Der Satz wird während der Schlacht von Endor gesagt, wo die Allianz ihre Kräfte mobilisiert, um den Todesstern zu zerstören. Dort sagt Admiral Ackbar, der Anführer der Mon Calamari-Rebellen, seinen denkwürdigen Satz:
![“It’s a trap!” — Admiral Akbar ](/smashing-testing-pitfalls/1-frontend-testing-pitfalls.png "It’s a trap!")

"Es ist eine Falle!" Dieser Satz warnt uns vor einem unerwarteten Hinterhalt, einer unmittelbaren Gefahr. Nun gut, aber was hat das mit Testen zu tun? Nun, es ist einfach eine treffende Allegorie, wenn es um den Umgang mit Tests in einer Codebasis geht. Diese Fallen können sich wie ein unerwarteter Hinterhalt anfühlen, wenn man an einer Codebasis arbeitet, vor allem, wenn man dies über einen längeren Zeitraum tut.

In diesem Artikel erzähle ich Euch von den Fallstricken, auf die ich in meiner Karriere gestoßen bin - einige davon waren meine eigene Schuld. In diesem Zusammenhang muss ich eine kleine Warnung aussprechen: Meine tägliche Arbeit ist stark von der Verwendung des Jest-Frameworks für Unit-Tests und des Cypress-Frameworks für End-to-End-Tests geprägt. Ich werde mein Bestes tun, um meine Analyse abstrakt zu halten, so dass Du die Ratschläge auch mit anderen Frameworks anwenden kannst. Wenn Du der Meinung bist, dass das nicht möglich ist, schreib mich gerne an, damit wir darüber reden können! Einige Beispiele könnten sogar auf alle Testtypen anwendbar sein, egal ob Unit-, Integrations- oder End-to-End-Tests.

## Front-End-Testing Fallen

Testen, egal welcher Art, hat viele Vorteile. Front-End-Tests sind eine Reihe von Verfahren zum Testen der Benutzeroberfläche einer Webanwendung. Wir testen die Funktionalität, indem wir die Benutzeroberfläche einer ständigen Belastung aussetzen. Je nach Art des Tests können wir dies auf verschiedene Weise und auf verschiedenen Ebenen erreichen:

* **Unit tests** untersuchen die kleineren Teile Deiner Anwendungen. Bei diesen Einheiten kann es sich um Klassen, Schnittstellen oder Methoden handeln. Die Tests prüfen, ob sie die erwartete Ausgabe liefern, indem sie vordefinierte Eingaben verwenden - sie testen die Einheiten also separat und isoliert.
* **Integration tests** haben einen breiteren Anwendungsbereich. Sie testen Codeeinheiten zusammen und untersuchen ihre Interaktion.
* *End-to-end tests** testen die Anwendung so, wie ein tatsächlicher Benutzer sie benutzen würde. Sie ähneln also den Systemtests, wenn wir die Qualitätssicherung in der Theorie betrachten.

All diese Maßnahmen zusammengenommen können uns bei der Auslieferung unserer Anwendung viel Vertrauen geben - Front-End-Tests stellen sicher, dass die Benutzer mit der Benutzeroberfläche so interagieren, wie wir es wünschen. Aus einem anderen Blickwinkel betrachtet, können wir mit diesen Praktiken fehlerfreie Releases einer Anwendung sicherstellen, ohne viele manuelle Tests durchführen zu müssen, die Ressourcen und Energie verschlingen.

Dieser Wert kann jedoch weggenommen werden, denn viele Pain Points haben verschiedene Ursachen. Viele von ihnen könnten als "Fallen" betrachtet werden. Stell' Dir vor, Du tust etwas mit den besten Absichten, aber es stellt sich im Nachhinein als schmerzhaft und anstrengend heraus: Dies ist die schlimmste Form der technischen Schuld.

## Warum sollten wir uns mit Testfallen befassen?

Wenn ich über die Ursachen und Auswirkungen der Front-End-Testing-Fallen nachdenke, in die ich getappt bin, kommen mir bestimmte Probleme in den Sinn. Vor allem drei Ursachen tauchen immer wieder auf, die aus altem Code stammen, den ich vor Jahren geschrieben hatte.

1. **Langsame Tests, oder zumindest langsame Ausführung von Tests.** bei lokaler Entwicklung neigen Entwickler dazu, bei Tests ungeduldig zu werden, insbesondere wenn jemand in Ihrem Team entsprechende Pull-Requests zusammenführen muss. Lange Wartezeiten fühlen sich in jedem Fall extrem lästig an. Diese Falle kann aus vielen kleinen Ursachen entstehen - zum Beispiel, wenn man nicht auf angemessene Wartezeiten oder auf den Umfang eines Tests achtet.
2. **Schwer zu wartende Tests** dieser zweite Pain Point ist sogar noch kritischer und eine der Hauptursachen für aufgegebene Tests. Es kann zum Beispiel sein, dass Du Monate später auf einen Test zurückkommst und seinen Inhalt oder seine Absicht überhaupt nicht mehr verstehst. Oder Teammitglieder fragen Dich, was Du mit einem alten, von Dir geschriebenen Test erreichen wolltest. Generell können zu viele Klassen oder Abstraktionen, die sich über ganze Text- oder Codewände erstrecken, die Motivation eines Entwicklers schnell zerstören und schlicht zu Chaos führen. Fallen in diesem Bereich können durch das Befolgen von "Best" Practices verursacht werden, die sich nicht für Tests eignen.
3. **Tests, die überhaupt keinen konsistenten Wert liefern.** Man kann sie Heisenfails oder Heisentests nennen, wie den berühmten Heisenbug, der nur auftritt, wenn man wegschaut, nicht misst oder, in unserem Fall, nicht debuggt. Der schlimmste Fall ist ein [flaky test](https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/), ein nicht-determinanter Test, der zwischen verschiedenen Builds ohne Änderungen nicht das gleiche Ergebnis liefert. Das kann aus verschiedenen Gründen passieren, aber normalerweise passiert es, wenn Du versuchst, eine einfache, scheinbar bequeme Abkürzung zu nehmen, und dabei die besten Best Practises missachtest.

Aber mache Dir nicht zu viele Gedanken über meine eigenen Erfahrungen. Testen und der Umgang mit Tests kann Spaß machen! Wir müssen nur einige Dinge im Auge behalten, um ein schmerzhaftes Ergebnis zu vermeiden. Am besten ist es natürlich, wenn wir Fallen in unseren Testentwürfen von vornherein vermeiden. Aber wenn der Schaden bereits angerichtet ist, ist die Überarbeitung einer Testbasis die nächstbeste Lösung.

## Die Goldene Regel

Nehmen wir an, Du arbeitest an einer spannenden, aber anspruchsvollen Aufgabe. Du bist voll und ganz auf sie konzentriert. Dein Gehirn ist voll mit Produktionscode, und es bleibt kein Platz für zusätzliche Komplexität - schon gar nicht für das Testen. Es ist völlig gegen den Sinn und Zweck des Testens, wenn man sich zu viel Gedanken darüber macht. Im schlimmsten Fall sind Tests, die sich wie eine Last anfühlen, ein Grund dafür, dass viele Teams die Tests aufgeben.

In seinem Leitfaden "[JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)" formuliert Yoni Goldberg die goldene Regel, um zu verhindern, dass sich Tests wie eine Last anfühlen: Ein Test sollte sich wie ein freundlicher Assistent anfühlen, der Ihnen hilft, und sollte sich niemals wie ein Hindernis anfühlen.

Ich stimme ihm zu. Dies ist das Wichtigste beim Testen. Aber wie erreichen wir das genau? Kleiner Spoiler: Die meisten meiner Beispiele werden dies verdeutlichen. Das KISS-Prinzip (keep it simple, stupid) ist der Schlüssel. **Jeder Test, egal welcher Art, sollte schlicht und einfach gestaltet sein.**

Was also ist ein einfacher und verständlicher Test? Wie kannst Du feststellen, ob Dein Test einfach genug ist? Es ist von größter Bedeutung, dass Du Deine Tests nicht verkomplizierst. Das Hauptziel wird von Yoni Goldberg perfekt zusammengefasst:

> “One should look at a test and get the intent instantly.” = Man sollte sich einen Test ansehen und dabei sofort dessen Absicht erkennen können.

Das Design eines Tests sollte also flach sein. Der Begriff "minimalistisch" beschreibt es am besten. Ein Test sollte nicht viel Logik und wenige bis gar keine Abstraktionen enthalten. Das bedeutet auch, dass Du mit Page Objects und Commands vorsichtig sein musst, und dass Du Commands sinnvoll benennen und dokumentieren musst. Wenn Du beabsichtigst, diese zu verwenden, achte auf aussagekräftige Befehle, Funktionen und Klassennamen. Auf diese Weise bleibt ein Test für Entwickler und Tester gleichermaßen angenehm.

Mein Lieblingsprinzip beim Testen bezieht sich auf die Duplikation, das DRY-Prinzip: Wiederhole dich nicht. Wenn die Abstraktion die Verständlichkeit Ihres Tests beeinträchtigt, dann vermeide den doppelten Code ganz und gar.

Dieser Codeschnipsel ist ein Beispiel dafür:

```javascript
// Cypress
beforeEach(() => {
    // Es ist auf den ersten Blick schwer zu erkennen, was diese Befehle wirklich tun
    cy.setInitialState()
       .then(() => {
           return cy.login();
       });
});
```

Um den Test verständlicher zu machen, könnte man meinen, dass es nicht ausreicht, die Befehle sinnvoll zu benennen. Stattdessen kannst Du auch in Betracht ziehen, die Befehle in Kommentaren zu dokumentieren, etwa so:

```javascript
// Cypress
/**
* Logs in silently using API
* @memberOf Cypress.Chainable#
* @name loginViaApi
* @function
*/
Cypress.Commands.add('loginViaApi', () => {
   return cy.authenticate().then((result) => {
       return cy.window().then(() => {
           cy.setCookie('bearerAuth', result);
       }).then(() => {
           cy.log('Fixtures are created.');
       });
   });
});
```

Eine solche Dokumentation kann in diesem Fall unerlässlich sein, weil sie **Dir und Deinem Team helfen wird, den Test besser zu verstehen**. Du merkst schon, dass einige Best Practices für Produktionscode nicht für Testcode geeignet sind. Tests sind einfach kein Produktionscode, und wir sollten sie nie als solchen behandeln. Natürlich sollten wir Testcode mit der gleichen Sorgfalt behandeln wie Produktionscode. Einige Konventionen und Best Practices können jedoch mit der Verständlichkeit in Konflikt geraten. In solchen Fällen solltest Du Dich an die goldene Regel erinnern und die Erfahrung des Entwicklers in den Vordergrund stellen.

## Fallen im Testentwurf

In den ersten Beispielen dieses Abschnitts werde ich darüber sprechen, wie man vermeiden kann, in Testfallen zu tappen. Danach werde ich über den Testentwurf sprechen. Wenn Du bereits an einem langlaufenden Projekt arbeitest, sollte dies immer noch nützlich sein.

### Die Regel der Drei

Beginnen wir mit dem folgenden Beispiel. Achte auf den Titel des Tests. Der Inhalt des Tests selbst ist zweitrangig.

```javascript
// Jest
describe('deprecated.plugin', () => {
    it('should throw error',() => {
       // Tatsächlicher Test, gekürzt für die Komponente, die einen Fehler auslöst
        const component = createComponent();

        expect(global.console.error).toBeCalled();
    });
});
```

Kannst Du beim Betrachten dieses Tests auf den ersten Blick erkennen, was er leisten soll? Stell Dir vor, Du siehst diesen Titel in Deinen Testergebnissen (z. B. in den Protokolleinträgen Deiner Pipelines bei der kontinuierlichen Integration). Nun, offensichtlich sollte hier ein Fehler ausgelöst werden. Aber welcher Fehler ist das? Unter welchen Umständen sollte er ausgelöst werden? Auf den ersten Blick ist es nicht leicht zu verstehen, was dieser Test leisten soll, denn der Titel ist nicht sehr aussagekräftig.

Erinnere Dich an unsere goldene Regel, dass wir sofort wissen sollten, was der Test bewirken soll. Also müssen wir diesen Teil ändern. Zum Glück gibt es eine Lösung, die leicht zu verstehen ist. Wir werden diesen Test mit der Dreierregel betiteln.

Diese Regel, [eingeführt von Roy Osherove](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html), wird Dir helfen zu verdeutlichen, was Dein Test bewirken soll. Sie ist eine bekannte Praxis bei Unit-Tests, aber auch bei End-to-End-Tests kann sie hilfreich sein. Nach dieser Regel sollte der Titel eines Tests aus drei Teilen bestehen:

1. Was wird getestet?
2. Unter welchen Umständen wird es geprüft?
3. Was ist das erwartete Ergebnis?

OK, wie würde unser Test aussehen, wenn wir diese Regel befolgen würden? Schauen wir mal:

```javascript
// Jest
describe('deprecated.plugin', () => {
it('Property: Should throw an error if the deprecated prop is used', () => {
        // Tatsächlicher Test, gekürzt für die Komponente, die einen Fehler auslöst
        const component = createComponent();

        expect(global.console.error).toBeCalled();
   });
});
```

Ja, der Titel ist lang, aber Du wirst alle drei Teile darin finden:
1. Was wird geprüft? In diesem Fall ist es die Eigenschaft.
2. Unter welchen Umständen? Wir wollen eine veraltete Eigenschaft testen.
3. Was erwarten wir? Die Anwendung sollte einen Fehler auslösen.

Wenn wir diese Regel befolgen, können wir das Ergebnis des Tests auf den ersten Blick sehen, ohne dass wir die Protokolle lesen müssen. In diesem Fall sind wir also in der Lage, unsere goldene Regel zu befolgen.

### "Arrange, Act, Assert" vs "Given, When, Then"

Eine weitere Falle, ein weiteres Codebeispiel. Hast Du den folgenden Test beim ersten Lesen verstanden?

```javascript
// Jest
describe('Context menu', () => {
   it('should open the context menu on click', async () => {
        const contextButtonSelector = 'sw-context-button';
        const contextButton =
              wrapper.find(contextButtonSelector);
        await contextButton.trigger('click');
        const contextMenuSelector = '.sw-context-menu';
        let contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(false);
        contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(true);  
   });
});
```

Wenn ja, dann herzlichen Glückwunsch! Du bist bemerkenswert schnell in der Informationsverarbeitung. Wenn nicht, dann mach Dir keine Sorgen; das ist ganz normal, denn die Struktur des Tests lässt sich stark verbessern. Zum Beispiel sind die Deklarationen und Behauptungen ohne Rücksicht auf Struktur geschrieben und durcheinander gebracht. Wie können wir diesen Test verbessern?

Es gibt ein Muster, das sich als nützlich erweisen könnte: das AAA-Pattern. AAA ist die Abkürzung für "arrange, act, assert" (anordnen, handeln, behaupten), das Dir sagt, was zu beachten ist, wenn Du einen Test klar strukturieren willst. Unterteile den Test in drei wesentliche Teile. Da dieses Muster für relativ kurze Tests geeignet ist, findet man es meist bei Unit-Tests. Kurz gesagt, das sind die drei Teile:

* **Arrange** Hier richtest Du das zu testende System ein, um das Szenario zu erhalten, das mit dem Test simuliert werden soll. Dies kann von der Einrichtung von Variablen bis hin zur Arbeit mit Mocks und Stubs alles beinhalten.
* **Act** In diesem Teil führst Du die zu testende Einheit aus. Das heißt, Du führst alle Schritte aus und tust alle Dinge, die getan werden müssen, um zum Ergebnis des Tests zu gelangen.
* **Assert** Dieser Teil ist relativ selbsterklärend. In diesem letzten Teil führst Du einfach Deine Behauptungen und Prüfungen durch.

Dies ist eine weitere Möglichkeit, einen Test auf schlanke und verständliche Weise zu entwerfen. Mit dieser Regel im Hinterkopf könnten wir unseren schlecht geschriebenen Test in den folgenden ändern:
```javascript
// Jest
describe('Context menu', () => {
    it('should open the context menu on click', () => {
        // Arrange
        const contextButtonSelector = 'sw-context-button';
        const contextMenuSelector = '.sw-context-menu';

        // Assert state before test
        let contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(false);

        // Act
        const contextButton =
             wrapper.find(contextButtonSelector);
        await contextButton.trigger('click');

        // Assert
        contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(true);  
    });
});
```

Aber halt! Was ist das für ein Teil mit "Handeln vor Asserten"? Und wenn wir schon dabei sind, meinst Du nicht, dass dieser Test ein bisschen zu viel Kontext hat, weil er ein Unit-Test ist? Das ist richtig. Wir haben es hier mit Integrationstests zu tun. Wenn wir das DOM testen, wie wir es hier tun, müssen wir die Vorher- und Nachher-Zustände überprüfen. Während sich das AAA-Pattern also gut für Unit- und API-Tests eignet, ist es für diesen Fall nicht geeignet.

Betrachten wir das AAA-Muster einmal aus der folgenden Perspektive. Wie Claudio Lassala in [einem seiner Blog-Beiträge](https://lassala.net/2017/07/20/test-style-aaa-or-gwt/) schreibt, sollte man sich nicht überlegen, wie man...

* “…**arrange** my test, I think what I’m **given**.” Dies ist das Szenario mit allen Vorbedingungen des Tests.
* “…**act** in my test, I think **when** something happens.” Hier sehen wir die Aktionen des Tests.
* “…**assert** the results, I think if that something happens **then** this is what I expect as the outcome.” Hier finden wir die Dinge, die wir überprüfen wollen, also die Absicht des Tests.

Die fettgedruckten Schlüsselwörter im letzten Aufzählungspunkt weisen auf ein weiteres Muster aus der behavioral-driven development (BDD) hin. Es handelt sich um das **given-when-then**-Muster, das von Daniel Terhorst-North und Chris Matts entwickelt wurde. Du bist vielleicht mit diesem Muster vertraut, wenn Du Tests in der Sprache Gherkin geschrieben hast:

```gherkin
Feature: Context menu
  Scenario: 
    Given I have a selector for the context menu
       And I have a selector for the context button

    When the context menu can be found
       And this menu is visible
       And this context button can be found
       And is clicked
     
   Then I should be able to find the contextMenu in the DOM
      And this context menu is visible
```

Du kannst sie jedoch in allen Arten von Tests verwenden - zum Beispiel, indem Du Blöcke strukturierst. Mit der Idee aus den obigen Aufzählungspunkten ist es recht einfach, unseren Beispieltest umzuschreiben:
```javascript
// Jest
describe('Context menu', () => {
    it('should open the context menu on click', () => {
        // Given
        const contextButtonSelector = 'sw-context-button';
        const contextMenuSelector = '.sw-context-menu';

        // When
        let contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(false);
        const contextButton =
             wrapper.find(contextButtonSelector);
        await contextButton.trigger('click');

        // Then
        contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(true);  
    });
});
```

### Daten, die wir gemeinsam nutzten

Wir haben die nächste Falle erreicht. Das Bild unten sieht friedlich und glücklich aus, zwei Menschen, die sich ein Papier teilen:

![Test data we used to share.](/smashing-testing-pitfalls/2-frontend-testing-pitfalls.png "Two tests (persons) sharing the same data")

Allerdings könnte es für sie ein böses Erwachen geben. Übertrage dieses Bild auf einen Test, wobei die beiden Personen für Tests und das Papier für Testdaten stehen. Nennen wir diese beiden Tests Test A und Test B. Sehr kreativ, nicht wahr? Der Punkt ist, dass Test A und Test B dieselben Testdaten verwenden oder, schlimmer noch, sich auf einen früheren Test stützen.

Dies ist problematisch, weil es zu fehlerhaften Tests führt. Wenn zum Beispiel der vorherige Test fehlschlägt oder die gemeinsam genutzten Testdaten beschädigt werden, können die Tests selbst nicht erfolgreich ausgeführt werden. Ein anderes Szenario wäre, dass Deine Tests in zufälliger Reihenfolge ausgeführt werden. In diesem Fall kannst Du nicht vorhersagen, ob der vorhergehende Test in dieser Reihenfolge bleibt oder nach den anderen abgeschlossen wird, wodurch die Tests A und B ihre Grundlage verlieren würden. Dies ist auch nicht auf End-to-End-Tests beschränkt; ein typischer Fall bei Unit-Tests sind zwei Tests, die dieselben Seed-Daten mutieren.

Schauen wir uns nun ein Codebeispiel eines End-to-End-Tests aus meinem Arbeitsalltag an. Der folgende Test deckt die Anmeldefunktionalität eines Online-Shops ab.

```javascript
// Cypress
describe('Customer login', () => {

    // Executed before every test
    beforeEach(() => {
        // Step 1: Set application to clean state
        cy.setInitialState()
           .then(() => {
             // Step 2: Create test data 
             return cy.setFixture('customer');
           })
            // … use cy.request to create the customer
    }):

    // … tests will start below
})
```

Um die oben genannten Probleme zu vermeiden, führen wir den `beforeEach`-Hook dieses Tests vor jedem Test in seiner Datei aus. Der erste und wichtigste Schritt besteht darin, unsere Anwendung auf die Werkseinstellungen zurückzusetzen, ohne benutzerdefinierte Daten oder ähnliches. Damit wollen wir sicherstellen, dass alle unsere Tests die gleiche Grundlage haben. Außerdem schützt es diesen Test vor jeglichen Nebenwirkungen außerhalb des Tests. Im Grunde isolieren wir ihn und halten jeden Einfluss von außen fern.

Der zweite Schritt besteht darin, alle für die Durchführung des Tests erforderlichen Daten zu erstellen. In unserem Beispiel müssen wir einen Kunden erstellen, der sich in unserem Shop anmelden kann. Ich möchte alle Daten, die der Test benötigt, speziell für den Test selbst erstellen. Auf diese Weise wird der Test unabhängig, und die Reihenfolge der Ausführung kann zufällig sein. Zusammenfassend lässt sich sagen, dass beide Schritte wesentlich sind, um sicherzustellen, dass die Tests von allen anderen Tests oder Nebeneffekten isoliert sind und somit die Stabilität erhalten bleibt.

## Implementierungsfallen

Nun gut, wir haben über Testentwurf gesprochen. Über einen guten Testentwurf zu sprechen, reicht jedoch nicht aus, denn der Teufel steckt im Detail. Lasst uns also unsere Tests inspizieren und die tatsächliche Implementierung unserer Tests hinterfragen.

### Foo Bar What?

Für diese erste Falle bei der Testdurchführung haben wir Besuch bekommen! Es ist BB-8, und er hat etwas in einem unserer Tests gefunden:

![What does “Foo Bar” mean?!](/smashing-testing-pitfalls/3-frontend-testing-pitfalls.png "BB8 doesn’t know what Foo Bar is about.")

Er hat einen Namen gefunden, der uns vielleicht bekannt ist, ihm aber nicht: Foo Bar. Natürlich wissen wir Entwickler, dass Foo Bar oft als Platzhalter verwendet wird. Aber wenn Du diesen Namen in einem Test siehst, wirst Du dann sofort wissen, wofür er steht? Auch hier könnte der Test auf den ersten Blick schwieriger zu verstehen sein.

Zum Glück ist diese Falle leicht zu beheben. Schauen wir uns den folgenden Cypress-Test an. Es handelt sich um einen End-to-End-Test, aber die Ratschläge sind nicht auf diesen Testtyp beschränkt.

```javascript
// Cypress
it('should create and read product', () => {
    // Modul öffnen, um Produkt hinzuzufügen
    cy.get('a[href="#/sw/product/create"]').click();

    // Basisdaten zum Produkt hinzufügen
    cy.get('.sw-field—product-name').type('T-Shirt Ackbar');
    cy.get('.sw-select-product__select_manufacturer')
        .type('Space Company');

    // … Test geht weiter …
});
```

Dieser Test soll prüfen, ob ein Produkt erstellt und gelesen werden kann. In diesem Test möchte ich einfach Namen und Platzhalter verwenden, die mit einem echten Produkt verbunden sind:

* Für den Namen eines T-Shirt-Produkts möchte ich "T-Shirt Akbar" verwenden.
* Für den Namen des Herstellers ist "Space Company" eine Idee.

<hint type="info" title="Kleiner Hinweis">
Du musst aber nicht alle Produktnamen selbst erfinden. Du könntest die Daten automatisch generieren oder, was noch schöner ist, sie aus deinem Produktionssystem importieren. Wie auch immer, ich möchte mich an die goldene Regel halten, selbst bei der Namensgebung.
</hint>

### Look at selectors you must

Neue Falle, gleicher Test. Schaue Dir das Ganze noch einmal an, fällt Dir etwas auf?

```javascript
// Cypress
it('should create and read product', () => {
    // Open module to add product
    cy.get('a[href="#/sw/product/create"]').click();

    // Add basic data to product
    cy.get('.sw-field—product-name').type('T-Shirt Ackbar');
    cy.get('.sw-select-product__select_manufacturer')
        .type('Space Company');

    // … Test continues …
});
```

Hast Du diese Selektoren bemerkt? Es sind CSS-Selektoren. Nun, Du fragst dich vielleicht: "Warum sind sie problematisch? Sie sind einzigartig, sie sind leicht zu handhaben und zu pflegen, und ich kann sie einwandfrei verwenden!" Aber bist Du Dir sicher, dass das immer der Fall ist?

Die Wahrheit ist, dass CSS-Selektoren anfällig für Abweichungen sind. Wenn Du ein Refactoring durchführst und z. B. Klassen änderst, kann der Test fehlschlagen, auch wenn Du keinen Fehler eingebaut hast. Solche Umstrukturierungen sind üblich, so dass diese Fehler für die Entwickler ärgerlich und mühsam zu beheben sind. Denke also daran, dass ein Test, der ohne Fehler fehlschlägt, ein False Positive ist und keinen zuverlässigen Befund für deine Anwendung liefert.

!["Look at selectors you must!"](/smashing-testing-pitfalls/4-frontend-testing-pitfalls.png "We advise you to look after the selectors you use.")

**This trap refers mainly to end-to-end testing in this case. In other circumstances, it could apply to unit testing as well — for example, if you use selectors in component testing. As Kent C. Dodds states in [his article](https://kentcdodds.com/blog/testing-implementation-details) on the topic:**

> “You shouldn’t test implementation details.”
= Du solltest keine Implementierungsdetails testen.

Meiner Meinung nach gibt es bessere Alternativen zur Verwendung von Implementierungsdetails für Tests. Teste stattdessen **Dinge, die ein Benutzer bemerken würde**. Oder noch besser: Wähle Selektoren, die weniger anfällig für Änderungen sind. Mein bevorzugter Selektortyp ist das Data-Attribut. Es ist weniger wahrscheinlich, dass ein Entwickler Data-Attribute während des Refactorings ändert, was sie perfekt für die Lokalisierung von Elementen in Tests macht. Ich empfehle, ihnen einen aussagekräftigen Namen zu geben, um allen Entwicklern, die am Quellcode arbeiten, ihren Zweck klar zu vermitteln. Das könnte so aussehen:

```javascript
// Cypress
cy.get('[data-test=sw-field—product-name]')
  .type('T-Shirt Ackbar');
cy.get('[data-test=sw-select-product__select_manufacturer]')
  .type('Space Company');
```

Falsch positive Ergebnisse sind nur eines der Probleme, die wir beim Testen von Implementierungsdetails bekommen. Auch das Gegenteil, falsch negative Ergebnisse, kann beim Testen von Implementierungsdetails auftreten. Ein falsches Positiv liegt vor, wenn ein Test erfolgreich ist, obwohl die Anwendung einen Fehler aufweist. Das Ergebnis ist, dass das Testen wieder viel Zeit in Anspruch nimmt, was im Widerspruch zu unserer goldenen Regel steht. Wir müssen dies also so weit wie möglich vermeiden.

<hint type="info" title="Hinweis">
Dieses Thema ist so umfangreich, dass es besser in einem eigenen Artikel behandelt werden sollte. Bis dahin empfehle ich Dir, den Artikel von Dodds zu lesen, um mehr über das Thema zu erfahren.
</hint>

### Wait for it!

Zu guter Letzt ist der nächste Punkt, den ich nicht genug betonen kann. Ich weiß, dass dies nervig sein wird, aber ich sehe immer noch viele Leute, die es tun, also muss ich es hier als eine Falle erwähnen.

Es ist das Problem der festen Wartezeit, über das ich in [meinem Artikel über fehlerhafte Tests] (https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/) gesprochen habe. Wirf einen Blick auf diesen Test:
```javascript
// Cypress
Cypress.Commands.add('typeSingleSelect', {
        prevSubject: 'element',
    },
    (subject, value, selector) => {
    cy.wrap(subject).should('be.visible');
    cy.wrap(subject).click();

    cy.wait(500);            
    cy.get(`${selector} input`)
      .type(value);
});
```

Die kleine Zeile mit `cy.wait(500)` ist eine feste Wartezeit, die die Ausführung des Tests für eine halbe Sekunde unterbricht. Um diesen Fehler zu verschlimmern, findest Du ihn in einem benutzerdefinierten Befehl, so dass der Test diese Wartezeit mehrfach verwendet. Die Anzahl der Sekunden summiert sich mit jeder Verwendung dieses Befehls. Das **verlangsamt den Test viel zu sehr**, und das ist überhaupt nicht notwendig. Und das ist noch nicht einmal der schlimmste Teil. Das Schlimmste ist, dass wir auf zu wenig Zeit warten, so dass unser Test schneller ausgeführt wird, als unsere Website darauf reagieren kann. Das führt zu Problemen, weil der Test manchmal fehlschlägt. Glücklicherweise können wir viele Dinge tun, um feste Wartezeiten zu vermeiden.

Alle Wege führen zu dynamischen Wartezeiten. Ich würde vorschlagen, die eher deterministischen Methoden zu bevorzugen, die die meisten Testplattformen anbieten. Schauen wir uns die beiden von mir bevorzugten Methoden genauer an.

* **Warten auf Änderungen in der UI.**
Die erste Methode der Wahl besteht darin, auf Änderungen in der Benutzeroberfläche der Anwendung zu warten, die ein menschlicher Benutzer bemerken oder sogar darauf reagieren würde. Beispiele hierfür sind eine Änderung in der Benutzeroberfläche (z. B. ein verschwindender Ladespinner), das Warten auf das Anhalten einer Animation und Ähnliches. Wenn Du Cypress verwendest, könnte dies wie folgt aussehen:

```javascript
// Cypress
cy.get('data-cy="submit"').should('be.visible');
```

Fast jedes Testframework bietet solche Wartemöglichkeiten.

* **Warten auf API-Anfragen**
Eine weitere Möglichkeit, die ich sehr zu schätzen gelernt habe, ist das Warten auf API-Anfragen bzw. deren Responses. Um ein Beispiel zu nennen: Cypress bietet dafür nützliche Features. Zunächst würde man eine Route definieren, auf die Cypress warten soll:
```javascript
// Cypress
cy.intercept({
    url: '/widgets/checkout/info',
    method: 'GET'
}).as('checkoutAvailable');
```
Danach kannst Du es in deinem Test wie folgt einsetzen:

```javascript
// Cypress
cy.wait('@request').its('response.statusCode')
  .should('equal', 200);
```
Auf diese Weise bleibt DeinTest stabil und zuverlässig, während die Zeit effizient genutzt wird. Darüber hinaus kann der Test sogar schneller sein, weil er nur so lange wartet, wie er muss.

## Wichtige Erkenntnisse

Um auf Admiral Akbar und Star Wars im Allgemeinen zurückzukommen: Die Schlacht von Endor war ein Erfolg, auch wenn viel Arbeit nötig war, um diesen Sieg zu erreichen. Mit Teamwork und einer Reihe von Gegenmaßnahmen war es möglich und wurde schließlich Wirklichkeit.

Übertrage das auf das Testen. Es kann viel Mühe kosten, nicht in eine Testfalle zu tappen oder ein Problem zu beheben, wenn der Schaden bereits angerichtet ist, insbesondere bei Legacy-Code. Sehr oft wirst Du und Dein Team eine **Änderung der Denkweise beim Testdesign** oder sogar eine Menge Refactoring benötigen. Aber am Ende wird es sich lohnen, und Du wirst die Früchte deiner Arbeit sehen.

Das Wichtigste, was Du Dir merken solltest, ist die goldene Regel, über die wir bereits gesprochen haben. Die meisten meiner Beispiele folgen ihr. Die meisten Probleme entstehen, wenn man sie ignoriert. Ein Test sollte ein freundlicher Helfer sein, nicht ein Hindernis! Dies ist der wichtigste Punkt, den man im Auge behalten sollte. Ein Test sollte sich so anfühlen, als ob man eine Routine durchläuft und nicht als ob man eine komplexe mathematische Formel löst. Lasst uns unser Bestes tun, um das zu erreichen.

!["See, R2-D2 is catching bugs with ease here."](/smashing-testing-pitfalls/5-frontend-testing-pitfalls.png "Testing should feel lean and like fun!")

Ich hoffe, ich konnte Dir helfen, indem ich Dir einige Ideen zu den häufigsten Fallen, die mir begegnet sind, gegeben habe. Ich bin mir jedoch sicher, dass es noch viele weitere Fallen gibt, die Du finden und aus denen Du lernen kannst. Ich würde mich freuen, wenn Du mir irgendwann deine häufigsten Fallen nennst, damit wir alle von Dir lernen können. Bis bald!
