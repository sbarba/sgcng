/// <reference types="Cypress" />

/* Tests back-end responses directly (no involvement of the page) */

import namePieces from '../../../name_pieces.json'

describe('Random name generation by server', () => {
  it('generates a valid name', () => {
    let prevText = 'Not Real Name'
    cy.forLoop(32, () => {
      cy.request('sgcng.php').as('getName')
      cy.get('@getName').then(r => {
        expect(prevText).to.not.equal(r.body)
        cy.validateName(r.body, namePieces)
        prevText = r.body
      })
    })
  })
})
