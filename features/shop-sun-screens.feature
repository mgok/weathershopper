Feature: User is able to shop minimum price products on sunscreen page so that he can complete the transaction

  Scenario: User should be able to buy sunscreens.
    Given I am on "Sunscreens Page"
    When I attempt to add to the cart for sunscreens with minimum price of product as "SPF-50"
    And I attempt to add to the cart for sunscreens with minimum price of product as "SPF-30"
    And I click "go to cart button" on "Sunscreens Page"
    Then I should be on "Cart Page"