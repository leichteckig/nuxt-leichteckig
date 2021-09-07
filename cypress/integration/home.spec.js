describe('Check Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load home page', () => {
    cy.get('[data-cy=Polaroid]').should('be.visible');
    cy.contains('[data-cy=Welcome]', 'Hi, I\'m Ramona').should('be.visible');
    cy.get('[data-cy=FeaturedPosts]').should('be.visible');
  });

  it('should change color mode to dark and light', () => {
    cy.get('[data-cy=lightswitch]').should('be.visible');
    cy.get('[data-cy=lightswitch]').click();

    cy.get('html').should('have.class', 'light-mode');
    cy.get('body')
      .should('have.css', 'background-color', 'rgb(255, 255, 255)');
    cy.get('[data-cy=WelcomeDescription]')
      .should('have.css', 'color', 'rgb(9, 26, 40)');

    cy.get('[data-cy=darkswitch]').should('be.visible');
    cy.get('[data-cy=darkswitch]').click();

    cy.get('html').should('have.class', 'dark-mode');
    cy.get('body')
      .should('have.css', 'background-color', 'rgb(9, 26, 40)');
    cy.get('[data-cy=WelcomeDescription]')
      .should('have.css', 'color', 'rgb(235, 244, 241)');
  });

  it('should open imprint', () => {
    cy.get('[data-cy=Footer]').scrollIntoView();
    cy.get('[data-cy=NavToImprint]').click()
    cy.contains('[data-cy=Title]', 'Imprint').should('be.visible');
  });
});
