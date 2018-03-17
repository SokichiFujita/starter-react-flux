import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import Button from 'material-ui/Button';
import SampleActionCreator from '../actions/SampleActionCreators';

class Content extends Component {
  handleClick = (e) => {
    SampleActionCreator.action002();
  }

  render() {
    return (
      <div style={this.props.style}>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
        <div>{this.props.text}</div>        
        <Button onClick={this.handleClick}>Try Flux</Button>
      </div>
    );
  }
}

Content.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default Content;
