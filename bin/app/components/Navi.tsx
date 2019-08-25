import React, { useState } from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import ListSubheader from "@material-ui/core/ListSubheader";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Drawer from "@material-ui/core/Drawer";

import IconButton from "@material-ui/core/IconButton";
import MenuIcon from "@material-ui/icons/Menu";

import { Link } from "react-router-dom";

export const Navi = ({ title }) => {
  const [isOpen, setOpen] = useState(false);
  return (
    <>
      <AppBar position="sticky" style={{ backgroundColor: "white" }}>
        <Toolbar>
          <IconButton onClick={() => setOpen(!isOpen)}>
            <MenuIcon />
          </IconButton>
          <div
            style={{
              fontWeight: 900,
              fontSize: 20,
              marginLeft: 24,
              color: "black"
            }}
          >
            {title}
          </div>
        </Toolbar>
      </AppBar>
      <Drawer open={isOpen} onClose={() => setOpen(false)}>
        <List
          style={{
            width: 200,
            height: "100%",
            backgroundColor: "rgb(44,44,44)",
            color: "white"
          }}
        >
          <ListSubheader style={{ color: "white" }}>Menu</ListSubheader>
          <ListItem component={Link} to="/" button>
            Top
          </ListItem>
          <ListItem component={Link} to="/sample" button>
            Sample
          </ListItem>
        </List>
      </Drawer>
    </>
  );
};

Navi.propTypes = {
  title: PropTypes.string.isRequired
};
