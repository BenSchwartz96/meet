import React, { Component } from 'react';

class NumberOfEvents extends Component {

  state = {
    numberToDisplay: 32,
    errorMessage: ""
  }

  
  handleInputChanged = (event) => {
    const value = event.target.value;

    if (value < 1 || value > 32) {
      this.setState({
        errorMessage: "Please enter a number between 1 and 32"
      });
    } else {
      this.setState({
        numberToDisplay: value
      });
    }
  };


  render() {
      return (
        <div className="NumberOfEvents">
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
          <p className="input-error-message"> {this.state.errorMessage} </p>
        </div>
      );
    }
}

export default NumberOfEvents;