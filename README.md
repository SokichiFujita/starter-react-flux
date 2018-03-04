# starter-react-flux 

[![Build Status](https://travis-ci.org/SokichiFujita/starter-react-flux.svg?branch=master)](https://travis-ci.org/SokichiFujita/starter-react-flux) 
[![total](https://img.shields.io/npm/dt/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux) 
[![per year](https://img.shields.io/npm/dy/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux) 
[![per month](https://img.shields.io/npm/dm/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux) 
[![per week](https://img.shields.io/npm/dw/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux) 
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SokichiFujita/starter-react-flux/blob/master/LICENSE) 
[![npm](https://img.shields.io/npm/v/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux) 
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SokichiFujita/starter-react-flux/blob/master/README.md) 

A starter kit for a React and Flux projext. You can easily start a standard React and Flux project using awesome libraries.

## Requirements

- Please install [yarn](https://yarnpkg.com/).
  - [yarn - installation](https://yarnpkg.com/en/docs/install)

## Installation

```
npm install -g starter-react-flux
```

## Usage

### Start a new project

```
mkdir my-app && cd my-app
starter-react-flux init       // Setup a new React and Flux project.
```

```
npm start                     // Launch the app with webpack-dev-server.
npm test                      // Test with Jest.
npm run build                 // Build the app into the ./public directory.
npm run lint                  // Check the code by ESLint.
```

### Add optional components for React or Flux

```
starter-react-flux generate component [Component_Name]   // Generate a React Component file.
starter-react-flux generate container [Container_Name]   // Generate a Container file for Flux.
starter-react-flux generate store [Store_Name]           // Generate a ReduceStore file for Flux.
starter-react-flux generate action [ActionCreators_Name] // Generate a ActionCreators file for Flux.
```

## Using modules

- [React.js v16](http://facebook.github.io/react/)
  - [react](https://facebook.github.io/react/index.html)
  - [react-dom](https://facebook.github.io/react/index.html)
- [React Addons](https://facebook.github.io/react/docs/addons.html)
  - [Test Utilities: react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html)
- [Flux](https://facebook.github.io/flux/)
  - [flux/utils](https://facebook.github.io/flux/docs/flux-utils.html)
- [Jest](https://facebook.github.io/jest/)
- [Webpack v4](https://webpack.js.org)
  - [Webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
- [Babel](https://babeljs.io)
  - [React preset](http://babeljs.io/docs/plugins/preset-react/)
  - [Env preset](https://babeljs.io/docs/plugins/preset-env/)
  - [Stage 0 preset](https://babeljs.io/docs/plugins/preset-stage-0/)
- [ESLint](http://eslint.org)
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React-Router v4](https://reacttraining.com/react-router/)
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [Material-UI](http://www.material-ui.com)
- [Axios](https://github.com/mzabriskie/axios)

## Directory structure of the generated app

```
.
├── .babelrc
├── .eslintrc
├── __tests__
├── app
│   ├── App.js
│   ├── actions
│   ├── components
│   ├── constants
│   ├── dispatcher
│   ├── stores 
│   └── utils
├── node_modules
├── package.json
├── public
│   ├── css
│   ├── img
│   ├── index.html
│   └── js
└── webpack.config.js
```

## License

- MIT License


