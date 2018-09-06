import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ListSubheader from "@material-ui/core/List/ListSubheader";
import List, { ListItem } from "@material-ui/core/List";
import Drawer from "@material-ui/core/Drawer";

class Menu extends Component {
  render() {
    return (
      <Drawer variant="permanent" style={this.props.style}>
        <List style={this.props.style}>
          <ListSubheader>Menu</ListSubheader>
          <ListItem component={Link} to="/">
            Top
          </ListItem>
          <ListItem component={Link} to="/sample">
            Sample
          </ListItem>
        </List>
      </Drawer>
    );
  }
}

Menu.propTypes = {
  width: PropTypes.number
};

export default Menu;
