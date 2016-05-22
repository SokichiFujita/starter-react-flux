# starter-react-flux

A React/Flux project and code generator.

## Installation

```
npm install -g starter-react-flux
```

## Usage

```
starter-react-flux init                                  // Setup a new react and flux project.
starter-react-flux generate component [Component_Name]   // Generate a React Component file.
starter-react-flux generate container [Container_Name]   // Generate a Container file.
starter-react-flux generate store [Store_Name]           // Generate a ReduceStore file.
starter-react-flux generate action [ActionCreators_Name] // Generate a ActionCreators file.
starter-react-flux generate test                         // Generate test files from your components.
```

## React stack

### Facebook official libraries

- [React.js](http://facebook.github.io/react/)
  - [react](https://facebook.github.io/react/index.html)
  - [react-dom](https://facebook.github.io/react/index.html)
- [React Addons](https://facebook.github.io/react/docs/addons.html)
  - [Animation: react-addons-css-transition-group](https://facebook.github.io/react/docs/animation.html)
  - [Test Utilities: react-addons-test-utils](https://facebook.github.io/react/docs/test-utils.html)
  - [Performance Tools: react-addons-perf](https://facebook.github.io/react/docs/perf.html)
- [Flux](https://facebook.github.io/flux/)
  - [flux/utils](https://facebook.github.io/flux/docs/flux-utils.html)
- [Jest](https://facebook.github.io/jest/)
- [Immutable.js](https://facebook.github.io/immutable-js/)

### 3rd Party libraries

- [Webpack](https://webpack.github.io)
  - [Webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
- [Babel](https://babeljs.io)
  - [React preset](http://babeljs.io/docs/plugins/preset-react/)
  - [ES2015 preset](https://babeljs.io/docs/plugins/preset-es2015/)
- [ESLint](http://eslint.org)
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)
- [React-Router](https://github.com/reactjs/react-router)
- [material-ui](http://www.material-ui.com)
- [axios](https://github.com/mzabriskie/axios)



## npm commands

```
npm start                     // Webpack-dev-server
npm test                      // Jest
npm run lint                  // ESLint
npm run build                 // Build for production
```

## Directory structure

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

- MIT


