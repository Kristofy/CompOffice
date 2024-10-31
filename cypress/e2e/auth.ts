import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';

import { baseUrl, loggingIn } from '../support/e2e';

Given('A felhasználó bejelentkezett', () => {
	loggingIn();
});

// Scenario: A felhasználó bejelentkezik
// Given A felhasználó fiókja Azure AD-ben megengedett
// When Oldal látogatása
// Then Automatikus bejelentkeztetés
Given('A felhasználó fiókja Azure AD-ben megengedett', () => {
	// TOOD(Kristofy): Azure integráció lecserélése
});

When('Oldal látogatása', () => {});

Then('Automatikus bejelentkeztetés', () => {});

// Scenario: A felhasználó nem jelentkezhet be
// Given A felhasználó fiókja Azure AD-ben nem megengedett
// When Oldal látogatása
// Then Az oldal visszautasítja a bejelentkezést
Given('A felhasználó fiókja Azure AD-ben nem megengedett', () => {
	// TOOD(Kristofy): Azure integráció lecserélése
});

Then('Az oldal visszautasítja a bejelentkezést', () => {});

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
	// A button that has role="menuitem" and text Sign Out
	cy.get('button[role="menuitem"]').contains('Sign Out').click();
});

Then('A bejelentkező oldalra kerül', () => {
	cy.url().should('eq', baseUrl + 'api/auth/signin');
});

Then('A felhasználó megfelelő jogosultságokkal rendelkezik', () => {
	// In production the user roles are handled by the azure provider
});

// Scenario: A felhasználónak megfeleő jogosultságai vannak
// Given A felhasználó bejelentkezett
// When Oldal látogatása
// Then A felhasználó megfelelő jogosultságokkal rendelkezik
// TODO(Kristofy): Jogosultságok ellenőrzése
