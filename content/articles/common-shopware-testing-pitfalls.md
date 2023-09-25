---
title: Moe's notes on Shopware's test automation pitfalls
description: Sometimes, our pipelines fail. If that happens on our own merge requests, we need to fix it - I can imagine you feel the same if you're working with Shopware's tests. These are my notes on common test automation traps in the context of working with Shopware.
img: shopware-testing-bugs/bingo.jpg
createdAt: 2021-09-28T00:00:00.724Z
alt: common Shopware testing traps
author:
  name: Ramona Schwering
  image: https://avatars.githubusercontent.com/u/29896429?s=120&v=4
tags:
- Shopware
- Unit Tests
- End-To-End Tests
- Testing pitfalls
otherLanguages:
- locale: de
  name: german
  path: /de/blog/common-shopware-testing-pitfalls
---
This article should be a part of specific help resources to guide you on how to inspect, debug and fix failing pipelines. 
In a way, it's like a remark sheet for all those little hassles I encounter in my daily routine or as questions in 
StackOverflow or via [Shopware's community slack](http://shopwarecommunity.slack.com). Notes serve like a check point for thoughts, right? 

::hint{type="info",title="Updated on September 28, 2021"}
It's a living document, so feel free to contribute, reach out to me and check at a later date, to see if new pitfalls were discovered.
::

## General things

### Honorable mention

I already have a [guide](smashing-common-pitfall-traps) on how to check your tests for general, common pitfall traps.
It might be helpful to you if you want to get a grip on inspecting all information on this topic.

### Are there already presets, tests or other testing related content by Shopware?

Of course there are - sort of. [Shopware 6](https://github.com/shopware/platform) is open source, so are all its tests.
So you can find everything connected to our tests in this repository:
* PHPUnit tests can be found as `Test` folder im many directories of the [Core bundle](https://github.com/shopware/platform/tree/trunk/src/Core)
* Jest tests for [Storefront](https://github.com/shopware/platform/tree/trunk/src/Storefront/Resources/app/storefront/test) and [Administration](https://github.com/shopware/platform/tree/trunk/src/Administration/Resources/app/administration/test)
* Cypress tests for [Storefront](https://github.com/shopware/platform/tree/trunk/src/Storefront/Resources/app/storefront/test/e2e) and [Administration](https://github.com/shopware/platform/tree/trunk/src/Administration/Resources/app/administration/test/e2e)
* [Pipeline configuration](https://github.com/shopware/platform/blob/trunk/.gitlab-ci.yml)

Regarding documentation, there's already lots of content to discover, too:
* [Testing area](https://developer.shopware.com/docs/guides/plugins/plugins/testing) in Shopware's developer docs
* [Testing best practises](https://developer.shopware.com/docs/resources/guidelines/testing) in the context of Shopware

But there's more than that. Shopware provides some preset plugins to get you covered with elpers and commads:
* [E2E Platform Testsuite](https://www.npmjs.com/package/@shopware-ag/e2e-testsuite-platform) for Shopware 6
* [Jest Test preset](https://www.npmjs.com/package/@shopware-ag/jest-preset-sw6-admin) for Shopware 6 administration unit tests

Feel free to check them out. 💙

### Setup and start of tests

If not stated otherwise, I assume you're using the default Shopware setup mentioned in Shopware 6's developer 
documentation. Thus, I'll refer to a setup based on the development template and the usage of PSH scripts.

### May I waive using the PSH scripts?

Yes, sure! This should be easy because you can just use the normal commands. So for example with Cypress: 
Just use the path of your test's root directory (or navigate to it) and then `./node_modules/.bin/cypress open`. 
With Jest and certainly PHPUnit it should be the same. The PSH scripts serve as a wrapper around the default 
commands anyway, so you can even take a look at those scripts to see how to start the tests by yourself.

## PHP Unit Tests

### Again, dependency updates ...

Sometimes it's useful to not pin dependency updates, in order to detect defects due to incompatibilities or such. Let's
take Symfony updates as an example: There might be a case they release an update breaking our pipelines. Let's inspect a
sudden fails connected to Symfony, e.g.:
```bash
"Parameter #5 $default of method Symfony\\Component\\Console\\Command\\Command::addOption()
 expects array<string>|bool|string|null, int given.",
```

#### Solution

Sure, we want to stay up to date, but this is the downside of it. So if you see an error connected to Symfony, 
make sure to check their releases.

### Migration fails

It might happen that our PHPUnit pipelines fail due to new or changed migrations. Here is a representative error:

```bash
In AbstractMySQLDriver.php line 61:
  An exception occurred while executing 'SELECT * FROM migration WHERE class  = ?' 
  with params ["Shopware\\Core\\Migration\\Migration1536232600Language"]:
  SQLSTATE[42S02]: Base table or view not found: 1146 Table 'sw6.migration' doesn't exist
```

Sometimes the migration tests fails even directly. What to do now?

#### Solution

If you're writing migrations, always keep our 
[docs](https://developer.shopware.com/docs/guides/plugins/plugins/plugin-fundamentals/database-migrations) in mind. 
If you need to debug a failing pipeline, it may be the first step to check if all migrations are applied correctly.

A common error is the incorrect usage of languages. Please keep in mind that although german and english are the
default languages, it doesn't mean that both of then will be available every time!

## Jest Unit Tests

### jest.spyOn() not working as expected

jest.spyOn methods is not working as expected when the method is invoked as a callback (e.g. from the template). 
Solutions from 
[stackoverflow](https://stackoverflow.com/questions/61859423/why-doesnt-jest-spyon-sometimes-work-on-a-vue-components-method) 
etc. may confuse people because we do not use named imports of the components.

#### Solution

The component is saved in a variable and the spy has to be done beforehand. See here:

```javascript
const swMeteorSingleSelect = Shopware.Component.build('sw-meteor-single-select');

// Then proceed with your test
```

### Waiting for events to be fired

Sometimes it's necessary to wait for an event to be fired before continuing with the test for example when you're dealing with a collapsible panel in the storefront.

#### Solution

Wrapping an event listener inside a promise:

```javascript
const isEventTriggered = new Promise((resolve) => {
   $(collapse).on('shown.bs.collapse', () => {
      resolve();
   });
});

// Call a method which triggers the event
$(collapse).collapse('show');

// Wait till the event handler got fired
await isEventTriggered;
```

### How to fire an event

To test a certain functionality it's necessary to fire an event programmatically.

#### Solution

Using the `jsdom` environment in your spec file, you're able to access the entire DOM API which allows us to fire a 
default event or even custom events.

```javascript
/**
 * @jest-environment jsdom
 */
describe('some spec file', () => {
    it('should react to a click event', () => {
        const element = document.querySelector('.my-selector');
        const clickEvent = new Event('click');

        element.dispatchEvent(clickEvent);
    });
})
```

## End-to-End Tests with Cypress

### Local error when starting Cypress in docker environment

If you're working with Shopware's default docker setup, you might stumble across the following error message: 

```bash
No protocol specified (Cypress:92): Gtk-WARNING \*\*: 09:39:50.737: cannot open display: :0 
```

#### Solution

Based on this [guide](https://www.cypress.io/blog/2019/05/02/run-cypress-with-a-single-docker-command/#Interactive-mode) 
you need to forward the XVFB messages from Cypress out of the Docker container into an X11 server 
running on the host machine. The guide mentioned shows an example for Mac; other operating systems might require 
different commands. A starting point is trying out xhost configuration fitting to your needs. A possible command 
could be xhost +local:

## My tests are only failing sometimes

In CI, I see that a tests is failing in a non-deterministic way: Sometimes is passes, sometimes it fails.

#### Solution

To make this behaviour reproducible, please put it in a loop and execute it approx. 20-30 times. 
I recommend running that in CI, but it's possible to do that locally as well.

```javascript
// Use in build Lodash to repeat the test 100 times
Cypress._.times(100, (k) => {
   it(`typing hello ${k + 1} / 100`, () => {
       // Write your test steps in here
   })
})
```

If you see that were are indeed some fails, you might start by checking timing. If working locally you can use the 
following command to pause and resume Cypress test execution:

```javascript
cy.pause(); // This will pause the test, until you manually resume it
```

When working in CI, use a temporary wait to check the timing:

```javascript
cy.wait(500); // Time in ms, so this will wait for half a second
```

::hint{type="error",title="Be cautious!"}
Only use fixed waiting times temporarily, in order to debug. Replace this wait with a dynamic assertion if the
flakiness is caused by timing issues. See our best practises and Cypress Best practices for further information.
Needless to say, you should remove the loop as well, as soon as you're done with debugging.
::

If you want to learn more on this topic, there's an article by me on [flakiness](smashing-flaky-tests).

### The element I want to interact with is not available anymore

Sometimes, an element will be re-rendered or uses an animation which cause it to disappear for a blink or not 
being ready to interact with. The following error is the most famous one:

```bash
cy.click failed because the element has been detached from the DOM
```

Actually, there are many possible fixes or workaround, might be a wonderful idea for an own article I think. 
In the meantime, Cypress themselves wrote a [blog series](https://cypress.io/blog/tag/flake/) on many of those issues.
