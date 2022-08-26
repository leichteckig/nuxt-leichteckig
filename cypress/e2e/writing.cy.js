describe('Check "Writing" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display blog posts in listing and detail (visual)', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Writing]').click();

    cy.get('[data-cy=BlogListing]').should('be.visible');
    if (Cypress.env('percy')) {
      cy.percySnapshot('Writing page (Listing)');
    }

    cy.get('[data-cy=SinglePost]').first().click();
    cy.get('[data-cy=BlogDetailContent]').should('be.visible');
    cy.get('[data-cy="Title"]').should('be.visible');

    cy.get('[data-cy="DetailSummary"]').scrollIntoView();
    cy.get('[data-cy="DetailSummaryDescription"]').should('be.visible');

    cy.get('[data-cy="BlogDetailContent"]').first().scrollIntoView();
    cy.get('[data-cy="BlogDetailContent"]').first().should('be.visible');
    if (Cypress.env('percy')) {
      cy.percySnapshot('Writing page (Detail)');
    }
  });
});
