import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import { mockData } from '../mock-data';


const feature = loadFeature('./src/features/showHideAnEventsDetails.feature');

defineFeature(feature, test => { 

  test('An event element is collapsed by default.', ({ given, when, then }) => {


    let AppWrapper;
    given('app is first loaded', () => {
      AppWrapper = mount(<App />);
    });


    when('events list is rendered', () => {
      AppWrapper.update();
      expect(AppWrapper.find('.EventList')).toHaveLength(1);
    });

    then('each event in the list is collapsed by default', () => {
      const EventListWrapper = AppWrapper.find(EventList);
      expect(EventListWrapper.find('.event .details')).toHaveLength(0);
    });
});


  test('User can expand an event to see its details.', ({ given, when, then }) => {

      let AppWrapper;
      AppWrapper = mount(<App />);

      given('event is rendered', () => {
        AppWrapper.update();
        const EventListWrapper = AppWrapper.find(EventList);   
        expect (EventListWrapper.find('.event')).toHaveLength(2);
      });

      when('user clicks on the event', () => {
        const EventListWrapper = AppWrapper.find(EventList);   
        EventListWrapper.find('.event .details-button').at(0).simulate('click');
      });

      then('event details are shown', () => {
        const EventListWrapper = AppWrapper.find(EventList); 
        expect (EventListWrapper.find('.event .details')).toHaveLength(1);
      });
  });


  test('User can collapse an event to hide its details.', ({ given, and, when, then }) => {

    let AppWrapper;
    AppWrapper = mount(<App />);

    given('event is rendered', () => {
      AppWrapper.update();
      const EventListWrapper = AppWrapper.find(EventList);   
      expect (EventListWrapper.find('.event')).toHaveLength(2);
    });

    and('event details are shown', () => {
      const EventListWrapper = AppWrapper.find(EventList);
      EventListWrapper.find('.event .details-button').at(0).simulate('click');
      expect (EventListWrapper.find('.event .details')).toHaveLength(1);
    });

    when('user clicks on the event', () => {
      const EventListWrapper = AppWrapper.find(EventList);   
      EventListWrapper.find('.event .hide-details-button').at(0).simulate('click');
    });

    then('event details are hidden', () => {
      const EventListWrapper = AppWrapper.find(EventList); 
      expect (EventListWrapper.find('.event .details')).toHaveLength(0);
    });
  });

});












// Create another file called “showHideAnEventsDetails.test.js” and define the steps for each 
// scenario using the loadFeature() and defineFeature() functions from jest-cucumber. Remember
//  that you can leave the defineFeature(feature, test => {}); function empty, run the test, then take
//  the auto-generated code from the terminal to quickly and easily define steps for your scenarios. 
//  d. Implement the code for each step one at a time following the process outlined in the Exercise.