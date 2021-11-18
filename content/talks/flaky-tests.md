---
title: Flaky tests - Fighting nightmares
description: A liar will not be believed even if he tells the truth.
createdAt: 2020-09-25T22:50:54.724Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- CityJS London
- FemTechConf
- eCommerceCamp Jena
- PHPUGMRN
---

## Abstract

> "A liar will not be believed even if he tells the truth" - Aesop

A test can also be such a liar: Unreliable tests are living nightmares for anyone who writes automated tests or even pays attention to their results. Sometimes they pass, sometimes they don't, and therefore do not give a valid statement about the state of the software. In the worst case, they can impair the credibility of the entire test suite. It doesn't matter whether you write unit, integration or end-to-end tests, you can counter them in any way you like.
 
I've spent hours and hours on such tests, and I want to share my path through them and the lessons learned from them: So that together we can avoid or even get rid of these nightmares.

## Slides

<media-grid :media="[{
name: 'Slides',
description: 'You can find the slides of the talk on speakerdeck',
url: 'https://speakerdeck.com/leichteckig/flaky-tests-fighting-nightmares-60a9a604-cbce-4ad1-8a10-664fed9d1a8b'
}]"></media-grid>

## Recordings

<media-grid :media="[{
  name: 'CityJS',
  url: 'https://www.youtube-nocookie.com/embed/5VMvCZaGW_c'
  }, {
  name: 'eCommerce Camp Jena',
  url: 'https://www.youtube-nocookie.com/embed/tf4tQKDcww0'
}]"></media-grid>
