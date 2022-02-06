describe('Check "Speaking" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load real talks in listing and detail (visual)', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Speaking]').click();

    cy.get('[data-cy=PastTalkOverview]').should('be.visible');

    if (Cypress.env('percy')) {
      cy.percySnapshot('Speaking page');
    }

    cy.get('[data-cy=ButtonToTalks]').scrollIntoView();
    cy.get('[data-cy=ButtonToTalks]').click();

    cy.contains('[data-cy=Title]', 'Ramona Schwering\'s past talks').should('be.visible');
    cy.get('[data-cy=SingleArticle]').first().should('be.visible');
    cy.get('[data-cy=SingleArticle]').first().click();
    cy.get('[data-cy="TalkDetailContent"]').should('be.visible');
  });

  it('should load real publications in listing', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Speaking]').click();

    cy.get('[data-cy=PublicationOverview]').should('be.visible');
    cy.get('[data-cy=ButtonToPublications]').scrollIntoView();
    cy.get('[data-cy=ButtonToPublications]').click();

    cy.get('[data-cy=PublicationListingTitle]').should('be.visible');
  });

  it('should display past talks in listing and detail', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Speaking]').click();

    cy.get('[data-cy=PastTalkOverview] [data-cy=SingleArticle]').first().should('be.visible');
    cy.get('[data-cy=PastTalkOverview] [data-cy=SingleArticle]').first().click();

    cy.get('[data-cy="Title"]').should('be.visible')
    cy.get('[data-cy=TalkDetailContent]').should('be.visible');

    cy.get('[data-cy="DetailSummary"]').scrollIntoView();
    cy.get('[data-cy="DetailSummaryDescription"]').should('be.visible');
  });
});
