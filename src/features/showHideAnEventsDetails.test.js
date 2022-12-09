import { loadFeature, defineFeature } from 'jest-cucumber';
import React from 'react';
import { mount, shallow } from 'enzyme';

import App from '../App';
import EventList from '../EventList';
import Event from '../Event';
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
        expect(AppWrapper.find(Event).at(0)).toHaveLength(1);
      });

      when('user clicks on the event', () => {
        AppWrapper.find(Event).at(0).find('.details-button').simulate('click');
      });

      then('event details are shown', () => {
        expect(AppWrapper.find(Event).at(0).find('.details')).toHaveLength(1)
      });
  });



  test('User can collapse an event to hide its details.', ({ given, and, when, then }) => {

    let AppWrapper;
    AppWrapper = mount(<App />);

    given('event is rendered', () => {
      AppWrapper.update();
      expect(AppWrapper.find(Event).at(0)).toHaveLength(1);
    });

    and('event details are shown', () => {
      AppWrapper.find(Event).at(0).setState({ showDetails: true });
      expect(AppWrapper.find(Event).at(0).find('.details')).toHaveLength(1)
    });

    when('user clicks on the event', () => {
      AppWrapper.find(Event).at(0).find('.hide-details-button').simulate('click');
    });

    then('event details are hidden', () => {
      expect(AppWrapper.find(Event).at(0).find('.details')).toHaveLength(0)
    });
  });


});



