'use strict';
const {sunscreensPage} = inject();

When("I attempt to add to the cart for sunscreens with minimum price of product as {string}", async (productCode) => {
    await sunscreensPage.addToCartMinimumPriceByProductCode(productCode);
});

When("I attempt to add two products in the cart on the sunscreens page", async () => {
    await sunscreensPage.addTwoProductsToCart();
});