'use strict'

const {currentTemperaturePage, sunscreensPage, cartPage, confirmationPage, moisturizersPage} = inject();

const pages = {
    'Current Temperature Page': currentTemperaturePage,
    'Sunscreens Page': sunscreensPage,
    'Cart Page': cartPage,
    'Confirmation Page': confirmationPage,
    'Moisturizers Page': moisturizersPage
}

module.exports = {
    pages
}