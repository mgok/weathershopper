'use strict';
const {currentTemperaturePage} = inject();

When("I decide what to shop for the current temperature", async () => {
    const currentTemperature = await currentTemperaturePage.decideShoppingType();
    currentTemperaturePage.setVariable('decision', currentTemperature);
});

Then("I should be able to shop for moisturizers or sunscreens according to the temperature", async () => {
    currentTemperaturePage.shopFor(await currentTemperaturePage.getVariable('decision'));
});