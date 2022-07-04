/// <reference types="Cypress" />

/* Tests the button in isolation by mocking the same return value w/each click */

const fakeName = 'Fake Company Name'

function companyName() {
  cy.wait(Math.floor(Math.random() * 500))
  return fakeName
}

describe('Button functionality', () => {
  before(() => {
    cy.visit('/')
  })
  it('generates a name after each of many clicks with varying mocked server response times', () => {
    cy.forLoop(8, () => {
      cy.intercept('sgcng.php', companyName())
      cy.getBySel('btn').click()
      cy.getBySel('name').should($name => {
        expect($name.text()).to.equal(fakeName)
      })
    })
  })
})