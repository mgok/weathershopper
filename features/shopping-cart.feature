Feature: User should be able to see all the products in the cart

  Scenario: User should be able see products in the cart
    Given I am on "Sunscreens Page"
    When I attempt to add to the cart for sunscreens with minimum price of product as "SPF-50"
    And I attempt to add to the cart for sunscreens with minimum price of product as "SPF-30"
    And I click "go to cart button" on "Sunscreens Page"
    Then I should see the product "SPF-50" with correct price on the cart page
    And I should see the product "SPF-30" with correct price on the cart page

  Scenario: User should be able to buy sunscreens in the cart
    Given I am on "Sunscreens Page"
    When I attempt to add two products in the cart on the sunscreens page
    And I click "go to cart button" on "Sunscreens Page"
    And I click "pay with card button" on "Cart Page"
    And I attempt to pay with valid payment details
    Then I should see "payment success" field on "Confirmation Page"

  Scenario: User should be able to buy moisturizers in the cart
    Given I am on "Moisturizers Page"
    When I attempt to add two products in the cart on the moisturizers page
    And I click "go to cart button" on "Moisturizers Page"
    And I click "pay with card button" on "Cart Page"
    And I attempt to pay with valid payment details
    Then I should see "payment success" field on "Confirmation Page"

  Scenario: User should be able to buy sunscreens and moisturizers in the cart
    Given I am on "Sunscreens Page"
    When I attempt to add two products in the cart on the sunscreens page
    And I am on "Moisturizers Page"
    When I attempt to add two products in the cart on the moisturizers page
    And I click "go to cart button" on "Moisturizers Page"
    And I click "pay with card button" on "Cart Page"
    And I attempt to pay with valid payment details
    Then I should see "payment success" field on "Confirmation Page"