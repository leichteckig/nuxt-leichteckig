describe('Check Home page', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load home page (visual)', () => {
    cy.get('[data-cy=Polaroid]').should('be.visible');
    cy.contains('[data-cy=Welcome]', 'Hi, I\'m Ramona').should('be.visible');

    cy.get('[data-cy=FeaturedPosts]').should('be.visible');
    if (Cypress.env('percy')) {
      cy.percySnapshot('Home page');
    }
  });

  it('should change color mode to dark and light (visual)', () => {
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

    if (Cypress.env('percy')) {
      cy.percySnapshot('Home page - Dark mode');
    }
  });

  it('should change to german locale (visual)', () => {
    cy.contains('[data-cy=lang-de]', 'DE').should('be.visible');
    cy.get('[data-cy=lang-de]').click();

    cy.contains('[data-cy=lang-en]', 'EN').should('be.visible');
    cy.contains('[data-cy=Welcome]', 'Hallo, ich bin Ramona Schwering!').should('be.visible');
    cy.contains('[data-cy=Writing]', 'Blog').should('be.visible');
    cy.contains('[data-cy=Speaking]', 'Vorträge').should('be.visible');
    cy.contains('[data-cy=Attending]', 'Events').should('be.visible');

    if (Cypress.env('percy')) {
      cy.percySnapshot('Home page - German');
    }
  });

  it('should open imprint', () => {
    cy.get('[data-cy=Footer]').scrollIntoView();
    cy.get('[data-cy=Footer]').should('be.visible');
    cy.get('[data-cy=NavToImprint]').click();
    cy.contains('[data-cy=Title]', 'Imprint').should('be.visible');
  });

  it('should open data protection page', () => {
    cy.get('[data-cy=Footer]').scrollIntoView();
    cy.get('[data-cy=Footer]').should('be.visible');
    cy.get('[data-cy=NavToDP]').click();
    cy.contains('[data-cy=Title]', 'Privacy Notice').should('be.visible');
  });
});
