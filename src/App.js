import React, {Component} from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';

import { extractLocations, getEvents } from './api';



class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    currentEventCount: 32,
    infoText: "",
  }


  updateEvents = (location, eventCount) => {

    if (!navigator.onLine) this.setState({ infoText: "This page is currently being displayed in offline mode." });
    else this.setState({ infoText: "" });

    if (location === null) {
      location = this.state.currentLocation;
    }

    if (eventCount === null) {
      eventCount = this.state.currentEventCount;
    }

    getEvents().then((events) => {
      const locationEvents = (location === 'all') ?
        events :
        events.filter((event) => event.location === location);
      const updatedEvents = locationEvents.slice(0, eventCount);
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
      <OfflineAlert text={this.state.infoText}/>
      <EventList events={this.state.events}/>
    </div>
  );
}}

export default App;
