'use strict'

const {BasePage, InitObjectBuilder} = require('./base-page');

const initObject = new InitObjectBuilder()
    .setName('Moisturizers Page')
    .addElement(
        'products',
        "//div[@class='text-center col-4']",
        true
    )
    .addElement(
        'product name',
        '(//div[@class=\'text-center col-4\'])[<productIndex>]//p[1]',
        false
    )
    .addElement(
        'product price',
        '(//div[@class=\'text-center col-4\'])[<productIndex>]//p[2]',
        false)
    .addElement(
        'add to cart',
        '(//div[@class=\'text-center col-4\'])[<productIndex>]//button',
        false
    )
    .addElement('go to cart button', '#cart', true)
    .setUrl('moisturizer')
    .build();

class MoisturizersPage extends BasePage {
    open() {
        super.open();
    }

    waitForLoad() {
        super.waitForLoad();
    }

    async addTwoProductsToCart() {
        await this.addToCartMinimumPriceByProductCode('Aloe');
        await this.addToCartMinimumPriceByProductCode('Almond');
    }

    async addToCartMinimumPriceByProductCode(productCode) {
        await super.addToCartMinimumPriceByProductCode(productCode);
    }
}

module.exports = new MoisturizersPage(initObject);