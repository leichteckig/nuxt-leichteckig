describe('Check "Speaking" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load real talks in listing and detail', () => {
    cy.intercept('POST', '/_content/talks').as('getTalks');
    cy.intercept('POST', '/_content/talks/*').as('getSingleTalk');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Speaking]').click();

    cy.wait('@getTalks')
      .its('response.statusCode').should('equal', 200);

    cy.get('[data-cy=PastTalkOverview]').should('be.visible');
    cy.get('[data-cy=ButtonToTalks]').scrollIntoView();
    cy.get('[data-cy=ButtonToTalks]').click();

    cy.wait('@getTalks')
      .its('response.statusCode').should('equal', 200);
    cy.contains('[data-cy=Title]', 'Past talks').should('be.visible');
    cy.get('[data-cy=SingleArticle]').first().should('be.visible');
    cy.get('[data-cy=SingleArticle]').first().click();

    cy.wait('@getSingleTalk')
      .its('response.statusCode').should('equal', 200);

    cy.get('[data-cy="TalkDetailContent"]').should('be.visible');
  });

  it('should load real publications in listing', () => {
    cy.intercept('POST', '/_content/publications').as('getPublications');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Speaking]').click();

    cy.wait('@getPublications')
      .its('response.statusCode').should('equal', 200);

    cy.get('[data-cy=PublicationOverview]').should('be.visible');
    cy.get('[data-cy=ButtonToPublications]').scrollIntoView();
    cy.get('[data-cy=ButtonToPublications]').click();

    cy.wait('@getPublications')
      .its('response.statusCode').should('equal', 200);
    cy.contains('[data-cy=Title]', 'My content and other publications').should('be.visible');
  });

  it('should display past talks in listing and detail', () => {
    cy.intercept('POST', '/_content/talks',  {
      fixture: 'talks.json'
    }).as('getTalks');
    cy.intercept('POST', '/_content/talks/*',  {
      fixture: 'single-talk.json'
    }).as('getFirstTalk');

    cy.intercept('POST', '/_content/talks').as('getTalks');
    cy.intercept('POST', '/_content/talks/*').as('getSingleTalk');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Speaking]').click();

    cy.wait('@getTalks');
    cy.get('[data-cy=PastTalkOverview] [data-cy=SingleArticle]').should('be.visible');
    cy.get('[data-cy=PastTalkOverview] [data-cy=SingleArticle]').click();

    cy.wait('@getFirstTalk');
    cy.url().should('include', '/talks/testing-trap')
    cy.contains('[data-cy="Title"]', 'It\'s a (Testing) Trap!')
      .should('be.visible')
    cy.get('[data-cy=TalkDetailContent]').should('be.visible');

    cy.get('[data-cy="DetailSummary"]').scrollIntoView();
    cy.contains(
      '[data-cy="DetailSummaryDescription"]',
      '“It’s a trap” - a call or feeling we all might be familiar with'
    ).should('be.visible');

    cy.get('[data-cy="TalkDetailContent"]').first().scrollIntoView();
    cy.contains(
      '[data-cy="TalkDetailContent"]',
      'a call or feeling we all might be familiar with, not only when it comes to Star Wars.'
    ).first().should('be.visible');
  });
});
