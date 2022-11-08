# meet

App for Achievement 4 of the course


# **Features**

### **FEATURE 1: FILTER EVENTS BY CITY**

- **SCENARIO 1: WHEN USER HASN’T SEARCHED FOR A CITY, SHOW UPCOMING EVENTS FROM ALL CITIES**

  - `Given` user hasn’t searched for any city
  - `When` the user opens the app
  - `Then` the user should see a list of all upcoming events

- **SCENARIO 2: USER SHOULD SEE A LIST OF SUGGESTIONS WHEN THEY SEARCH FOR A CITY**

  - `Given` the main page is open
  - `When` user starts typing in the city textbox
  - `Then` the user should see a list of cities (suggestions) that match what they’ve typed

- **SCENARIO 3: USER CAN SELECT A CITY FROM THE SUGGESTED LIST**

  - `Given` the user was typing “Berlin” in the city textbox
  - `And` the list of suggested cities is showing
  - `When` the user selects a city (e.g., “Berlin, Germany”) from the list
  - `Then` their city should be changed to that city (i.e., “Berlin, Germany”)
  - `And` the user should receive a list of upcoming events in that city

  ***

### **FEATURE 2: SHOW/HIDE AN EVENT'S DETAILS**

- **SCENARIO 1: AN EVENT ELEMENT IS COLLAPSED BY DEFAULT**

  - `Given` app is first loaded
  - `When` events list is rendered
  - `Then` each event in the list is collapsed by default

- **SCENARIO 2: USER CAN EXPAND AN EVENT TO SEE ITS DETAILS**

  - `Given` event is rendered
  - `When` user clicks on the event
  - `Then` event details are shown

- **SCENARIO 3: USER CAN COLLAPSE AN EVENT TO HIDE ITS DETAILS**

  - `Given` event is rendered
  - `And` event details are shown
  - `When` user clicks on the event
  - `Then` event details are hidden

  ***

### **FEATURE 3: SPECIFY NUMBER OF EVENTS**

- **Scenario 1: WHEN USER HASN'T SPECIFIED A NUMBER, 32 IS THE DEFAULT NUMBER**

  - `Given` the user boots up the app
  - `When` events list is displayed
  - `Then` the app will display 32 events by default

- **Scenario 2: USER CAN CHANGE THE NUMBER OF EVENTS THEY WANT TO SEE**

  - `Given` the events list is rendered
  - `When` the user changes the 'number of events' input field
  - `Then` the number of events rendered in the event list will change accordingly

  ***

### **FEATURE 4: USE THE APP WHEN OFFLINE**

- **Scenario 1: SHOW CACHED DATA WHEN THERE'S NO INTERNET CONNECTION**

  - `Given` the user has no internet connection
  - `When` they load the app
  - `Then` a cached version of the last page they were on is displayed

- **Scenario 2: SHOW ERROR WHEN THE USER CHANGES THE SETTINGS**

  - `Given` the user has no internet connection
  - `When` they try to load something new (new event, city, etc)
  - `Then` an error will be displayed

  ***

### **FEATURE 5: DATA VISUALISATION**

- **Scenario 1: SHOW A CHART WITH THE NUMBER OF UPCOMING EVENTS IN EACH CITY**

  - `Given` the user is on the main page of the app
  - `When` the event list is rendered
  - `Then` a chart visualising the number of upcoming events in each city will be displayed







