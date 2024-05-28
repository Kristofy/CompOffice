import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";

import { baseUrl, loggingIn } from "../support/e2e";

Given("A felhasználó bejelentkezett", () => {
	loggingIn();
});


// Scenario: A felhasználó bejelentkezik
// Given A felhasználó fiókja Azure AD-ben megengedett
// When Oldal látogatása
// Then Automatikus bejelentkeztetés
Given('A felhasználó fiókja Azure AD-ben megengedett', () => {
	// TOOD(Kristofy): Azure integráció lecserélése
});

When('Oldal látogatása', () => {
});

Then('Automatikus bejelentkeztetés', () => {

});


// Scenario: A felhasználó nem jelentkezhet be
// Given A felhasználó fiókja Azure AD-ben nem megengedett
// When Oldal látogatása
// Then Az oldal visszautasítja a bejelentkezést
Given('A felhasználó fiókja Azure AD-ben nem megengedett', () => {
	// TOOD(Kristofy): Azure integráció lecserélése
});


Then('Az oldal visszautasítja a bejelentkezést', () => {

});



// Scenario: A bejelentkezett felhasználó a főoldalra kerül
// Given A felhasználó bejelentkezett
// When Oldal látogatása
// Then A főoldalra kerül
Then('A főoldalra kerül', () => {
	cy.url().should('eq', baseUrl);
});

// Scenario: A bejelentkezett felhasználó kijelentkezik
// Given A felhasználó bejelentkezett
// When Kijelentkezés
// Then A bejelentkező oldalra kerül
When('Kijelentkezés', () => {

});

Then('A bejelentkező oldalra kerül', () => {
	cy.url().should('eq', baseUrl + 'api/auth/signin');
});


// Scenario: A felhasználónak megfeleő jogosultságai vannak
// Given A felhasználó bejelentkezett
// When Oldal látogatása
// Then A felhasználó megfelelő jogosultságokkal rendelkezik
// TODO(Kristofy): Jogosultságok ellenőrzése
