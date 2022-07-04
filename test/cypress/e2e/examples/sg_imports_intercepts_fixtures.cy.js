/// <reference types="Cypress" />

/* Uses sgcng as the basis for intercept & fixture examples */

import {realNames} from '../../../../real_names.js'
import namePieces from '../../../../name_pieces.json'
import fakeNames from '../../fixtures/fake_names.json'

function randName(fakeNames) {
  const adjective = fakeNames.adjectives[Math.floor(Math.random() * fakeNames.adjectives.length)]
  const noun = fakeNames.nouns[Math.floor(Math.random() * fakeNames.nouns.length)]
  const secondNoun = fakeNames.second_nouns[Math.floor(Math.random() * fakeNames.second_nouns.length)]
  return `${adjective} ${noun} ${secondNoun}`
}

describe('Using intercepts & fixtures', () => {
  beforeEach(() => {
    cy.visit('/')
  })
  it.skip('fails when I expect it to', () => {
    cy.getBySel('name').invoke('text').then(text => {
      expect(text).to.eq('Fake Company Name')
    })
  })
  it('uses (necessarily destructured) import from a .js file', () => {
    cy.getBySel('name').invoke('text').then(text => {
      expect(realNames.includes(text), `realNames array includes ${text}`).to.be.true
    })
  })
  it('uses import from a .json file', () => {
    cy.intercept('sgcng.php', randName(fakeNames))
    cy.getBySel('name').invoke('text').then(prevText => {
      cy.clickAndTest(prevText, namePieces)
    })
  })
  it('uses cy.fixture(filename).then()', ()=> {
    cy.fixture('fake_names.json').then(fakeNamesJson => {
      cy.intercept('sgcng.php', randName(fakeNamesJson))
      cy.getBySel('name').invoke('text').then(prevText => {
        cy.clickAndTest(prevText, namePieces)
      })
    })
  })
  it('uses fixture property on intercept() to import fixture', () => {
    cy.intercept('GET', 'sgcng.php', {fixture: 'fake_name.txt'})
    cy.getBySel('name').invoke('text').then(prevText => {
      cy.clickAndTest(prevText, namePieces)
    })
  })
  it('uses fixture property on intercept() with plain string', ()=> {
    // Alias is useless since wait('@fakeNameRequest') would be irrelevant here, but just wanted to show it.
    cy.intercept('sgcng.php', 'Tin Pot Tangerine Games').as('fakeNameRequest')
    cy.getBySel('name').invoke('text').then(prevText => {
      cy.clickAndTest(prevText, namePieces)
    })
  })

})
