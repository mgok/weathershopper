'use strict';

class World extends Helper {
    constructor() {
        super();
        this.variables = new Map();
    }

    setVariable(key, value) {
        this.variables.set(key, value);
        console.log(`<${key}> set as <${value}>`);
    }

    async getVariable(key) {
        const value = await this.variables.get(key);
        console.log(`<${key}> get as <${value}>`);
        return value;
    }
}

module.exports = World;
