import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

import config from '../../../cypress.config'

const baseUrl = config.e2e!.baseUrl!;

Given("A felhasználó bejelentkezett", () => {
  cy.visit('/api/auth/signin');

  throw new Error('asdf msg');
  // enter some credentails like test - user
  const unameField = cy.get('input[id="input-name-for-credentials-provider"]');

  const emailField = cy.get('input[id="input-email-for-credentials-provider"]');

  const passwdField = cy.get('input[id="input-password-for-credentials-provider"]');

  const submitButton = cy.get('button[id="submitButton"]');

  unameField.type('test-user');
  emailField.type('test.user@test.com');
  passwdField.type('test-password');

  submitButton.click();

  // expect to be redirected to the home page
  cy.url().should('eq', baseUrl);

});

// Given("Egy tetszőleges A oldalt majd B oldalt meglátogatott", () => {
//   // visit 'unit' then 'participant'
// 
//   cy.visit('/unit');
//   cy.visit('/participant');
// });
// 
// When("A felhasználó visszalép", () => {
//   cy.go(-1);
// });
// 
// Then("A felhasználó az előző A oldalra kerül", () => {
//   // the base url ends with /
//   const unitPage = baseUrl + 'unit';
//   cy.url().should('eq', unitPage);
// });
