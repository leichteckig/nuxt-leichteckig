---
title: "Dangerous Reactivity: Why AI Output Is the New XSS"
description: Treating LLM output as trusted is the new v-html mistake — OWASP LLM05 and how to safely render AI-generated content.
createdAt: 2026-06-03T09:00:00.000Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- NDC Copenhagen 2026
- WeAreDevelopers World Congress 2026
- React Advanced London 2026
- SymfonyCon Warsaw 2026
otherLanguages:
- locale: en
  name: english
  path: /dangerous-reactivity
---

## Kurzfassung

Vue-Entwickler:innen kennen eine goldene Regel: Niemals `v-html` auf Nutzereingaben anwenden. Diese oder eine ähnliche Regel ist auch in anderen Frameworks bekannt. Doch wenn wir Large Language Models (LLMs) in unsere Anwendungen integrieren, machen wir oft einen fatalen Fehler: Wir behandeln die Ausgabe der KI als vertrauenswürdige Quelle. Das ist doch in Ordnung, oder? Nun ja, nicht automatisch.

Werfen wir einen Blick auf OWASP LLM05 und darauf, wie „Improper Output Handling“ die Sicherheit unserer Komponenten beeinflusst. Anhand von Beispielen sehen wir, wie sichere Eingaben Modelle austricksen und Schwachstellen wie XSS und Injection-Angriffe verursachen können. Am Ende weißt Du, wie Du gegenüber KI „professionell pessimistisch“ bleibst: Du lernst, LLM-Daten zu bereinigen, Markdown sicher zu rendern und KI-generierte Inhalte im Griff zu behalten. Komm in meine Session und lass uns Technologie mit der nötigen Vorsicht angehen – ich freue mich darauf!

## Folien

::media-grid
---
media:
  - name: "Folien"
    description: "Die Folien des Vortrags findest Du auf Speakerdeck"
    url: "https://speakerdeck.com/leichteckig/dangerous-reactivity-why-ai-output-is-the-new-xss-vue"
---
::

## Aufzeichnungen

::media-grid
---
media:
  - name: "NDC Copenhagen 2026"
    url: "https://www.youtube-nocookie.com/embed/1uhV9yR-WZg"
---
::
