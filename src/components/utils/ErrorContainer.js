import React, { Component } from "react";

class ErrorContainer extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div
        className="error-container"
        style={{
          borderRadius: 0,
          margin: 0,
          top: 0,
          paddingTop: 10,
          paddingBottom: 10
        }}
      >
        {this.props.message}
      </div>
    );
  }
}

export default ErrorContainer;
