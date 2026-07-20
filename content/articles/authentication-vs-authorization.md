---
title: "Let's Sketch Identity: Authentication vs. Authorization"
description: "The first article in the \"Let's Sketch Identity\" series. Ramona Schwering explains authentication vs. authorization with a bouncer-and-clipboard analogy, and sketches the common authorization models: RBAC, ABAC, ReBAC, and delegated authorization."
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
- locale: de
  name: german
  path: /de/blog/auth0-authentication-vs-authorization
---
So, you are building an application and need a login form. In it, you'll get the user's email and password, send them to an API, and... something happens. The user is logged in afterwards. But what is that something? How does your application decide who gets in and what they get to see?

This is the first article in a series called "Let's Sketch Identity." These blog posts will use my notes from when I started learning about identity concepts as a Developer Advocate. Think of them as my Identity Sketchbook, and join me on my journey back then! ❤️

In this series, I will show you the core ideas of modern identity using a simple, continuous story: no complex specifications, just clear, practical explanations for web developers. Today, I am starting with the two most important concepts: Authentication and Authorization. You can think of them as a Bouncer checking IDs at a door and a Clipboard listing your permissions.

## What Is Authentication? The Bouncer Analogy

Do you know about the Persuadable Bouncer? It's an exploitable four-panel comic series featuring a man in a suit blocking a door and allowing the entrance in the fourth panel. This is how I like to picture Authentication (and I just love to draw memes 😁). Okay, think of authentication like this: Authentication is the bouncer standing at the front door, e.g., of a venue. In real life, the venue is your application. To get in, you have to show your ID, which has your credentials.

Let's visualize this. In the first panel, we see our Bouncer blocking the door as a user presents their ID with their credentials. Once the Bouncer validates that ID, the lock clicks open, and as we see in the second panel, he finally opens the door.

![A sketch note illustrating authentication in identity management, where a bouncer checks a user's ID before opening a door.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/bo4k94qj71gdh7gdohpd.jpg)

And that's it: You've been authenticated! The shorthand for this process is **Authn**.

At its core, authentication is proving that somebody or something is who they say they are. It's the lock on the door of your application. Talking about Authn in an Identity scenario usually means verifying credentials. These credentials come in all shapes and sizes; while a username and password combination is the classic example, they can also be a private and public key pair. Modern approaches even include passwordless authentication, which verifies a user's identity with something other than a password, like a magic link sent to their email or a biometric trait like a fingerprint.

## What Is Authorization? The Clipboard Analogy

Just because you are inside the room does not mean you can do whatever you want. This is where Authorization comes in, like the bouncer handing you a clipboard. Picture that clipboard as a checklist or ruleset explaining to you your permissions:

![A sketch note illustrating authorization, where a user is handed a clipboard listing their permissions. This visualizes a key part of the authentication vs. authorization flow.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/ml2a47sm6dtoyk2uts1d.jpg)

You see, the clipboard lists exactly what you are allowed to do. As you can see in the sketch, you might have permission to view rooms and make a guestbook entry, but the permission to change the AC settings is firmly crossed out. One crucial rule is that the bouncer will always check your ID before handing you the clipboard. You must first prove who you are **before** you can be given a list of things you can do.

My short take: Once a user enters the door, we must know what they can do. That's Authorization. Authorization checks whether somebody or something has access to a particular resource or is allowed to perform a specific action. The shorthand for Authorization is **Authz**.

## How This Works in a Real-World Frontend Application

So, how does this story of the bouncer and the clipboard play out in a real web application? Let's walk through it.

1. A new user comes to your site and clicks on their "My Profile" link.
2. Your application's bouncer stops them, sees they do not have a valid ID yet, and sends them to the login page.
3. The user provides their credentials (their ID). The system checks them and confirms their identity. Authentication is now successful.
4. Now that your application knows who the user is, it prepares their personal clipboard of permissions.
5. The user is sent to the "My Profile" page. They can see all their personal information, but the "Admin Panel" button is hidden. Why? Their clipboard says they do not have access to `admin_panel` permission. This is Authorization in action.

Understanding this difference is very important for you as a frontend developer, as it directly affects the UI you build daily. Some pseudo-codes show you how that logic might look inside a component. Does this look familiar to you?

```javascript
// In some component that renders a navigation bar
function Navbar({ user }) {
  // The bouncer checks for an ID (Authentication)
  if (!user.isAuthenticated) {
    return <LoginButton />;
  }
  // If authenticated, the bouncer checks the clipboard (Authorization)
  return (
    <div>
      <WelcomeMessage user={user} />
      <ProfileLink />
      {/* Check the clipboard for a specific permission */}
      {user.hasPermission('access:admin_panel') &&
        <AdminPanelLink />
      }
      <LogoutButton />
    </div>
  );
}
```

However, no worries! This blog post will revolve around my sketch notes, so I have some prepared. Let's take a look at this workflow:

![A sketch showing the identity management flow from Authentication (Authn), represented by a bouncer, to Authorization (Authz), represented by a permissions clipboard.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/yw2i4dckgazls0pi7z8v.jpg)

You see, Authn and Authz are not the same thing. However, they belong together: Authentication is the first step (I'd even call it groundwork), so that Authz can take place. That makes sense, as you need to know your user before deciding on their permission, right?

## But There Are Different Types of Clipboards!?

That simple `.hasPermission('...')` check in our code is powerful. However, it makes me think. How does the system decide on the user's permissions in the first place? The bouncer's clipboard is not just a simple list. Let's take a quick look at the most common variations, as I depicted four types of clipboards in my sketches.

_Role-Based Access Control_ (RBAC) assigns permissions to users based on their roles, such as "admin," "editor," or "viewer." In the analogy I'm using in my sketches, this is like the "hat" the user wears. Instead of providing a single set of permissions, RBAC offers tailored permissions corresponding to each specific role.

![A cartoon drawing illustrating Role-Based Access Control (RBAC), where the user's role is visualized as a hat they wear.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3m4akaj13gw7574f9nyk.jpg)

_Attribute-Based Access Control_ (ABAC) is an authorization model that determines access based on user attributes (or characteristics) rather than roles. It's similar, but not the same as Policy-Based Access Control (PBAC): They are often considered the same, but are not. In our scene, these are the "tags" the user has on their conference badge, such as "Attendee", "Speaker", or the time when they check in. ABAC protects resources from unauthorized users and actions that do not align with the approved tags (which are basically attributes) established by an organization's security policies.

![A cartoon drawing illustrating Attribute-Based Access Control (ABAC), where attributes are visualized as tags on a conference badge.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/we80ufgggebv5pervd7r.jpg)

_Relationship-Based Access Control_ (ReBAC) handles access decisions based on a subject's relationships. Such a subject could be a user, device, or application. Or in our sketch, it's visualized as a guest list, where only the family is added to. When a subject tries to access an event or a resource (in real life), the system evaluates the specific relationships tied to that subject to decide whether to grant access or not. In my analogy, it may look like this:

![A cartoon drawing illustrating Relationship-Based Access Control (ReBAC), where relationships are visualized as a guest list.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/kgjta9egore5ic7lhak8.jpg)

Last but not least, there's _Delegated Authorization_. It allows a user to grant one application permission to access their data from another service, without sharing their password, just like someone presenting their ID and a document issued by someone else asking to let them enter the room on their behalf. The user would have to approve the access requested by the first party to be shared by the third party. This access is limited to the permissions that the user grants. For example, LinkedIn would only get access to our Gmail contacts, but not our inbox or calendar.

![A cartoon drawing illustrating Delegated Authorization, where a user grants one application limited access to their data from another service.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/h7d1r9tm0fjir3wmd6e1.jpg)

## Conclusion

And that is it for my first sketch! The story is this straightforward:

- Authentication (Authn) is the action done by the Bouncer: They check your ID to prove who you are.
- Authorization (Authz) is the action of providing the Clipboard to the person, being the user. It lists what you can do once you are inside. And you can never get your clipboard until the bouncer has approved your ID.

Let's zoom out and look at the entire journey in a single picture to tie it all together. From the initial ID check by the Bouncer to the different kinds of Clipboards he uses, here is the full story from my Identity Sketchbook:

![A complete sketchnote diagram illustrating the full identity management journey, covering the 'authentication vs. authorization' process and various authorization models like RBAC and ABAC.](https://dev-to-uploads.s3.amazonaws.com/uploads/articles/hwv1zlgb4qoasip2gnse.jpg)

Great, your user is now authenticated and inside the application! ❤️ However, you might have already guessed, Identity does not stop here. How does the app remember them when they navigate from one page to another? They do not have to show their ID for every single click. How is their "clipboard" carried around with them?

In the next article, I will show you the answer: the Digital Passport, also known as the JSON Web Token (JWT). Stay tuned! 🔥

In the meantime, there's some interesting reads if you want to dive deeper:

- [Authentication and Authorization For Developers Who Build at Global Scale](https://auth0.com/blog/authorization-authentication-developers-global-scale/)
- [Authentication, Authorization, and Accounting For Developers](https://auth0.com/blog/authentication-authorization-and-accounting-for-developers/)
- [Five Ruby Gems for Authentication and Authorization](https://auth0.com/blog/five-ruby-gems-for-authentication-and-authorization/)

