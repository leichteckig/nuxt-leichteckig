---
title: "Identity skizziert: Authentifizierung vs. Autorisierung"
description: "Der erste Artikel der Serie „Let's Sketch Identity\". Ramona Schwering erklärt Authentifizierung vs. Autorisierung mit einer Türsteher-und-Klemmbrett-Analogie und skizziert die gängigen Autorisierungsmodelle: RBAC, ABAC, ReBAC und delegierte Autorisierung."
img: https://dev-to-uploads.s3.amazonaws.com/uploads/articles/lkn0ns3ceh7heawdd9tc.jpg
alt: Authentication vs. authorization sketchnote
createdAt: 2025-09-24T00:00:00.000Z
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- Identity
- Security
otherLanguages:
- locale: en
  name: english
  path: /blog/auth0-authentication-vs-authorization
---
Du baust also eine Anwendung und brauchst ein Login-Formular. Darin erfasst Du die E-Mail-Adresse und das Passwort der Nutzenden, schickst sie an eine API und … irgendetwas passiert. Danach sind die Nutzenden eingeloggt. Aber was ist dieses „irgendetwas"? Wie entscheidet Deine Anwendung, wer hineinkommt und was er zu sehen bekommt?

Das ist der erste Artikel einer Serie namens „Let's Sketch Identity". Diese Blogbeiträge nutzen meine Notizen aus der Zeit, als ich als Developer Advocate anfing, mich mit Identity-Konzepten zu beschäftigen. Betrachte sie als mein Identity-Skizzenbuch und begleite mich auf meiner damaligen Reise! ❤️

In dieser Serie zeige ich Dir die Kernideen moderner Identity anhand einer einfachen, durchgehenden Geschichte: keine komplexen Spezifikationen, nur klare, praktische Erklärungen für Webentwickelnde. Heute starte ich mit den zwei wichtigsten Konzepten: Authentifizierung und Autorisierung. Du kannst sie Dir als Türsteher vorstellen, der an der Tür die Ausweise prüft, und als Klemmbrett, das Deine Berechtigungen auflistet.

## Was ist Authentifizierung? Die Türsteher-Analogie

Kennst Du den „Persuadable Bouncer" (den überzeugbaren Türsteher)? Das ist eine als Vorlage nutzbare Vier-Panel-Comicserie mit einem Mann im Anzug, der eine Tür blockiert und im vierten Panel den Eintritt gewährt. Genau so stelle ich mir Authentifizierung gern vor (und ich liebe es einfach, Memes zu zeichnen 😁). Okay, stell Dir Authentifizierung so vor: Die Authentifizierung ist der Türsteher, der an der Eingangstür steht, z. B. eines Veranstaltungsorts. Im echten Leben ist der Veranstaltungsort Deine Anwendung. Um hineinzukommen, musst Du Deinen Ausweis zeigen, der Deine Zugangsdaten enthält.

Visualisieren wir das. Im ersten Panel sehen wir unseren Türsteher, der die Tür blockiert, während eine nutzende Person ihren Ausweis mit ihren Zugangsdaten vorzeigt. Sobald der Türsteher diesen Ausweis validiert, klickt das Schloss auf, und wie wir im zweiten Panel sehen, öffnet er endlich die Tür.

![Eine Sketchnote, die Authentifizierung im Identity-Management illustriert: Ein Türsteher prüft den Ausweis einer nutzenden Person, bevor er die Tür öffnet.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bo4k94qj71gdh7gdohpd.jpg)

Und das war's: Du bist authentifiziert! Die Kurzform für diesen Prozess ist **Authn**.

Im Kern bedeutet Authentifizierung, zu beweisen, dass jemand oder etwas ist, wer er zu sein vorgibt. Sie ist das Schloss an der Tür Deiner Anwendung. Von Authn in einem Identity-Szenario zu sprechen bedeutet meist, Zugangsdaten zu verifizieren. Diese Zugangsdaten gibt es in allen Formen und Größen; während die Kombination aus Benutzername und Passwort das klassische Beispiel ist, können sie auch ein Paar aus privatem und öffentlichem Schlüssel sein. Moderne Ansätze umfassen sogar passwortlose Authentifizierung, die die Identität einer Person mit etwas anderem als einem Passwort verifiziert, etwa einem Magic Link per E-Mail oder einem biometrischen Merkmal wie einem Fingerabdruck.

## Was ist Autorisierung? Die Klemmbrett-Analogie

Nur weil Du im Raum bist, heißt das nicht, dass Du tun kannst, was Du willst. Hier kommt die Autorisierung ins Spiel, so wie der Türsteher Dir ein Klemmbrett in die Hand drückt. Stell Dir dieses Klemmbrett als Checkliste oder Regelwerk vor, das Dir Deine Berechtigungen erklärt:

![Eine Sketchnote, die Autorisierung illustriert: Einer nutzenden Person wird ein Klemmbrett mit ihren Berechtigungen überreicht. Das visualisiert einen zentralen Teil des Ablaufs von Authentifizierung vs. Autorisierung.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ml2a47sm6dtoyk2uts1d.jpg)

Du siehst: Das Klemmbrett listet genau auf, was Du tun darfst. Wie in der Skizze zu sehen, hast Du vielleicht die Erlaubnis, Räume anzusehen und einen Gästebucheintrag zu machen, aber die Erlaubnis, die Klimaanlage einzustellen, ist klar durchgestrichen. Eine entscheidende Regel: Der Türsteher prüft immer erst Deinen Ausweis, bevor er Dir das Klemmbrett übergibt. Du musst zuerst beweisen, wer Du bist, **bevor** Dir eine Liste dessen gegeben werden kann, was Du tun darfst.

Mein kurzes Fazit: Sobald eine nutzende Person durch die Tür kommt, müssen wir wissen, was sie tun darf. Das ist Autorisierung. Autorisierung prüft, ob jemand oder etwas Zugriff auf eine bestimmte Ressource hat oder eine bestimmte Aktion ausführen darf. Die Kurzform für Autorisierung ist **Authz**.

## Wie das in einer echten Frontend-Anwendung funktioniert

Wie spielt sich diese Geschichte von Türsteher und Klemmbrett also in einer echten Webanwendung ab? Gehen wir sie durch.

1. Eine neue nutzende Person kommt auf Deine Seite und klickt auf ihren Link „Mein Profil".
2. Der Türsteher Deiner Anwendung stoppt sie, sieht, dass sie noch keinen gültigen Ausweis hat, und schickt sie zur Login-Seite.
3. Die Person gibt ihre Zugangsdaten (ihren Ausweis) an. Das System prüft sie und bestätigt ihre Identität. Die Authentifizierung ist nun erfolgreich.
4. Jetzt, da Deine Anwendung weiß, wer die Person ist, bereitet sie ihr persönliches Klemmbrett mit Berechtigungen vor.
5. Die Person wird zur Seite „Mein Profil" geschickt. Sie kann all ihre persönlichen Informationen sehen, aber der Button „Admin-Panel" ist verborgen. Warum? Ihr Klemmbrett sagt, dass sie keinen Zugriff auf die Berechtigung `admin_panel` hat. Das ist Autorisierung in Aktion.

Diesen Unterschied zu verstehen, ist für Dich als Frontend-Entwickelnde sehr wichtig, denn er wirkt sich direkt auf die UI aus, die Du täglich baust. Ein paar Pseudo-Codes zeigen Dir, wie diese Logik in einer Komponente aussehen könnte. Kommt Dir das bekannt vor?

```javascript
// In einer Komponente, die eine Navigationsleiste rendert
function Navbar({ user }) {
  // Der Türsteher prüft auf einen Ausweis (Authentifizierung)
  if (!user.isAuthenticated) {
    return <LoginButton />;
  }
  // Wenn authentifiziert, prüft der Türsteher das Klemmbrett (Autorisierung)
  return (
    <div>
      <WelcomeMessage user={user} />
      <ProfileLink />
      {/* Das Klemmbrett auf eine bestimmte Berechtigung prüfen */}
      {user.hasPermission('access:admin_panel') &&
        <AdminPanelLink />
      }
      <LogoutButton />
    </div>
  );
}
```

Aber keine Sorge! Dieser Blogbeitrag dreht sich um meine Sketchnotes, also habe ich einige vorbereitet. Werfen wir einen Blick auf diesen Ablauf:

![Eine Skizze, die den Identity-Management-Fluss von der Authentifizierung (Authn), dargestellt durch einen Türsteher, zur Autorisierung (Authz), dargestellt durch ein Berechtigungs-Klemmbrett, zeigt.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yw2i4dckgazls0pi7z8v.jpg)

Du siehst: Authn und Authz sind nicht dasselbe. Sie gehören aber zusammen: Die Authentifizierung ist der erste Schritt (ich würde ihn sogar als Grundlage bezeichnen), damit Authz stattfinden kann. Das ergibt Sinn, denn Du musst Deine nutzende Person kennen, bevor Du über ihre Berechtigungen entscheidest, oder?

## Aber es gibt verschiedene Arten von Klemmbrettern!?

Diese einfache `.hasPermission('...')`-Prüfung in unserem Code ist mächtig. Sie gibt mir aber zu denken. Wie entscheidet das System überhaupt über die Berechtigungen der Nutzenden? Das Klemmbrett des Türstehers ist nicht nur eine einfache Liste. Werfen wir einen kurzen Blick auf die gängigsten Varianten, denn in meinen Skizzen habe ich vier Arten von Klemmbrettern dargestellt.

_Role-Based Access Control_ (RBAC) weist Nutzenden Berechtigungen basierend auf ihren Rollen zu, etwa „Admin", „Editor" oder „Viewer". In der Analogie, die ich in meinen Skizzen verwende, ist das wie der „Hut", den die Person trägt. Statt eines einzigen Satzes von Berechtigungen bietet RBAC maßgeschneiderte Berechtigungen, die zu jeder konkreten Rolle passen.

![Eine Comic-Zeichnung, die Role-Based Access Control (RBAC) illustriert: Die Rolle der nutzenden Person wird als Hut visualisiert, den sie trägt.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3m4akaj13gw7574f9nyk.jpg)

_Attribute-Based Access Control_ (ABAC) ist ein Autorisierungsmodell, das den Zugriff anhand von Attributen (oder Merkmalen) der Nutzenden statt anhand von Rollen bestimmt. Es ist ähnlich, aber nicht dasselbe wie Policy-Based Access Control (PBAC): Sie werden oft gleichgesetzt, sind es aber nicht. In unserer Szene sind das die „Tags" auf dem Konferenz-Badge der Person, etwa „Attendee", „Speaker" oder der Zeitpunkt des Check-ins. ABAC schützt Ressourcen vor unautorisierten Nutzenden und Aktionen, die nicht mit den freigegebenen Tags (im Grunde Attributen) übereinstimmen, die durch die Sicherheitsrichtlinien einer Organisation festgelegt wurden.

![Eine Comic-Zeichnung, die Attribute-Based Access Control (ABAC) illustriert: Attribute werden als Tags auf einem Konferenz-Badge visualisiert.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/we80ufgggebv5pervd7r.jpg)

_Relationship-Based Access Control_ (ReBAC) trifft Zugriffsentscheidungen basierend auf den Beziehungen eines Subjekts. Ein solches Subjekt kann eine nutzende Person, ein Gerät oder eine Anwendung sein. Oder in unserer Skizze wird es als Gästeliste visualisiert, auf der nur die Familie eingetragen ist. Wenn ein Subjekt versucht, auf ein Event oder (im echten Leben) eine Ressource zuzugreifen, wertet das System die konkreten Beziehungen dieses Subjekts aus, um zu entscheiden, ob der Zugriff gewährt wird oder nicht. In meiner Analogie könnte das so aussehen:

![Eine Comic-Zeichnung, die Relationship-Based Access Control (ReBAC) illustriert: Beziehungen werden als Gästeliste visualisiert.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kgjta9egore5ic7lhak8.jpg)

Und schließlich gibt es _Delegated Authorization_ (delegierte Autorisierung). Sie erlaubt einer nutzenden Person, einer Anwendung die Erlaubnis zu erteilen, auf ihre Daten bei einem anderen Dienst zuzugreifen, ohne ihr Passwort zu teilen, so, als würde jemand seinen Ausweis und ein von jemand anderem ausgestelltes Dokument vorzeigen, das darum bittet, ihn in dessen Auftrag in den Raum zu lassen. Die nutzende Person müsste den vom ersten Anbieter angeforderten Zugriff freigeben, der vom Drittanbieter geteilt werden soll. Dieser Zugriff ist auf die Berechtigungen beschränkt, die die Person gewährt. Zum Beispiel bekäme LinkedIn nur Zugriff auf unsere Gmail-Kontakte, aber nicht auf unser Postfach oder unseren Kalender.

![Eine Comic-Zeichnung, die Delegated Authorization illustriert: Eine nutzende Person gewährt einer Anwendung begrenzten Zugriff auf ihre Daten bei einem anderen Dienst.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h7d1r9tm0fjir3wmd6e1.jpg)

## Fazit

Und das war's für meine erste Skizze! Die Geschichte ist ganz einfach:

- Authentifizierung (Authn) ist die Handlung des Türstehers: Er prüft Deinen Ausweis, um zu beweisen, wer Du bist.
- Autorisierung (Authz) ist die Handlung, der Person, also den Nutzenden, das Klemmbrett zu übergeben. Es listet auf, was Du tun darfst, sobald Du drinnen bist. Und Du bekommst Dein Klemmbrett niemals, bevor der Türsteher Deinen Ausweis freigegeben hat.

Zoomen wir heraus und betrachten die gesamte Reise in einem einzigen Bild, um alles zusammenzuführen. Von der ersten Ausweisprüfung durch den Türsteher bis zu den verschiedenen Arten von Klemmbrettern, die er verwendet, hier ist die vollständige Geschichte aus meinem Identity-Skizzenbuch:

![Ein vollständiges Sketchnote-Diagramm, das die gesamte Identity-Management-Reise illustriert und den Ablauf „Authentifizierung vs. Autorisierung" sowie verschiedene Autorisierungsmodelle wie RBAC und ABAC abdeckt.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hwv1zlgb4qoasip2gnse.jpg)

Großartig, Deine nutzende Person ist nun authentifiziert und in der Anwendung! ❤️ Wie Du aber vielleicht schon geahnt hast, hört Identity hier nicht auf. Wie merkt sich die App die Person, wenn sie von einer Seite zur nächsten navigiert? Sie muss ja nicht bei jedem einzelnen Klick ihren Ausweis zeigen. Wie wird ihr „Klemmbrett" mitgeführt?

Im nächsten Artikel zeige ich Dir die Antwort: den digitalen Reisepass, auch bekannt als JSON Web Token (JWT). Bleib dran! 🔥

In der Zwischenzeit gibt es ein paar interessante Lektüren, falls Du tiefer eintauchen möchtest:

- [Authentication and Authorization For Developers Who Build at Global Scale](https://auth0.com/blog/authorization-authentication-developers-global-scale/)
- [Authentication, Authorization, and Accounting For Developers](https://auth0.com/blog/authentication-authorization-and-accounting-for-developers/)
- [Five Ruby Gems for Authentication and Authorization](https://auth0.com/blog/five-ruby-gems-for-authentication-and-authorization/)
