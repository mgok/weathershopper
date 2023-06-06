'use strict';

const {I} = inject();

const {pages} = require('../config/pages');

Given('I am on {string}', (page) => {
    pages[page].open();
});

When('I click {string} on {string}', (element, page) => {
    const sourcePage = pages[page];
    sourcePage.click(element);
});

Then('I should be on {string}', (page) => {
    const currentPage = pages[page];
    currentPage.waitForLoad();
    I.seeInCurrentUrl(currentPage.url);
});

Then('I should see {string} field on {string}', (element, page) => {
    const sourcePage = pages[page];
    sourcePage.waitForVisible(element);
});
