#!/usr/bin/env node

const exec = require('child_process').execSync;

const generator = require('./generator');
const fu = require('./futil');

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
  'npm install --save-dev prop-types',
  'npm install --save-dev raf',

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
  'npm install --save-dev babel-eslint',
  'npm install --save-dev eslint-plugin-import',
  'npm install --save-dev eslint-plugin-react',
  'npm install --save-dev eslint-plugin-jsx-a11y',
  'npm install --save-dev eslint-config-airbnb',

  //Prettier
  'npm install --save-dev prettier',
  'npm install --save-dev eslint-plugin-prettier',
  'npm install --save-dev eslint-config-prettier'
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
  "transform": { 
    "^.+\\.jsx?$": "babel-jest"
  },
  "moduleFileExtensions": [
    "js",
    "json"
  ],
  "setupFiles": [
    "raf/polyfill"
  ]
};

const scripts = {
  "start": "webpack-dev-server -d --progress --colors",
  "build": "NODE_ENV=production node_modules/.bin/webpack -p --progress --colors",
  "test": "BABEL_JEST_STAGE=0 jest",
  "lint": "eslint app/** __tests__/**",
  "fix": "eslint app/** __tests__/** --fix"
};

const eslint = {
  "extends": [
    "airbnb",
    "prettier",
    "prettier/react"
  ],
  "parser": "babel-eslint",
  "env": {
     "browser": true,
     "jest": true
  },
  "plugins": [
    "prettier"
  ],
  "rules": {
    "react/jsx-filename-extension": [1, { "extensions": [".js"] }],   
    "react/no-find-dom-node": 0
  }
}

const keywords = {
  "keywords": [
    "react",
    "flux"
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
  fu.createDirectories(dirs);
  exec('npm init -y', fu.puts);
  fu.fixJSON('package.json', 'description', 'React template.');
  fu.fixJSON('package.json', 'repository', repository);
  fu.fixJSON('package.json', 'jest', jest); 
  fu.fixJSON('package.json', 'scripts', scripts); 
  fu.fixJSON('package.json', 'keywords', keywords); 
  fu.fixJSON('package.json', 'license', 'MIT'); 

  fu.createJSON('.eslintrc', eslint);
  fu.createJSON('.babelrc', {"presets":["react", "env", "stage-0"]});
  console.log(__dirname);
  fu.createFile('./public/index.html', fu.readFile('./public/index.html'));
  fu.createFile('./public/css/style.css', fu.readFile('./public/main.css'));
  fu.createFile('webpack.config.js', fu.readFile('./app/webpack.js'));
  fu.createFile('./app/App.js', fu.readFile('./app/App.js'));
  fu.createFile('./app/dispatcher/AppDispatcher.js', fu.readFile('./app/dispatcher/dispatcher.js'));
  fu.createFile('./app/constants/AppConstants.js', fu.readFile('./app/constants/constant.js'));
  fu.createFile('./app/components/Sample.js', fu.readFile('./app/components/Sample.js'));
  fu.createFile('./__tests__/Sample-test.js', fu.readFile('./__tests__/testSample.js'));

  generator.StoreFile('SampleStore');
  generator.ContainerFile('TopContainer');
  generator.ContainerFile('SampleContainer1');
  generator.ContainerFile('SampleContainer2');
  npmInstall(npms);
}

function setupReactPlus() {
  npmInstall(npms_plus);
}

function npmInstall(npms) {
  npms.map(command => {
    console.log(command);
    exec(command, fu.puts);
  });
}


