import { When, Then, Given } from "@badeball/cypress-cucumber-preprocessor";
import { baseUrl, loggingIn } from "../support/e2e";

Given("A felhasználó bejelentkezett", () => {
	loggingIn();
});


// Feature: Modulok oldal
// Scenario: A felhasználó meglátogathatja a modulok oldalt
// Given A felhasználó bejelentkezett
// When A felhasználónak van jogosultsága megtekinteni a modulok oldalt
// Then A modulok oldal betölt
When('A felhasználónak van jogosultsága megtekinteni a modulok oldalt', () => {
	// TODO(Kristofy): implement claim based authorization
});

Then('A modulok oldal betölt', () => {
	cy.url().should('eq', baseUrl + '/modules');
});

// Scenario: A Szűrők megfelelően működnek, üres állapotból indulnak
// Given A modulok oldal betölt
// Then A szűrők megfelelően működnek, üres állapotból indulnak
Given('A modulok oldal betölt', () => {
	cy.visit(baseUrl + '/modules');
});
// TODO(Kristofy): A szúrők betöltését nem kell tesztelni

// Scenario: A kijelölt modul részletesen megjelenik
// Given A modulok oldal betölt
// When A felhasználó kiválaszt egy modult
// Then A kijelölt modul részletesen megjelenik
When('A felhasználó kiválaszt egy modult', () => {
	// get the tables row // lets say one in the middle
	const table = cy.get('table');
	table.find('tr').its('length').then((len) => {
		const n_row = Math.floor(len / 2);
		const row = table.get('tr').eq(n_row);
		row.click();
	});
});

Then('A kijelölt modul részletesen megjelenik', () => {

});

// Scenario: Modulok módosíttása
// Given A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon
// When A felhasználó a módosítás ikonra kattint
// Then A modulok módosíttása lehetséges
// 
// Scenario: Modulok hozzáadássa lehetséges
// Given A modulok oldal betölt AND felhasználónak van jogosultsága módosítani a modulok oldalon
// When A felhasználó a modul hozzáadás ikonra kattint
// Then A modul hozzáadása lehetséges
