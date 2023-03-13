describe('Bloglist app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.visit('http://localhost:3001')
  })

  it('Log in form is shown', function () {
    cy.contains('log in to application')
    cy.contains('username')
    cy.contains('password')
    cy.contains('log in')
  })

  describe('Login', function() {
    it('succeeds with correct credentials', function() {
      cy.get('input:first').type('lrobert')
      cy.get('input:last').type('lean1234')
      cy.get('#login').click()
    })

    it('fails on wrong credentials', function() {
      cy.get('input:first').type('lrobert')
      cy.get('input:last').type('lean1')
      cy.get('#login').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })
})