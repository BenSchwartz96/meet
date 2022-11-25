import React, { Component } from 'react';

import Event from './Event';

class EventList extends Component {
  render() {

    const {events} = this.props;        //this will in future have to be passed from app.js, instead of the eventlist test, i think?

    return (
        <ul className="EventList">
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