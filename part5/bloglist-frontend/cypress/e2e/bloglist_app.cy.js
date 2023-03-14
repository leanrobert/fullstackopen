describe('Bloglist app', () => {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Leandro Robert',
      username: 'lrobert',
      password: 'lean1234'
    }
    cy.request('POST', 'http://localhost:3003/api/users', user)
    cy.visit('http://localhost:3000')
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

  describe('When logged in', function() {
    beforeEach(function() {
      cy.get('input:first').type('lrobert')
      cy.get('input:last').type('lean1234')
      cy.get('#login').click()
    })

    it('A blog can be created', function() {
      cy.contains('create a blog').click()
      cy.get('input[name="Title"]').type('titulo')
      cy.get('input[name="Author"]').type('autor')
      cy.get('input[name="Url"]').type('url.com')
      cy.contains('create').click()
    })
  })
})