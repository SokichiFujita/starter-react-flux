# Starter React Flux

![Node.js CI](https://github.com/SokichiFujita/starter-react-flux/workflows/Node.js%20CI/badge.svg?branch=master)
[![Build Status](https://travis-ci.org/SokichiFujita/starter-react-flux.svg?branch=master)](https://travis-ci.org/SokichiFujita/starter-react-flux)
[![total](https://img.shields.io/npm/dt/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux)
[![per year](https://img.shields.io/npm/dy/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux)
[![per month](https://img.shields.io/npm/dm/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux)
[![per week](https://img.shields.io/npm/dw/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/SokichiFujita/starter-react-flux/blob/master/LICENSE)
[![npm](https://img.shields.io/npm/v/starter-react-flux.svg)](https://www.npmjs.com/package/starter-react-flux)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen.svg)](https://github.com/SokichiFujita/starter-react-flux/blob/master/README.md)

Starter-React-Flux generates a well-configured project of [React](https://reactjs.org/) and [Flux](https://facebook.github.io/flux/) [PWA](https://developers.google.com/web/progressive-web-apps/).

![](./images/app1.png)

- **[TypeScript](https://www.typescriptlang.org)** and **[JavaScript](https://developer.mozilla.org/docs/Web/JavaScript)** are supported.
- **[npm](https://www.npmjs.com)** and **[yarn](https://yarnpkg.com)** are supported.

### Quick start

```
mkdir my-app && cd my-app

npx starter-react-flux init // JavaScript and npm
npx starter-react-flux init --ts // TypeScript
npx starter-react-flux init --yarn // yarn

npm start
```


## Installed packages

* [React](http://facebook.github.io/react/)
* [TypeScript](https://www.typescriptlang.org) (Optional)
* [Flux](https://facebook.github.io/flux/)
* [Jest](https://facebook.github.io/jest/)
* [Babel v7](https://babeljs.io)
  * [@babel/preset-react](http://babeljs.io/docs/plugins/preset-react/)
  * [@babel/preset-env](https://babeljs.io/docs/plugins/preset-env/)
  * [Experimental Plugins](https://babeljs.io/docs/en/plugins#experimental)
  * [@babel/preset-typescript](https://babeljs.io/docs/en/babel-preset-typescript/) (Optional) 
  * [babel-eslint](https://github.com/babel/babel-eslint)
  * [babel-jest](https://jestjs.io)
  * [babel-loader](https://github.com/babel/babel-loader)
* [Webpack v5](https://webpack.js.org)
  * [Webpack-Dev-Server](https://webpack.github.io/docs/webpack-dev-server.html)
  * [HTML-Webpack-Plugin](https://github.com/jantimon/html-webpack-plugin)
  * [Workbox-Webpack-Plugin](https://developers.google.com/web/tools/workbox/modules/workbox-webpack-plugin)
  * [Webpack-PWA-Manifest](https://github.com/arthurbergmz/webpack-pwa-manifest)
  * [Webpack Bundle Analyzer](https://github.com/webpack-contrib/webpack-bundle-analyzer)
  * [Webpack Bundle Size Analyzer](https://github.com/robertknight/webpack-bundle-size-analyzer)
* [ESLint v7](http://eslint.org)
  * [eslint-plugin-react](https://github.com/yannickcr/eslint-plugin-react)
  * [eslint-plugin-react-hooks](https://www.npmjs.com/package/eslint-plugin-react-hooks)
  * [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb)
  * [eslint-config-prettier](https://github.com/prettier/eslint-config-prettier)
  * [eslint-plugin-import](https://github.com/benmosher/eslint-plugin-import)
  * [eslint-plugin-jest](https://github.com/jest-community/eslint-plugin-jest)
  * [eslint-plugin-jsx-a11y](https://github.com/evcohen/eslint-plugin-jsx-a11y)
  * [eslint-plugin-prettier](https://github.com/prettier/eslint-plugin-prettier)
  * [@typescript-eslint/eslint-plugin](https://github.com/typescript-eslint/typescript-eslint) (Optional)
  * [@typescript-eslint/parser](https://github.com/typescript-eslint/typescript-eslint) (Optional)
* [Prettier](https://prettier.io)
* [Workbox](https://developers.google.com/web/tools/workbox/)
* [React-Router v5](https://reacttraining.com/react-router/)
* [Material-UI v4](http://www.material-ui.com)
* [axios](https://github.com/mzabriskie/axios)
* [Immutable.js](https://facebook.github.io/immutable-js/)


## Usage of generated project

### Launch the application

```
npm start                     // Launch the app with webpack-dev-server.
```

#### Top page

![](./images/app1.png)

### Production build with Webpack

```
npm run build                 // Build the app into the ./public directory.
```

This command also analyzes the bundle file using Webpack Bundle Analyzer and generates reports.

![](./images/webpack-bundle-analyzer.png)

### Testing with Jest

```
npm test                      // Testing with Jest.
npm run update_test           // Update snapshots for snapshot testing.
```

### Static analysis with ESLint

```
npm run lint                  // Run static analysis by ESLint.
```

### Automatic code format with Prettier

```
npm run fix                   // Run Prettier to fix code by lint rules.
```


## Directory structure of the generated app

```
.
├── .babelrc          //Configuration for Babel
├── .eslintrc         //Configuration for ESLint
├── __tests__         //Test files for JEST
├── app
│   ├── App.(js|tsx)  //Entry point to build
│   ├── actions       //Action Creators of Flux
│   ├── components    //React Components
│   ├── constants     //Constatns for Action Creators and Stores of Flux
│   ├── dispatcher    //Dispatcher of Flux
│   ├── stores        //ReduceStore of Flux
│   ├── utils         //Utils
│   ├── html          //HTML template for PWA
│   ├── icon          //Icon source for PWA
│   ├── sw.js         //ServiceWorker template for PWA
│   └── utils         //Utils
├── node_modules
├── package.json
├── public            //`npm run build` command generates the assets
│   ├── css           //CSS files
│   ├── img           //Image files
│   ├── favicon.ico   //Favicon
│   ├── bundle.js     //Built js by Webpack
│   ├── manifest.*.json  //Generated Web App Manifest
│   ├── precache-manifest.*.js //Generated Precache Manifest for Workbox
│   ├── icon_*.png    //Generated icons from the source icon
│   ├── sw.js         //Generated ServiceWorker from the template
│   └── index.html    //Generated index.html from the template
├── analysis          //Reports of bundle analysis
│   ├── bundle-analyzer.html
│   └── bundle-size analyzer.log
│── webpack.common.js //Configuration for Webpack
│── webpack.prod.js   //Production configuration for Webpack
│── webpack.dev.js    //Development configuration for Webpack
└── tsconfig.json     //TypeScript configuration (only for TypeScript project)
```


## License

* MIT License
