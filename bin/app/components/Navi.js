import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';

class Navi extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired,
  }

  render() {
    return (
      <Toolbar style={{color: '#888888'}}>
        <ToolbarTitle text={this.props.title}/>
      </Toolbar>
    );
  }
}

export default Navi;
