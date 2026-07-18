describe('Check "Attending" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load real events', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();

    cy.get('[data-cy=EventAppearances]').should('be.visible');

  });

  it('should display events', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();
    cy.get('[data-cy=EventAppearances]').should('be.visible');

    cy.get('[data-label="Title"]').should('be.visible');
    // text-decoration shorthand serializes differently across browsers —
    // assert the longhand properties instead
    cy.get('tr.talk--old')
      .should('have.css', 'text-decoration-line', 'line-through')
      .and('have.css', 'color', 'rgb(128, 128, 128)');
  });

  it.skip('should expand and collapse past events', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();
    cy.get('[data-cy=EventAppearances]').should('be.visible');
    cy.waitForHydration();

    cy.get('.talks__past-inner').should('not.be.visible');

    cy.get('.talks__past-conference--title')
      .should('have.attr', 'aria-expanded', 'false')
      .click();

    cy.get('.talks__past-conference--title').should('have.attr', 'aria-expanded', 'true');
    cy.get('.talks__past-inner tr.talk--old').first().should('be.visible');

    // keyboard support
    cy.get('.talks__past-conference--title').type('{enter}');
    cy.get('.talks__past-conference--title').should('have.attr', 'aria-expanded', 'false');
    cy.get('.talks__past-inner').should('not.be.visible');
  });

  it.skip('should link to my past talks', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();
    cy.get('[data-cy=EventAppearances]').should('be.visible');

    cy.get('[data-cy=PastTalks]').scrollIntoView();
    cy.get('[data-cy=PastTalks]').should('be.visible');
    cy.get('[data-cy=ButtonToTalks]').click();
    cy.contains('[data-cy=PastTalkHeader]', 'Talks I held in the past').should('be.visible');
  });
});
