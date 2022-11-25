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

    test('render button and additional details when you press it and then close it properly', () => {
      EventWrapper.find('.details-button').at(0).simulate('click');
      expect(EventWrapper.find('.details')).toHaveLength(1);
      expect(EventWrapper.find('.description')).toHaveLength(1);
      EventWrapper.find('.hide-details-button').at(0).simulate('click');
      expect(EventWrapper.find('.details')).toHaveLength(0);
    });

});