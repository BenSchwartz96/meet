import React from 'react';
import { shallow } from 'enzyme';
import Event from '../Event';
import { mockData } from '../mock-data';
import NumberOfEvents from '../NumberOfEvents';

describe('<NumberOfEvents /> component', () => {

  let NumberOfEventsWrapper;
  beforeAll(() => {
    NumberOfEventsWrapper = shallow(<NumberOfEvents updateEvents={() => {}} />);
  });



  test('render correct number of events', () => {
    expect(NumberOfEventsWrapper.find('.numberOfEvents')).toHaveLength(1);
  });

  test('number of events is set to 32 by default', () => {
    expect(NumberOfEventsWrapper.state('numberToDisplay')).toBe(32);
  });

  test('render input for number of events', () => {
    expect(NumberOfEventsWrapper.find('.number-of-events-input')).toHaveLength(1);
  });

  test('render change of input for number of events to 16', () => {
    NumberOfEventsWrapper.find('.number-of-events-input').simulate("change", {target: {value: 16}});
    expect(NumberOfEventsWrapper.state('numberToDisplay')).toBe(16);
  });

});