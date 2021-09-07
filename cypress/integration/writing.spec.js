describe('Check "Writing" area', () => {
  beforeEach(() => {
    cy.visit('/');
  });

  it('should load real blog posts in listing and detail', () => {
    cy.intercept('POST', '/_content/articles').as('getPosts');
    cy.intercept('POST', '/_content/articles/*').as('getFirstPost');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Writing]').click();

    cy.wait('@getPosts')
      .its('response.statusCode').should('equal', 200);
    cy.get('[data-cy=BlogListing]').should('be.visible');

    cy.get('[data-cy=SinglePost]').first().click();

    cy.wait('@getFirstPost')
      .its('response.statusCode').should('equal', 200);
    cy.get('[data-cy=BlogDetailContent]').should('be.visible');
  });

  it('should display blog posts in listing and detail', () => {
    cy.intercept('POST', '/_content/articles',  {
      fixture: 'posts.json'
    }).as('getPosts');
    cy.intercept('POST', '/_content/articles/*',  {
      fixture: 'single-post.json'
    }).as('getFirstPost');

    cy.get('[data-cy=HeaderMain]').should('be.visible');
    cy.get('[data-cy=Writing]').click();

    cy.wait('@getPosts');
    cy.get('[data-cy=BlogListing]').should('be.visible');
    cy.get('[data-cy=SinglePost]').first().click();

    cy.wait('@getFirstPost');

    cy.url().should('include', '/blog/smashing-common-pitfall-traps')
    cy.get('[data-cy=BlogDetailContent]').should('be.visible');
    cy.contains('[data-cy="Title"]', 'It’s A (Front-End Testing) Trap!')
      .should('be.visible')

    cy.get('[data-cy="DetailSummary"]').scrollIntoView();
    cy.contains('[data-cy="DetailSummaryDescription"]', 'Six Common Testing Pitfalls And How To Solve Them')
      .should('be.visible');

    cy.get('[data-cy="BlogDetailContent"]').first().scrollIntoView();
    cy.contains(
      '[data-cy="BlogDetailContent"]',
      'When writing front-end tests, you’ll find a lot of pitfalls along the way.'
    ).first().should('be.visible');
  });
});
