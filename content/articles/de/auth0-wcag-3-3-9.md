---
title: "Ein barrierefreier Leitfaden zu WCAG 3.3.9: Auf dem Weg zu Gold"
description: WCAG 3.3.8 legt die Mindestanforderungen für barrierefreie Authentifizierung fest. 3.3.9 verschärft diese, indem es Ausnahmen streicht und kognitive Tests für Nutzerinnen und Nutzer automatisiert.
img: wcag339/yomex-owo-gRTzhQsiVG0-unsplash.webp
alt: Ein magentafarbenes Schild „Step free Route“ mit Rollstuhlsymbol und Pfeil im Grünen
createdAt: 2025-12-15T00:00:00.000Z
canonical: https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-9/
author:
  name: Ramona Schwering
  bio: https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-9/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- Accessibility
- WCAG
otherLanguages:
- locale: en
  name: english
  path: /blog/auth0-wcag-3-3-9
---
*(Photo by [Yomex Owo](https://unsplash.com/@yomex4life?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText))*

Hallo, hier ist wieder die Barrierefreiheit. Vielleicht bist Du vor ein paar Wochen auch schon über das Thema [WCAG 3.3.8 (Accessible Authentication)](https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-8-authentication-without-frustration/) in diesem Blog gestolpert. Dieser Standard konzentrierte sich auf die Mindestanforderungen, damit sich Menschen mit kognitiven Beeinträchtigungen anmelden können, ohne Rätsel zu lösen oder komplexe Zeichenketten auswendig zu lernen. Das ist so etwas wie „konform werden“. Heute schaltest Du einen Gang hoch, hin zu „auf dem Weg zu Gold“.

Die WCAG denkt ähnlich und hat es bei einem einzigen Erfolgskriterium für Barrierefreiheit nicht belassen. Wenn WCAG 3.3.8 die Grundlinie ist, dann ist [WCAG 3.3.9 (Accessible Authentication, Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html) der Fortgeschrittenen-Modus.

## Die Stufen verstehen

Von einer Konformität auf Stufe AA zu Stufe AAA aufzusteigen, kann einen großen Unterschied machen. Aber was bedeuten diese Stufen eigentlich?

- **Konformitätsstufen:** Die WCAG definiert drei Konformitätsstufen: A (am niedrigsten), AA (mittlere Stufe) und AAA (am höchsten).
- **Stufe AA (rechtliche Grundlinie):** Die meisten Regierungen und Unternehmen verlangen diese Stufe (wie der ADA in den USA oder der European Accessibility Act). Sie sorgt dafür, dass das Web für die meisten Menschen nutzbar ist.
- **Stufe AAA (Goldstandard):** Sie ist strenger, spezialisierter und oft optional. Sie hilft jedoch dabei, das Web für wirklich alle zugänglich zu machen.

Betrachten wir das durch die Authentifizierungs-Brille:

- **Stufe AA (3.3.8)** sagt: „Lass mich keine Rätsel lösen … es sei denn, es ist eine ganz bestimmte Art von Rätsel.“
- **Stufe AAA (3.3.9)** sagt: „Keine Rätsel. Punkt.“

Du fragst Dich vielleicht: „Warum sollte ich mich um Stufe AAA kümmern, wenn Stufe AA meine Rechtsabteilung zufriedenstellt?“ Der Grund ist einfach: Die Ausnahmen im Mindeststandard können weiterhin Barrieren für Menschen mit schweren kognitiven Beeinträchtigungen schaffen. WCAG 3.3.9 fordert Dich auf, diese Barrieren vollständig zu beseitigen.

## Der Kernunterschied: keine Abkürzungen mehr

Um 3.3.9 zu verstehen, musst Du Dir ansehen, womit Du bei 3.3.8 noch durchgekommen bist.

Im Mindeststandard (3.3.8) bist Du verpflichtet, eine Login-Methode anzubieten, die nicht auf einem „kognitiven Funktionstest“ beruht. Diese Regel kam jedoch mit Ausnahmen. Technisch gesehen konntest Du 3.3.8 bestehen und trotzdem einen kognitiven Test einsetzen, sofern er in bestimmte Kategorien fiel, etwa Objekterkennung oder persönliche Inhalte.

WCAG 3.3.9 streicht diese Ausnahmen. Unter diesem strengeren Standard gibt es das Sicherheitsnetz nicht mehr.

- **Weg: Objekterkennung.** Du darfst Nutzerinnen und Nutzer nicht auffordern, „alle Fotos mit Zebrastreifen auszuwählen“ oder eine verschwommene Form zu erkennen.
- **Weg: persönliche Inhalte.** Du darfst nicht verlangen, „das Sicherheitsbild auszuwählen, das Du bei der Registrierung gewählt hast“.

## Die Fallen-Szenarien: Was wird jetzt durchfallen?

Viele Entwicklerinnen und Entwickler glauben, ihr aktuelles Setup sei barrierefrei, weil es die üblichen Prüfungen auf Stufe AA besteht. Es gibt jedoch verbreitete Muster, die Dir zur Falle werden, sobald Du Stufe AAA erreichen willst.

### Falle #1: Das visuelle CAPTCHA

![Beispiel für ein visuelles CAPTCHA: ein Raster aus Bildern, in dem Nutzerinnen und Nutzer Objekte wie Ampeln, Busse oder Treppen erkennen sollen.](https://images.ctfassets.net/23aumh6u8s0i/WPlEKqa9pqj8HH6Lnda5g/3ebe05100073e4372c49434cc0ab0510/object-recognition.jpg)

Du kennst dieses Raster aus Bildern, in dem Du Ampeln, Busse oder Treppen erkennen sollst.

- **Unter 3.3.8:** Das ist wegen der Ausnahme für Objekterkennung oft erlaubt. Solange man nur ein Auto erkennen muss, erfüllt es die Mindestanforderung.
- **Unter 3.3.9:** Das ist ein **Durchfaller**. Menschen mit Störungen der visuellen Verarbeitung oder schweren Lernbeeinträchtigungen können Schwierigkeiten haben, diese Rätsel zuverlässig zu lösen. Die Enhanced-Kriterien behandeln dies ausnahmslos als kognitiven Test.

### Falle #2: Das Sicherheitsbild

![Beispiel für die Auswahl eines Sicherheitsbildes mit Symbolen wie Segelboot, Hund oder Blume, die man sich merken und auswählen muss.](https://images.ctfassets.net/23aumh6u8s0i/385u5GEFw1EUU4hPchm8m6/1a0cbfc1b84a34218871e9b44e2f7725/personal-content-identification.jpg)

Manche Banken und Sicherheits-Apps verlangen bei der Registrierung, dass Nutzerinnen und Nutzer ein bestimmtes Bild auswählen (etwa einen Hund oder ein Segelboot). Beim späteren Login müssen sie dasselbe Bild aus einer Liste wählen. Das ist ein Musterbeispiel für die Identifikation persönlicher Inhalte.

- **Unter 3.3.8:** Das ist unter der Ausnahme für persönliche Inhalte erlaubt.
- **Unter 3.3.9:** Das ist ein **Durchfaller**. Es verlangt eine Gedächtnisleistung. Die Person muss sich an eine Verknüpfung erinnern, die sie in der Vergangenheit hergestellt hat.

### Falle #3: Das aufgeteilte Eingabefeld

![Ein sechsstelliges Code-Eingabefeld, das in sechs separate Kästchen aufgeteilt ist und die Copy-and-paste-Funktion zerstört.](https://images.ctfassets.net/23aumh6u8s0i/4ZWlwh2mZDdNT4GPOTa4XU/b9031155346d27fb784681069d027e58/Sketchnotes_split_field.jpg)

Du hast wahrscheinlich schon einmal einen 2FA-Bildschirm gesehen (oder gebaut), der einen 6-stelligen Code verlangt, aber statt eines einzigen Eingabefeldes gibt es sechs separate Kästchen.

- **Das Problem:** Sofern Du nicht gezielt JavaScript schreibst, um Einfüge-Ereignisse zu behandeln, zerstören diese Felder häufig die Copy-and-paste-Funktion. Die Person versucht, „123456“ einzufügen, aber es erscheint nur „1“ im ersten Kästchen.
- **Das Urteil:** Wenn die Person gezwungen ist, den Code aus einer SMS abzulesen und Ziffer für Ziffer einzutippen, ist das eine Abtipp-Aufgabe. Das erfüllt die Anforderung an barrierefreie Authentifizierung nicht.

## Das Schlupfloch „Mechanismus“

Nachdem Du all diese Fallen kennengelernt hast, fragst Du Dich vielleicht: „Moment, ist ein Passwort nicht auch ein Gedächtnistest? Verbietet WCAG 3.3.9 also Passwörter?“

Zwar ist ein Passwort ein kognitiver Test, aber es ist erlaubt, **sofern ein Mechanismus existiert, der die Person unterstützt**. In diesem Zusammenhang sind Passwortmanager dieser Mechanismus. Wenn Deine Website Autocomplete-Attribute unterstützt und das Einfügen erlaubt, muss die Person ihr Gedächtnis nicht bemühen.

Das hilft Browsern und Passwortmanagern, die Felder korrekt auszufüllen:

```html
<label for="username">Username:</label>
<input type="text" id="username" name="username" autocomplete="username">

<label for="password">Password:</label>
<input type="password" id="password" name="password" autocomplete="current-password">
```

Wenn Du Deinen Nutzerinnen und Nutzern auf diese Weise hilfst, verwenden sie das Werkzeug, statt sich auf ihr Gedächtnis zu verlassen. Genau deshalb ist das Blockieren von Copy-and-paste ein so gravierendes Versagen: Es zerstört den Mechanismus, der Passwörter erst konform macht.

## Die Lösung, um WCAG 3.3.9 zu erreichen: Wenn Du letztes Mal zugehört hast, bist Du schon da

Das mag einschränkend klingen. Vielleicht hast Du das Gefühl, dass gerade jedes Werkzeug in Deinem Sicherheits-Werkzeugkasten verboten wurde. Hier die gute Nachricht: Die besten Lösungen für WCAG 3.3.8 sind zugleich die wirksamsten Lösungen für 3.3.9. Du brauchst keine neue Technologie. Du musst nur konsequenter auf die richtige Technologie setzen.

### Passkeys

Das ist die ultimative Antwort. Passkeys beruhen auf Besitz (Du hast Dein Gerät) und Biometrie (etwa Fingerabdruck oder Gesicht). Es entsteht eine kryptografische Challenge, die das Gerät löst. Die Person leistet null kognitive Arbeit. Es gibt kein Tippen, kein Auswendiglernen und keine Objekterkennung.

### Social Login (OAuth)

Nutzerinnen und Nutzern zu erlauben, sich „mit Google anzumelden“ oder „mit Apple anzumelden“, ist eine valide Strategie. Es lagert die Authentifizierungslast an einen Anbieter aus, der (hoffentlich) die Barrierefreiheit für Dich übernimmt. Wenn der Anbieter Passkeys oder 2FA einsetzt, profitierst Du davon, ohne die Oberfläche selbst bauen zu müssen.

### Magic Links

Wichtig ist der Hinweis, dass Biometrie nicht perfekt ist. Manchmal funktioniert sie aus verschiedenen Gründen nicht, etwa beim Tragen einer Gesichtsmaske ohne die entsprechende Face-ID-Einstellung. Manche Verletzungen oder Erkrankungen können das Aussehen von Gesicht oder Augen verändern. Für mich unterstreicht das, dass man bei der Authentifizierung immer Optionen anbieten sollte.

Magic Links per E-Mail sind eine weitere robuste Option. Die Person gibt ihre E-Mail-Adresse ein, klickt auf einen Link im Postfach und ist drin. Das entfernt die kognitive Last von Passwörtern und Rätseln vollständig und berücksichtigt zugleich die Grenzen der Biometrie.

### Unsichtbare Sicherheit und QR-Codes

Für besseren Bot-Schutz solltest Du in Erwägung ziehen, vom klassischen Challenge-Response-Modell zu einem Ansatz der Risikoanalyse zu wechseln. Werkzeuge wie unsichtbare reCAPTCHAs (zum Beispiel Googles reCAPTCHA v3) sind ein Beispiel dafür: Sie führen im Hintergrund eine Verhaltensanalyse durch.

[Googles reCAPTCHA haben wir bereits in unserem ersten Artikel behandelt](https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-8-authentication-without-frustration/#Five-ways-to-build-accessible-and-compliant-logins). Aber kommen wir kurz darauf zurück: Das unsichtbare CAPTCHA erzeugt einen Risiko-Score, indem es das Nutzerverhalten analysiert. Entwicklerinnen und Entwickler können anhand dieses Scores dann entscheiden, ob eine Person fortfahren darf oder blockiert werden sollte. Diese Systeme zur Risikoanalyse bewerten potenzielle Bedrohungen anhand von Gerätesignalen und Nutzerverhalten im Hintergrund und greifen nur ein, wenn eine Bedrohung wahrscheinlich ist.

Indem diese Methode die kognitive Herausforderung von Rätseln beseitigt, schafft sie ein reibungsloseres und inklusiveres Erlebnis, weil der Reibungspunkt von vornherein vermieden wird.

Für die Authentifizierung über mehrere Geräte hinweg solltest Du den Einsatz von QR-Codes in Betracht ziehen. Statt einen Code manuell aus einer Authenticator-App abzulesen und am Desktop einzutippen, scannt die Person einfach mit dem Handy einen QR-Code, der auf dem Desktop-Bildschirm angezeigt wird. Das ersetzt eine fehleranfällige Abtipp-Aufgabe (lesen und tippen) durch eine einfache physische Handlung (scannen).

### Profi-Tipp: Die „Zwing mich nicht zu lesen“-Regel

Am einfachsten denkst Du über WCAG 3.3.9 nach, indem Du den Bedarf ans Abtippen beseitigst, mit anderen Worten ein Prinzip klarer Kommunikation, das davon abrät, das Publikum zu zusätzlichem Aufwand zu zwingen, nur um Inhalte zu verstehen. Für die Authentifizierung bedeutet das: Wenn eine Person einen Code auf einem Gerät (oder Bildschirm) ablesen und auf einem anderen eintippen muss, wird sie wahrscheinlich scheitern. Das Ziel ist, jede Aktion zu einem „Klicken“, „Tippen“ oder „Scannen“ zu machen, niemals zu einem „Lesen und Abtippen“.

## Wie Du auf WCAG 3.3.9 prüfst

Bereit herauszufinden, wo Du stehst? Hier ist eine Checkliste, um einzuschätzen, ob Dein Authentifizierungsablauf den Standard der Stufe AAA erfüllt.

- Verwendest Du ein visuelles CAPTCHA? Falls ja, ersetze es durch unsichtbare Challenges oder Passkeys.
- Verwendest Du Sicherheitsfragen oder Sicherheitsbilder? Falls ja, ersetze sie durch eine gewöhnliche Multifaktor-Authentifizierung (MFA).
- Ist Copy-and-paste in Deinen Eingabefeldern aktiviert? Das ist wichtig. Prüfe insbesondere Deine 6-stelligen Eingabefelder darauf, ob sie eine komplette Zeichenkette per Einfügen akzeptieren.
- Verlangt Deine MFA manuelles Abtippen (das Eintippen eines Codes)? Ziehe Push-Benachrichtigungen oder Einmalpasswort-Links (OTP) in Betracht, um das Tippen zu beseitigen.

## Realitätscheck: Selbst bauen oder einkaufen?

All diese Authentifizierungsmethoden zu verwalten, Passwörter, Passkeys und Social, erfordert erheblichen Entwicklungsaufwand. Der klügste Schritt? Nutze eine von Fachleuten entwickelte Identity-Plattform. So vermeidest Du die Eigenentwicklung einer Lösung, die es bereits gibt, beschleunigst Deine Barrierefreiheit bei gleichbleibender Sicherheit und kannst Dich auf das konzentrieren, was Du am besten kannst.

- Ein Dienst wie [Auth0s Universal Login](https://auth0.com/docs/authenticate/login/auth0-universal-login) liefert Dir eine barrierefreie, konforme Login-Seite von Haus aus. Er übernimmt die wesentlichen Aufgaben automatisch: Login, Single Sign-on, passwortlose Optionen und barrierefreie MFA.
- Für Anwendungsfälle, die mehr UI-Anpassung verlangen, lassen sich Tools wie die [UI-Komponenten](https://a0.to/ui-content) von Auth0 Labs direkt in die Anwendung integrieren. Diese einzelnen, barrierefreien Komponenten ermöglichen ein individuelles Login-Erlebnis, gestützt auf Auth0s sicheres und robustes Backend.

## Deine Authentifizierung zukunftssicher machen

Auf WCAG 3.3.9 hinzuarbeiten, bedeutet nicht nur, Konformitätspunkte zu sammeln; es geht darum, ein höheres Maß an Barrierefreiheit zu erreichen.

Wenn Du kognitive Barrieren für Menschen mit Beeinträchtigungen beseitigst, beseitigst Du Reibung für alle. Niemand mag es, Zebrastreifen zu erkennen. Niemand hat Spaß daran, sich zu erinnern, welches Sicherheitsbild er vor drei Jahren gewählt hat. Indem Du für den strengsten Barrierefreiheits-Standard entwickelst, gestaltest Du zwangsläufig das reibungsloseste Nutzungserlebnis.

[Wenn Du Auth0 nutzt](https://a0.to/ui-content), hast Du einen Vorsprung. Universal Login unterstützt Passkeys und Funktionen zur Bot-Erkennung und deckt diese Anforderungen von Haus aus ab. So kannst Du hochsichere, reibungsarme Abläufe umsetzen, ohne Deine eigenen unsichtbaren Challenges bauen zu müssen.

Warte nicht, bis AAA zur Pflicht wird. Baue schon jetzt dafür, denn es bietet ein deutlich besseres Nutzungserlebnis.

## Weiterführende Links

Dieser Artikel wurde ursprünglich auf [Auth0 Blog](https://auth0.com/blog/an-accessible-guide-to-wcag-3-3-9/) veröffentlicht.

- [Web Content Accessibility Guidelines (WCAG) 2.2](https://www.w3.org/TR/WCAG22/)
- [Understanding Success Criterion 3.3.9: Accessible Authentication (Enhanced)](https://www.w3.org/WAI/WCAG22/Understanding/accessible-authentication-enhanced.html)
