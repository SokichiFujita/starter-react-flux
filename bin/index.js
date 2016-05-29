#!/usr/bin/env node

const util = require('util');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');

const dirs = [
  //Flux
  './app',
  './app/actions',
  './app/constants',
  './app/components',
  './app/dispatcher',
  './app/stores',
  './app/utils',

  //Build
  './public',
  './public/css',
  './public/img',
  './public/js',
  
  //Jest
  './__tests__'
]

const npms = [
  //Babel
  'npm install --save-dev babel-cli',
  'npm install --save-dev babel-preset-es2015',
  'npm install --save-dev babel-preset-react',
  'npm install --save-dev babel-preset-stage-0',

  //React.js
  'npm install --save react',
  'npm install --save react-dom',
  'npm install --save-dev react-addons-css-transition-group',
  'npm install --save-dev react-addons-test-utils',
  'npm install --save-dev react-addons-perf',

  //Flux
  'npm install --save flux',

  //Immutable.js
  'npm install --save immutable',
  
  //Jest
  'npm install --save-dev jest-cli',
  'npm install --save-dev babel-jest',
  'npm install --save-dev babel-polyfill',

  //WebPack
  'npm install --save-dev webpack',
  'npm install --save-dev webpack-dev-server',
  'npm install --save-dev babel-loader',

  //ESLint
  'npm install --save-dev eslint',
  'npm install --save-dev eslint-plugin-import',
  'npm install --save-dev eslint-plugin-react',
  'npm install --save-dev eslint-plugin-jsx-a11y',
  'npm install --save-dev eslint-config-airbnb'
]


const npms_plus = [
  'npm install --save react-tap-event-plugin',
  'npm install --save material-ui',
  'npm install --save react-router',  
  'npm install --save axios'  
]


const repository = {
  "type":"git", 
  "url":"https://example.com"
};

const jest = {
  "unmockedModulePathPatterns": [
    "<rootDir>/node_modules/react",
    "<rootDir>/node_modules/react-dom",
    "<rootDir>/node_modules/react-addons-test-utils"
  ],
  "scriptPreprocessor": "<rootDir>/node_modules/babel-jest",
  "testFileExtensions": [
    "js"
  ],
  "moduleFileExtensions": [
    "js",
    "json"
  ]
};

const scripts = {
  "start": "webpack-dev-server -d --progress --colors --display-error-details",
  "build": "NODE_ENV=production node_modules/.bin/webpack -p --progress --colors --display-error-details",
  "test": "BABEL_JEST_STAGE=0 jest",
  "lint": "eslint app/**"
};

const eslint = {
    "extends": "airbnb",
    "plugins": [
        "react"
    ]
}

const keywords = {
  "keywords": [
    "react",
    "reactjs",
    "react.js",
    "flux",
    "flux-utils",
    "jest",
    "immutable",
    "immutable.js",
    "react-router",
    "material-ui",
    "axios",
    "es6",
    "es7",
    "es2015",
    "es2016",
    "stage-0",
    "babel",
    "eslint",
    "webpack",
    "react-component"
  ]
}



const webpackConfig = 
`const webpack = require('webpack');

const config = {
  devtool: "inline-source-map",
  entry:  __dirname + "/app/App.js",
  output: {
    path: "./public/js/",
    publicPath: "/js/",
    filename: "bundle.js"
  },
  module: {
    loaders: [{
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loader: "babel",
      query: {
        presets: ["es2015","react","stage-0"]
      }
    }]
  },
  devServer: {
    contentBase: "./public",
    colors: true,
    historyApiFallback: true,
    inline: true
  },
}

if (process.env.NODE_ENV === 'production') {
  config.devtool = false;
  config.plugins = [
    new webpack.optimize.OccurenceOrderPlugin(),
    new webpack.optimize.UglifyJsPlugin({comments: false}),
    new webpack.DefinePlugin({
      'process.env': {NODE_ENV: JSON.stringify('production')}
    })
  ];
};

module.exports = config;
`;

const indexHTML = 
`<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title></title>
    <link rel="stylesheet" href="./css/style.css">
  </head>
  <body>
    <div id='root'>
    </div>
    <script src="./js/bundle.js"></script>
  </body>
</html>
`;

const appJS = 
`import React from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import { Router, Route, browserHistory } from 'react-router'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';

import TopContainer from './components/TopContainer';
import SampleContainer1 from './components/SampleContainer1';
import SampleContainer2 from './components/SampleContainer2';

const muiTheme = getMuiTheme({});

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router history={browserHistory}>
      <Route path="/" component={TopContainer}/>
      <Route path="sample1" component={SampleContainer1}/>
      <Route path="sample2" component={SampleContainer2}/>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'));
`;

const appDispatcherJS = 
`import { Dispatcher } from 'flux';

class AppDispatcher extends Dispatcher {
  dispatch(action = {}) {
    super.dispatch(action);
  }
}

export default new AppDispatcher();
`;

const appConstantsJS =
`export const ActionTypes = {
  TYPE_001: 'type-001',
  TYPE_002: 'type-002',
};
`;

const componentSample =
`import React, { Component, PropTypes } from 'react';

class Sample extends Component {

  static propTypes = {
    title: PropTypes.string.isRequired
  }

  render() {
    return (
      <div>
        <h1>Hello</h1>
        <p>{this.props.title}</p>
      </div>
    );
  }
}

export default Sample;
`;

const sampleTest =
`jest.unmock('../app/components/Sample');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import Sample from '../app/components/Sample'

describe('<Sample />', () => {
  it('displays "Hello World"', () => {
    const app = TestUtils.renderIntoDocument(
      <Sample title="World" />
    );
    const appNode = ReactDOM.findDOMNode(app);
    expect(appNode.textContent).toEqual('HelloWorld');
  });
});
`;

main();

function main() {
  console.log('*** starter-react-flux ***');
  const args = process.argv;
  switch (args.length) {
    case 3:
      if (args[2] == 'init') {
        setupReact();
        setupReactPlus();
        showComplete();
      } else if (args[2] == 'init-basic'){
        setupReact();
        showUsage();
      }
      break;
    case 4:
      if (args[2] == 'generate' && args[3] == 'test') {
        generateComponentTestFiles();
        showComplete();
      } else {
        showUsage();
      }
      break;
    case 5:
      if (args[2] == 'generate' && args[3] == 'store') {
        generateStoreFile(args[4]);
        showComplete();
      } else if (args[2] == 'generate' && args[3] == 'action') {
        generateActionFile(args[4]);
        showComplete();
      } else if (args[2] == 'generate' && args[3] == 'container') {
        generateContainerFile(args[4]);
        showComplete();
      } else if (args[2] == 'generate' && args[3] == 'component') {
        generateComponentFile(args[4]);
        showComplete();
      } else {
        showUsage();
      }
      break;
    default:
      showUsage();
      break;
  }
}

function showUsage() {
  console.log('*** starter-react-flux ***');
  console.log('Usage:');
  console.log('starter-react-flux init                      : Setup a React/Flux project.');
  console.log('starter-react-flux generate container [Name] : Generate the Component.');
  console.log('starter-react-flux generate component [Name] : Generate the Container.');
  console.log('starter-react-flux generate store  [Name]    : Generate the Store. ');
  console.log('starter-react-flux generate action [Name]    : Generate the ActionCreators.');
  console.log('starter-react-flux generate test             : Generate tests of components.');
  process.exit(-1);
}

function showComplete() {
  console.log('Completed!');
}

function setupReact(arg) {
  createDirectories(dirs);
  exec('npm init -y', puts);
  fixJSON('package.json', 'description', 'React template.');
  fixJSON('package.json', 'repository', repository);
  fixJSON('package.json', 'jest', jest); 
  fixJSON('package.json', 'scripts', scripts); 
  fixJSON('package.json', 'keywords', keywords); 
  fixJSON('package.json', 'license', 'MIT'); 
  createJSON('.eslintrc', eslint);
  createJSON('.babelrc', {"presets":["react", "es2015", "stage-0"]});
  createFile('./public/index.html', indexHTML);
  createFile('./public/css/style.css', '');
  createFile('webpack.config.js', webpackConfig);
  createFile('./app/App.js', appJS);
  createFile('./app/dispatcher/AppDispatcher.js', appDispatcherJS);
  createFile('./app/constants/AppConstants.js', appConstantsJS);
  createFile('./app/components/Sample.js', componentSample);
  createFile('./__tests__/Sample-test.js', sampleTest);
  generateStoreFile('SampleStore');
  generateContainerFile('TopContainer');
  generateContainerFile('SampleContainer1');
  generateContainerFile('SampleContainer2');
  npmInstall(npms);
}

function setupReactPlus() {
  npmInstall(npms_plus);
}

function generateComponentTestFiles() {
  const basePath = './app/components/';
  const components = getFileNames(basePath);
  for (const i in components) {
    const component = path.parse(components[i]).name;
    const testFile = './__tests__/' + component + '-test.js';
    createFile(testFile, generateComponentTestCode(component));
  }
}

function generateComponentTestCode(module) {
  const testCode = 
`jest.unmock('../app/components/${module}');

import React from 'react';
import ReactDOM from 'react-dom';
import TestUtils from 'react-addons-test-utils';
import ${module} from '../app/components/${module}'

describe('<${module} />', () => {
  it('', () => {
    const renderer = TestUtils.createRenderer();
    renderer.render(
      <${module} />
    );
    const dom = renderer.getRenderOutput();
    //expect(dom.props.//PROPS_NAME).toEqual('//TEXT');
  });
});
`
  return testCode;
}

function generateComponentFile(name) {
  const code =
`import React, { Component, PropTypes } from 'react';
import { Link } from 'react-router'

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
  
  createFile(`./app/components/${name}.js`, code);
}


function generateContainerFile(name) {
  const code =
`import React, { Component } from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import { Link } from 'react-router'
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
          <ListItem><Link to="sample1">Sample1</Link></ListItem>
          <ListItem><Link to="sample2">Sample2</Link></ListItem>
        </List>
      </div>
    );
  }
}

const ${name} = Container.create(_${name});
export default ${name};
`;

  createFile(`./app/components/${name}.js`, code);
}


function generateStoreFile(name) {

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

  createFile(`./app/stores/${name}.js`, code);
}


function generateActionFile(name) {

const code =
`import AppDispatcher from '../dispatcher/AppDispatcher';
import { ActionTypes } from '../constants/AppConstants';

const ${name}ActionCreators = {

  action001(arg1) {
    //
    // Do something and pass the result to the data in the dispatch.
    //
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

  createFile(`./app/actions/${name}ActionCreators.js`, code);
}

function getFileNames(dir) {
  if (fs.existsSync(dir)) { 
    return fs.readdirSync(dir);
  }
  return [];
}

function createDirectories(dirs) {
  dirs.map(function(dir) {
    if (!fs.existsSync(dir)) { 
      fs.mkdirSync(dir); 
      console.log('Create:', dir);
    }
  })
}

function npmInstall(npms) {
  npms.map(command => {
    console.log(command);
    exec(command, puts);
  });
}

function puts(error, stdout, stderr) { 
  util.puts(stdout);
  util.puts(stderr);
  util.puts(error);
}

function createFile(file, content) {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, content);
    console.log('Create:', file);
  }
}

function createJSON(file, json) {
  if (!fs.existsSync(file)) { 
    fs.writeFileSync(file, JSON.stringify(json, null, "  "));
    console.log('Create:', file);
  }
}

function fixJSON(file, key, value) {
  var json = JSON.parse(fs.readFileSync(file));
  json[key] = value;
  fs.writeFileSync(file, JSON.stringify(json, null, "  "));
  console.log('Fix:', file, 'Key:', key);
}

