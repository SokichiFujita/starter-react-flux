#!/usr/bin/env node

const util = require('util');
const exec = require('child_process').execSync;
const fs = require('fs');
const path = require('path');
const generator = require('./generator');

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
  'npm install --save-dev babel-preset-env',
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
  'npm install --save react-router-dom',  
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
  "start": "webpack-dev-server -d --progress --colors",
  "build": "NODE_ENV=production node_modules/.bin/webpack -p --progress --colors",
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
    "es2017",
    "stage-0",
    "babel",
    "eslint",
    "webpack",
    "react-component"
  ]
}

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
        generator.ComponentTestFiles();
        showComplete();
      } else {
        showUsage();
      }
      break;
    case 5:
      if (args[2] == 'generate' && args[3] == 'store') {
        generator.StoreFile(args[4]);
        showComplete();
      } else if (args[2] == 'generate' && args[3] == 'action') {
        generator.ActionFile(args[4]);
        showComplete();
      } else if (args[2] == 'generate' && args[3] == 'container') {
        generator.ContainerFile(args[4]);
        showComplete();
      } else if (args[2] == 'generate' && args[3] == 'component') {
        generator.ComponentFile(args[4]);
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
  createJSON('.babelrc', {"presets":["react", "env", "stage-0"]});
  createFile('./public/index.html', readFile('./index.html'));
  createFile('./public/css/style.css', readFile('./main.css'));
  createFile('webpack.config.js', readFile('./webpack'));
  createFile('./app/App.js', readFile('./App.js'));
  createFile('./app/dispatcher/AppDispatcher.js', readFile('./dispatcher.js'));
  createFile('./app/constants/AppConstants.js', readFile('./constant.js'));
  createFile('./app/components/Sample.js', readFile('./Sample.js'));
  createFile('./__tests__/Sample-test.js', readFile('./testSample.js'));
  generator.StoreFile('SampleStore');
  generator.ContainerFile('TopContainer');
  generator.ContainerFile('SampleContainer1');
  generator.ContainerFile('SampleContainer2');
  npmInstall(npms);
}

function setupReactPlus() {
  npmInstall(npms_plus);
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

function readFile(file) {
  if (fs.existsSync(file)) { 
    const content = fs.readFileSync(file);
    console.log('Read:', file);
    return content; 
  }
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

