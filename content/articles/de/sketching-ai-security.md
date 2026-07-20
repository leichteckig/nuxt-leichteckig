---
title: "AI-Security skizziert: Identitäts- und Sicherheitsherausforderungen in der KI-Entwicklung"
description: KI bringt neue Identitäts- und Sicherheitsherausforderungen mit sich, von Prompt Injection bis Data Poisoning. In diesen Sketchnotes zeichnet Ramona Schwering die KI-Identitätslandschaft, die neue Angriffsfläche und eine praktische Strategie für sichere, vertrauenswürdige KI-Anwendungen.
img: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bnfiqcxwvzh4fytbchiv.jpg
alt: Sketching AI security
createdAt: 2025-07-01T00:00:00.000Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- AI
- Security
otherLanguages:
- locale: en
  name: english
  path: /blog/auth0-sketching-ai-security
---
Reden wir über KI. Ich weiß, sie taucht überall auf, oder? KI ist ein mächtiges Werkzeug, vom schnelleren Schreiben von Code bis zum Bau komplexer Systeme, die kritische Geschäftsprozesse steuern. Wie jedes andere Werkzeug bringt sie eine ganze Reihe von Herausforderungen mit. Insbesondere dürfen wir die **Sicherheit nicht vergessen, wenn wir mit KI entwickeln**, vor allem, wenn wir mit digitalen Identitäten arbeiten. Unsere Identität und die Identitäten unserer Nutzerinnen und Nutzer sind unser wertvollster Datensatz, und sie müssen geschützt werden. Es geht dabei nicht nur darum, Deine Nutzenden zu schützen, sondern auch die KI selbst und die sensiblen Daten, die sie berührt, abzusichern.

Du fragst Dich vielleicht: „Welche neuen Identitätsherausforderungen kann KI mit sich bringen?" Oder vielleicht: „Sind die alten Sicherheitspraktiken noch gut genug?" Die kurze Antwort lautet: Nein, nicht ganz. Die KI-Landschaft fügt neue Ebenen an Komplexität hinzu, und wir müssen sie verstehen, um wirklich robuste und vertrauenswürdige Systeme zu bauen. Wenn wir von KI-Entwicklung sprechen, meinen wir zwei Hauptszenarien: Entweder integrierst Du KI-Funktionen in bestehende, eher traditionelle Anwendungen (denk an einen Chatbot auf einer E-Commerce-Seite, der sie „KI-gestützt" macht), oder Du baust völlig neue Systeme rund um KI-Agenten, die mehr Autonomie besitzen und mit vielen anderen Diensten interagieren. Beide Szenarien stellen eigene Anforderungen.

Grund genug für mich, mich weiterzubilden und vorbereitet zu sein. Früher habe ich neue Konzepte gelernt, indem ich Sketchnotes gezeichnet habe, und mit diesem Artikel möchte ich sie mit Dir teilen und Dich einladen, ebenfalls etwas über Sicherheit in der KI zu lernen. Skizzieren wir [AI-Security](https://a0.to/ai-content)! 🎨

## Neue Gesichter, neue IDs: die KI-Identitätslandschaft skizzieren

Als ersten Schritt möchte ich unser Umfeld zeichnen. Wenn Du eine traditionelle Anwendung entwickelst, verwaltest Du in erster Linie menschliche Identitäten: Die Nutzenden Deiner Anwendungen melden sich an und erhalten Zugang basierend darauf, wer sie sind. Einfach genug, oder? Mit KI wird es allerdings etwas interessanter. Wir haben jetzt drei Haupttypen von Identitäten zu berücksichtigen:

![Sketchnote mit einer menschlichen Figur, einem Roboterkopf und einem KI-Agenten-Kopf, die die drei Identitätstypen darstellen](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/a7p9cuqp2whpq1qwjfcp.jpg)

- **Menschliche Identitäten**: Das sind weiterhin Deine Nutzenden, Entwickelnde, die mit KI-Werkzeugen arbeiten, Administratorinnen und Administratoren, die KI-Modelle verwalten, oder Endnutzende, die KI-gestützte Funktionen verwenden. Die Grundlagen starker Authentifizierung und Autorisierung gelten hier weiterhin, aber die Angriffsfläche kann wachsen, wenn KI-Werkzeuge zu Toren zu sensiblen Daten werden.
- **Nicht-menschliche Identitäten**: Auf den ersten Blick selbsterklärend, alle Identitäten, die nicht menschlich sind, aber dennoch abgesichert werden müssen. Ich würde sie dennoch in „Maschinenidentitäten" und „KI-Agenten-Identitäten" unterscheiden, denn KIs sind eher „Freigeister" als normale Dienste und APIs. Das heißt, sie ähneln eher einem Roboter mit Gehirn, der Entscheidungen treffen kann. Zoomen wir also hinein:
  - **Maschinenidentitäten**: Deine Backend-Dienste, CI/CD-Pipelines und Recheninstanzen, die KI-Modelle betreiben, brauchen Identitäten, um sicher mit anderen Diensten zu interagieren. Denk an Deine Infrastruktur zum Modelltraining oder Deine Inferenz-Endpunkte; sie müssen sich gegenüber Datenquellen und anderen APIs authentifizieren.
  - **KI-Agenten-Identitäten**: Das ist der wirklich neue Neuzugang! Wenn Du mit großen Sprachmodellen (LLMs) arbeitest oder Multi-Agenten-Systeme baust, müssen diese KI-Entitäten oft im Auftrag von Nutzenden oder anderen Systemen handeln. Sie greifen vielleicht auf Datenbanken zu, versenden E-Mails oder stoßen andere KI-Agenten an. Wie gibst Du einem KI-Agenten eine Identität? Wie kontrollierst Du, was er tun darf? Das ist ein entscheidender Bereich.

Es ist, als würdest Du Deinem Team weitere Spielende hinzufügen; jede und jeder braucht ein eindeutiges Namensschild und spezifische Berechtigungen. Wenn Du das versäumst, hast Du ein Sicherheits-Chaos ohne Regeln in der Hand.

## KIs knifflige Gegner: ein skizzierter Blick auf neue Sicherheitsrisiken

Als Nächstes, da wir wissen, was zu schützen ist, sehen wir uns an, womit wir es zu tun haben. Du kennst bereits SQL Injection, XSS und all die „klassischen" Web-Schwachstellen. Aber KI bringt ihre eigenen unangenehmen Überraschungen mit auf die Party.

Die erste Quelle, in die ich gern schaue, ist OWASP. OWASP (kurz für Open Web Application Security Project) ist ein ehrenamtliches Projekt, das uns hilft, die Web-Sicherheit zu verbessern. Am bekanntesten ist es für seine Rangliste der Sicherheitsrisiken, und dazu gibt es inzwischen auch Ranglisten für den KI-Bereich:

- [OWASP Machine Learning Security Top 10](https://owasp.org/www-project-machine-learning-security-top-10/) listet die zehn größten Sicherheitsprobleme von Machine-Learning-Systemen auf.
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) benennt die zehn größten Sicherheitsprobleme für generative KI-Systeme und -Anwendungen.

Eine weitere Organisation mit Fokus auf KI-Sicherheitsfragen ist [MITRE](https://www.mitre.org/), die [ATLAS](https://atlas.mitre.org/) (Adversarial Threat Landscape for Artificial-Intelligence Systems) veröffentlicht hat. ATLAS ist eine lebende Wissensdatenbank zu Taktiken und Techniken von Angreifenden gegen KI-gestützte Systeme, basierend auf realen Angriffsbeobachtungen. Das [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework) bietet umfassende Anleitung, um KI-Risiken über den gesamten Lebenszyklus hinweg zu managen. Diese Ressourcen zeichnen ein erstes Bild der größten Feinde, denen wir gleich gegenüberstehen.

Zoomen wir hinein und betrachten einige Deiner kritischsten neuen Sicherheitsherausforderungen. Das ist wie ein erweiterter Spielplatz, auf dem neue Regeln gelten. So stelle ich sie mir vor, und zeichne sie so:

![Sketchnote mit vier Feldern: Prompt Injection, Data Poisoning, Insecure Plugin Design / Excessive Agency und Model Theft](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/wiilsiblocrvdhlrnro6.jpg)

### Prompt Injection: Wenn sich Deine KI gegen Dich wendet

Das ist derzeit die meistdiskutierte KI-Sicherheitslücke. Prompt Injection passiert, wenn eine böswillige Person eine Eingabe (einen „Prompt") so gestaltet, dass sie ein LLM dazu bringt, seine ursprünglichen Anweisungen zu ignorieren oder unbeabsichtigte Aktionen auszuführen.

![Ein Angreifer trickst den KI-Agenten aus](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cr0jpojixh8m9923wnha.jpg)

Stell Dir einen KI-Kundenservice-Bot vor, der Rückerstattungen erteilen soll. Ich nenne das gern „das LLM social-engineeren" statt wie üblich einen Menschen. Ein cleverer Prompt könnte ihn dazu bringen, stattdessen Geld an die angreifende Person zu überweisen. Oder denk an ein KI-gestütztes Coding-Werkzeug. Ein böswilliger Prompt könnte Schwachstellen in Deinen Code einschleusen. Es ist wie ein Puppenspieler, der die Fäden Deiner KI zieht.

Die Herausforderung dabei: Die Eingabe ist nun Code für das KI-Modell. Die Grenze zwischen Daten und Anweisung wird sehr verschwommen. So geschieht in KI-Anwendungen auch oft Credential Access; Angreifende nutzen Prompt Injection, um die KI dazu zu bringen, ihr zugängliche Zugangsdaten preiszugeben, oder sogar Aktionen auszuführen, die diese offenlegen. Darüber hinaus kann Sensitive Information Disclosure auftreten, wenn eine KI in ihren Antworten versehentlich (oder absichtlich, per Prompt Injection) private Nutzerdaten oder vertrauliche Geschäftsinformationen preisgibt. Wie entschärfst Du das? Eingabevalidierung ist ein Anfang, aber sie reicht nicht aus. Du kannst Techniken wie [Instruction Tuning](https://www.ibm.com/think/topics/instruction-tuning), [Guardrails](https://www.confident-ai.com/blog/llm-guardrails-the-ultimate-guide-to-safeguard-llm-systems#what-are-llm-guardrails-) und mehrstufige Prompts in Betracht ziehen, um Eingaben zu bereinigen.

### Insecure Plugin Design und Excessive Agency: Deiner KI zu viel Macht geben

Das ist ein großes Thema, besonders bei Multi-Agenten-Systemen und Anwendungen, die externe Werkzeuge oder Plugins nutzen. Was genau meine ich mit „Plugin"? Du kannst die Fähigkeiten eines LLM durch Plugins erweitern. Plugins sind Softwarekomponenten, die vom LLM aufgerufen werden, um bestimmte Aufgaben zu erledigen, etwa einen externen Dienst aufzurufen oder auf eine Ressource zuzugreifen. Im Grunde ruft das LLM basierend auf der Interaktion mit den Nutzenden das Plugin auf, um eine Verarbeitung durchzuführen oder Daten abzurufen. Wir verwenden also die Terminologie von OWASP und MITRE, um ein Plugin als generischen Ansatz zur Erweiterung der Funktionalität eines LLM zu definieren. Plugins lassen sich über spezifische LLM-Methoden umsetzen, etwa [function_calls](https://platform.openai.com/docs/guides/function-calling?api-mode=responses) oder [tool_calls](https://platform.openai.com/docs/assistants/tools).

![Ein Bedienfeld, das den KI-Agenten verwirrt](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3zqljaw41g7xb22jgmzo.jpg)

Insecure Plugin Design führt zu Schwachstellen, wenn diese Plugins nicht korrekt abgesichert sind. Ohne die richtigen Vorkehrungen könnte eine angreifende Person ein Plugin ausnutzen, um unautorisierte Operationen durchzuführen oder auf Daten zuzugreifen, zu denen sie nicht berechtigt ist.

Das kann direkt zu **Privilege Escalation** führen, bei der Angreifende durch Ausnutzen einer Schwachstelle höhere Berechtigungen in Deiner KI-gestützten Anwendung erlangen, oft über diese unsicheren Plugins oder durch Ausnutzen der Excessive Agency der KI, was bedeutet, dass die KI mehr Berechtigungen hat, als sie tatsächlich braucht. Stell Dir einen KI-Agenten mit direktem Schreibzugriff auf Deine Produktionsdatenbank vor, obwohl er nur Lesezugriff auf eine bestimmte Tabelle bräuchte!

Du musst beim Entwerfen und Absichern dieser Interaktionen sehr vorsichtig sein. Es geht um die Logik der KI und die Sicherheit rund um ihre Werkzeuge. Diese Schwachstellen sind in Frameworks wie den [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/) klar beschrieben, eine hervorragende Ressource, um tiefer in KI-Sicherheit einzutauchen.

### Data Poisoning: die Quelle vergiften

KI-Modelle lernen aus Daten. Was passiert, wenn diese Daten böswillig manipuliert werden? Das ist Data Poisoning.

![Ein Barkeeper serviert dem KI-Agenten Gift](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/cehrt7jsw20a1q4nc8ro.jpg)

Eine angreifende Person könnte fehlerhafte Daten in Deine Trainingssätze einschleusen, sodass Dein KI-Modell falsche, verzerrte oder böswillige Verhaltensweisen lernt. Das Vergiften eines Betrugserkennungsmodells könnte beispielsweise dazu führen, dass es bestimmte Betrugsarten übersieht oder legitime Transaktionen als betrügerisch markiert.

Das ist ein Lieferketten-Angriff auf Dein KI-Modell. Um das zu verhindern, brauchst Du robuste Data Governance, starke Zugriffskontrollen über Deine Datenpipelines und eine rigorose Datenvalidierung. Vertraue, aber überprüfe, immer! 🕵️‍♀️

### Model Theft und Evasion-Angriffe

Dein trainiertes KI-Modell ist wertvolles geistiges Eigentum. Angreifende könnten versuchen, es zu stehlen oder seine Logik zurückzuentwickeln, das ist Model Theft.

![Ein Angreifer stiehlt einen KI-Agenten](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/johsi6tis6i325a80gfx.jpg)

Als ehrenvolle Erwähnung, auch wenn nicht in der Skizze enthalten, sind Evasion-Angriffe in diesem Szenario ebenfalls interessant: Dabei werden Eingaben so gestaltet, dass ein bereitgestelltes KI-Modell unbemerkt falsche Vorhersagen trifft. Eine angreifende Person könnte etwa ein Bild leicht verändern, sodass ein Gesichtserkennungssystem sie nicht identifiziert.

In beiden Fällen umfasst der Schutz Deiner Modelle sichere Deployment-Praktiken, API-Rate-Limiting und möglicherweise Techniken wie Differential Privacy während des Trainings, um die Interna des Modells zu verschleiern.

## Kugelsichere KI bauen: Zeichnen wir unsere Strategie

Was kannst Du also gegen all diese neuen Bedrohungen und Identitätskomplexitäten tun? Es geht nicht darum, Deine bestehenden Sicherheitspraktiken über Bord zu werfen, sondern sie für das KI-Zeitalter zu erweitern und anzupassen. Das bedeutet ein Umdenken: Identität und Autorisierung ins Zentrum Deiner KI-Architektur zu stellen und nicht als nachträglichen Gedanken. Schlüsseln wir einen praktischen Ansatz auf, mit dem Du diese Herausforderungen angehen kannst, und zeichnen wir unsere Skizzen, um ein erstes Bild einer sicheren Anwendung zu bekommen.

### Wer ist wer?: skizziertes Identitätsmanagement für alle KI-Beteiligten

Zieh zuerst eine einheitliche Identitätslösung in Betracht, die Menschen, Maschinen und KI-Agenten handhaben kann.

![Sketchnote des IAM-Flows mit einem Menschen, einem Roboter (Maschinenidentität) und einem KI-Agenten](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/idisx92isjypeio2bmf0.jpg)

Das bedeutet oft, einen Identity-and-Access-Management-Anbieter (IAM) zu nutzen, der verschiedene Authentifizierungsmethoden (SSO, OAuth 2.0, mTLS) und fein granulierte Autorisierung unterstützt. Der Vollständigkeit halber: So handhaben wir standardmäßig Nicht-KI-Identitäten:

- Für menschliche Nutzende: Setze starke Authentifizierung (MFA!) und Role-Based Access Control (RBAC) um, damit Nutzende nur auf die KI-Werkzeuge und Daten zugreifen, die sie brauchen.
- Für Maschine-zu-Maschine-Kommunikation: Nutze Client Credentials, Service Accounts oder Workload Identities nach dem Prinzip der geringsten Rechte. Maschinen sollten nur Zugriff auf die spezifischen Ressourcen haben, die für ihre Aufgaben nötig sind.

Und hier wird es für KI-Agenten interessant. Behandle KI-Agenten wie jeden anderen Dienst und weise ihnen eindeutige Maschinenidentitäten zu.

- **Vermeide es, Deiner KI-gestützten Anwendung standardmäßig volle Macht zu geben.** Statt einem KI-Agenten direkten Datenbankzugriff zu geben, lass ihn über eine sichere API laufen, die seine Berechtigungen durchsetzt. Hier gebührt MCP ein kleiner, aber ehrenvoller Verweis, den ich in einem anderen Artikel behandeln würde, oder in [diesem Blogbeitrag](https://auth0.com/blog/mcp-and-auth0-an-agentic-match-made-in-heaven/), falls Du schon jetzt interessiert bist. 🔥
  - **Lass die Anwendung im Auftrag der Nutzenden arbeiten.** Beim Zugriff auf sensible Daten oder beim Ausführen von Aktionen muss die Anwendung im Auftrag der nutzenden Person handeln, deren Berechtigungen erben oder, besser noch, eine Delegation dieser Berechtigungen erhalten, wie es beispielsweise bei OAuth geschieht. Implementiere eine Autorisierungsschicht speziell für Deine Agenten.

Du kannst es Dir so vorstellen: Der KI-Agent fragt nach etwas, und Dein System prüft, ob dieser Agent diese Aktion für genau diese nutzende Person ausführen darf. Um das ein wenig zu erweitern: Es bleibt wichtig, [den Menschen im Loop zu behalten](https://auth0.com/blog/secure-human-in-the-loop-interactions-for-ai-agents/), zumindest bei risikoreichen Operationen oder hochsensiblen Daten. Das ist allerdings ein Thema für einen eigenen Blogbeitrag, deshalb gehe ich jetzt nicht ins Detail.

### Der befestigte Fluss: sichere Daten- & Modell-Pipelines skizzieren

Deine Daten sind die Lebensader Deiner KI. Sie durchgängig abzusichern, ist nicht verhandelbar: Es taucht auf Rang 2 der [OWASP LLM Top 10](https://owasp.org/www-project-top-10-for-large-language-model-applications/) auf und indirekt auch auf Rang 1, der aus Prompt Injection resultiert. Skizzieren wir also die Strategie, um Deine Datenpipeline abzusichern:

- **Sichere Datenaufnahme und -speicherung**: Stelle sicher, dass alle Daten für Training und Inferenz im Ruhezustand und bei der Übertragung verschlüsselt sind. Setze strikte Zugriffskontrollen auf Deine Data Lakes und Datenbanken. Achte darauf, nur die Daten zu verwenden, die Du wirklich brauchst. Wenn Du Deine Anwendung mittels Fine-Tuning oder Retrieval Augmented Generation (RAG) spezialisierst, gib nur die minimalen Informationen weiter, die Du tatsächlich benötigst. Werden personenbezogene Daten nicht gebraucht, anonymisiere oder lösche sie. Das ist ein entscheidender Schritt, um Sensitive Information Disclosure zu verhindern und die Angriffsfläche zu verkleinern.
- **Datenvalidierung und -bereinigung**: Bitte validiere Daten immer rigoros, bevor sie fürs Training verwendet werden. Achte auf Anomalien, verdächtige Muster oder mögliche Anzeichen von Poisoning.
- **Training**: Training ist entscheidend und muss hervorgehoben werden, siehe Data Poisoning.
- **Modell-Versionierung und Auditing**: Verfolge jede Version Deines Modells. Wer hat es trainiert? Welche Daten wurden verwendet? Das liefert einen Audit-Trail, falls später eine Schwachstelle entdeckt wird.
- **Sicheres Deployment**: Deploye Deine KI-Modelle in isolierten Umgebungen. Nutze Containerisierungs- und Orchestrierungsplattformen mit eingebauten Sicherheitsfunktionen. Wende das Prinzip der geringsten Rechte auf die Laufzeitumgebungen Deiner Modelle an. In meinen Sketchnotes habe ich den Schutz der Datenpipeline wie unten dargestellt:

![Eine Sketchnote, die den Schutz der Datenpipeline darstellt](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/y1h5ps07agbpfhfvjso8.jpg)

### Das Schlechte blockieren: skizzierte Abwehrmaßnahmen gegen KI-Angriffe

Hier bekämpfst Du direkt Prompt Injection, Data Poisoning und Model Evasion.

- **Eingabebereinigung und -validierung**: Auch wenn es kein Allheilmittel ist, validiere und bereinige Nutzereingaben immer, bevor sie Deine LLMs oder anderen KI-Modelle erreichen. Nutze nach Möglichkeit Allow-Lists. Das ist Deine erste Verteidigungslinie gegen Prompt Injection, die zu Credential Access oder Sensitive Information Disclosure führen kann.
- **Monitoring und Anomalieerkennung** innerhalb Deines KI-Modells: Überwache Deine KI-Systeme genau. Wie denkst Du über das Überwachen ungewöhnlichen Verhaltens? Wenn ein Modell plötzlich völlig andere Vorhersagen trifft oder übermäßig Ressourcen verbraucht, könnte das auf einen Angriff hindeuten.
- **Instruction Tuning und Guardrails**: Verstärke bei LLMs gewünschte Verhaltensweisen durch Instruction Tuning. Implementiere „Guardrails", im Grunde externe Mechanismen (das kann ein weiteres LLM, ein regelbasiertes System oder eine menschliche Prüfung sein), die die Ausgabe der KI validieren, bevor sie die Endnutzenden erreicht oder eine Aktion auslöst. Das ist wie ein Türsteher für die Antworten Deiner KI.
- **Ausgabevalidierung**: Validiere immer die Ausgabe Deiner KI. Wenn ein KI-Agent SQL-Abfragen generiert, validiere diese Abfragen vor der Ausführung. Produziert er Code, scanne diesen Code auf Schwachstellen. Das hilft zu verhindern, dass die KI durch unsichere Ausgaben oder gar Insecure Plugin Design unbeabsichtigte Folgen verursacht. Stell Dir diese Schritte als schützende Schichten rund um die KI vor, die aufeinander aufbauen. Als Skizze würden diese direkten Abwehrmaßnahmen so aussehen:

![Ein Sketchnote-Flussdiagramm der direkten Abwehrmaßnahmen gegen KI-Angriffe](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/4urq7v0xuv8japt5ciov.jpg)

Eine Ergänzung, die wichtig ist, aber nicht in die Skizze passte: Bitte vermeide es, API-Keys zum Aufrufen externer Dienste zu verwenden. Wenn eine Anwendung einen API-Key nutzt, um auf externe Funktionalität wie eine API zuzugreifen, setzt sie sich potenziellen Sicherheitsrisiken aus. So können unautorisierte Personen bestimmte Prompts senden und Operationen durchführen oder auf Daten zugreifen, zu denen sie nicht berechtigt sind. Dem kannst Du entgegenwirken: Zum Beispiel kannst Du OAuth-Access-Tokens nutzen, um die Berechtigungen der Anwendung einzuschränken. Das kann diese Risiken erheblich reduzieren, da Tokens scoped, kurzlebig und an den Nutzerkontext gebunden sein können.

## Das große Ganze: zentrale Erkenntnisse zur KI-Sicherheit

Mit KI zu entwickeln, ist spannend! 🔥 Wir dürfen aber nicht ignorieren, dass KI ebenfalls einige Herausforderungen mit sich bringt, besonders für Identität und Sicherheit im Allgemeinen. Indem Du Identitäten für Menschen, Maschinen und KI-Agenten proaktiv verwaltest und indem Du Bedrohungen wie Prompt Injection, Data Poisoning, Sensitive Information Disclosure und Insecure Plugin Design verstehst und entschärfst, kannst Du KI-Anwendungen bauen, die nicht nur mächtig, sondern auch unglaublich sicher sind. Werfen wir einen Blick auf unser Zeichen-Ergebnis, das sind die vollständigen Sketchnotes:

![Die vollständigen Sketchnotes zur KI-Sicherheit](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/24jarbl5t4qby9twetsy.jpg)

Behalte sie gern als Spickzettel. Und vergiss nie: Es ist eine Reise, kein Ziel, also bleib neugierig, lerne weiter und mach Deine KI kugelsicher! Wie Du wahrscheinlich weißt, habe ich Dir in diesem Artikel einen Überblick gegeben. Beim Lernen und Erstellen der Sketchnotes zur Dokumentation bin ich zu jedem dieser Punkte viel mehr ins Detail gegangen. Bist Du an diesen Sketchnotes auch interessiert? Sag Bescheid, und vielleicht mache ich daraus eine Blog-Serie, sodass wir diese Reise gemeinsam skizzieren können! ❤️

## Dein Sketchnote-Kit: essenzielle Ressourcen

- [Auth for GenAI von Auth0](https://a0.to/GenAI) ❤️
- [Samples, Samples, Samples zu AI IRL](https://a0.to/auth0-ai-samples) 🔥
- [OWASP Top 10 for Large Language Model Applications](https://owasp.org/www-project-top-10-for-large-language-model-applications/)
- [NIST AI Risk Management Framework](https://www.nist.gov/artificial-intelligence/ai-risk-management-framework)
- [Auth0 Blog: Machine-to-Machine Authentication](https://auth0.com/blog/machine-to-machine-authentication-using-jwt-and-oauth-2/)

## Jenseits der Linien: mehr zum Entdecken

- Auth0 Blog: [Identity Challenges for AI-Powered Apps](https://auth0.com/blog/identity-challenges-for-ai-powered-apps/)
- [Deep Dive into Prompt Engineering for LLMs](https://www.promptingguide.ai/)
- [Understanding Data Governance for AI](https://www.secoda.co/blog/ai-data-governance)

