'use strict'
const {cartPage, I} = inject();

Then("I should see the product {string} with correct price on the cart page", async (productCode) => {
    const productPrice = cartPage.getVariable(productCode);
    const isProductInCart = await cartPage.validateProductInCart(productCode, productPrice);
    I.assertTrue(isProductInCart, `Product ${productCode} is not in the cart`);
});

When("I attempt to pay with valid payment details", () => {
    cartPage.payWithValidPaymentDetails();
})