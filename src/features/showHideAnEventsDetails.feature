Feature: Show/hide an event's details

  Scenario: An event element is collapsed by default.
    Given app is first loaded
    When events list is rendered
    Then each event in the list is collapsed by default

  Scenario: User can expand an event to see its details.
    Given event is rendered
    When user clicks on the event
    Then event details are shown

  Scenario: User can collapse an event to hide its details.
    Given event is rendered
    And event details are shown
    When user clicks on the event
    Then event details are hidden
