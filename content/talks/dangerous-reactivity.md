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
- locale: de
  name: german
  path: /de/dangerous-reactivity
---

## Abstract

Vue developers know one golden rule: never use v-html on user input. This or something similar is well-known in other frameworks, too. Yet, as we're integrating Large Language Models (LLMs) into our applications, we often make a fatal mistake. We're treating AI output as a trusted source. This is fine, right? Well, not automatically.

Let's look at OWASP LLM05 and how "Improper Output Handling" impacts the security of our components. Therefore, let's discuss examples where safe inputs can trick models, causing vulnerabilities like XSS and injection attacks. By the end, you'll learn how to be "professionally pessimistic" for AI. You'll learn how to sanitize LLM data, safely render Markdown, and manage AI-generated content. Join my session to approach technology with caution, I look forward to exploring this with you!

## Slides

::media-grid
---
media:
  - name: "Slides"
    description: "You can find the slides of the talk on speakerdeck"
    url: "https://speakerdeck.com/leichteckig/dangerous-reactivity-why-ai-output-is-the-new-xss-vue"
---
::

## Recording

::media-grid
---
media:
  - name: "NDC Copenhagen 2026"
    url: "https://www.youtube-nocookie.com/embed/1uhV9yR-WZg"
---
::
