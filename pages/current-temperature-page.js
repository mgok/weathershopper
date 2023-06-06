'use strict'

const {BasePage, InitObjectBuilder} = require('./base-page');

const initObject = new InitObjectBuilder()
    .setName('Current Temperature')
    .addElement(
        'temperature',
        "#temperature",
        true
    )
    .addElement(
        'buy moisturizers',
        '//button[text()=\'Buy moisturizers\']',
        true
    )
    .addElement(
        'buy sunscreens',
        '//button[text()=\'Buy sunscreens\']',
        true)
    .build();

class CurrentTemperaturePage extends BasePage {
    open() {
        super.open();
    }

    waitForLoad() {
        super.waitForLoad();
    }

    async decideShoppingType() {
        let temperature = await this.grabTextFrom('temperature');
        temperature = parseInt(temperature.split(' ')[0]);
        console.log(temperature);
        let decision = '';
        if (temperature < 19) {
            decision = 'Moisturizers';
        } else if (temperature > 34) {
            decision = 'Sunscreens';
        } else {
            throw new Error('Unexpected temperature range');
        }
        return decision;
    }

    shopFor(decision) {
        if (decision === 'Moisturizers') {
            this.click('buy moisturizers');
        } else if (decision === 'Sunscreens') {
            this.click('buy sunscreens');
        } else {
            throw new Error('Unexpected shopping type');
        }
    }
}

module.exports = new CurrentTemperaturePage(initObject);