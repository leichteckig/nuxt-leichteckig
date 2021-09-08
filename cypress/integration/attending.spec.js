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
