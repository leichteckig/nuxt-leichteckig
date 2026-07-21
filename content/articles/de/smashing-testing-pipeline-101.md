---
title: Testing-Pipeline 101 für Frontend-Testing
description: Automatisierte Tests geben Dir viel Sicherheit beim Mergen Deiner Änderungen, besonders bei umfangreichen Refactorings oder in der Arbeit mit Deinem Team. Du weißt nicht, wo Du anfangen sollst? Lass uns Deine Testing-Pipeline gemeinsam von Grund auf bauen.
img: https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/96b8ad22-5da2-4bee-8696-2aa210727e4a/testing-pipeline-101-frontend-testing.jpg
alt: Testing pipeline for frontend testing
createdAt: 2022-02-21T13:30:00.000Z
canonical: https://www.smashingmagazine.com/2022/02/testing-pipeline-101-frontend-testing/
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Smashing magazine
- Testing
- CI/CD
- End-To-End Tests
otherLanguages:
- locale: en
  name: english
  path: /blog/smashing-testing-pipeline-101
---
Automatisierte Tests geben Dir viel Sicherheit beim Mergen Deiner Änderungen, besonders bei umfangreichen Refactorings oder in der Arbeit mit Deinem Team. Vielleicht hast Du deshalb schon darüber nachgedacht, Tests fest in Deine Build-Routine einzubauen, um den größtmöglichen Nutzen daraus zu ziehen. Du weißt nicht, wo Du anfangen sollst? Lass uns Deine Testing-Pipeline gemeinsam von Grund auf bauen.

Stell Dir folgende Situation vor: Eine Deadline rückt schnell näher, und Du nutzt jede freie Minute, um Dein Ziel zu erreichen, dieses komplexe Refactoring mit jeder Menge Änderungen in Deinen CSS-Dateien fertigzustellen. Sogar auf der Busfahrt arbeitest Du noch an den letzten Schritten. Doch Deine lokalen Tests scheinen jedes Mal fehlzuschlagen, und Du bekommst sie einfach nicht zum Laufen. Dein Stresslevel _steigt_.

Es gibt tatsächlich eine ähnliche Szene in einer bekannten Serie: aus der dritten Staffel der Netflix-Serie „[How to Sell Drugs Online (Fast)](https://www.netflix.com/title/80218448)":

> 🤯 Cypress + Vue kommt *IN EINER NETFLIX-SERIE* vor. Es ist eine Comedy mit dem Titel „How to sell drugs (fast)" und sie enthält einige der realistischsten Darstellungen von Webentwicklung. Staffel 3, Folge 1 bei 20:20 und ein- oder zweimal davor.
>
> jess (@_jessicasachs) [7. August 2021](https://twitter.com/_jessicasachs/status/1424146882515832837)

Na ja, immerhin nutzt er überhaupt Tests, magst Du denken. Warum ist er dann trotzdem so gestresst, fragst Du Dich vielleicht? Es gibt eben noch viel Raum für Verbesserung und Möglichkeiten, genau so eine Situation zu vermeiden, selbst wenn Du Tests schreibst. Wie wäre es, wenn Du Deine Codebasis und all Deine Änderungen von Anfang an überwachst? So erlebst Du keine solchen bösen Überraschungen mehr, oder? Es ist gar nicht so schwer, solche automatisierten Test-Routinen einzubauen: Lass uns diese Testing-Pipeline gemeinsam von Anfang bis Ende erstellen.

Los geht's! 🙌

## Zuerst das Wichtigste: Grundbegriffe

Eine Build-Routine kann Dir helfen, auch bei komplexeren Refactorings sicher zu bleiben, selbst in Deinen kleinen Nebenprojekten. Das bedeutet aber nicht, dass Du DevOps-Engineer sein musst. Es ist wichtig, ein paar Begriffe und Strategien zu lernen, und genau dafür bist Du ja hier, oder? Zum Glück bist Du an der richtigen Stelle! Beginnen wir mit den grundlegenden Begriffen, die Dir bald begegnen werden, wenn Du Dich mit einer Testing-Pipeline für Dein Frontend-Projekt beschäftigst.

Wenn Du Dich allgemein durch die Welt des Testens googelst, bist Du vielleicht schon ganz früh über den Begriff „CI/CD" gestolpert. Das ist die Kurzform für „Continuous Integration, Continuous Delivery" und „Continuous Deployment" und beschreibt genau das: Wie Du wahrscheinlich schon gehört hast, ist es eine Methode zur Softwareverteilung, die von Entwicklungsteams genutzt wird, um Code-Änderungen häufiger und zuverlässiger auszuliefern. CI/CD umfasst zwei sich ergänzende Ansätze, die stark auf Automatisierung setzen.

- **Continuous Integration**
  Ein Begriff für Automatisierungsmaßnahmen, um kleine, regelmäßige Code-Änderungen umzusetzen und sie in ein gemeinsames Repository zu mergen. Continuous Integration umfasst die Schritte des Bauens und Testens Deines Codes.

CD ist das Akronym für „Continuous Delivery" und „Continuous Deployment", zwei Konzepte, die einander ähneln, aber manchmal in unterschiedlichen Kontexten verwendet werden. Der Unterschied liegt im Umfang der Automatisierung:

- **Continuous Delivery**
  Bezieht sich auf den Prozess für Deinen bereits zuvor getesteten Code, den das Operations-Team nun in einer Live-Produktionsumgebung deployen kann. Dieser letzte Schritt kann allerdings manuell sein.
- **Continuous Deployment**
  Konzentriert sich, wie der Name schon sagt, auf den „Deployment"-Aspekt. Es ist ein Begriff für den vollständig automatisierten Release-Prozess, der Änderungen der Entwickler direkt aus dem Repository in die Produktion bringt, wo die Kundschaft sie unmittelbar nutzen kann.

Diese Prozesse zielen darauf ab, Entwicklerinnen, Entwicklern und Teams ein Produkt zu ermöglichen, das sie jederzeit releasen könnten, wenn sie wollten: mit der Sicherheit einer kontinuierlich überwachten, getesteten und deployten Anwendung.

Um eine gut durchdachte CI/CD-Strategie zu erreichen, nutzen die meisten Menschen und Organisationen Prozesse, die „Pipelines" genannt werden. „Pipeline" ist ein Wort, das wir in diesem Leitfaden schon verwendet haben, ohne es zu erklären. Wenn Du an solche Pipelines denkst, liegt der Vergleich mit Rohrleitungen nicht fern, die als Fernleitungen dienen, um etwa Gas zu transportieren. Eine Pipeline im DevOps-Bereich funktioniert ganz ähnlich: Sie „transportiert" Software zum Deployen.

![Eine Illustration der Pipeline als Rohr mit drei Abschnitten: build, test, deploy](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/32fcd311-ea75-4ad9-b6b4-91c3e510e18e/1-basic-meaning-pipeline.png)

*Eine „echte" CI/CD-Pipeline umfasst mehrere Schritte, die ausgeführt werden müssen, um eine neue Softwareversion zu deployen, und automatisiert dadurch den Auslieferungsprozess.*

Moment, das klingt nach einer Menge Dinge zum Lernen und Merken, oder? Wollten wir nicht über Testing sprechen? Da hast Du recht: Das gesamte Konzept einer CI/CD-Pipeline abzudecken, würde genug Stoff für mehrere Artikel liefern, und wir wollen uns um eine Testing-Pipeline für kleine Frontend-Projekte kümmern. Vielleicht fehlt Dir auch nur der Testing-Aspekt Deiner Pipelines, sodass Du Dich allein auf Continuous-Integration-Prozesse konzentrierst. Insbesondere werden wir uns also auf den „Testing"-Teil von Pipelines konzentrieren. Deshalb erstellen wir in diesem Leitfaden eine „kleine" Testing-Pipeline.

Gut, der „Testing-Teil" ist also unser Hauptfokus. Welche Tests kennst Du in diesem Zusammenhang bereits und fallen Dir auf Anhieb ein? Wenn ich so über das Testen nachdenke, sind das die Testarten, die mir spontan einfallen:

- **Unit-Testing** ist eine Art von Test, bei der kleinere testbare Teile oder Einheiten einer Anwendung, „Units", einzeln und unabhängig auf korrekte Funktion geprüft werden.
- **Integrationstests** konzentrieren sich auf das Zusammenspiel zwischen Komponenten oder Systemen. Diese Art des Testens bedeutet, dass wir das Zusammenspiel der Units prüfen und wie sie zusammenarbeiten.
- **End-to-End-Testing**, oder E2E-Testing, bedeutet, dass echte Nutzerinteraktionen vom Computer simuliert werden; dabei sollte E2E-Testing so viele Funktionsbereiche und Teile des in der Anwendung genutzten Technologie-Stacks wie möglich einschließen.
- **Visuelles Testing** ist der Prozess, die sichtbare Ausgabe einer Anwendung zu prüfen und mit den erwarteten Ergebnissen zu vergleichen. Anders gesagt hilft es dabei, „visuelle Bugs" im Erscheinungsbild einer Seite oder eines Screens zu finden, die sich von rein funktionalen Bugs unterscheiden.
- **Statische Analyse** ist nicht ganz genau Testing, aber ich halte es für wichtig, sie hier zu erwähnen. Du kannst sie Dir wie eine Rechtschreibkorrektur vorstellen: Sie debuggt Deinen Code, ohne das Programm auszuführen, und erkennt Probleme im Code-Stil. Diese einfache Maßnahme kann viele Bugs verhindern.

Um sicher zu sein, ein umfangreiches Refactoring in unserem besonderen Projekt zu mergen, sollten wir in Erwägung ziehen, all diese Testarten in unserer Testing-Pipeline zu nutzen. Aber ein Kaltstart führt schnell zu Frust: Beim Bewerten dieser Testarten fühlt man sich leicht verloren. Wo soll ich anfangen? Wie viele Tests welcher Art sind sinnvoll?

## Strategie: Pyramiden und Trophäen

Bevor wir uns ins Bauen unserer Pipeline stürzen, müssen wir an einer Teststrategie arbeiten. Bei der Suche nach Antworten auf all diese Fragen findest Du eine mögliche Lösung vielleicht in einigen Metaphern: Im Web und speziell in Testing-Communitys nutzen Menschen gern Analogien, um Dir eine Vorstellung davon zu geben, wie viele Tests welcher Art Du verwenden solltest.

Die erste Metapher, auf die Du wahrscheinlich stößt, ist die Testautomatisierungs-Pyramide. Mike Cohn hat dieses Konzept in seinem Buch „Succeeding with Agile" entwickelt, weiter ausgearbeitet als „[Practical Test Pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)" von Martin Fowler. Sie sieht so aus:

![Eine Test-Pyramide](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/bb0c1463-5d1f-4293-a8a4-2bbdcc8dd109/2-testing-pyramid.png)

*Die „Practical Test Pyramid" von Martin Fowler.*

Wie Du siehst, besteht sie aus drei Ebenen, die den drei vorgestellten Test-Ebenen entsprechen. Die Pyramide soll die richtige Mischung verschiedener Tests verdeutlichen und Dich beim Entwickeln einer Teststrategie leiten:

1. **Unit**
   Diese Tests findest Du auf der untersten Ebene der Pyramide, weil sie schnell in der Ausführung und einfach zu warten sind. Das liegt an ihrer Isolation und daran, dass sie die kleinsten Einheiten ins Visier nehmen. Sieh Dir dieses Beispiel für einen typischen [Unit-Test](https://github.com/leichteckig/phpmagazin-jest-example/blob/main/product.test.js) an, der ein sehr kleines Produkt testet.
2. **Integration**
   Diese liegen in der Mitte der Pyramide, denn sie sind bei der Ausführungsgeschwindigkeit noch akzeptabel, bringen Dir aber die Sicherheit, näher an der Nutzerin oder am Nutzer zu sein, als es Unit-Tests können. Ein Beispiel für einen Test vom Integrationstyp ist ein [API-Test](https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/tests/api/api-users.spec.ts), auch [Komponententests](https://github.com/leichteckig/nuxt-leichteckig/blob/main/test/components/MediaGrid.spec.js) lassen sich diesem Typ zuordnen.
3. **E2E-Tests** (auch **UI-Tests** genannt)
   Wie wir gesehen haben, simulieren diese Tests eine echte Nutzerin oder einen echten Nutzer und deren Interaktion. Diese Tests brauchen mehr Zeit zur Ausführung und sind dadurch teurer, und stehen deshalb an der Spitze der Pyramide. Wenn Du Dir ein typisches Beispiel für einen E2E-Test ansehen willst, schau [hier vorbei](https://github.com/cypress-io/cypress-realworld-app/blob/develop/cypress/tests/ui/new-transaction.spec.ts).

In den letzten Jahren fühlte sich diese Metapher jedoch nicht mehr zeitgemäß an. Ein Mangel ist für mich besonders entscheidend: Statische Analysen werden in dieser Strategie umgangen. Der Einsatz von Code-Style-Fixern oder anderen Linting-Lösungen wird in dieser Metapher nicht berücksichtigt, aus meiner Sicht ein großer Mangel. Lint und andere Werkzeuge zur statischen Analyse sind ein fester Bestandteil der genutzten Pipeline und sollten nicht ignoriert werden.

Also machen wir es kurz: Wir sollten eine aktuellere Strategie verwenden. Fehlende Linting-Werkzeuge sind aber nicht der einzige Mangel, es gibt einen noch wichtigeren Punkt zu bedenken. Stattdessen sollten wir unseren Fokus leicht verschieben: Das folgende Zitat bringt es ziemlich gut auf den Punkt:

> „Write tests. Not too many. Mostly integration."
>
> Guillermo Rauch

Schlüsseln wir dieses Zitat einmal auf:

- **Write tests** (Schreibe Tests)
  Ziemlich selbsterklärend, Du solltest immer Tests schreiben. Tests sind entscheidend, um Vertrauen in Deine Anwendung zu schaffen, für Nutzende und Entwickelnde gleichermaßen. Sogar für Dich selbst!
- **Not too many** (Nicht zu viele)
  Tests wahllos zu schreiben, bringt Dich nicht weiter; die Test-Pyramide hat mit ihrer Aussage, Tests zu priorisieren, weiterhin recht.
- **Mostly integration** (Vor allem Integration)
  Ein Trumpf der „teureren" Tests, den die Pyramide ignoriert: Die Sicherheit in die Tests steigt, je weiter Du die Pyramide hinaufgehst. Dieser Zuwachs bedeutet, dass sowohl die Nutzenden als auch Du als entwickelnde Person diesen Tests am ehesten vertrauen.

Das heißt, wir sollten uns bewusst für Tests entscheiden, die näher an den Nutzenden sind. Dadurch zahlst Du vielleicht mehr, bekommst aber viel Wert zurück. Du fragst Dich vielleicht, warum nicht den E2E-Test wählen? Da sie Nutzende nachahmen, sind sie doch von vornherein am nächsten an ihnen dran, oder? Das stimmt, aber sie sind dennoch deutlich langsamer in der Ausführung und benötigen den kompletten Anwendungs-Stack. Dieser Return on Investment stellt sich also später ein als bei Integrationstests: Folglich bieten Integrationstests eine faire Balance zwischen Vertrauen auf der einen und Geschwindigkeit sowie Aufwand auf der anderen Seite.

Wenn Du Kent C. Dodds folgst, kommen Dir diese Argumente vielleicht bekannt vor, besonders wenn Du [diesen Artikel](https://kentcdodds.com/blog/write-tests) von ihm gelesen hast. Diese Argumente sind kein Zufall: Er hat in seiner Arbeit eine neue Strategie entwickelt. Ich stimme seinen Punkten voll zu und verlinke den wichtigsten [hier](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests) sowie weitere im Ressourcen-Abschnitt. Sein vorgeschlagener Ansatz stammt aus der Test-Pyramide, hebt sie aber auf eine andere Ebene, indem er ihre Form ändert, um die höhere Priorität von Integrationstests widerzuspiegeln. Er heißt „Testing Trophy" (Test-Trophäe).

![Eine Test-Trophäe](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/0f1e8fea-cf27-4892-8427-ab443d5ecf02/3-testing-trophy.png)

*Ich habe eine kurze Sketchnote gemacht, die vielleicht nicht maßstabsgetreu ist, aber ihren Punkt rüberbringt. 😉*

Die Testing Trophy ist eine Metapher, die die Granularität von Tests auf leicht andere Weise darstellt; Du solltest Deine Tests auf die folgenden Testarten verteilen:

- **Statische Analyse** spielt in dieser Metapher eine zentrale Rolle. So fängst Du Tippfehler, Typfehler und andere Bugs ab, indem Du einfach die genannten Debugging-Schritte ausführst.
- **Unit-Tests** sollten sicherstellen, dass Deine kleinste Einheit angemessen getestet ist, aber die Testing Trophy betont sie nicht im selben Maße wie die Test-Pyramide.
- **Integration** ist der Hauptfokus, weil sie Kosten und höhere Sicherheit am besten ausbalanciert.
- **UI-Tests**, einschließlich E2E- und visueller Tests, stehen an der Spitze der Testing Trophy, ähnlich wie in der Test-Pyramide.

In den meisten meiner Projekte habe ich mich für diese Testing-Trophy-Strategie entschieden, und das werde ich auch in diesem Leitfaden tun. Ich muss hier aber einen kleinen Hinweis geben: Meine Wahl basiert natürlich auf den Projekten, an denen ich im Alltag arbeite. Die Vorteile und die Auswahl einer passenden Teststrategie hängen also immer von dem Projekt ab, an dem Du arbeitest. Fühl Dich also nicht schlecht, wenn sie nicht zu Deinen Anforderungen passt, im entsprechenden Abschnitt ergänze ich Ressourcen zu anderen Strategien.

Kleiner Spoiler-Alarm: In gewisser Weise werde auch ich von diesem Konzept ein wenig abweichen müssen, wie Du gleich sehen wirst. Ich finde das aber in Ordnung, dazu kommen wir aber gleich. Mein Punkt ist: Denk über die Priorisierung und Verteilung der Testarten nach, bevor Du Deine Pipelines planst und umsetzt.

## Wie man diese Pipelines online (schnell) baut

Der Protagonist der dritten Staffel der Netflix-Serie „[How To Sell Drugs Online (Fast)](https://www.netflix.com/title/80218448)" nutzt kurz vor einer Deadline Cypress für E2E-Testing, allerdings war es wirklich nur lokales Testen. Von CI/CD war nichts zu sehen, was ihm unnötigen Stress bereitete. Den Druck, unter dem der Protagonist in den entsprechenden Folgen steht, sollten wir mit der gelernten Theorie vermeiden. Doch wie können wir diese Erkenntnisse in die Realität umsetzen?

Zunächst brauchen wir eine Codebasis als Testgrundlage. Idealerweise sollte es ein Projekt sein, dem viele von uns Frontend-Entwickelnden begegnen. Sein Anwendungsfall sollte häufig vorkommen, sich gut für einen praktischen Ansatz eignen und es uns ermöglichen, eine Testing-Pipeline von Grund auf umzusetzen. Was könnte so ein Projekt sein?

### Mein Vorschlag für eine Basis-Pipeline

Das Erste, was mir in den Sinn kam, lag auf der Hand: Meine Website, also [meine Portfolio-Seite](https://www.ramona.codes/), eignet sich gut als Beispiel-Codebasis, die von unserer angehenden Pipeline getestet wird. Sie ist Open Source auf GitHub veröffentlicht, sodass Du sie ansehen und frei nutzen kannst. Ein paar Worte zum Tech-Stack der Seite: Im Grunde habe ich diese Seite auf Vue.js aufgebaut (leider noch auf Version 2, als ich diesen Artikel schrieb) als JavaScript-Framework, mit Nuxt.js als zusätzlichem Web-Framework. Das komplette Umsetzungsbeispiel findest Du in ihrem [GitHub-Repository](https://github.com/leichteckig/nuxt-leichteckig).

Mit unserer ausgewählten Beispiel-Codebasis sollten wir damit beginnen, unsere Erkenntnisse anzuwenden. Da wir die Testing Trophy als Ausgangspunkt für unsere Teststrategie nutzen wollen, habe ich mir das folgende Konzept überlegt:

![Ein Vorschlag der Autorin für eine Basis-Pipeline](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/c9d12329-3be7-436d-9531-804a49d8ed33/4-suggestion-pipeline.png)

*Fällt Dir auf, dass eine der Klammern in meiner Pipeline-Darstellung eine transparente Farbe hat? Ich habe die Farben bewusst gewählt; genau daher stammt mein kleiner Hinweis von vorhin.*

Da wir es mit einer relativ kleinen Codebasis zu tun haben, führe ich die Teile Unit- und Integrationstests zusammen. Das ist aber nur ein kleiner Grund dafür. Andere und wichtigere Gründe sind diese:

- Die Definition einer Unit ist oft „diskussionswürdig": Wenn Du eine Gruppe von Entwickelnden bittest, eine Unit zu definieren, bekommst Du meist verschiedene, voneinander abweichende Antworten. Während manche eine Funktion, Klasse oder einen Service meinen, kleinere Einheiten, zählt eine andere Person die komplette Komponente dazu.
- Zusätzlich zu diesen Definitionsschwierigkeiten kann es kniffelig sein, eine Grenze zwischen Unit und Integration zu ziehen, weil sie sehr verschwommen ist. Dieses Ringen ist real, besonders im Frontend, da wir oft das DOM brauchen, um die Testgrundlage erfolgreich zu validieren.
- Meist ist es möglich, dieselben Werkzeuge und Bibliotheken für beide Testarten zu verwenden. So können wir vielleicht Ressourcen sparen, indem wir sie zusammenführen.

## Werkzeug der Wahl: GitHub Actions

Da wir nun wissen, was wir in einer Pipeline abbilden wollen, folgt als Nächstes die Wahl der CI/CD-Plattform (Continuous Integration und Delivery). Bei der Wahl einer solchen Plattform für unser Projekt denke ich an jene, mit denen ich bereits Erfahrung gesammelt habe:

- [GitLab](https://docs.gitlab.com/ee/ci/pipelines/), durch die tägliche Routine an meinem Arbeitsplatz,
- [GitHub Actions](https://docs.github.com/en/actions) in den meisten meiner Nebenprojekte.

Es gibt jedoch viele weitere Plattformen zur Auswahl. Ich würde vorschlagen, **Deine** Wahl immer auf **Deinen** Projekten und deren spezifischen Anforderungen zu gründen und dabei die genutzten Technologien und Frameworks zu berücksichtigen, damit keine Kompatibilitätsprobleme auftreten. Denk daran: Wir verwenden ein Vue-2-Projekt, das bereits auf GitHub veröffentlicht war und zufällig zu meiner bisherigen Erfahrung passt. Außerdem brauchen die genannten GitHub Actions nur das GitHub-Repository Deines Projekts als Ausgangspunkt, um speziell dafür einen GitHub-Actions-Workflow zu erstellen und auszuführen. Folglich entscheide ich mich in diesem Leitfaden für GitHub Actions.

Diese GitHub Actions bieten Dir also eine Plattform, um bestimmte definierte Workflows auszuführen, wenn bestimmte Ereignisse eintreten. Diese Ereignisse sind bestimmte Aktivitäten in unserem Repository, die den Workflow auslösen, z. B. das Pushen von Änderungen auf einen Branch. In diesem Leitfaden sind diese Ereignisse an CI/CD gebunden, aber solche Workflows können auch andere Abläufe automatisieren, etwa das Hinzufügen von Labels zu Pull Requests. GitHub kann sie auf virtuellen Maschinen mit Windows, Linux und macOS ausführen.

Um einen solchen Workflow zu veranschaulichen, würde er so aussehen:

![Eine Illustration des Workflows einer GitHub Action](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/54f1f0d1-94f1-486e-b6b4-5afe4338a1da/5-github-action-abstract.png)

*Der Workflow einer GitHub Action ist ein konfigurierbarer, automatisierter Prozess (deshalb ist der komplette Prozess in Grün dargestellt).*

In diesem Artikel nutze ich einen Workflow, um eine Pipeline abzubilden; das heißt, ein Workflow enthält alle unsere Testing-Schritte, von der statischen Analyse bis zu UI-Tests aller Art. Diese Pipeline, in den folgenden Absätzen „Workflow" genannt, besteht aus einem oder mehreren Jobs, die eine Reihe von Schritten sind, die auf demselben Runner ausgeführt werden.

Dieser Workflow ist genau die Struktur, die ich in der Zeichnung oben skizzieren wollte. Darin werfen wir einen genaueren Blick auf einen solchen Runner mit mehreren Jobs; die Schritte eines Jobs bestehen selbst aus verschiedenen Schritten. Diese Schritte können von zwei Typen sein:

1. Ein Schritt kann ein einfaches Skript ausführen.
2. Ein Schritt kann eine Action ausführen. Eine solche Action ist eine wiederverwendbare Erweiterung und oft eine komplette, individuelle Anwendung.

Behältst Du das im Hinterkopf, sieht ein tatsächlicher Workflow einer GitHub Action so aus:

![Ein Workflow einer GitHub Action mit einigen Erläuterungen der Autorin](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/a661ff08-50f4-48bb-b9d8-e3e713f621f8/6-closeup-github-action.png)

*Ein erster Blick auf die Syntax, alles in einem.*

### Unsere allererste GitHub Action schreiben

Endlich können wir unsere erste eigene GitHub Action schreiben und etwas Code verfassen! Wir beginnen mit unserem grundlegenden Workflow und unserem ersten Entwurf der Jobs, die wir abbilden wollen. Erinnere Dich an unsere Testing Trophy: Jeder Job wird eine Ebene der Testing Trophy widerspiegeln. Die Schritte sind die Dinge, die wir tun müssen, um diese Ebenen zu automatisieren.

Deshalb erstelle ich zuerst das Verzeichnis `.github/workflows/`, um unsere Workflows zu speichern. Wir legen in diesem Verzeichnis eine neue Datei namens `tests.yml` an, die unseren Testing-Workflow enthält. Neben der Standard-Workflow-Syntax aus der Zeichnung oben gehe ich wie folgt vor:

1. Ich nenne unseren Workflow `Tests CI`.
2. Weil ich meinen Workflow bei jedem Push auf meine Remote-Branches ausführen und zusätzlich eine manuelle Startoption bieten möchte, konfiguriere ich ihn so, dass er bei `push` und `workflow_dispatch` läuft.
3. Und schließlich enthält mein Workflow, wie im Absatz „Mein Vorschlag für eine Basis-Pipeline" beschrieben, drei Jobs:
   - `static-eslint` für die statische Analyse;
   - `unit-integration-jest` für Unit- und Integrationstests, in einem Job zusammengeführt;
   - `ui-cypress` als UI-Stufe, inklusive grundlegendem E2E-Test und visuellem Regressionstest.
4. Eine Linux-basierte virtuelle Maschine soll alle Jobs ausführen, also entscheide ich mich für `ubuntu-latest`.

In der korrekten Syntax einer `YAML`-Datei könnte der erste Entwurf unseres Workflows so aussehen:

```yaml
name: Tests CI
on: [push, workflow_dispatch] # Bei Push und manuell
jobs:
  static-eslint:
    runs-on: ubuntu-latest
    steps:
      # 1 Schritt
  unit-integration-jest:
    runs-on: ubuntu-latest
    steps:
      # 1 Schritt
  ui-cypress:
    runs-on: ubuntu-latest
    steps:
      # 2 Schritte: e2e und visuell
```

Wenn Du tiefer in die Details von Workflows in GitHub Actions eintauchen möchtest, schau jederzeit gern in [die Dokumentation](https://docs.github.com/en/actions/learn-github-actions/understanding-github-actions). So oder so ist Dir sicher bewusst, dass die Schritte noch fehlen. Keine Sorge, mir ist das auch bewusst. Um diesen Workflow-Entwurf mit Leben zu füllen, müssen wir diese Schritte definieren und entscheiden, welche Testing-Werkzeuge und -Frameworks wir für unser kleines Portfolio-Projekt verwenden. Alle folgenden Absätze beschreiben die jeweiligen Jobs und enthalten mehrere Schritte, um die Automatisierung der genannten Tests zu ermöglichen.

### Statische Analyse

Wie die Testing Trophy nahelegt, beginnen wir in unserem Workflow mit Lintern und anderen Code-Style-Fixern. In diesem Zusammenhang kannst Du aus vielen Werkzeugen wählen, einige Beispiele sind:

- [Eslint](https://eslint.org/) als Code-Style-Fixer für JavaScript.
- [Stylelint](https://stylelint.io/) für das Korrigieren von CSS-Code.
- Wir können sogar noch weiter gehen, z. B. um die Code-Komplexität zu analysieren, könntest Du Dir Werkzeuge wie [Scrutinizer](https://scrutinizer-ci.com/) ansehen.

Diesen Werkzeugen ist gemeinsam, dass sie auf Fehler in Mustern und Konventionen hinweisen. Sei Dir aber bitte bewusst, dass manche dieser Regeln Geschmackssache sind. Es liegt an Dir zu entscheiden, wie streng Du sie durchsetzen willst. Zum Beispiel, ob Du eine Einrückung von zwei oder vier Tabs tolerierst. Viel wichtiger ist es, einen konsistenten Code-Stil einzufordern und kritischere Fehlerquellen abzufangen, etwa die Verwendung von „==" statt „===".

Für unser Portfolio-Projekt und diesen Leitfaden möchte ich mit der Installation von Eslint beginnen, da wir viel JavaScript verwenden. Ich installiere es mit folgendem Befehl:

```bash
npm install eslint --save-dev
```

Natürlich kann ich auch einen alternativen Befehl mit dem Paketmanager Yarn nutzen, falls ich lieber nicht NPM verwende. Nach der Installation muss ich eine Konfigurationsdatei namens `.eslintrc.json` erstellen. Nutzen wir vorerst eine grundlegende Konfiguration, da dieser Artikel Dir nicht beibringt, wie man Eslint überhaupt konfiguriert:

```json
{
  "extends": [
    "eslint:recommended"
  ]
}
```

Wenn Du die Eslint-Konfiguration im Detail lernen willst, schau in diesen [Leitfaden](https://eslint.org/docs/user-guide/getting-started). Als Nächstes machen wir unsere ersten Schritte, um die Ausführung von Eslint zu automatisieren. Dafür möchte ich den Befehl zum Ausführen von Eslint als NPM-Skript festlegen. Das erreiche ich mit diesem Eintrag in der `script`-Sektion unserer `package.json`:

```json
"scripts": {
  "lint": "eslint --ext .js ."
}
```

Dieses neu erstellte Skript kann ich dann in unserem GitHub-Workflow ausführen. Zuvor müssen wir jedoch sicherstellen, dass unser Projekt verfügbar ist. Deshalb nutzen wir die vorkonfigurierte GitHub Action `actions/checkout@v2`, die genau das tut: unser Projekt auschecken, damit der Workflow Deiner GitHub Action darauf zugreifen kann. Der nächste Schritt wäre, alle NPM-Abhängigkeiten zu installieren, die wir für mein Portfolio-Projekt brauchen. Danach sind wir endlich bereit, unser Eslint-Skript auszuführen! Unser fertiger Job zum Linten sieht nun so aus:

```yaml
static-eslint:
  runs-on: ubuntu-latest
  steps:
    # Action, um meine Codebasis auszuchecken
    - uses: actions/checkout@v2
    # NPM-Abhängigkeiten installieren
    - run: npm install
    # Lint-Skript ausführen
    - run: npm run lint
```

Du fragst Dich jetzt vielleicht: Schlägt diese Pipeline bei einem fehlschlagenden `npm run lint` automatisch „fehl"? Ja, das funktioniert von Haus aus. Sobald wir unseren Workflow fertig geschrieben haben, sehen wir uns die Screenshots auf GitHub an.

### Unit und Integration

Als Nächstes möchte ich unseren Job erstellen, der die Unit- und Integrationsschritte enthält. Was das in diesem Artikel genutzte Framework angeht, möchte ich Dir das [Jest-Framework](https://jestjs.io/) für Frontend-Testing vorstellen. Natürlich musst Du Jest nicht verwenden, wenn Du nicht möchtest, es gibt viele Alternativen zur Auswahl:

- [Cypress](https://docs.cypress.io/guides/component-testing/introduction) bietet ebenfalls Komponententests, die sich gut für Integrationstests eignen.
- [Jasmine](https://jasmine.github.io/) ist ein weiteres Framework, das einen Blick wert ist.
- Und es gibt noch viele mehr; ich wollte nur einige nennen.

Jest wird von Facebook als Open Source bereitgestellt. Das Framework legt seinen Schwerpunkt auf Einfachheit und ist zugleich mit vielen JavaScript-Frameworks und -Projekten kompatibel, darunter Vue.js, React oder Angular. Ich kann Jest auch zusammen mit TypeScript verwenden. Das macht das Framework sehr interessant, besonders für mein kleines Portfolio-Projekt, da es kompatibel und gut geeignet ist.

Wir können Jest direkt aus dem Wurzelverzeichnis meines Portfolio-Projekts installieren, indem wir folgenden Befehl eingeben:

```bash
npm install --save-dev jest
```

Nach der Installation kann ich bereits mit dem Schreiben von Tests beginnen. Dieser Artikel konzentriert sich jedoch darauf, diese Tests mithilfe von GitHub Actions zu automatisieren. Wie Du einen Unit- oder Integrationstest schreibst, erfährst Du daher im folgenden [Leitfaden](https://www.smashingmagazine.com/2020/06/practical-guide-testing-react-applications-jest/). Beim Einrichten des Jobs in unserem Workflow können wir ähnlich vorgehen wie beim `static-eslint`-Job. Der erste Schritt ist also erneut das Erstellen eines kleinen NPM-Skripts, das wir später in unserem Job nutzen:

```json
"scripts": {
  "test": "jest"
}
```

Anschließend definieren wir den Job namens `unit-integration-jest` ähnlich wie zuvor bei unseren Lintern. Der Workflow checkt also unser Projekt aus. Zusätzlich verwenden wir zwei kleine Unterschiede zu unserem ersten `static-eslint`-Job:

1. Wir nutzen eine Action als Schritt, um Node zu installieren.
2. Danach verwenden wir unser neu erstelltes npm-Skript, um unseren Jest-Test auszuführen.

So sieht unser `unit-integration-jest`-Job aus:

```yaml
unit-integration-jest:
  runs-on: ubuntu-latest
  steps:
    - uses: actions/checkout@v2
    # Node einrichten
    - name: Run jest
      uses: actions/setup-node@v1
      with:
        node-version: '12'
    - run: npm install
    # Jest-Skript ausführen
    - run: npm test
```

### UI-Tests: E2E und visuelles Testing

Zu guter Letzt schreiben wir unseren `ui-cypress`-Job, der sowohl E2E- als auch visuelles Testing enthält. Es ist clever, diese beiden in einem Job zu kombinieren, da ich für beide das [Cypress](https://cypress.io/)-Framework verwende. Natürlich kannst Du andere Frameworks in Betracht ziehen, etwa die folgenden: [NightwatchJS](https://nightwatchjs.org/) und [CodeceptJS](https://codecept.io/).

Auch hier decken wir nur die Grundlagen ab, um es in unserem GitHub-Workflow einzurichten. Wenn Du im Detail lernen willst, wie man Cypress-Tests schreibt, habe ich Dich mit [einem anderen meiner Leitfäden](https://www.smashingmagazine.com/2021/09/cypress-end-to-end-testing/) abgedeckt, der genau das behandelt. Dieser Artikel führt Dich durch alles, was wir zum Definieren unserer E2E-Testing-Schritte brauchen. Gut, zuerst installieren wir Cypress, genauso wie wir es mit den anderen Frameworks gemacht haben, mit folgendem Befehl im Wurzelverzeichnis:

```bash
npm install --save-dev cypress
```

Diesmal müssen wir kein NPM-Skript definieren. Cypress stellt uns bereits seine [eigene GitHub Action](https://docs.cypress.io/guides/continuous-integration/github-actions) zur Verfügung, `cypress-io/github-action@v2`. Darin müssen wir nur ein paar Dinge konfigurieren, damit es läuft:

- Wir müssen sicherstellen, dass unsere Anwendung vollständig eingerichtet ist und funktioniert, da ein E2E-Test den kompletten Anwendungs-Stack benötigt.
- Wir müssen den Browser angeben, in dem wir unseren E2E-Test ausführen.
- Wir müssen warten, bis der Webserver vollständig funktioniert, damit sich der Computer wie eine echte Nutzerin oder ein echter Nutzer verhalten kann.

Praktischerweise hilft uns unsere Cypress-Action, all diese Konfigurationen im `with`-Bereich zu hinterlegen. So sieht unser aktueller GitHub-Job aus:

```yaml
steps:
  - name: Checkout
    uses: actions/checkout@v2
  # NPM-Abhängigkeiten installieren, korrekt cachen
  # und alle Cypress-Tests ausführen
  - name: Cypress Run
    uses: cypress-io/github-action@v2
    with:
      browser: chrome
      headless: true
      # Setup: Nuxt-spezifische Dinge
      build: npm run generate
      start: npm run start
      wait-on: 'http://localhost:3000'
```

#### Visuelle Tests: Verleih Deinem Test ein paar Augen

Erinnere Dich an unsere ursprüngliche Absicht für diesen Leitfaden: Ich habe mein umfangreiches Refactoring mit jeder Menge Änderungen in SCSS-Dateien, und möchte Tests als Teil der Build-Routine ergänzen, um sicherzustellen, dass dabei nichts anderes kaputtgegangen ist. Mit statischer Analyse, Unit-, Integrations- und E2E-Tests sollten wir ziemlich sicher sein, oder? Stimmt, aber es gibt noch etwas, das ich tun kann, um meine Pipeline noch kugelsicherer und perfekter zu machen. Man könnte sagen, das ist das i-Tüpfelchen. Besonders bei CSS-Refactorings kann ein E2E-Test nur begrenzt helfen, da er nur das tut, was Du ihm beim Schreiben vorgegeben hast.

Zum Glück gibt es eine weitere Möglichkeit, Bugs jenseits der geschriebenen Befehle, und damit jenseits des Konzepts, abzufangen. Sie heißt visuelles Testing: Du kannst Dir diese Art des Testens wie ein Suchbild („Finde die Unterschiede") vorstellen. Technisch gesehen ist visuelles Testing ein Screenshot-Vergleich, der Screenshots Deiner Anwendung aufnimmt und sie mit dem Status quo vergleicht, z. B. vom Main-Branch Deines Projekts. So bleibt kein versehentliches Styling-Problem unbemerkt, zumindest in Bereichen, in denen Du visuelles Testing einsetzt. Das kann visuelles Testing bei großen CSS-Refactorings zum Lebensretter machen, zumindest meiner Erfahrung nach.

Es gibt viele visuelle Testing-Werkzeuge zur Auswahl, die einen Blick wert sind:

- [Percy.io](https://percy.io/), ein Werkzeug von [Browserstack](https://www.browserstack.com/), das ich für diesen Leitfaden verwende;
- [Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker), falls Du lieber keine SaaS-Lösung nutzt und gleichzeitig vollständig auf Open Source setzt;
- [Applitools](https://applitools.com/) mit KI-Unterstützung. Zu diesem Werkzeug gibt es auf Smashing Magazine einen spannenden [Leitfaden](https://www.smashingmagazine.com/2021/07/maintaining-end-to-end-quality-visual-testing/);
- [Chromatic](https://www.chromatic.com/) von Storybook.

Für diesen Leitfaden und grundsätzlich für mein Portfolio-Projekt war es entscheidend, meine bestehenden Cypress-Tests für visuelles Testing wiederzuverwenden. Wie zuvor erwähnt, nutze ich für dieses Beispiel Percy wegen seiner einfachen Integration. Obwohl es eine SaaS-Lösung ist, sind dennoch viele Teile Open Source, und es gibt einen kostenlosen Tarif, der für viele Open-Source- oder andere Nebenprojekte ausreichen sollte. Falls Du Dich jedoch wohler damit fühlst, vollständig selbst zu hosten und dabei ein Open-Source-Werkzeug zu nutzen, kannst Du dem [Visual Regression Tracker](https://github.com/Visual-Regression-Tracker/Visual-Regression-Tracker) eine Chance geben.

Dieser Leitfaden gibt Dir nur einen kurzen Überblick über Percy, das sonst Stoff für einen ganz neuen Artikel liefern würde. Ich gebe Dir aber die Informationen für den Einstieg. Wenn Du jetzt in die Details eintauchen willst, empfehle ich Dir einen Blick in [Percys Dokumentation](https://docs.percy.io/). Wie können wir unseren Tests also sozusagen Augen verleihen? Nehmen wir an, wir haben bis jetzt schon ein oder zwei Cypress-Tests geschrieben. Stell sie Dir so vor:

```javascript
it('should load home page (visual)', () => {
  cy.get('[data-cy=Polaroid]').should('be.visible');
  cy.get('[data-cy=FeaturedPosts]').should('be.visible');
});
```

Klar, wenn wir Percy als unsere visuelle Testing-Lösung installieren wollen, können wir das mit einem [Cypress-Plugin](https://docs.percy.io/docs/cypress) tun. Wie schon ein paar Mal heute installieren wir es also im Wurzelverzeichnis per NPM:

```bash
npm install --save-dev @percy/cli @percy/cypress
```

Danach musst Du nur noch das Paket `percy/cypress` in Deine Index-Datei `cypress/support/index.js` importieren:

```javascript
import '@percy/cypress';
```

Dieser Import ermöglicht es Dir, Percys Snapshot-Befehl zu nutzen, der einen Snapshot Deiner Anwendung aufnimmt. In diesem Zusammenhang bedeutet ein Snapshot eine Sammlung von Screenshots, die aus verschiedenen Viewports oder Browsern aufgenommen werden, die Du konfigurieren kannst.

```javascript
it('should load home page (visual)', () => {
  cy.get('[data-cy=Polaroid]').should('be.visible');
  cy.get('[data-cy=FeaturedPosts]').should('be.visible');

  // Einen Snapshot aufnehmen
  cy.percySnapshot('Home page');
});
```

Zurück zu unserer Workflow-Datei möchte ich das Percy-Testing als zweiten Schritt des Jobs definieren. Darin führen wir das Skript `npx percy exec -- cypress run` aus, um unseren Test zusammen mit Percy laufen zu lassen. Um unsere Tests und Ergebnisse mit unserem Percy-Projekt zu verbinden, müssen wir unser Percy-Token übergeben, verborgen durch ein [GitHub-Secret](https://docs.github.com/en/actions/security-guides/encrypted-secrets).

```yaml
steps:
  # Zuvor: Checkout-, NPM- und E2E-Schritte
  - name: Percy Test
    run: npx percy exec -- cypress run
    env:
      PERCY_TOKEN: ${{ secrets.PERCY_TOKEN }}
```

Warum brauche ich ein Percy-Token? Weil Percy eine SaaS-Lösung zum Verwalten unserer Screenshots ist. Es bewahrt die Screenshots und den Status quo zum Vergleich auf und stellt uns einen Screenshot-Freigabe-Workflow bereit. Dort kannst Du jede anstehende Änderung freigeben oder ablehnen:

![Percys Freigabe-Workflow](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/bb6ab7db-8a66-4450-be1a-df7686a20a41/7-percy-approval-workflow.png)

### Unser Werk betrachten: GitHub-Integration

Herzlichen Glückwunsch! Wir haben erfolgreich unseren allerersten GitHub-Action-Workflow gebaut. 🎉 Werfen wir einen letzten Blick auf [unsere komplette Workflow-Datei](https://github.com/leichteckig/nuxt-leichteckig/blob/aba97ff8aade49964236769040cf2c402acd14de/.github/workflows/tests.yml) im Repository meiner Portfolio-Seite. Willst Du nicht wissen, wie das im praktischen Einsatz aussieht? Deine laufenden GitHub Actions findest Du im Tab „Actions" Deines Repositorys:

![GitHub-Actions-Tab](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/87def09d-902c-4b3a-9b36-946588f813ae/8-github-action-tab.png)

Dort findest Du alle Workflows, die Deinen Workflow-Dateien entsprechen. Wenn Du Dir einen Workflow ansiehst, z. B. meinen „Tests CI"-Workflow, kannst Du alle seine Jobs inspizieren:

![Ansicht des Tests-CI-Workflows](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/d4c6d800-b512-49c8-ae7a-00a23194043a/9-workflow-view.png)

Wenn Du Dir einen Deiner Jobs ansehen möchtest, kannst Du ihn auch in der Seitenleiste auswählen. Dort kannst Du das Log Deiner Jobs inspizieren:

![Fehlschlagender Job mit Fehlern](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/459555ee-767f-4936-9c31-d1d06dd7878a/10-failing-job.png)

Du siehst: Du kannst Fehler erkennen, falls sie innerhalb Deiner Pipeline auftreten. Übrigens ist der „Actions"-Tab nicht der einzige Ort, an dem Du die Ergebnisse Deiner GitHub Actions prüfen kannst. Du kannst sie auch in Deinen Pull Requests inspizieren:

![GitHub Actions in Pull Requests](https://archive.smashing.media/assets/344dbf88-fdf9-42bb-adb4-46f01eedd629/78d034e0-cfb6-451d-8d54-0eb42f41f163/11-github-action-pr.png)

Ich konfiguriere diese GitHub Actions gern so, dass sie erfolgreich ausgeführt werden müssen: Sonst ist es nicht möglich, einen Pull Request in mein Repository zu mergen.

## Fazit

CI/CD hilft uns, sogar große Refactorings durchzuführen, und minimiert das Risiko böser Überraschungen drastisch. Der Testing-Teil von CI/CD sorgt dafür, dass unsere Codebasis kontinuierlich getestet und überwacht wird. Folglich bemerken wir Fehler sehr früh, idealerweise bevor sie jemand in Deinen Main-Branch merged. Außerdem geraten wir nicht in die missliche Lage, unsere lokalen Tests auf dem Weg zur Arbeit korrigieren zu müssen, oder, noch schlimmer, tatsächliche Fehler in unserer Anwendung. Ich finde, das ist eine großartige Aussicht, oder?

Um diese Test-Build-Routine einzubauen, musst Du kein vollwertiger DevOps-Engineer sein: Mithilfe einiger Testing-Frameworks und GitHub Actions kannst Du sie auch für Deine Nebenprojekte umsetzen. Ich hoffe, ich konnte Dir einen kurzen Anstoß geben und Dich auf den richtigen Weg bringen.

Ich freue mich darauf, da draußen mehr Testing-Pipelines und GitHub-Action-Workflows zu sehen! ❤️

## Ressourcen

- [Ein hervorragender Leitfaden zu CI/CD](https://resources.github.com/ci-cd/) von GitHub
- „[The practical test pyramid](https://martinfowler.com/articles/practical-test-pyramid.html)", Ham Vocke
- Lesenswerte Artikel zur Testing Trophy, von Kent C. Dodds:
  - „[Write tests. Not too many. Mostly integration](https://kentcdodds.com/blog/write-tests)"
  - „[The Testing Trophy and Testing Classifications](https://kentcdodds.com/blog/the-testing-trophy-and-testing-classifications)"
  - „[Static vs Unit vs Integration vs E2E Testing for Frontend Apps](https://kentcdodds.com/blog/static-vs-unit-vs-integration-vs-e2e-tests)"
- Ich habe mich auf einige Beispiele der Cypress [Real World App](https://github.com/cypress-io/cypress-realworld-app) bezogen
- Dokumentation der genutzten Werkzeuge und Frameworks:
  - [GitHub Actions](https://docs.github.com/en/actions)
  - [Eslint-Doku](https://eslint.org/)
  - [Jest-Dokumentation](https://jestjs.io/)
  - [Cypress-Dokumentation](https://docs.cypress.io/)
  - [Percy-Dokumentation](https://docs.percy.io/docs)

---

Dieser Artikel wurde ursprünglich auf [Smashing Magazine](https://www.smashingmagazine.com/2022/02/testing-pipeline-101-frontend-testing/) veröffentlicht.
