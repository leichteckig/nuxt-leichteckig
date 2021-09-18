---
title: Moe's Anmerkungen zu den Fallstricken der Testautomatisierung bei Shopware
description: Manchmal schlagen unsere Pipelines fehl. Wenn das bei unseren eigenen Merge-Requests passiert, müssen wir es beheben - ich kann mir vorstellen, dass es Dir genauso geht, wenn Du mit den Tests von Shopware arbeitest. Dies sind meine Anmerkungen zu häufigen Fallen bei der Testautomatisierung im Zusammenhang mit Shopware.
createdAt: 2021-09-28T00:00:00.724Z
img: shopware-testing-bugs/bingo.jpg
alt: common Shopware testing traps
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Shopware
- Unit Tests
- End-To-End Tests
- Testing pitfalls
otherLanguages:
- locale: en
  name: english
  path: /common-shopware-testing-pitfalls
---
Dieser Artikel sollte Teil spezifischer Hilfsressourcen sein, die Dir zeigen, wie Du fehlerhafte Pipelines überprüfen, debuggen und beheben kannst.
In gewisser Weise ist dies eine Art Merkblatt für all die kleinen Probleme, die mir in meiner täglichen Arbeit oder als Fragen in
StackOverflow oder über [Shopware's community slack](http://shopwarecommunity.slack.com) helfen. Notizen dienen als Checkpoint für Gedanken, richtig?

<hint type="info" title="">
  Aktualisiert am 28. September 2021" message="Es ist ein lebendiges Dokument, Du kannst also gerne etwas dazu beitragen, Dich bei mir melden und zu einem späteren Zeitpunkt nachsehen, ob neue Fallstricke entdeckt wurden
</hint>

## Allgemeine Dinge

### Honorable mention

Ich habe bereits einen [Leitfaden](smashing-common-pitfall-traps), wie Du Deine Tests auf allgemeine, häufige Fallstricke überprüfen kannst.
Er könnte für Dich hilfreich sein, wenn Du Dir einen Überblick über alle Informationen zu diesem Thema verschaffen möchtest.

### Gibt es bereits Voreinstellungen, Tests oder andere testbezogene Inhalte von Shopware?

Natürlich gibt es das. [Shopware 6](https://github.com/shopware/platform) ist quelloffen, ebenso wie alle seine Tests.
Du kannst also alles, was mit unseren Tests zu tun hat, in diesem Repository finden:
* PHPUnit-Tests findest Du als `Test`-Ordner in vielen Verzeichnissen des [Core-Bundles](https://github.com/shopware/platform/tree/trunk/src/Core)
* Jest-Tests für [Storefront](https://github.com/shopware/platform/tree/trunk/src/Storefront/Resources/app/storefront/test) und [Administration](https://github.com/shopware/platform/tree/trunk/src/Administration/Resources/app/administration/test)
* Cypress-Tests für [Storefront](https://github.com/shopware/platform/tree/trunk/src/Storefront/Resources/app/storefront/test/e2e) und [Administration](https://github.com/shopware/platform/tree/trunk/src/Administration/Resources/app/administration/test/e2e)
* [Pipeline-Konfiguration](https://github.com/shopware/platform/blob/trunk/.gitlab-ci.yml)

Was die Dokumentation betrifft, so gibt es bereits eine Menge Inhalt zu entdecken:
* [Testbereich](https://developer.shopware.com/docs/guides/plugins/plugins/testing) in den Shopware-Entwicklerdokumenten
* [Testing best practises](https://developer.shopware.com/docs/resources/guidelines/testing) im Zusammenhang mit Shopware

Aber das ist noch nicht alles. Shopware stellt einige voreingestellte Plugins zur Verfügung, um Sie mit Helper und Commands zu versorgen:
* [E2E Platform Testsuite](https://www.npmjs.com/package/@shopware-ag/e2e-testsuite-platform) für Shopware 6
* [Jest Test preset](https://www.npmjs.com/package/@shopware-ag/jest-preset-sw6-admin) für Shopware 6 Administrationstests

Du kannst sie gerne ausprobieren. 💙

### Kann ich auf die PSH-Skripte verzichten?

Ja, sicher! Das sollte einfach sein, denn Du kannst einfach die normalen Befehle verwenden. So zum Beispiel mit Cypress:
Verwende einfach den Pfad zum Stammverzeichnis Deines Tests (oder navigiere dorthin) und dann `./node_modules/.bin/cypress open`.
Mit Jest und natürlich PHPUnit sollte es das Gleiche sein. Die PSH-Skripte dienen als Wrapper um die Standardbefehle, also kannst Du Dir auch diese Skripte ansehen, um zu sehen, wie Du die Tests selbst starten kannst.

## PHP Unit Tests

### Wieder einmal Aktualisierungen von Abhängigkeiten ...

Manchmal ist es sinnvoll, Versionsnummern von Abhängigkeiten nicht zu fixieren, um Fehler aufgrund von 
Inkompatibilitäten oder ähnlichem zu entdecken. Nehmen wir Symfony Updates als Beispiel: Es könnte der Fall eintreten, 
dass sie ein Update veröffentlichen, das unsere Pipelines fehlschlagen lässt. Untersuchen wir einen plötzlichen Fehler in 
Verbindung mit Symfony, z.B.:
```bash
"Parameter #5 $default of method Symfony\\Component\\Console\\Command\\Command::addOption()
 expects array<string>|bool|string|null, int given.",
```

#### Lösung

Sicher, wir wollen auf dem neuesten Stand bleiben, aber das ist die Kehrseite der Medaille. Wenn Du also einen 
Fehler in Verbindung mit Symfony siehst, stelle sicher, dass Du deren Releases überprüfst.

### Migration schlägt fehl

Es kann vorkommen, dass unsere PHPUnit-Pipelines aufgrund von neuen oder geänderten Migrationen fehlschlagen. Hier 
ist ein repräsentativer Fehler:

```bash
In AbstractMySQLDriver.php Zeile 61:
  Während der Ausführung von 'SELECT * FROM migration WHERE class = ?' ist eine Ausnahme aufgetreten 
  with params ["Shopware\\Core\\Migration\\Migration1536232600Language"]:
  SQLSTATE[42S02]: Basistabelle oder Ansicht nicht gefunden: 1146 Tabelle 'sw6.migration' existiert nicht
```

Manchmal schlagen die Migrationstests auch direkt fehl. Was ist nun zu tun?

#### Lösung

Wenn Du Migrationen schreibst, behalte immer unsere
[docs](https://developer.shopware.com/docs/guides/plugins/plugins/plugin-fundamentals/database-migrations) im Hinterkopf.
Wenn Du eine fehlgeschlagene Pipeline debuggen musst, kann es der erste Schritt sein, zu überprüfen, ob alle Migrationen korrekt angewendet werden.

Ein häufiger Fehler ist die falsche Verwendung von Sprachen. Bitte denke dran, dass obwohl Deutsch und Englisch die
Standardsprachen sind, das nicht bedeutet, dass diese beiden Sprachen auch immer verfügbar sind!

## Jest Unit Tests

### jest.spyOn() funktioniert nicht wie erwartet

Die jest.spyOn-Methode funktioniert nicht wie erwartet, wenn die Methode als Callback aufgerufen wird (z.B. aus der Vorlage).
Lösungen aus
[stackoverflow](https://stackoverflow.com/questions/61859423/why-doesnt-jest-spyon-sometimes-work-on-a-vue-components-method)
usw. können die Leute verwirren, weil wir keine benannten Importe der Komponenten verwenden.

#### Lösung

Die Komponente wird in einer Variablen gespeichert und das Spionieren muss vorher durchgeführt werden. Siehe hier:

```javascript
const swMeteorSingleSelect = Shopware.Component.build('sw-meteor-single-select');

// Fahre dann mit Deinem Test fort
```

### Warten auf das Auslösen von Ereignissen

Manchmal ist es notwendig, auf das Auslösen eines Ereignisses zu warten, bevor man mit dem Test fortfährt, z.B. wenn man mit einem zusammenklappbaren Panel in der Storefront arbeitet.

#### Lösung

Einen Ereignis-Listener in ein Versprechen verpacken:
```javascript
const isEventTriggered = new Promise((resolve) => {
   $(collapse).on('shown.bs.collapse', () => {
      resolve();
   });
});

// Aufruf einer Methode, die das Ereignis auslöst
$(collapse).collapse('show');

// Warten, bis der Event-Handler ausgelöst wurde
await isEventTriggered;
```

### Wie man ein Event auslöst

Um eine bestimmte Funktionalität zu testen, ist es notwendig, ein Event programmatisch auszulösen.

#### Lösung

Durch die Verwendung der `jsdom`-Umgebung in Ihrer spec-Datei kannst Du auf die gesamte DOM-API zugreifen, was uns erlaubt, ein
Standard-Ereignis oder sogar benutzerdefinierte Ereignisse zu feuern.

```javascript
/**
 * @jest-environment jsdom
 */
describe('some spec file', () => {
    it('should react to a click event', () => {
        const element = document.querySelector('.my-selector');
        const clickEvent = new Event('click');

        element.dispatchEvent(clickEvent);
    });
})
```

## End-to-End Tests mit Cypress

### Lokaler Fehler beim Starten von Cypress in einer Docker-Umgebung

Wenn Du mit dem Standard-Docker-Setup von Shopware arbeitest, könntest Du über die folgende Fehlermeldung stolpern:

```bash
No protocol specified (Cypress:92): Gtk-WARNING \*\*: 09:39:50.737: cannot open display: :0 
```

#### Lösung

Basierend auf dieser [Anleitung](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/#Interactive-mode)
musst Du die XVFB-Nachrichten von Cypress aus dem Docker-Container heraus an einen X11-Server weiterleiten, der auf dem Host-Rechner läuft. Die erwähnte Anleitung zeigt ein Beispiel für Mac; andere Betriebssysteme erfordern möglicherweise
andere Befehle. Ein erster Ansatzpunkt ist das Ausprobieren einer für Dich passenden xhost-Konfiguration. Ein möglicher Befehl
könnte `xhost +local` sein:

## Meine Tests schlagen nur manchmal fehl

In CI sehe ich, dass ein Test auf nicht-deterministische Weise fehlschlägt: Manchmal geht er durch, manchmal schlägt er fehl.

#### Lösung

Um dieses Verhalten reproduzierbar zu machen, setze ihn bitte in eine Schleife und führe ihn ca. 20-30 Mal aus.
Ich empfehle, das in CI auszuführen, aber es ist auch möglich, das lokal zu tun.

```javascript
// Verwende im Build Lodash, um den Test 100 Mal zu wiederholen
Cypress._.times(100, (k) => {
   it(`typing hello ${k + 1} / 100`, () => {
       // Schreibe hier Deine Testschritte rein
   })
})
```

Wenn Du feststellst, dass es tatsächlich einige Ausfälle gibt, könntest Du damit beginnen, den Zeitplan zu überprüfen. Wenn Du lokal arbeitest, kannst Du mit dem
folgenden Befehl verwenden, um die Ausführung des Cypress-Tests anzuhalten und fortzusetzen:

```javascript
cy.pause(); // Dadurch wird der Test unterbrochen, bis Du ihn manuell fortsetzt
```

When working in CI, use a temporary wait to check the timing:

```javascript
cy.wait(500); // Zeit in ms, d.h. es wird eine halbe Sekunde lang gewartet
```

<hint type="error" title="Vorsicht!">
Verwende feste Wartezeiten nur vorübergehend, um zu debuggen. Ersetz diese Wartezeit durch eine dynamische Behauptung, wenn die
Flakiness durch Timing-Probleme verursacht wird. Weitere Informationen findest Du in unseren Best Practices und den Cypress Best Practices.
Natürlich solltest Du auch die Schleife entfernen, sobald Du mit dem Debuggen fertig bist.
</hint>

Wenn Du mehr über dieses Thema erfahren willst, gibt es einen [Artikel von mir](/blog/smashing-flaky-tests).

### Das Element, mit dem ich interagieren möchte, ist nicht mehr verfügbar

Manchmal wird ein Element neu gerendert oder verwendet eine Animation, die dazu führt, dass es für einen kurzen Moment verschwindet oder nicht
nicht mehr zur Interaktion bereit ist. Der folgende Fehler ist der bekannteste:

```bash
cy.click failed because the element has been detached from the DOM
```

Eigentlich gibt es viele mögliche Lösungen oder Workarounds, das wäre eine wunderbare Idee für einen eigenen Artikel, denke ich.
In der Zwischenzeit hat Cypress selbst eine [Blog-Serie](https://cypress.io/blog/tag/flake/) über viele dieser Probleme geschrieben.
