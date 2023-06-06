'use strict'

const {BasePage, InitObjectBuilder} = require('./base-page');

const initObject = new InitObjectBuilder()
    .setName('Sun Screens Page')
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
    .setUrl('sunscreen')
    .build();

class SunScreensPage extends BasePage {
    open() {
        super.open();
    }

    waitForLoad() {
        super.waitForLoad();
    }

    async addTwoProductsToCart() {
        await this.addToCartMinimumPriceByProductCode('SPF-50');
        await this.addToCartMinimumPriceByProductCode('SPF-30');
    }

    async addToCartMinimumPriceByProductCode(productCode) {
        await super.addToCartMinimumPriceByProductCode(productCode);
    }
}

module.exports = new SunScreensPage(initObject);