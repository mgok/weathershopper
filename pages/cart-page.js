'use strict'

const {BasePage, InitObjectBuilder} = require('./base-page');

const initObject = new InitObjectBuilder()
    .setName('Current Temperature')
    .addElement(
        'pay with card button',
        "//button//*[contains(text(),'Pay with Card')]",
        true
    )
    .addElement('items', 'table.table-striped tbody tr', true)
    .addElement('item name', 'table.table-striped tbody tr:nth-child(<itemIndex>) td:nth-child(1)', false)
    .addElement('item price', 'table.table-striped tbody tr:nth-child(<itemIndex>) td:nth-child(2)', false)
    .addElement('email', '#email', false)
    .addElement('card number', '#card_number', false)
    .addElement('card expiration', '#cc-exp', false)
    .addElement('card cvc', '#cc-csc', false)
    .addElement('pay button', "#submitButton", false)
    .addElement('zip code', '#billing-zip', false)
    .build();

class CartPage extends BasePage {
    open() {
        super.open();
    }

    waitForLoad() {
        super.waitForLoad();
    }

    async getAllProducts() {
        this.waitForLoad();
        const tableData = {};

        tableData.items = [];
        tableData.prices = [];

        const rows = await this.grabNumberOfVisibleElements('items');

        for (let i = 1; i <= rows.length; i++) {
            const item = await this.grabTextFrom('item name', {itemIndex: i});
            const price = await this.grabTextFrom('item price', {itemIndex: i});

            tableData.items.push(item);
            tableData.prices.push(price);
        }
        return tableData;
    }

    async validateProductInCart(productName, productPrice) {
        const tableData = await this.getAllProducts();
        const itemIndex = tableData.items.indexOf(productName);
        const priceIndex = tableData.prices.indexOf(productPrice);
        return itemIndex === priceIndex;
    }

    async payWithValidPaymentDetails() {
        this.switchTo('iframe');
        const {faker} = require('@faker-js/faker');
        this.fillField('email', faker.internet.email());
        this.fillField('card number', '4242424242424242');
        this.fillField('card expiration', '1232');
        this.fillField('card cvc', '123');
        this.fillField('zip code', '12345');
        this.click('pay button');
        this.switchTo();
    }
}

module.exports = new CartPage(initObject);