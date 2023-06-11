---
title: Flaky tests - Alpträume bekämpfen
description: Einem Lügner wird nicht geglaubt, selbst wenn er die Wahrheit sagt. Das ist eine perfekt passende Allegorie aufs Testing.
createdAt: 2020-09-25T22:50:54.724Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- CityJS London 2020
- FemTechConf 2020
- eCommerceCamp Jena 2020
- PHPUGMRN 2020
- c't webdev 2021
- PottJS 2023
otherLanguages:
- locale: en
  name: english
  path: /flaky-tests
---

## Kurzfassung

> "Wer einmal lügt, dem glaubt man nicht - und wenn er auch die Wahrheit spricht" - Aesop

Auch ein Test kann ein solcher Lügner sein: Unzuverlässige Tests sind der lebende Alptraum für jeden, der automatisierte Tests schreibt oder auch nur auf ihre Ergebnisse achtet. Manchmal laufen sie erfolgreich durch, manchmal nicht, und daher geben sie keine gültige Aussage über den Zustand der Software. Im schlimmsten Fall können sie die Glaubwürdigkeit der gesamten Testsuite beeinträchtigen. Es spielt keine Rolle, ob Sie Unit-, Integrations- oder End-to-End-Tests schreiben, Du kannst ihnen auf jede beliebige Weise begegnen.

Ich habe viele Stunden mit solchen Tests verbracht, und ich möchte meinen Weg durch diese Tests und die daraus gezogenen Lehren teilen: Damit wir gemeinsam diese Albträume vermeiden oder sogar loswerden können.

## Folien

<media-grid :media="[{
name: 'Folien',
description: 'Du kannst meine Folien auf Speakerdeck finden',
url: 'https://speakerdeck.com/leichteckig/flaky-tests-fighting-nightmares-60a9a604-cbce-4ad1-8a10-664fed9d1a8b'
},{
name: 'Folien',
description: 'Aktuelle Version (2023)',
url: 'https://speakerdeck.com/leichteckig/flaky-tests-fighting-nightmares-92d8d440-c606-4e48-a052-b9ad27f21587'
}]"></media-grid>

## Aufzeichnungen

<media-grid :media="[{
  name: '🇺🇸 CityJS',
  url: 'https://www.youtube-nocookie.com/embed/5VMvCZaGW_c'
  }, {
  name: '🇺🇸 eCommerce Camp Jena',
  url: 'https://www.youtube-nocookie.com/embed/tf4tQKDcww0'
}]"></media-grid>
