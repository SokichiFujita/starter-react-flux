import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { Link } from 'react-router-dom'
import SampleStore from '../stores/SampleStore';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { List, ListItem } from 'material-ui/List';

class _SampleContainer2 extends Component {
  static getStores() {
    return [SampleStore];
  }

  static calculateState() {
    return {
      sample: SampleStore.getState()
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <div>
        <AppBar title="Sample App" />
        <Toolbar>
          <ToolbarTitle text="Container: SampleContainer2"/>
        </Toolbar>
        <List>
          <ListItem><Link to="/">Top</Link></ListItem>
          <ListItem><Link to="/sample1">Sample1</Link></ListItem>
          <ListItem><Link to="/sample2">Sample2</Link></ListItem>
        </List>
      </div>
    );
  }
}

const SampleContainer2 = Container.create(_SampleContainer2);
export default SampleContainer2;
