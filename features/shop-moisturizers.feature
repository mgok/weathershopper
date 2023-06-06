Feature: User is able to shop minimum price products on moisturizers page so that he can complete the transaction

  Scenario: User should be able to add moisturizers to the cart.
    Given I am on "Moisturizers Page"
    When I attempt to add to the cart for moisturizers with minimum price of product as "Aloe"
    And I attempt to add to the cart for moisturizers with minimum price of product as "Almond"
    And I click "go to cart button" on "Moisturizers Page"
    Then I should be on "Cart Page"