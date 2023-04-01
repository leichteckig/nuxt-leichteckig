---
title: End-to-End Testing wie es sein sollte
description: Wenn es um UI-Tests geht, neigen einige Entwickler dazu, sehr zurückhaltend zu sein. Sind diese Tests langsam, fehlerhaft, schwer zu schreiben und zu unterhalten?
createdAt: 2020-03-13T22:50:54.724Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Symfony UK Meetup'20
- PHPUGMS'20
- eCommerce Camp Jena'20
- Reacticon'21
- c't webdev'21
- NeosCon'22
- Web Summer Camp'22
otherLanguages:
- locale: en
  name: english
  path: /e2e-introduction
---

## Disclaimer

Dieser Vortrag enthält Live-Coding und ist speziell auf die jeweilige Konferenz zugeschnitten. Das bedeutet, dass ich normalerweise deren eigene Website teste.

## Kurzfassung

Wenn es um UI-Tests geht, neigen einige Entwickler dazu, sehr zurückhaltend zu sein. Sind diese Tests langsam, unzuverlässig, schwer zu schreiben und zu warten?

Cypress.io (oder kurz Cypress) erhält derzeit viel Aufmerksamkeit, wenn es um End-to-End-Tests geht. Vor allem in JavaScript-Umgebungen scheint sich Cypress.io langsam durchzusetzen. Aber auch in Symfony-Anwendungen spielt es seine Stärken aus: Es macht vieles richtig und ist meiner Meinung nach Selenium-basierten Ansätzen vorzuziehen.

In meiner Session möchte ich Euch Cypress vorstellen und seine Möglichkeiten ausloten, indem ich erste Tests für die SymfonyCon-Website schreibe - damit wir diese Bedenken gemeinsam ausräumen können.

## Folien

<media-grid :media="[{
name: 'Folien',
description: 'Du kannst meine Folien auf Speakerdeck finden',
url: 'https://speakerdeck.com/leichteckig/end-to-end-testing-wie-es-sein-sollte'
}]"></media-grid>

## Aufzeichnungen

<media-grid :media="[{
name: 'Neos Conference\'22',
url: 'https://www.youtube-nocookie.com/embed/hzJPLKVarMw'
}, {
name: 'Symfony User Group Osnabrück',
url: 'https://www.youtube-nocookie.com/embed/-vekdbWRWvI'
}, {
name: '🇺🇸 Reacticon\'21',
url: 'https://www.youtube-nocookie.com/embed/f1LOWUkaQPU?start=15021'
}]"></media-grid>
