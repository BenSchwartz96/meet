import React, { Component } from 'react';

class Alert extends Component {
  constructor(props) {
    super(props);
    this.color = null;
    this.top = 0;
    this.bottom = 0;
  }

  getStyle = () => {
    return {
      color: this.color,
      top: this.top,
      bottom: this.bottom
    };
  }

  render() {
    return (
      <div className="Alert">
        <p style={this.getStyle()}>{this.props.text}</p>
      </div>
    );
  }
}


class InfoAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'blue';
    this.top = 0;
    this.bottom = 40;
  }
}

class ErrorAlert extends Alert {
  constructor(props) {
    super(props);
    this.color = 'red';
    this.top = 70;
    this.bottom = 0;
  }
}


export { InfoAlert, ErrorAlert };