import React, { Component } from 'react';

import Event from './Event';
import { OfflineAlert } from './Alert';

class EventList extends Component {


  state = {
    infoText: "",
  }


  render() {

    const {events} = this.props;   
    
    if (!navigator.onLine) {
      this.setState({
        infoText: "This page is currently being displayed in offline mode."
      })
    }

    return (
        <ul className="EventList">

          <OfflineAlert text={this.state.infoText}/>

        {events.map(event =>
          <li key={event.id}>
            <Event event={event} />
          </li>
        )}
      </ul>
    );
  }
}

export default EventList;