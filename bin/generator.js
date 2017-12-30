const fs = require('fs');
const util = require('util');
const path = require('path');
const fu = require('./futil');

module.exports.ComponentFile = (name) => {
    const code =
`import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

class ${name} extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  state = {
  }

  handleClick = (event) => {
    console.log(event);
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>{this.props.title}</p>
        <div onClick={this.handleClick}></div>
        <div><Link to="/">Top</Link></div>
        <div><Link to="/sample1">Sample1</Link></div>
        <div><Link to="/sample2">Sample2</Link></div>
      </div>
    );
  }
}

export default ${name};
`;
    
  fu.createFile(`./app/components/${name}.js`, code);
}


module.exports.ContainerFile = (name) => {
    const code =
`import React, { Component } from 'react';
import { Container } from 'flux/utils';
import { Link } from 'react-router-dom'
import SampleStore from '../stores/SampleStore';
import AppBar from 'material-ui/AppBar';
import { Toolbar, ToolbarTitle } from 'material-ui/Toolbar';
import { List, ListItem } from 'material-ui/List';

class _${name} extends Component {
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
          <ToolbarTitle text="Container: ${name}"/>
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

const ${name} = Container.create(_${name});
export default ${name};
`;

  fu.createFile(`./app/components/${name}.js`, code);
}


module.exports.StoreFile = (name) => {

  const code =
`import { ReduceStore } from 'flux/utils';
import { ActionTypes } from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';
import Immutable from 'immutable';

class ${name} extends ReduceStore {
  getInitialState() {
    return [];
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.TYPE_001:
        return state;
      default:
        return state;
    }
  }
}

export default new ${name}(AppDispatcher);
`;

  fu.createFile(`./app/stores/${name}.js`, code);
}


module.exports.ActionFile = (name) => {

  const code =
`import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

const ${name}ActionCreators = {

  action001(arg1) {
    // 1. Do something. (e.g. Fetch JSON from an API)
    // 2. Pass the result to the data in the dispatch.
    AppDispatcher.dispatch({
      type: ActionTypes.TYPE_001,
      data: 'RESULT OF YOUT ACTION',
    });
  },

  action002(arg1) {
    AppDispatcher.dispatch({
      type: ActionTypes.TYPE_002,
      data: 'RESULT OF YOUT ACTION',
    });
  },

};

export default ${name}ActionCreators;
`;

  fu.createFile(`./app/actions/${name}ActionCreators.js`, code);
}

module.exports.ComponentTestFiles = () => {
  const basePath = './app/components/';
  const components = fu.getFileNames(basePath);
  for (const i in components) {
    const component = path.parse(components[i]).name;
    const testFile = './__tests__/' + component + '-test.js';
    fu.createFile(testFile, generator.ComponentTestCode(component));
  }
}

module.exports.ComponentTestCode = (module) => {
    const testCode = 
`import React from 'react';
import ReactDOM from 'react-dom';
import ReactTestUtils from 'react-dom/test-utils';
import ${module} from '../app/components/${module}'


test('${module} is equeal to ...' , () => {
  const app = ReactTestUtils.renderIntoDocument(
    <${module} />
  );
  const appNode = ReactDOM.findDOMNode(app);
  expect('hello').toequeal('hello');
  //expect(appNode.//todo).toEqual('//todo');

});
`
  return testCode;
}


