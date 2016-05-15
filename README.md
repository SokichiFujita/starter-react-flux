# starter-react-flux

A non-opinionated project generator for React and Flux.

- Facebook's official React toolchains are adopted.
- Setup a well-configured React/Flux development environment.
- Generate test scaffolds for Jest from your React components.
- Generate scaffolds for Flux 
  - Dispatcher
  - Action Creator
  - Store :FluxReduceStore
  - Component

## React stack

- [React.js](http://facebook.github.io/react/)
  - React
  - react-dom
  - react-addons-test-utils
  - react-addons-perf
  - react-addons-css-transition-group
- [Flux](https://facebook.github.io/flux/)
  - [flux/utils](https://facebook.github.io/flux/docs/flux-utils.html)
- [Jest](https://facebook.github.io/jest/)
- [Immutable.js](https://facebook.github.io/immutable-js/)
- [Webpack](https://webpack.github.io), [Webpack-dev-server](https://webpack.github.io/docs/webpack-dev-server.html)
- [Babel](https://babeljs.io)
- [ESLint](http://eslint.org)
  - [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript)

## Installation

```
npm install -g starter-react-flux
```

## Usage

```
starter-react-flux init                                  // Setup a new react/flux project.
starter-react-flux generate test                         // Generate tests from your components.
starter-react-flux generate store [Store_Name]           // Generate the store.
starter-react-flux generate action [ActionCreators_Name] // Generate the ActionCreators.
```

## Supported npm commands

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

## Todo

- [x] Support for global npm command to make installation easier. (`npm install -g`)
- [x] Add more good toolchains. (e.g. Facebook's Immutable.js)
- [ ] Add 3rd-party libraries (e.g. Material-UI, React-router)
- [ ] Add tests for the generator.
- [ ] Generate tests for stores and actions.
- [ ] Refactoring.

## License

- MIT

