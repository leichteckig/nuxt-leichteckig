---
title: It’s A (Front-End Testing) Trap!
description: When writing front-end tests, you’ll find a lot of pitfalls along the way. In sum, they can lead to lousy maintainability, slow execution time, and — in the worst case — tests you cannot trust. But it doesn’t have to be that way.
img: smashing-testing-pitfalls/1-frontend-testing-pitfalls.png
alt: common testing traps
createdAt: 2021-07-01T22:50:54.724Z
author:
  name: Ramona Schwering
  bio: https://www.smashingmagazine.com/2021/07/frontend-testing-pitfalls/
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Smashing magazine
- Unit Tests
- End-To-End Tests
- Testing pitfalls
otherLanguages:
- locale: de
  name: german
  path: /de/blog/smashing-common-pitfall-traps
---
As I was rewatching a movie I loved as a child, one quote in particular stood out. It’s from the 1983 Star Wars film [“Return of the Jedi”](https://en.wikipedia.org/wiki/Return_of_the_Jedi). The line is said during the Battle of Endor, where the Alliance mobilizes its forces in a concentrated effort to destroy the Death Star. There, Admiral Ackbar, leader of the Mon Calamari rebels, says his memorable line:

![“It’s a trap!” — Admiral Akbar ](/smashing-testing-pitfalls/1-frontend-testing-pitfalls.png "It’s a trap!")

“It’s a trap!” This line alerts us to an unexpected ambush, an imminent danger. All right, but what does this have to do with testing? Well, it’s simply an apt allegory when it comes to dealing with tests in a code base. These traps might feel like an unexpected ambush when you’re working on a code base, especially when doing so for a long time.

In this article, I’ll tell you the pitfalls I’ve run into in my career — some of which were my fault. In this context, I need to give a bit of disclaimer: My daily business is heavily influenced by my use of the Jest framework for unit testing, and by the Cypress framework for end-to-end testing. I’ll try my best to keep my analysis abstract, so that you can use the advice with other frameworks as well. If you find that’s not possible, please comment below so that we can talk about it! Some examples might even be applicable to all test types, whether unit, integration, or end-to-end testing.

## Front-End Testing Traps

Testing, whatever the kind, has a lot of benefits. Front-end testing is a set of practices for testing the UI of a web application. We test its functionality by putting its UI under permanent stress. Depending on the type of testing, we can achieve this in various ways and at various levels:

* **Unit tests** look at the minor units in your applications. These units might be classes, interfaces, or methods. The tests check whether they give the expected output, using predefined inputs — thus, testing units separately and in isolation.
* **Integration tests** have a broader scope. They test units of code together, looking at their interaction.
* *End-to-end tests** test the application, as an actual user would do it. Thus, it resembles system testing if we look at quality assurance in theory.

Together, doing all of these can give us a lot of confidence in shipping our application — front-end testing makes sure that people will interact with the UI as we desire. From another perspective, using these practices, we’re able to ensure error-free releases of an application without a lot of manual testing, which eat up resources and energy.

This value can be overshadowed, though, because many pain points have various causes. Many of these could be considered “traps”. Imagine doing something with the best of intentions, but it ends up painful and exhausting: This is the worse kind of technical debt.

## Why Should We Bother With Testing Traps?

When I think about the causes and effects of the front-end testing traps that I’ve fallen into, certain problems come to mind. Three causes in particular come back to me again and again, arising from legacy code I had written years ago.

1. **Slow tests, or at least slow execution of tests.** When developing locally, developers tend to get impatient with tests, especially if someone in your team needs to merge corresponding pull requests. Long waiting times feel overwhelmingly annoying in any case. This trap can arise from a lot of small causes — for example, not paying much attention to suitable waiting times or to the scope of a test.
2. **Tests that are difficult to maintain.** This second pain point is even more critical and a more significant cause of abandoned tests. For example, you might come back to a test months later and not understand its contents or intent at all. Or team members might ask you what you wanted to achieve with an old test that you wrote. In general, too many classes or abstractions littered across walls of text or code can swiftly kill the motivation of a developer and lead to plain chaos. Traps in this area can be caused by following best practices that are not suitable for tests.
3. **Tests that give you no consistent value at all.** You may call these Heisenfails or Heisentests, like the famous Heisenbug, which only occurs if you look away, don’t measure it, or, in our case, don’t debug it. The worst case is a [flaky test](https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/), a non-determinant test that fails to deliver the same result between builds without any changes. This can occur for various reasons, but it usually happens when you try to take an easy, seemingly convenient shortcut, disregarding testing best practices.

But don’t worry too much about my own experiences. Testing and handling tests can be fun! We just need to keep an eye on some things to avoid a painful outcome. Of course, the best thing is to avoid traps in our test designs in the first place. But if the damage is already done, refactoring a test base is the next best thing.

## The Golden Rule

Let’s suppose you are working on an exciting yet demanding job. You are focused on it entirely. Your brain is full of production code, with no headspace left for any additional complexity — especially not for testing. Taking up much headspace is entirely against the purpose of testing. In the worst case, tests that feel like a burden are a reason that many teams abandon them.

In his guide “[JavaScript Testing Best Practices](https://github.com/goldbergyoni/javascript-testing-best-practices)” Yoni Goldberg articulates the golden rule for preventing tests from feeling like a burden: A test should feel like a friendly assistant, there to help you, and should never feel like a hindrance.

I agree. This is the most crucial thing in testing. But how do we achieve this, exactly? Slight spoiler alert: Most of my examples will illustrate this. The KISS principle (keep it simple, stupid) is key. **Any test, no matter the type, should be designed plain and simple.**

So, what is a plain and simple test? How will you know whether your test is simple enough? Not complicating your tests is of utmost importance. The main goal is perfectly summarized by Yoni Goldberg:

> “One should look at a test and get the intent instantly.”

So, a test’s design should be flat. Minimalist describes it best. A test should have not much logic and few to no abstractions at all. This also means you need to be cautious with page objects and commands, and you need to meaningfully name and document commands. If you intend to use them, pay attention to indicative commands, functions, and class names. This way, a test will remain delightful to developers and testers alike.

My favorite testing principle relates to duplication, the DRY principle: Don’t repeat yourself. If abstraction hampers the comprehensibility of your test, then avoid the duplicate code altogether.

This code snippet is an example:

```javascript
// Cypress
beforeEach(() => {
    // It’s difficult to see at first glance what those
    // command really do 
    cy.setInitialState()
       .then(() => {
           return cy.login();
       });
});
```

To make the test more understandable, you might think that meaningfully naming commands is not enough. Rather, you could also consider documenting the commands in comments, like so:

```javascript
// Cypress
/**
* Logs in silently using API
* @memberOf Cypress.Chainable#
* @name loginViaApi
* @function
*/
Cypress.Commands.add('loginViaApi', () => {
   return cy.authenticate().then((result) => {
       return cy.window().then(() => {
           cy.setCookie('bearerAuth', result);
       }).then(() => {
           cy.log('Fixtures are created.');
       });
   });
});
```

Such documentation might be essential in this case because **it will help your future self and your team understand the test better**. You see, some best practices for production code are not suitable for test code. Tests are simply not production code, and we should never treat them as such. Of course, we should treat test code with the same care as production code. However, some conventions and best practices might conflict with comprehensibility. In such cases, remember the golden rule, and put the developer experience first.

## Traps In Test Design

In the first few examples in this section, I’ll talk about how to avoid falling into testing traps in the first place. After that, I’ll talk about test design. If you’re already working on a longstanding project, this should still be useful.

### The rule of three

Let’s start with the example below. Pay attention to its title. The test’s content itself is secondary.

```javascript
// Jest
describe('deprecated.plugin', () => {
    it('should throw error',() => {
       // Actual test, shortened for component throwing 
        // an error
        const component = createComponent();

        expect(global.console.error).toBeCalled();
    });
});
```

Looking at this test, can you tell at first sight what it is intended to accomplish? Particularly, imagine looking at this title in your testing results (for example, you might be looking at the log entries in your pipelines in continuous integration). Well, it should throw an error, obviously. But what error is that? Under what circumstances should it be thrown? You see, understanding at first sight what this test is meant to accomplish is not easy because the title is not very meaningful.

Remember our golden rule, that we should instantly know what the test is meant to do. So, we need to change this part of it. Fortunately, there’s a solution that is easy to comprehend. We’ll title this test with the rule of three.

This rule, [introduced by Roy Osherove](https://osherove.com/blog/2005/4/3/naming-standards-for-unit-tests.html), will help you clarify what a test is supposed to accomplish. It’s is a well-known practice in unit testing, but it would be helpful in end-to-end testing as well. According to the rule, a test’s title should consist of three parts:

1. What is being tested?
2. Under what circumstances would it be tested?
3. What is the expected result?

OK, what would our test look like if we followed this rule? Let’s see:

```javascript
// Jest
describe('deprecated.plugin', () => {
it('Property: Should throw an error if the deprecated prop is used', () => {
       // Actual test, shortened for component throwing 
        // an error
        const component = createComponent();

        expect(global.console.error).toBeCalled();
   });
});
```

Yes, the title is long, but you’ll find all three parts in it:
1. What is being tested? In this case, it’s the property.
2. Under what circumstances? We want to test a deprecated property.
3. What do we expect? The application should throw an error.

By following this rule, we will be able to see the result of the test at first sight, no need to read through logs. So, we’re able to follow our golden rule in this case.

### "Arrange, Act, Assert" vs "Given, When, Then"

Another trap, another code example. Do you understand the following test on first reading?

```javascript
// Jest
describe('Context menu', () => {
   it('should open the context menu on click', async () => {
        const contextButtonSelector = 'sw-context-button';
        const contextButton =
              wrapper.find(contextButtonSelector);
        await contextButton.trigger('click');
        const contextMenuSelector = '.sw-context-menu';
        let contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(false);
        contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(true);  
   });
});
```

If you do, then congratulations! You’re remarkably fast at processing information. If you don’t, then don’t worry; this is quite normal, because the test’s structure could be greatly improved. For example, declarations and assertions are written and mixed up without any attention to structure. How can we improve this test?

There is one pattern that might come in handy, the AAA pattern. AAA is short for “arrange, act, assert”, which tells you what to do in order to structure a test clearly. Divide the test into three significant parts. Being suitable for relatively short tests, this pattern is mostly encountered in unit testing. In short, these are the three parts:

* **Arrange** Here, you would set up the system being tested to reach the scenario that the test aims to simulate. This could involve anything from setting up variables to working with mocks and stubs.
* **Act** In this part, you would run the unit under the test. So, you would do all of the steps and whatever needs to be done in order to get to the test’s result state.
* **Assert** This part is relatively self-explanatory. You would simply make your assertions and checks in this last part.

This is another way of designing a test in a lean, comprehensible way. With this rule in mind, we could change our poorly written test to the following:

```javascript
// Jest
describe('Context menu', () => {
    it('should open the context menu on click', () => {
        // Arrange
        const contextButtonSelector = 'sw-context-button';
        const contextMenuSelector = '.sw-context-menu';

        // Assert state before test
        let contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(false);

        // Act
        const contextButton =
             wrapper.find(contextButtonSelector);
        await contextButton.trigger('click');

        // Assert
        contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(true);  
    });
});
```

But wait! What is this part about acting before asserting? And while we’re at it, don’t you think this test has a bit too much context, being a unit test? Correct. We’re dealing with integration tests here. If we’re testing the DOM, as we’re doing here, we’ll need to check the before and after states. Thus, while the AAA pattern is well suited to unit and API tests, it is not to this case.

Let’s look at the AAA pattern from the following perspective. As Claudio Lassala states in [one of his blog posts](https://lassala.net/2017/07/20/test-style-aaa-or-gwt/), instead of thinking of how I’m going to…

* “…**arrange** my test, I think what I’m **given**.” This is the scenario with all of preconditions of the test.
* “…**act** in my test, I think **when** something happens.” Here, we see the actions of the test.
* “…**assert** the results, I think if that something happens **then** this is what I expect as the outcome.” Here, we find the things we want to assert, being the intent of the test.

The bolded keywords in the last bullet point hint at another pattern from behavioral-driven development (BDD). It’s the **given-when-then** pattern, developed by Daniel Terhorst-North and Chris Matts. You might be familiar with this one if you’ve written tests in the Gherkin language:

```gherkin
Feature: Context menu
  Scenario: 
    Given I have a selector for the context menu
       And I have a selector for the context button

    When the context menu can be found
       And this menu is visible
       And this context button can be found
       And is clicked
     
   Then I should be able to find the contextMenu in the DOM
      And this context menu is visible
```

However, you can use it in all kinds of tests — for example, by structuring blocks. Using the idea from the bullet points above, rewriting our example test is fairly easy:

```javascript
// Jest
describe('Context menu', () => {
    it('should open the context menu on click', () => {
        // Given
        const contextButtonSelector = 'sw-context-button';
        const contextMenuSelector = '.sw-context-menu';

        // When
        let contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(false);
        const contextButton =
             wrapper.find(contextButtonSelector);
        await contextButton.trigger('click');

        // Then
        contextMenu = wrapper.find(contextMenuSelector);
        expect(contextMenu.isVisible()).toBe(true);  
    });
});
```

### Data we used to share

We’ve reached the next trap. The image below looks peaceful and happy, two people sharing a paper:

![Test data we used to share.](/smashing-testing-pitfalls/2-frontend-testing-pitfalls.png "Two tests (persons) sharing the same data")

However, they might be in for a rude awakening. Apply this image to a test, with the two people representing tests and the paper representing test data. Let’s name these two tests, test A and test B. Very creative, right? The point is that test A and test B share the same test data or, worse, rely on a previous test.

This is problematic because it leads to flaky tests. For example, if the previous test fails or if the shared test data gets corrupted, the tests themselves cannot run successfully. Another scenario would be your tests being executed in random order. When this happens, you cannot predict whether the previous test will stay in that order or will be completed after the others, in which case tests A and B would lose their basis. This is not limited to end-to-end tests either; a typical case in unit testing is two tests mutating the same seed data.

All right, let’s look at a code example from an end-to-end test from my daily business. The following test covers the log-in functionality of an online shop.

```javascript
// Cypress
describe('Customer login', () => {

    // Executed before every test
    beforeEach(() => {
        // Step 1: Set application to clean state
        cy.setInitialState()
           .then(() => {
             // Step 2: Create test data 
             return cy.setFixture('customer');
           })
            // … use cy.request to create the customer
    }):

    // … tests will start below
})
```

To avoid the issues mentioned above, we’ll execute the `beforeEach` hook of this test before each test in its file. In there, the first and most crucial step we’ll take is to reset our application to its factory setting, without any custom data or anything. Our aim here is to ensure that all our tests have the same basis. In addition, it protects this test from any side effects outside of the test. Basically, we’re isolating it, keeping away any influence from outside.

The second step is to create all the data needed to run the test. In our example, we need to create a customer who can log into our shop. I want to create all of the data that the test needs, tailored specifically to the test itself. This way, the test will be independent, and the order of execution can be random. To sum it up, both steps are essential to ensuring that the tests are isolated from any other test or side effect, maintaining stability as a result.

## Implementation Traps

All right, we’ve spoken about test design. Talking about good test design is not enough, though, because the devil is in the details. So let’s inspect our tests and challenge our test’s actual implementation.

### Foo Bar What?

For this first trap in test implementation, we’ve got a guest! It’s BB-8, and he’s found something in one of our tests:

![What does “Foo Bar” mean?!](/smashing-testing-pitfalls/3-frontend-testing-pitfalls.png "BB8 doesn’t know what Foo Bar is about.")

He’s found a name that might be familiar to us but not to it: Foo Bar. Of course, we developers know that Foo Bar is often used as a placeholder name. But if you see it in a test, will you immediately know what it represents? Again, the test might be more challenging to understand at first sight.

Fortunately, this trap is easy to fix. Let’s look at the Cypress test below. It’s an end-to-end test, but the advice is not limited to this type.

```javascript
// Cypress
it('should create and read product', () => {
    // Open module to add product
    cy.get('a[href="#/sw/product/create"]').click();

    // Add basic data to product
    cy.get('.sw-field—product-name').type('T-Shirt Ackbar');
    cy.get('.sw-select-product__select_manufacturer')
        .type('Space Company');

    // … test continues …
});
```

This test is supposed to check whether a product can be created and read. In this test, I simply want to use names and placeholders connected to a real product:

* For the name of a t-shirt product, I want to use “T-Shirt Akbar”.
* For the manufacturer’s name, “Space Company” is one idea.

::hint{type="info",title="Little hint"}
You don’t need to invent all of the product names, though. You could auto-generate data or, even more prettily, import it from your production state. Anyway, I want to stick to the golden rule, even when it comes to naming.
::

### Look at selectors you must

New trap, same test. Look at it again, do you notice something?

```javascript
// Cypress
it('should create and read product', () => {
    // Open module to add product
    cy.get('a[href="#/sw/product/create"]').click();

    // Add basic data to product
    cy.get('.sw-field—product-name').type('T-Shirt Ackbar');
    cy.get('.sw-select-product__select_manufacturer')
        .type('Space Company');

    // … Test continues …
});
```

Did you notice those selectors? They’re CSS selectors. Well, you might be wondering, “Why are they problematic? They are unique, they are easy to handle and maintain, and I can use them flawlessly!” However, are you sure that’s always the case?

The truth is that CSS selectors are prone to change. If you refactor and, for example, change classes, the test might fail, even if you haven’t introduced a bug. Such refactoring is common, so those failures can be annoying and exhausting for developers to fix. So, please keep in mind that a test failing without a bug is a false positive, giving no reliable report for your application.

!["Look at selectors you must!"](/smashing-testing-pitfalls/4-frontend-testing-pitfalls.png "We advise you to look after the selectors you use.")

This trap refers mainly to end-to-end testing in this case. In other circumstances, it could apply to unit testing as well — for example, if you use selectors in component testing. As Kent C. Dodds states in [his article](https://kentcdodds.com/blog/testing-implementation-details) on the topic:

> “You shouldn’t test implementation details.”

In my opinion, there are better alternatives to using implementation details for testing. Instead, test **things that a user would notice**. Better yet, choose selectors less prone to change. My favorite type of selector is the data attribute. A developer is less likely to change data attributes while refactoring, making them perfect for locating elements in tests. I recommend naming them in a meaningful way to clearly convey their purpose to any developers working on the source code. It could look like this:

```javascript
// Cypress
cy.get('[data-test=sw-field—product-name]')
  .type('T-Shirt Ackbar');
cy.get('[data-test=sw-select-product__select_manufacturer]')
  .type('Space Company');
```

False positives are just one trouble we get into when testing implementation details. The opposite, false negatives, can happen as well when testing implementation details. A false positive happens when a test passes even when the application has a bug. The result is that testing again eats up headspace, contradicting our golden rule. So, we need to avoid this as much as possible.

::hint={type="info",title="Note"}
This topic is huge, so it would be better dealt with in another article. Until then, I’d suggest heading over to Dodds’ article to learn more on the topic.
::

### Wait for it!

Last but not least, this is a topic I cannot stress enough. I know this will be annoying, but I still see many people do it, so I need to mention it here as a trap.

It’s the fixed waiting time issue that I talked about in [my article on flaky tests](https://www.smashingmagazine.com/2021/04/flaky-tests-living-nightmare/). Take a look at this test:

```javascript
// Cypress
Cypress.Commands.add('typeSingleSelect', {
        prevSubject: 'element',
    },
    (subject, value, selector) => {
    cy.wrap(subject).should('be.visible');
    cy.wrap(subject).click();

    cy.wait(500);            
    cy.get(`${selector} input`)
      .type(value);
});
```

The little line with `cy.wait(500)` is a fixed waiting time that pauses the test’s execution for half a second. Making this mistake more severe, you’ll find it in a custom command, so that the test will use this wait multiple times. The number of seconds will add up with each use of this command. That will **slow down the test way too much**, and it’s not necessary at all. And that’s not even the worst part. The worst part is that we’ll be waiting for too little time, so our test will execute more quickly than our website can react to it. This will cause flakiness, because the test will fail sometimes. Fortunately, we can do plenty of things to avoid fixed waiting times.

All paths lead to waiting dynamically. I’d suggest favoring the more deterministic methods that most testing platforms provide. Let’s take a closer look at my favorite two methods.

* **Wait for changes in the UI.**
  My first method of choice is to wait for changes in the UI of the application that a human user would notice or even react to. Examples might include a change in the UI (like a disappearing loading spinner), waiting for an animation to stop, and the like. If you use Cypress, this could look as follows:

```javascript
// Cypress
cy.get('data-cy="submit"').should('be.visible');
```

Almost every testing framework provides such waiting possibilities.

* **Waiting on API requests.**
  Another possibility I’ve grown to love is waiting on API requests and their responses, respectively. To name one example, Cypress provides neat features for that. At first, you would define a route that Cypress should wait for:
```javascript
// Cypress
cy.intercept({
    url: '/widgets/checkout/info',
    method: 'GET'
}).as('checkoutAvailable');
```
Afterwards, you can assert it in your test, like this:

```javascript
// Cypress
cy.wait('@request').its('response.statusCode')
  .should('equal', 200);
```
This way, your test will remain stable and reliable, while managing time efficiently. In addition, the test might be even faster because it’s only waiting as long as it needs to.

## Major takeaways

Coming back to Admiral Akbar and Star Wars in general, the Battle of Endor turned out to be a success, even if a lot of work had to be done to achieve that victory. With teamwork and a couple of countermeasures, it was possible and ultimately became a reality.

Apply that to testing. It might take a lot of effort to avoid falling into a testing trap or to fix an issue if the damage is already done, especially with legacy code. Very often, you and your team will need a **change in mindset with test design** or even a lot of refactoring. But it will be worth it in the end, and you will see the rewards eventually.

The most important thing to remember is the golden rule we talked about earlier. Most of my examples follow it. All pain points arise from ignoring it. A test should be a friendly assistant, not a hindrance! This is the most critical thing to keep in mind. A test should feel like you’re going through a routine, not solving a complex mathematical formula. Let’s do our best to achieve that.

!["See, R2-D2 is catching bugs with ease here."](/smashing-testing-pitfalls/5-frontend-testing-pitfalls.png "Testing should feel lean and like fun!")

I hope I was able to help you by giving some ideas on the most common pitfalls I’ve encountered. However, I’m sure there will be a lot more traps to find and learn from. I’d be so glad if you shared the pitfalls you’ve encountered most in the comments below, so that we all can learn from you as well. See you there!
