/// <reference types="Cypress" />

/* Tests that the page looks as expected, but mostly just examples */

import {realNames} from '../../../real_names.js'
import namePieces from '../../../name_pieces.json'

describe('Page Sanity', () => {
  before(() => {
    cy.visit('/')
  })
  it('shows expected title', () => {
    cy.getBySel('title').should('have.text', 'The Game Company Name Generator')
  })
  it('shows expected subtitle', () => {
    // Just showing another way to get elements. In this case the 2nd <p> tag on page
    cy.get('p').eq(1).should('have.text', 'Inspired by the minds at our favorite game companies')
  })
  it('shows a real company name', () => {
    cy.getBySel('name').invoke('text').then(text => {
      expect(realNames.includes(text), `realNames array includes ${text}`).to.be.true
      // expect(text, `${text} is in realNames array`).to.be.oneOf(realNames)
    })
  })
  it('shows the name generation button', () => {
    cy.getBySel('btn').contains('Get another company name!')
  })
  it('generates a name after a click & a trip to server', () => {
    cy.getBySel('name').invoke('text').then(prevText => {
      cy.clickAndTest(prevText, namePieces)
    })
  })
})
