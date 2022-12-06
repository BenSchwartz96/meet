import React, { Component } from "react";
import { mockData } from './mock-data';




class Event extends Component {

  state = {
    showDetails: false,
  };

  handleDetailsClicked = () => {
    this.setState({
      showDetails: !this.state.showDetails
    });
  }

  render() {
    
    const { event } = this.props;
    return( 
      <div className="event">
    
        <div className="basic-details">
          <h2 className="summary">{event.summary}</h2>
          <p className="location-time-timezone"> {event.location} {event.start.dateTime} {event.start.timeZone}</p>
        </div>

        
        {this.state.showDetails
          ? (
            <>
              <div className="details">
                <h2>About event:</h2>
                <a href={event.htmlLink} className="event-link">See details on Google Calendar</a>
                <p className="description">{event.description}</p>
              </div>
            <button
              className="hide-details-button"
              onClick={() => this.handleDetailsClicked()}>
              Hide details
            </button>
            </>
          )
          : (
            <button
            className="details-button"
            onClick={() => this.handleDetailsClicked()}>
              Show more details
            </button>
          )
        }

      </div>
    
  )}
}



export default Event;