Feature: User should be able to shop according to the temperature so that they can buy the right products for the weather.

  Scenario: User is able to shop for moisturizers or sunscreens according to the temperature
    Given I am on "Current Temperature Page"
    When I decide what to shop for the current temperature
    Then I should be able to shop for moisturizers or sunscreens according to the temperature