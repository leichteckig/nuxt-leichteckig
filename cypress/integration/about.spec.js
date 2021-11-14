describe('Check "About" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should display about page with content', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=About]').click();

  });
});
