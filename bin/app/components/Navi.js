import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

class Navi extends Component {
  render() {
    return (
      <AppBar position="absolute" style={this.props.style}>
        <Toolbar>
          <Typography variant="title" color="inherit">
            {this.props.title}
          </Typography>
        </Toolbar>
      </AppBar>
    );
  }
}

Navi.propTypes = {
  title: PropTypes.string.isRequired,
}

export default Navi;
