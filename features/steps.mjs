import { Given, Then } from '@cucumber/cucumber';
import assert from 'assert';

Given('I have {int} cucumbers in my belly', function (num) {
	this.cucumbers = num;
});


Then('The result is {int}', function (num) { 

	assert.equal(this.cucumbers + 1, num);
});
