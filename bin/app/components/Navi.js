import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';

class Navi extends Component {
  render() {
    return (
      <AppBar position="static" color="default">
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
