Feature: Specify number of events

  Scenario: When user hasn't specified a number, 32 is the default number.
    Given the user boots up the app
    When events list is displayed
    Then the app will display 32 events by default

  Scenario: User can change the number of events they want to see.
    Given the events list is rendered
    When the user changes the 'number of events' input field
    Then the number of events rendered in the event list will change accordingly