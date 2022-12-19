import React, {Component} from 'react';
import './App.css';
import './nprogress.css';

import EventList from './EventList';
import CitySearch from './CitySearch';
import NumberOfEvents from './NumberOfEvents';
import { OfflineAlert } from './Alert';

import { extractLocations, getEvents, checkToken, getAccessToken } from './api';
import WelcomeScreen from './WelcomeScreen';



class App extends Component {

  state = {
    events: [],
    locations: [],
    currentLocation: "all",
    currentEventCount: 32,
    infoText: "",
    showWelcomeScreen: undefined,
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


    async componentDidMount() {
      this.mounted = true;
      const accessToken = localStorage.getItem("access_token");
      const isTokenValid =
        !window.location.href.startsWith("http://localhost") &&
        !(accessToken && !navigator.onLine) &&
        (await checkToken(accessToken)).error
          ? false
          : true;
      const searchParams = new URLSearchParams(window.location.search);
      const code = searchParams.get("code");
      this.setState({ showWelcomeScreen: !(code || isTokenValid) });
      if ((code || isTokenValid) && this.mounted) {
        getEvents().then((events) => {
          if (this.mounted) {
            this.setState({
              events: events.slice(0, this.state.currentEventCount),
              locations: extractLocations(events),
            });
          }
        });
      }
    }


  componentWillUnmount(){
    this.mounted = false;
  }

  render() {
    const { showWelcomeScreen } = this.state;    
    if (showWelcomeScreen === undefined) {
      return <div className="App" />;
    } else if (showWelcomeScreen === true) {
      return (
        <WelcomeScreen
          showWelcomeScreen={showWelcomeScreen}
          getAccessToken={() => {
            getAccessToken();
          }}
        />
      );
    } else {
      return <div className="App">
        <CitySearch locations={this.state.locations} updateEvents={this.updateEvents}/>
        <NumberOfEvents updateEvents={this.updateEvents}/>
        <OfflineAlert text={this.state.infoText}/>
        <EventList events={this.state.events}/>
      </div>
    }
  }


}

export default App;
