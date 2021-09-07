describe('Check "Attending" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load real events', () => {
    cy.intercept('POST', '/_content/conferences').as('getEvents');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();
    cy.get('[data-cy=EventAppearances]').should('be.visible');

    cy.wait('@getEvents')
      .its('response.statusCode').should('equal', 200);
  });

  it('should display events', () => {
    cy.intercept('POST', '/_content/conferences', {
      fixture: 'events.json'
    }).as('getEvents');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();
    cy.get('[data-cy=EventAppearances]').should('be.visible');

    cy.wait('@getEvents');

    cy.contains('[data-label="Title"]', 'How to survive conferences as an introvert').should('be.visible');
    cy.contains('[data-label="Title"]', 'Not always as a speaker, but it\'s our Cypress Germany meetup!')
      .should('be.visible');
    cy.contains('[data-label="Title"]', 'Front-End Test Fest').should('be.visible');
    cy.get('tr.talk--old')
      .should('have.css', 'text-decoration', 'line-through solid rgb(128, 128, 128)');
  });

  it('should link to my past talks', () => {
    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Attending]').click();
    cy.get('[data-cy=EventAppearances]').should('be.visible');

    cy.get('[data-cy=PastTalks]').scrollIntoView();
    cy.get('[data-cy=PastTalks]').should('be.visible');
    cy.get('[data-cy=ButtonToTalks]').click();
    cy.contains('[data-cy=PastTalkHeader]', 'Talks I held in the past').should('be.visible');
  });
});
