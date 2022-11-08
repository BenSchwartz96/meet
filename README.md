# meet

App for Achievement 4 of the course


As a user, I should be able to expand or collapse an event so that I can see or hide its details.

As a user, I should be able to change the number of events shown at once, so that I can increase or decrease it from 32 based on my preferences. 

As a user, I should be able to see a cached version of the app when not connected to the internet, so that I can access the information I need at any time.

As a user, I should be able to see a chart of the upcoming number of events in a city, so that I can get useful data about when things will be most active.



Given user hasn't select an event yet
When the user selects an event
Then it expands to show extra details, and can be collapsed again

Given the user hasn't specified a number,
When they look at a cities events they see 32 events by default,
Then they can change how many they want to see

Given the user has loaded a page
When they load the app again without internet
Then they should see a cached version of the last thing they saw, and get an error if they try to load a new page.

Given the user is looking at a specific city's events,
When they tap/click a certain element,
Then they can see a visualised chart of events in that city. 



