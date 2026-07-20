---
title: How to Cover Auth0's Login Form with Tests
description: Many applications rely on Auth0 in their login procedures - but how do you deal with that in testing? Learn how to cover the default login process in test automation with Cypress, including multi-domain testing and handling hydration errors.
img: a0-login/micah-williams-lmFJOx7hPc4-unsplash.webp
alt: A weathered combination padlock hanging on a chain-link fence
createdAt: 2024-12-23T00:00:00.000Z
canonical: https://auth0.com/blog/testing-auth0-login-with-cypress/
author:
  name: Ramona Schwering
  bio: https://auth0.com/blog/testing-auth0-login-with-cypress/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Auth0
- Cypress
- End-To-End Tests
otherLanguages:
- locale: de
  name: german
  path: /de/blog/auth0-testing-login-with-cypress
---
*(Photo by [Micah Williams](https://unsplash.com/@mr_williams_photography?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText) on [Unsplash](https://unsplash.com/?utm_source=unsplash&utm_medium=referral&utm_content=creditCopyText))*

In this post, you'll explore leveraging the Cypress testing framework to enhance security and user experience. This article is the first post of a series, which will closely examine one of the most crucial aspects: the login form and the standard login procedure.

## Why Do We Need to Mind Auth0 in Testing?

You might wonder why you should write login tests. After all, you log in to your application daily. In addition, even more significant, Auth0's Universal Login, thus its Login form, is already tested by the responsible teams, right?

Well, while that's true, it's important to mind the Auth0 integration inside your application - so you're confident it's working with your application's code flawlessly. Moreover, testing the login functionality is crucial for quality assurance due to its frequent use and the significant damage that login failures can cause. Everything protected behind the login needs to be covered by tests, too. And to reach those parts of your application, you need to get through authentication via your tests as well.

> **Disclaimer:** When testing Auth0's functionality and running automated tests in a pipeline, be aware that you might use actual users, affecting your plan's monthly active users (MAUs). This fact is particularly relevant when registering users via automated tests. Use one dedicated test user to avoid creating too many test users and consuming your plan's capacity.

## API Testing and Password Grant

So, we agree that we need a solution to test the login, or at least to have a command to log in to test the behavior of your application afterward. You can imagine that this process of logging in is something you'll do a lot when writing tests for your application, correct? In the usual case, I'd recommend including repetitive steps, such as logging in inside a custom command and avoiding clicking through it, to save time. Cypress advocated for it as well. As a result, in such cases, I'd normally advocate logging in via API and avoiding using UI through such shortcuts. An excellent example of this approach is provided by Cypress itself.

However, this recommendation would require using the Password grant, which is no longer defined as OAuth 2.1, as OAuth discourages its use. These changes have significant implications for API testing, as it may no longer be a practical approach. Despite the potential time investment, we are advised to use the UI method, as we aim to avoid endorsing practices disapproved by OAuth.

## Setting Up Your Example Project

For this blog post, you'll use Cypress as the framework for your examples because it offers a robust, user-friendly solution for end-to-end testing. With its real-time reloading, detailed error messages, and intuitive API, Cypress simplifies the process of writing and running tests. Its ability to operate directly in the browser provides a clear view of how your application behaves in real-world scenarios, making it an excellent choice for ensuring your login functionality is reliable and secure. One critical approach is guiding Cypress through login forms, which is the typical method for testing this crucial feature. Fortunately, Cypress provides built-in support for handling such tests, making the process straightforward and efficient.

To help test login functionality, I recommend using a GitHub repository that hosts a clean Cypress project on the main branch. I prepared a sample repository for this blog post, which you can use for reference.

This project is built using Cypress Version 13, ensuring you have access to the latest features and improvements. You can set up the project by cloning the repository and following the setup instructions provided, making it easy to get started with your login testing.

## Choosing a Test Base

To write a test, you naturally need some test base, something to write a test against. For this blog post, I decided to use the demo app for our virtual developer day event, dev_day. It took place on September 24 and offered a variety of talks, games, and other sessions, especially labs. Those labs are a workshop-like format, actually a guided experience to teach you Auth0's features.

For those labs, we provide a Demo App showcasing all its features, which makes it perfect as a test base for our blog post.

![Dev_day Demo App](https://images.ctfassets.net/23aumh6u8s0i/5uKOqkX3aDOvdODdNxMkqQ/758129b7f53b3235d9676d20b4e33bdb/Dev_day_Demo_App.png)

### Our Demo App's Tech Stack:

The Demo app, built in React, uses NextJS to power Frontend and Backend. The application is kept as simple as possible, e.g., by running a database based on JSON files. Of course we'll use Auth0 inside this application, together with OpenFGA.

## The Standard Way of Testing Login UI

When it comes to testing your login processes, whether you're using Auth0 or not, what comes to mind? It's probably filling out a login form and submitting it, as this is how you're used to login and, thus, testing it manually while coding. It might not be the most efficient way of automated testing, but let's use it as our first example. Spoiler alert: there will be a more efficient way, but it's essential to understand the gist of it.

As a result, before diving into a "default" login test, let's define what we mean by "default." The typical login process consists of a form containing two input fields: an email address or username and a password. These credentials are single-factor authentication. They are sent to the server for verification; the user is granted access if successful. This is what we consider the "default" login. In testing, the user is replaced by a computer in a typical end-to-end test that clicks through a login form as a human would.

> **Hint:** When covering a login form with tests and running them in a pipeline, know rate limits to avoid triggering them and hindering your testing efforts. Mocking responses or increasing the delay between login attempts can help circumvent this issue.

Let's start writing the test! Like any Cypress test, you'll begin with a basic test skeleton as a foundation. The following code snippet defines a test suite using Cypress to verify your application's default login flow.

```javascript
describe('Default Login Flow', () => {
    it('logs in', () => {
        cy.visit('/');
        cy.contains('Log in').click();
        cy.get('input#username').type(username);
    })
})
```

This snippet outlines a basic login flow test, ensuring the login button can be clicked and the username can be entered into the appropriate field. However, this marked line won't work because Auth0 changes to a new domain, requiring multi-domain testing for Cypress to proceed. This kind of testing allows you to handle authentication flows that span multiple domains, which is helpful for modern web applications with third-party authentication providers.

First, set environment variables to work with Auth0's credentials more comfortably. For this, we'll use dotenv: Install `dotenv`, and create a `.env` file in your root folder, as follows:

```bash
AUTH0_USERNAME=exampleusername
AUTH0_PASSWORD=examplepassword
DOMAIN=exampledomain
CLIENT_ID=examplecliendid
```

Then, you can use your environment variables and set them in `cypress.config.ts` as follows:

```typescript
import { defineConfig } from 'cypress';
import dotenv from "dotenv";

dotenv.config({ path: `.env.local` });

export default defineConfig({
    env: {
        auth0_username: process.env.AUTH0_USERNAME,
        auth0_password: process.env.AUTH0_PASSWORD,
        auth0_domain: process.env.DOMAIN,
        auth0_client_id: process.env.CLIENT_ID,
    },
    e2e: {
        // other configurations
    }
});
```

After these steps, you're ready to start! As login steps are probably used in multiple tests, using Custom Commands to avoid duplication and keep code clean is a good practice. Create the custom command as follows:

```typescript
Cypress.Commands.add('loginToAuth0', (username, password) => {
    cy.origin(
        Cypress.env('auth0_domain'),
        { args: { username, password } },
        ({ username, password }) => {
            cy.get('input#username').type(username);
            cy.get('input#password').type(password, { log: false });
            cy.contains('button[value=default]', 'Continue').click();
        }
    );
    cy.url().should('contain', Cypress.config('baseUrl'));
});
```

Next, you'll write the custom command - where the magic's happening. 🪄 Therefore, go to `cypress/support/e2e.ts`. In it, let's create the following command stub:

```typescript
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Your custom command's steps go here...
})
```

The `cy.origin` command is used for multi-domain testing. This command will enable Cypress to handle the switch to the domain handling the login, even if it's the default Auth0 one. Let's include it inside your custom command:

```typescript
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Origin for Multidomain
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      // There goes the login part
    }
  );

  cy.url().should('contain', Cypress.config('baseUrl'));
})
```

This way, we can treat the login page like our own domain - so we can make Cypress interact with it as we're used to. So finally, let's continue with our login steps we tried before:

```typescript
Cypress.Commands.add('loginToAuth0', (username: string, password: string) => {
  // Origin for Multidomain
  cy.origin(
    Cypress.env('auth0_domain'),
    { args: { username, password } },
    ({ username, password }) => {
      cy.get('input#username').type(username);
      cy.get('input#password').type(password, { log: false });
      cy.contains('button[value=default]', 'Continue').click();
    }
  );

  cy.url().should('contain', Cypress.config('baseUrl'));
})
```

Returning to your test file, use the new custom command and add assertions to check if the test logs in correctly. Here's an example:

```typescript
describe('Default Login Flow', () => {
    it('logs in', () => {
        cy.visit('/');

        // Make sure the Login button is completely rendered and visible before interacting
        cy.get('.bg-secondary').should('be.visible');
        cy.get('.bg-secondary').click();

        cy.loginToAuth0(
            Cypress.env('auth0_username'),
            Cypress.env('auth0_password')
        );

        // Validate if the user is completely logged in
        cy.get('[href="/my-courses"]').should('be.visible');
        cy.get('.aspect-square').should('be.visible');
    });
});
```

Did you notice? I added some more assertions to make the test more stable. I'll assert on things a real user would pay attention to:

* You make sure the Login button is wholly rendered and visible before interacting to avoid flakiness
* At the end of the test, you assert two elements that are only visible if you're logged in.

Now, let's run our test and see if it's passing. 🥁

![Test is passing](https://images.ctfassets.net/23aumh6u8s0i/43XLZDtl4CX61ew9YZFdLI/21a78acffd2af12a9444dcb89bae9045/Test_is_passing.png)

That's it! You've written a multi-domain test covering a default login process with Auth0. 🚀

## Common Issue: Hydration Errors in Cypress

As of September 2024, there's still an open GitHub issue on an error I encountered myself when working with Cypress and our dev_day Demo App:

```
(uncaught exception)Error: Hydration failed because the initial UI does not match what was rendered on the server. See more info here: https://nextjs.org/docs/messages/react-hydration-error.

(uncaught exception)Error: There was an error while hydrating. Because the error happened outside of a Suspense boundary, the entire root will switch to client rendering.
```

This error is thus a known issue in Cypress, and we'll adjust the test to include a workaround to execute our test. It's partly based on this response, providing a test-wise workaround. You start by adding the following code snippet to your `cypress/support/e2e.ts` file:

```typescript
Cypress.on("uncaught:exception", (err) => {
  if (
    /hydrat/i.test(err.message) ||
    /Minified React error #418/.test(err.message) ||
    /Minified React error #423/.test(err.message)
  ) {
    return false;
  }
});
```

> **Hint:** It's important to mention again that it's a workaround and not an ideal one, as it conceals an error message completely - thus, it could also hide valid errors. As soon as the issue is fixed, it's highly recommended that this workaround be removed.

After applying the snippet to `cypress/support/e2e.ts`, there are still some edits we need to do in our test itself: We need to wait for the error to be present. This way, we time the test execution just right to have the click on the right time, targeting this error.

```
(uncaught exception)Error: Hydration failed because the initial UI does not match what was rendered on the server.
```

To get the timing right, you can intercept the error's request and wait for it just before you click "Log In":

```typescript
    it('logs in', () => {
      cy.intercept('/oauth/token').as('token');

      // Intercept the error message's request
      cy.intercept('/__nextjs_original-stack-frame?*').as('nextjs');
    
      cy.visit('/');

      // Wait for the error message to pop up
      cy.wait('@nextjs').its('response.statusCode').should('equal', 200);

      // Proceed with your test...
    });
```

## Some Words on Mocking

So, is there only the possibility of using UI-based end-to-end (e2e) tests, you might wonder? This does look very bleak, doesn't it? You could look at another alternative when working with third-party dependencies inside your test, including Auth0. Right, I'm talking about mocking.

Mocking in e2e tests is a practice that isolates the system under test from external dependencies. It ensures your tests run reliably, quickly, and independently of external services. However, it has a significant downside: Overuse of mocks in e2e tests could defeat the purpose of end-to-end verification by not truly reflecting real-world scenarios. Because of that, a balanced approach is vital. You need to weigh those options accordingly; it always depends on your project to decide if mocking is okay. I might answer this question in a later article regarding mocking Auth0.

## Recap

That's it. You wrote a test on Auth0's login form and workflow. Well, to be more precise, you've learned...

* ... why it's essential to consider your login inside your test, even if covered by a third party like Auth0 or you'll use it all the time
* ... About the discouragement of using password grants and the implications on API testing
* ... what Multi-Domain Testing is and how to utilize it to get through Auth0's login workflow
* How to deal with Hydration issues inside your Cypress test in case they arise

Thanks for reading, and may your tests always stay green. 💚

## Further reading

This article was originally published on [Auth0 Blog](https://auth0.com/blog/testing-auth0-login-with-cypress/).
