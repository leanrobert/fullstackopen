describe('Bloglist app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3001')
  })

  it('front page can be opened', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })
})