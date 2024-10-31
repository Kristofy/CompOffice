import { When, Then, Given } from '@badeball/cypress-cucumber-preprocessor';
import { baseUrl, loggingIn } from '../support/e2e';

Given('A felhasználó bejelentkezett', () => {
	loggingIn();
});

Given('Egy tetszőleges A oldalt majd B oldalt meglátogatott', () => {
	// visit 'unit' then 'participant'

	cy.visit('/general/unit');
	cy.visit('/order/participant');
});

When('A felhasználó visszalép', () => {
	cy.go(-1);
});

Then('A felhasználó az előző A oldalra kerül', () => {
	// the base url ends with /
	const unitPage = baseUrl + 'unit';
	cy.url().should('eq', unitPage);
});
