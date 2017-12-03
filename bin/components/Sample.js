import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

class Sample extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Sample;
