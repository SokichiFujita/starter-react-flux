import React, { Component } from 'react';
import PropTypes from 'prop-types'; 
import { Link } from 'react-router-dom';
import Subheader from 'material-ui/Subheader';
import { List, ListItem } from 'material-ui/List';

class Menu extends Component {

  static propTypes = {
  }

  render() {
    return (
      <List style={{width: '15%'}}>
        <Subheader>Menu</Subheader>
        <ListItem><Link to="/">Top</Link></ListItem>
        <ListItem><Link to="/sample">Sample</Link></ListItem>
      </List>
    );
  }
}

export default Menu;
