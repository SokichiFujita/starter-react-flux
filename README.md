# starter-react-flux [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SokichiFujita/starter-react-flux/master/LICENSE) [![Build Status](https://travis-ci.org/SokichiFujita/starter-react-flux.svg?branch=master)](https://travis-ci.org/SokichiFujita/starter-react-flux) [![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)]()

This is a starter kit for React and Flux. 

This tool will create a clean directories and code for React and Flux. 
You can easily start a React and Flux project.

## Installation

```
npm install -g starter-react-flux
```

## Usage

```
starter-react-flux init                                  // Setup a new React and Flux project.
starter-react-flux generate component [Component_Name]   // Generate a React Component file.
starter-react-flux generate container [Container_Name]   // Generate a Container file for Flux.
starter-react-flux generate store [Store_Name]           // Generate a ReduceStore file for Flux.
starter-react-flux generate action [ActionCreators_Name] // Generate a ActionCreators file for Flux.
```

## Using libraries

- [React.js v16](http://facebook.github.io/react/)
  - [react](https://facebook.github.io/react/index.html)
  - [react-dom](https://facebook.github.io/react/index.html)
- [React Addons](https://facebook.github.io/react/docs/addons.html)
  - [Test Utilities: react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html)
- [Flux](https://facebook.github.io/flux/)
  - [flux/utils](https://facebook.github.io/flux/docs/flux-utils.html)
- [Jest](https://facebook.github.io/jest/)
- [Webpack](https://webpack.js.org)
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

## npm scripts for the generated app

```
npm start                     // Launch your app with webpack-dev-server
npm test                      // Test with Jest
npm run lint                  // Analyzing your code by ESLint
npm run build                 // Build your app into the public directory
```

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


