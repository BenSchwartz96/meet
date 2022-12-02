import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';

describe('<Event /> component', () => {


  let EventWrapper;
  beforeAll(() => {
    EventWrapper = shallow(<Event event={mockData[0]}/>);
  });






    test('render basic event details', () => {
      expect(EventWrapper.find('.basic-details')).toHaveLength(1);
    });

    test('render summary', () => {
      expect(EventWrapper.find('.summary')).toHaveLength(1);
    });

    test('render location-time-timezone', () => {
      expect(EventWrapper.find('.location-time-timezone')).toHaveLength(1);
    });

    test('details are hidden, show them upon clicking "Show more details" button', () => {
      EventWrapper.setState({ showDetails: false });
      EventWrapper.find('.details-button').at(0).simulate('click');
      expect(EventWrapper.find('.details')).toHaveLength(1);
      expect(EventWrapper.find('.description')).toHaveLength(1);
    });
    
    test('details are visible, hide them upon clicking "Hide details" button', () => {
      EventWrapper.setState({ showDetails: true });
      EventWrapper.find('.hide-details-button').at(0).simulate('click');
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });
    
    test('event details are hidden by default', () => {
      let showDetailsState = EventWrapper.state('showDetails');
      expect(showDetailsState).toBe(false);
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });

});









