import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import Event from '../Event';
import { mockData } from '../mock-data';



const feature = loadFeature('./src/features/specifyNumberOfEvents.feature');

defineFeature(feature, test => { 

  test('When user hasn\'t specified a number, 32 is the default number.', ({ given, when, then }) => {

    let AppWrapper;
    given('the user boots up the app', () => {
      AppWrapper = mount(<App />);      
    });

    when('events list is displayed', () => {
      expect(AppWrapper.find(EventList)).toHaveLength(1);      
    });

    then('the app will display 32 events by default', () => {
      AppWrapper.update();
      expect(AppWrapper.state('currentEventCount')).toEqual(32);
    });
  });

  test('User can change the number of events they want to see.', ({ given, when, then }) => {

    let AppWrapper;
    given('the events list is rendered', async () => {
      AppWrapper = await mount(<App />)
      expect(AppWrapper.find(EventList)).toHaveLength(1);  
    });

    when('the user changes the \'number of events\' input field', () => {
      AppWrapper.setState({ currentEventCount: 15})
    });

    then('the number of events rendered in the event list will change accordingly', () => {
      AppWrapper.update();
      expect(AppWrapper.state('currentEventCount')).toEqual(15);
    });
  });


}); 