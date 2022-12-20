import React, { Component } from "react";

export default class Image extends Component {
  constructor(props) {
    super(props);
    this.state = { isFullScreen: false };
  }

  handleClick = () => {
    this.setState(state => ({ isFullScreen: !state.isFullScreen }));
  };

  render() {
    return (
      <div>
        {this.state.isFullScreen ? (
          <img src={this.props.src} onClick={this.handleClick} />
        ) : (
          <img
            src={this.props.src}
            onClick={this.handleClick}
            style={{ maxWidth: "100%" }}
          />
        )}
      </div>
    );
  }
}
