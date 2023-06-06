'use strict';
const {I} = inject();

class BasePage {
    constructor({url = '', name = '', elements = new Map()}) {
        if (!name) {
            throw new Error('Please set name');
        }

        if (!(elements instanceof Map)) {
            throw new Error('Please define elements as Map');
        }

        this.url = url;
        this.name = name;
        this.elements = elements;
    }

    open(params = null) {
        const url = params ? this.replaceParams(this.url, params) : this.url;
        I.amOnPage(url);
        this.waitForLoad();
        return this;
    }

    waitForLoad() {
        if (this.elements.size > 0) {
            for (const value of this.elements.values()) {
                const {locator, waitOnPageLoad} = value;
                if (waitOnPageLoad) {
                    I.waitForVisible(locator);
                }
            }
        }
        return this;
    }

    setVariable(key, value) {
        I.setVariable(key, value);
    }

    async getVariable(key) {
        return I.getVariable(key);
    }

    fillField(name, text) {
        const field = this.getElement(name).locator;
        if (!field) {
            throw new Error('Invalid field');
        }
        I.moveCursorTo(field);
        I.waitForElement(field);
        I.clearField(field);
        I.fillField(field, text);
        return this;
    }

    async grabTextFrom(name, params) {
        const field = this.getElementLocator(name, params);
        return I.grabTextFrom(field);
    }

    getElementLocator(name, params) {
        const fieldLocator = params
            ? this.replaceParams(this.getElement(name).locator, params)
            : this.getElement(name).locator;
        return fieldLocator;
    }

    click(name, params = null) {
        const field = this.getElementLocator(name, params);
        I.waitForEnabled(field);
        I.click(field);
        return this;
    }

    replaceParams(replaceString, params) {
        let str = replaceString;
        for (const parameter of Object.keys(params)) {
            const regex = new RegExp(`<${parameter}>`, 'g');
            str = str.replace(regex, params[parameter]);
        }
        return str;
    }

    getElement(name) {
        const field = this.elements.get(name);
        if (!field) {
            throw new Error(`${name} field does not exist`);
        }
        return field;
    }

    grabNumberOfVisibleElements(name, params = null) {
        const field = this.getElementLocator(name, params);
        return I.grabNumberOfVisibleElements(field);
    }

    seeElement(name, params = null) {
        const field = this.getElementLocator(name, params);
        I.seeElement(field);
        return this;
    }

    switchTo(name) {
        I.switchTo(name);
        return this;
    }

    waitForElement(name, params = null) {
        const field = this.getElementLocator(name, params);
        I.waitForElement(field);
        return this;
    }

    waitForVisible(name, params = null) {
        const field = this.getElementLocator(name, params);
        I.waitForVisible(field);
        return this;
    }

    waitForEnabled(name, params = null) {
        const field = this.getElementLocator(name, params);
        I.waitForEnabled(field);
        return this;
    }

    wait(number) {
        I.wait(number);
        return this;
    }

    async addToCartMinimumPriceByProductCode(productCode) {
        let productsSize = 0
        let tryCount = 0;
        while (productsSize == 0 && tryCount < 5) {
            productsSize = await this.grabNumberOfVisibleElements('products');
            this.wait(1);
            tryCount++;
        }
        let minPrice = 10000000;
        let minPriceIndex = 0;
        for (let i = 1; i <= productsSize; i++) {
            const productName = await this.grabTextFrom('product name', {productIndex: i});
            const containsProductCode = productName.includes(productCode);
            if (!containsProductCode) {
                continue;
            } else {
                let price = await this.grabTextFrom('product price', {productIndex: i});
                price = parseInt(price.split(' ').slice(-1)[0]);
                if (price < minPrice) {
                    minPrice = price;
                    minPriceIndex = i;
                }
            }
        }
        this.click('add to cart', {productIndex: minPriceIndex});
        this.setVariable(productCode, minPrice);
    }
}

class PageBuilder {
    constructor(name = 'notInit', url = '', elements = new Map()) {
        this.name = name;
        this.url = url;
        this.elements = elements;
    }

    setUrl(value) {
        this.url = value;
        return this;
    }

    setName(value) {
        this.name = value;
        return this;
    }

    addElement(key, locator, waitOnPageLoad = false) {
        const field = {locator, waitOnPageLoad};
        this.elements.set(key, field);
        return this;
    }

    removeField(key) {
        this.elements.delete(key);
        return this;
    }

    setElements(value) {
        if (!(value instanceof Map)) {
            throw new Error('elements should be Map');
        }
        this.elements = value;
        return this;
    }

    build() {
        return {url: this.url, name: this.name, elements: this.elements};
    }
}

module.exports = {
    BasePage,
    InitObjectBuilder: PageBuilder
};