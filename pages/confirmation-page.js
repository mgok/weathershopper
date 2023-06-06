'use strict'

const {BasePage, InitObjectBuilder} = require('./base-page');
const {faker} = require("@faker-js/faker");

const initObject = new InitObjectBuilder()
    .setName('Confirmation Page')
    .addElement('payment success', '//h2[text()=\'PAYMENT SUCCESS\']', false)
    .setUrl('/confirmation')
    .build();

class ConfirmationPage extends BasePage {
    open() {
        super.open();
    }

    waitForLoad() {
        super.waitForLoad();
    }
}

module.exports = new ConfirmationPage(initObject);