const fs = require('fs');
const util = require('util');
const path = require('path');
const fu = require('./futil');

module.exports.ComponentFile = (name) => {
    const code =
`import React, { Component } from 'react';
import PropTypes from 'prop-types'; 

class ${name} extends Component {
  render() {
    return (
      <div>
        <h1>{this.props.title}</h1>
        <h2>{this.props.subtitle}</h2>
        <div>{this.props.text}</div>
      </div>
    );
  }
}

${name}.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default ${name};
`;
    
  fu.createFile(`./app/components/${name}.js`, code);
}


module.exports.ContainerFile = (name) => {
    const code =
`import React, { Component } from 'react';
import { Container } from 'flux/utils';
import SampleStore from '../stores/SampleStore';
import Navi from './Navi';
import Menu from './Menu';
import Content from './Content';

class _${name}Container extends Component {
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
        <Navi title="${name}"/>
        <div style={{display:"flex"}}>
          <Menu/>
          <Content 
            title={this.state.sample.title} 
            subtitle={this.state.sample.subtitle}
            text={this.state.sample.text}
            style={{margin:'10px'}}
          />
        </div>
      </div>
    );
  }
}

const ${name}Container = Container.create(_${name}Container);
export default ${name}Container;
`;

  fu.createFile(`./app/components/${name}Container.js`, code);
}


module.exports.StoreFile = (name) => {

  const code =
`import { ReduceStore } from 'flux/utils';
import ActionTypes from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class ${name}Store extends ReduceStore {
  getInitialState() {
    return {
      title: "Title", 
      subtitle: "Subtitle", 
      text: "Text",
      count: 0
    };
  }

  reduce(state, action) {
    switch (action.type) {
      case ActionTypes.TYPE_001:
        return state;
      case ActionTypes.TYPE_002:
        const newCount = state.count + 1;
        const result = {
          title: action.data.title,
          subtitle: action.data.subtitle,
          text: "Action Creator is called " + newCount  + " times.",
          count: newCount
        }
        return result;
      default:
        return state;
    }
  }
}

export default new ${name}Store(AppDispatcher);
`;

  fu.createFile(`./app/stores/${name}Store.js`, code);
}


module.exports.ActionFile = (name) => {

  const code =
`import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/AppConstants';

const ${name}ActionCreators = {

  action001(arg1) {
    // 1. Do something. (e.g. Fetch JSON from an API)
    // 2. Create an action from the result.
    // 3, Pass the action to the dispatch().
    AppDispatcher.dispatch({
      type: ActionTypes.TYPE_001,
      data: 'RESULT OF YOUT ACTION',
    });
  },

  action002(arg1) {
    AppDispatcher.dispatch({
      type: ActionTypes.TYPE_002,
      data: {
        "title": "New Title",
        "subtitle": "New Subtitle",
        "text": "New Text"
      },
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


