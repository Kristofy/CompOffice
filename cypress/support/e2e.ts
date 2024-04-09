

export const baseUrl = (() => {
	const url = Cypress.config('baseUrl') ?? 'http://localhost:3000';
	return url.endsWith('/') ? url : url + '/';
})();


export function loggingIn() {

	cy.visit('/api/auth/signin');

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


}
