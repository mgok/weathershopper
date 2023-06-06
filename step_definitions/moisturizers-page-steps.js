'use strict';
const {moisturizersPage} = inject();

When("I attempt to add to the cart for moisturizers with minimum price of product as {string}", async (productCode) => {
    await moisturizersPage.addToCartMinimumPriceByProductCode(productCode);
});

When("I attempt to add two products in the cart on the moisturizers page", async () => {
    await moisturizersPage.addTwoProductsToCart();
});