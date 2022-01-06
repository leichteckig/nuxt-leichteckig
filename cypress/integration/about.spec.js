describe('Check "About" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display about page with content (visual)', () => {
    cy.intercept({
      url: 'https://api.github.com/users/leichteckig/starred',
      method: 'GET'
    }).as('projectCall');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=About]').click();

    cy.get('[data-cy=AboutTitle]').should('be.visible');
    cy.wait('@projectCall').its('response.statusCode').should('equal', 200);
    if (Cypress.env('percy')) {
      cy.percySnapshot('About page');
    }
  });
});
