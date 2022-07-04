// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('forLoop', (n, f) => {
  for (let i = 0; i < n; i += 1) {
    f();
  }
})

Cypress.Commands.add('getBySel', (selector, ...args) => {
  return cy.get(`[data-test=${selector}]`, ...args)
})

Cypress.Commands.add('validateName', (text, namePieces) => {
  let textArr = text.split(/\s/)
  // If necessary, merge 2-word adjectives.
  if (textArr.length === 4) {
    let adj = textArr.splice(0, 2)
    adj = `${adj[0]} ${adj[1]}`
    textArr.unshift(adj)
  }
  expect(
    namePieces.adjectives.includes(textArr[0]) &&
    namePieces.nouns.includes(textArr[1]) &&
    namePieces.second_nouns.includes(textArr[2]),
    `All 3 pieces of ${text} are in namePieces array`
  ).to.be.true
})

Cypress.Commands.add('clickAndTest', (prevText, namePieces) => {
  cy.getBySel('btn').click().then(() => {
    cy.getBySel('name').should($name => {
      expect(prevText).to.not.equal($name.text())
    })
    // Name should come from name_pieces.json.
    cy.getBySel('name').invoke('text').then(text => {
      cy.validateName(text, namePieces)
    })
  })
})
