describe('Check "About" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display about page with content (visual)', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=About]').click();

    cy.get('[data-cy=AboutTitle]').should('be.visible');
    if (Cypress.env('percy')) {
      cy.percySnapshot('About page');
    }
  });
});
