import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import FlatButton from 'material-ui/FlatButton';
import SampleActionCreator from '../actions/SampleActionCreators';

class Content extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
    subtitle: PropTypes.string.isRequired,
    text: PropTypes.string.isRequired
  }

  handleClick = (e) => {
    SampleActionCreator.action002();
  }

  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
        <div>{this.props.text}</div>
        <FlatButton label="Try Flux" onClick={this.handleClick}/>
      </div>
    );
  }
}

export default Content;
