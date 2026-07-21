---
title: "Ein barrierefreier Leitfaden zu WCAG 3.3.8: Authentifizierung ohne Frust"
description: Ein praktischer Leitfaden zum WCAG-2.2-Erfolgskriterium 3.3.8, der zeigt, wie Du barrierefreie, konforme Login-Abläufe baust, die nicht auf kognitive Tests wie Auswendiglernen, Abtippen oder Rätsel setzen.
img: wcag338/daniel-ali-ju1yFZkrxVg-unsplash.webp
alt: Ein Schild „Accessible Entry“ mit Rollstuhlsymbol an einer bunt bemalten Ziegelwand
createdAt: 2025-09-03T00:00:00.000Z
canonical: https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-8-authentication-without-frustration/
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- Accessibility
- WCAG
otherLanguages:
- locale: en
  name: english
  path: /blog/auth0-wcag-3-3-8-authentication
---

*(Photo by [Daniel Ali](https://unsplash.com/@untodesign_?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText))*

Eine Login-Seite mit Feldern für Benutzername und Passwort sowie Optionen für Social Login zu erstellen, klingt einfach. Doch dieses Standard-Setup kann viele Nutzerinnen und Nutzer tatsächlich ins Straucheln bringen. Entwicklerinnen und Entwickler übersehen häufig die Hürde, dafür zu sorgen, dass sich wirklich alle problemlos anmelden können, und dieses Versäumnis kann erhebliche Folgen haben. Authentifizierung für alle zugänglich zu machen, ist ein verbreiteter blinder Fleck.

Denk daran: Ein vergessenes Passwort, ein komplexes CAPTCHA oder ein Einmalcode, den Du Dir schnell merken und von einem anderen Gerät abtippen musst, bewegt sich irgendwo zwischen nervig und stressig. Für viele Menschen ist das nur mäßig lästig, aber für jemanden mit einer Gedächtnisbeeinträchtigung, Legasthenie oder auch einfach großer Anfälligkeit für Ängste kann es ein echtes Hindernis sein. Wenn Dein Login-Ablauf diese kognitive Anstrengung verlangt, erzeugst Du nicht nur Reibung, sondern schließt Menschen aktiv aus. Wie lässt sich das also lösen?

## Zuerst das Wichtigste: WCAG 3.3.8 verstehen

Zum Glück sind wir hier nicht allein: Das WCAG-2.2-Update hat uns das Erfolgskriterium 3.3.8, „Accessible Authentication (Minimum)“, beschert, um genau dieses Problem anzugehen. Die Grundidee ist einfach: Für keinen Schritt in einem Authentifizierungsprozess darf ein kognitiver Funktionstest erforderlich sein, es sei denn, Du bietest zusätzlich eine barrierefreie Alternative oder einen unterstützenden Mechanismus an. Auch jede Form von Objekterkennung und das Identifizieren persönlicher Inhalte sollten vermieden werden.

Aber was ist ein „kognitiver Funktionstest“? Auch wenn es kompliziert klingt, ist es eigentlich nur alles, was von den Nutzerinnen und Nutzern eines der folgenden Dinge verlangt:

- **Informationen auswendig lernen**, etwa einen Benutzernamen und ein Passwort.
- **Informationen abtippen**, zum Beispiel einen Einmalcode vom Handy in ein Formular auf dem Computer eingeben.
- **Ein Rätsel lösen**, wie diese „Wähle alle Ampeln aus“-CAPTCHAs.

Du siehst: Das Hauptziel ist, die kognitive Belastung Deiner Nutzerinnen und Nutzer zu senken. Diese Aufgaben können für Menschen mit Legasthenie, Gedächtnisproblemen oder großer Anfälligkeit für Ängste fordernd sein. Ihnen alternative Optionen zu bieten, schafft ein deutlich inklusiveres und einladenderes Erlebnis.

## Die häufigen Fallstricke: Welche Authentifizierungsmethoden bestehen diesen Test nicht?

Viele der Login-Methoden, die Du täglich siehst, sind in Wirklichkeit kognitive Tests. Der erste Schritt, sie zu beheben, besteht darin, sie zu erkennen. Ohne eine Alternative würden diese Methoden den Test nicht bestehen:

- **Standard-Felder für Benutzername und Passwort:** Die häufigste Login-Methode ist ein Gedächtnistest. Wenn Nutzerinnen und Nutzer ihre Zugangsdaten aus dem Gedächtnis abrufen und eintippen müssen, ist das ein kognitiver Test.
- **Zwei-Faktor-Authentifizierung (2FA) auf Abtipp-Basis:** Wenn Du einen 6-stelligen Code per SMS schickst und die Person ihn auf Deiner Website eingeben lässt, verlangst Du ein Abtippen.
- **Blockieren von Copy-and-paste:** Manche Websites deaktivieren die Einfügen-Funktion in Passwortfeldern aus „Sicherheitsgründen“. 🙈 Das ist ein gravierendes Versagen bei der Barrierefreiheit. Es erzwingt das Abtippen und hindert Menschen daran, ihren Passwortmanager zu nutzen.

Ein typischer Teil der Authentifizierung, der gleich zwei Kernprinzipien auf einmal verletzt, verdient eine besondere Erwähnung: das CAPTCHA. Nutzerinnen und Nutzer aufzufordern, verzerrten Text zu entziffern oder ein visuelles Rätsel zu lösen, belastet ihre Verarbeitungsfähigkeit stark. Im Gespräch mit einer Teilnehmerin auf einer Konferenz bin ich auf dieses hier gestoßen:

![Beispiel für ein Captcha](https://cdn.auth0.com/website/blog/captcha-wcag.png)

Im besten Fall ist es nervig, im schlimmsten Fall für Menschen mit kognitiven Beeinträchtigungen unmöglich zu lösen.

## Fünf Wege zu barrierefreien und konformen Logins

Wie behebst Du das also? Du solltest damit beginnen, Deinen gesamten Authentifizierungsablauf von Anfang bis Ende zu betrachten. Bei jedem Schritt solltest Du Dich fragen: „Verlange ich, dass die Person sich etwas merkt, etwas abtippt oder etwas löst?“ Falls die Antwort ja lautet, musst Du fragen: „Biete ich eine Alternative an?“ Der Schlüssel liegt darin, alternative Methoden anzubieten, die nicht auf diese Fähigkeiten angewiesen sind. Die Lösungen decken sich ohnehin oft mit modernen Best Practices für Authentifizierung. Also los! 🙌

### 1. Werde passwortlos

Statt Passwörter und deren Handhabung nur zu erleichtern, ist es noch besser, sie ganz abzuschaffen. Passwortlose Authentifizierung ist barrierefreier, weil sie den Gedächtnistest entfernt, den Passwörter üblicherweise verlangen.

Gute Optionen sind unter anderem:

- **Magic Links**: Einen einmalig nutzbaren Login-Link an die E-Mail-Adresse zu senden, ist eine fantastische und barrierefreie Alternative. Die Person muss nur auf einen Link klicken und sich nichts merken oder eintippen.
- **Social Login:** Nutzerinnen und Nutzern zu erlauben, sich mit ihren bestehenden Google-, GitHub- oder anderen Konten anzumelden, übergibt die Authentifizierungsarbeit an einen Anbieter, den sie bereits nutzen und dem sie vertrauen.

### 2. Der moderne Standard: WebAuthn über Passkeys nutzen

Für die beste Kombination aus Sicherheit und Barrierefreiheit ist WebAuthn (Web Authentication) die Antwort, inklusive seiner nutzerfreundlichen Umsetzung als Passkeys. Statt eines Passworts nutzen Passkeys Public-Key-Kryptografie. Dieses Verfahren erzeugt für jede Website ein einzigartiges Schlüsselpaar, das sicher auf dem Gerät der Nutzerin oder des Nutzers gespeichert wird.

![passkey illustration](https://images.ctfassets.net/23aumh6u8s0i/4cwVRfb5J5sdlJonMOY8M/fd077197f168fcbfed536bfdd3824a2b/passkeys_launch_hero_image.jpg)

Nutzerinnen und Nutzer können sich per Passkey über Biometrie anmelden, etwa Fingerabdruck, Apples FaceID oder einen physischen Sicherheitsschlüssel.

Dank Passkey-Anbietern wie Google, Apple und 1Password lassen sich diese Zugangsdaten über die Geräte einer Person hinweg synchronisieren. Dieses Verfahren ersetzt den Bedarf an Passwörtern und kognitiven Tests vollständig durch eine einfache, sichere Aktion. So gibt es keine Passwörter zum Merken und keine Einmalcodes zum Abtippen. Es ist der Goldstandard, um einen Login-Ablauf zu schaffen, der zugleich unglaublich sicher und grundlegend barrierefrei ist.

### 3. Deine Multifaktor-Authentifizierung (MFA) neu denken

MFA ist eine fantastische Sicherheitsebene, aber Du musst vorsichtig sein, wie Du sie umsetzt. Wenn Deine primäre MFA-Methode einen sechsstelligen Code per SMS (OTP) sendet, den die Person manuell auf Deiner Website eingeben muss, verlangst Du ein Abtippen. Das ist ein weiterer kognitiver Test, der für manche Menschen zur Barriere werden kann.

Die Lösung besteht darin, barrierefreiere Alternativen anzubieten, die nicht auf Abtippen angewiesen sind. Du kannst zum Beispiel MFA anbieten, die Push-Benachrichtigungen, Biometrie über WebAuthn oder physische Sicherheitsschlüssel nutzt, um Deine Anwendung sicher und barrierefrei zu halten. So bewahrst Du ein hohes Sicherheitsniveau, ohne Deinen Nutzerinnen und Nutzern eine unnötige Hürde in den Weg zu stellen. Falls Du bei OTPs bleiben musst, vermeide nach Möglichkeit Kontextwechsel. Auch wenn es bei MFA oft unvermeidbar ist, reduziert es die kognitive Belastung, wenn Du das Springen zwischen verschiedenen Geräten oder Apps minimierst (z. B. indem Du einen SMS-Code an das Gerät sendest, an dem Du ohnehin gerade sitzt).

Wo möglich (z. B. auf Mobilgeräten für SMS-OTPs), ermögliche automatisches Kopieren oder stelle einen „Code kopieren“-Button bereit. Wenn Du zeitbasierte Einmalpasswörter (TOTPs) aus Authenticator-Apps oder per SMS nutzt, sorge außerdem dafür, dass das Zeitlimit großzügig genug ist (mindestens 60 Sekunden, besser länger), damit Menschen mit kognitiven oder motorischen Beeinträchtigungen den Code lesen und eingeben können.

Zusätzlich musst Du bereits vorsichtig sein, wenn Du Nutzerinnen und Nutzer zur Einrichtung von MFA aufforderst. Falls QR-Codes für die Einrichtung einer Authenticator-App verwendet werden, stelle immer den textbasierten geheimen Schlüssel als Alternative für Menschen bereit, die den QR-Code nicht scannen können. Es reicht nicht, ihn in einem obskuren Button zu verstecken; hinterlege ihn immer so, dass ein Screenreader damit umgehen kann.

### 4. Gehe sorgfältig mit Captchas um

Wenn Du die Verwendung eines CAPTCHAs nicht vermeiden kannst, achte bitte auf dessen Barrierefreiheit. Zwar legen die Richtlinien nahe, dass einfache Objekterkennung (z. B. „Wähle alle Bilder mit einem Auto aus“) in Ordnung sei, aber selbst diese können erhebliche kognitive Tests darstellen, da die Person weiterhin die geistige Kapazität braucht, sie zu lösen. Diese visuellen Rätsel können verwirrend, kulturell voreingenommen oder für Menschen mit kognitiven Beeinträchtigungen unmöglich zu lösen sein.

Denk deshalb immer daran, barrierefreie Alternativen anzubieten. Als Ausgangspunkt gehören dazu nicht-visuelle Optionen wie Audio-Challenges, doch auch diese sind für Nutzerinnen und Nutzer oft schwierig. Ein besserer Ansatz ist, sich in Richtung eines modernen, datenschutzfreundlichen und unsichtbaren CAPTCHAs zu bewegen. Das bekannteste Beispiel ist Googles reCAPTCHA v3. Dieses unsichtbare CAPTCHA arbeitet im Hintergrund und analysiert das Nutzerverhalten, um einen Risiko-Score zu erzeugen. Entwicklerinnen und Entwickler können anhand dieses Scores dann entscheiden, ob eine Person fortfahren darf oder blockiert werden sollte.

Diese Systeme arbeiten im Hintergrund, indem sie Nutzerverhalten und Gerätesignale analysieren, um das Risiko einzuschätzen, und greifen nur ein, wenn eine Bedrohung wahrscheinlich ist. Dieser Ansatz vermeidet es, den Nutzerinnen und Nutzern überhaupt eine kognitive Herausforderung zu stellen, und schafft ein deutlich reibungsloseres und inklusiveres Erlebnis.

### 5. Setze auf Passwortmanager und Copy-and-paste

Das ist der einfachste und wichtigste Schritt, den Du gehen kannst: Die Nutzung von Passwortmanagern zuzulassen, ist der leichteste Weg, ein klassisches Login-Formular barrierefrei zu machen.

Für Deine Anwendung bedeutet das zwei wesentliche Dinge:

- Vor allem: **blockiere niemals, wirklich niemals, die `paste`-Funktion** Deiner Eingabefelder. Diese Funktion erlaubt es Nutzerinnen und Nutzern in der Regel, ihre Zugangsdaten aus einem Passwortmanager oder Dokument zu kopieren und einzufügen.
- Verwende passende HTML-Attribute, wie im folgenden Beispiel. Das hilft Browsern und Passwortmanagern, die Felder korrekt auszufüllen.

```html
<label for="username">Username:</label>
<input type="text" id="username" name="username" autocomplete="username">

<label for="password">Password:</label>
<input type="password" id="password" name="password" autocomplete="current-password">
```

#### Wichtiger Hinweis zu Clickjacking bei Passwortmanagern

Die Nutzung von Passwortmanagern zu fördern, ist super wichtig. Genauso wichtig ist es aber, sich möglicher Angriffsvektoren in diesem Bereich bewusst zu sein. Ein aktuelles Beispiel ist Clickjacking. Bei dieser Technik verschleiert oder überlagert eine bösartige oder kompromittierte Webseite Elemente einer Seite oder Browser-Erweiterung visuell, etwa das Autofill-Menü, sodass eine Person unbeabsichtigt darauf klickt. In den vergangenen Wochen wurde eine Schwachstelle aufgedeckt, die es einer bösartigen Website erlaubt, genau solche unsichtbaren Overlays einzusetzen. Damit lassen sich Nutzerinnen und Nutzer dazu verleiten, auf eine versteckte Aufforderung von 1Password zu reagieren, was dazu führen kann, dass sie versehentlich sensible Informationen wie Kreditkartennummern automatisch ausfüllen. 1Password hat zu dieser Schwachstelle einen aufschlussreichen Blogbeitrag geschrieben und dabei ausdrücklich betont, dass Autofill weiterhin aktiviert bleiben und genutzt werden sollte. Dennoch ist es eine gute Erinnerung, weiterhin Sicherheits-Best-Practices zu befolgen und über Informationen von Sicherheitsforschenden und Passwortmanager-Anbietern auf dem Laufenden zu bleiben, um Nutzerinnen und Nutzer wirksam zu schützen.

## Deine Lösung beschleunigen: Wann selbst bauen, wann einkaufen?

Diese Lösungen sind klar, aber viele verschiedene Authentifizierungsabläufe umzusetzen und zu pflegen, ist eine Menge Arbeit. Passwortbasiert, passwortlos, Social und WebAuthn erfordern alle erheblichen Entwicklungsaufwand. Das klassische „Build vs. Buy“-Dilemma kann Deinen Fortschritt wirklich ausbremsen.

Hier kannst Du Deinen Weg zu einer barrierefreien Lösung beschleunigen, indem Du eine dedizierte Identity-Plattform nutzt, statt alles von Grund auf selbst zu bauen. Vorgefertigte Komponenten von Fachleuten sind oft der effizienteste Weg, diese Herausforderung zu lösen.

- Um schnell Konformität zu erreichen, bietet ein Dienst wie Auth0s Universal Login eine barrierefreie Login-Seite, die von Haus aus konform ist. Sie unterstützt automatisch Passwortmanager, Social Logins, passwortlose Optionen und barrierefreie MFA-Methoden.
- Wenn Du mehr Kontrolle über die UI brauchst, kannst Du Tools wie die UI-Komponenten von Auth0 Labs nutzen. Das sind einzelne, barrierefreie Komponenten, die Du direkt in Deine Anwendung einbauen kannst. So bekommst Du ein individuelles Login-Erlebnis und nutzt trotzdem ein robustes und sicheres Backend.

## Fazit

Barrierefreie Authentifizierung zu bauen, geht nicht nur um ein WCAG-Konformitäts-Häkchen. Es geht darum, Deine Nutzerinnen und Nutzer zu respektieren und sicherzustellen, dass wirklich alle Deine Anwendung nutzen können, ohne frustriert oder buchstäblich ausgesperrt zu werden.

Verabschiede Dich von klassischen Methoden, die auf kognitive Tests setzen, und setze auf moderne, nutzerfreundliche Alternativen. Dieser Ansatz macht Deine Anwendung für alle zugänglich und verbessert gleichzeitig Sicherheit und Usability. Es ist eine Win-win-Situation, die Vertrauen schafft und Dein Engagement für eine wirklich inklusive digitale Welt zeigt. ❤️

## Weiterführende Links

Dieser Artikel wurde ursprünglich auf [Auth0 Blog](https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-8-authentication-without-frustration/) veröffentlicht.
