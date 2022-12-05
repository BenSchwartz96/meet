import React, {Component} from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';

import { extractLocations, getEvents } from './api';



class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    currentEventCount: 32
  }

  //  previous version, leaving in currently for comparison. 
  //
  // updateEvents = (location, eventCount) => {
  //   if (location) {
  //   getEvents().then((events) => {
  //     const locationEvents = (location === 'all') ?
  //       events :
  //       events.filter((event) => event.location === location);
  //     const updatedEvents = locationEvents.slice(0, this.state.currentEventCount);
  //     this.setState({
  //       events: updatedEvents,
  //       currentLocation: location
  //     });
  //   });
  // } else {
  //   getEvents().then((events) => {
  //     const locationEvents = (location === 'all') ?
  //       events :
  //       events.filter((event) => event.location === location);
  //     const updatedEvents = locationEvents.slice(0, eventCount);
  //     this.setState({
  //       events: updatedEvents,
  //       currentEventCount: eventCount
  //     });
  //   });
  //   }
  // }


  updateEvents = (location, eventCount) => {

    // const { currentEventCount } = this.state;

    if (location === null) {
      location = this.state.currentLocation;
    }

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      const updatedEvents = locationEvents.slice(0, this.state.currentEventCount);
      this.setState({
        events: updatedEvents,
        currentLocation: location,
        currentEventCount: eventCount
      });
    });
  }



  componentDidMount() {
    this.mounted = true;
    getEvents().then((events) => {
      if (this.mounted) {
        this.setState({
           events: events.slice(0, this.state.currentEventCount), 
           locations: extractLocations(events)
          });
      }
    });
  }

  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
  return (
    <div className="App">
      <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
      <NumberOfEvents updateEvents={this.updateEvents}/>
      <EventList events={this.state.events}/>
    </div>
  );
}}

export default App;
