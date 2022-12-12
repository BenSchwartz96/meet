import React, { Component } from 'react';
import { ErrorAlert } from './Alert';

class NumberOfEvents extends Component {

  state = {
    numberToDisplay: 32,
    alertErrorText: "",
  }

  
  handleInputChanged = (event) => {
    const value = event.target.value;

    if (value < 1 || value > 32) {
      this.setState({
        alertErrorText: "Please enter a number between 1 and 32"
      });
    } else {
      this.props.updateEvents(null, value);
      this.setState({
        numberToDisplay: value,
        alertErrorText: ""
      });
    }
  };


  render() {
      return (
        <div className="numberOfEvents">
          <label>
            Number of Events
            <input
              type="number"
              className="number-of-events-input"
              value={this.state.numberToDisplay}
              placeholder="1 to 32"
              onChange={this.handleInputChanged}
            />
          </label>
          <ErrorAlert text={this.state.alertErrorText} />
        </div>
      );
    }
}

export default NumberOfEvents;