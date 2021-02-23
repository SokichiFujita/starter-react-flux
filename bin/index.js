#!/usr/bin/env node

const exec = require("child_process").execSync;

const generator = require("./generator");
const fu = require("./futil");

const dirs = [
  // Flux
  "./app",
  "./app/actions",
  "./app/constants",
  "./app/components",
  "./app/dispatcher",
  "./app/stores",
  "./app/utils",
  "./app/html",
  "./app/icon",

  // Build
  "./public",
  "./public/css",
  "./public/img",

  // Jest
  "./__tests__",

  // Bundle analysis
  "./analysis/",
];

const npms = (yarn) => {
  const npmInstall = "npm install --save";
  const npmInstallDev = "npm install --save-dev";
  const yarnInstall = "yarn add";
  const yarnInstallDev = "yarn add --dev";
  const install = yarn ? yarnInstall : npmInstall;
  const installDev = yarn ? yarnInstallDev : npmInstallDev;

  return [
    // Babel
    `${installDev} @babel/cli`,
    `${installDev} @babel/core`,
    `${installDev} @babel/preset-env`,
    `${installDev} @babel/preset-react`,

    // Polyfill
    `${install} @babel/runtime-corejs3`,
    `${installDev} @babel/plugin-transform-runtime`,

    // Experimental
    `${installDev} @babel/plugin-proposal-class-properties`,
    `${installDev} @babel/plugin-proposal-decorators`,
    `${installDev} @babel/plugin-proposal-do-expressions`,
    `${installDev} @babel/plugin-proposal-export-default-from`,
    `${installDev} @babel/plugin-proposal-export-namespace-from`,
    `${installDev} @babel/plugin-proposal-function-bind`,
    `${installDev} @babel/plugin-proposal-function-sent`,
    `${installDev} @babel/plugin-proposal-logical-assignment-operators`,
    `${installDev} @babel/plugin-proposal-nullish-coalescing-operator`,
    `${installDev} @babel/plugin-proposal-numeric-separator`,
    `${installDev} @babel/plugin-proposal-optional-chaining`,
    `${installDev} @babel/plugin-proposal-pipeline-operator`,
    `${installDev} @babel/plugin-proposal-private-methods`,
    `${installDev} @babel/plugin-proposal-throw-expressions`,

    // Others
    `${installDev} @babel/plugin-syntax-dynamic-import`,
    `${installDev} @babel/plugin-syntax-import-meta`,
    `${installDev} @babel/plugin-proposal-json-strings`,

    // React
    `${install} react`,
    `${install} react-dom`,
    `${install} prop-types`,

    // Flux
    `${install} flux`,

    // Immutable.js
    `${install} immutable`,

    // Jest
    `${installDev} jest`,
    `${installDev} babel-jest`,
    `${installDev} react-test-renderer`,

    // WebPack
    `${installDev} webpack`,
    `${installDev} webpack-cli`,
    `${installDev} webpack-dev-server`,
    `${installDev} babel-loader`,
    `${installDev} webpack-merge@latest`,
    // Analyze modules
    `${installDev} webpack-bundle-analyzer`,
    `${installDev} webpack-bundle-size-analyzer`,
    // For PWA
    `${installDev} workbox-webpack-plugin`,
    `${installDev} webpack-pwa-manifest`,
    `${installDev} html-webpack-plugin`,

    // ESLint
    `${installDev} eslint`,
    `${installDev} babel-eslint`,
    `${installDev} eslint-config-airbnb`,
    `${installDev} eslint-plugin-import`,
    `${installDev} eslint-plugin-react`,
    `${installDev} eslint-plugin-jsx-a11y`,
    `${installDev} eslint-plugin-jest`,
    `${installDev} eslint-plugin-react-hooks`,

    // Prettier
    `${installDev} prettier`,
    `${installDev} eslint-config-prettier`,

    // libs
    `${install} @material-ui/core`,
    `${install} @material-ui/icons`,
    `${install} react-router-dom`,
    `${install} axios`,
  ];
};

const npms_ts = (yarn) => {
  const npmInstallDev = "npm install --save-dev";
  const yarnInstallDev = "yarn add --dev";
  const installDev = yarn ? yarnInstallDev : npmInstallDev;

  return [
    `${installDev} typescript`,
    `${installDev} @types/react`,
    `${installDev} @types/react-dom`,
    `${installDev} @types/react-router-dom`,
    `${installDev} @types/flux`,
    `${installDev} @types/jest`,
    `${installDev} @babel/preset-typescript`,
    `${installDev} @typescript-eslint/parser`,
    `${installDev} @typescript-eslint/eslint-plugin`,
  ];
};

const repository = {
  type: "git",
  url: "https://example.com",
};

const jest = {
  unmockedModulePathPatterns: [
    "<rootDir>/node_modules/react",
    "<rootDir>/node_modules/react-dom",
    "<rootDir>/node_modules/react-addons-test-utils",
  ],
  transform: {
    "^.+\\.(js|jsx|ts|tsx)$": "babel-jest",
  },
  moduleFileExtensions: ["js", "json", "ts", "tsx"],
};

const scripts = {
  start: "webpack serve --progress --color --config webpack.dev.js",
  build: "webpack --progress --color --config webpack.prod.js",
  test: "jest",
  update_test: "jest --updateSnapshot",
  lint: "eslint 'app/**/*.{ts,tsx,js}' '__tests__/**/*.{ts,tsx,js}'",
  fix: "eslint --fix 'app/**/*.{ts,tsx,js}' '__tests__/**/*.{ts,tsx,js}' && prettier --write 'app/**/*.{ts,tsx,js}' '__tests__/**/*.{ts,tsx,js}",
};

const eslint = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:jest/recommended",
    "prettier",
    "prettier/react",
  ],
  parser: "babel-eslint",
  env: {
    browser: true,
    jest: true,
  },
  plugins: ["prettier", "jest"],
  rules: {
    "import/prefer-default-export": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js"] }],
    "react/no-find-dom-node": 0,
    "class-methods-use-this": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
  },
};

const eslint_ts = {
  extends: [
    "airbnb",
    "airbnb/hooks",
    "plugin:@typescript-eslint/recommended",
    "plugin:jest/recommended",
    "plugin:prettier/recommended",
    "prettier",
    "prettier/@typescript-eslint",
    "prettier/react",
  ],
  parser: "@typescript-eslint/parser",
  env: {
    browser: true,
    jest: true,
  },
  plugins: ["prettier", "jest", "@typescript-eslint"],
  settings: {
    "import/resolver": {
      node: {
        extensions: [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
  rules: {
    "@typescript-eslint/explicit-function-return-type": "off",
    "react/jsx-filename-extension": [1, { extensions: [".js", ".ts", ".tsx"] }],
    "import/prefer-default-export": "off",
    "react/no-find-dom-node": 0,
    "class-methods-use-this": "off",
    "jsx-a11y/anchor-is-valid": [
      "error",
      {
        components: ["Link"],
        specialLink: ["to", "hrefLeft", "hrefRight"],
        aspects: ["noHref", "invalidHref", "preferButton"],
      },
    ],
    "import/extensions": [
      "error",
      "ignorePackages",
      {
        js: "never",
        jsx: "never",
        ts: "never",
        tsx: "never",
      },
    ],
    "no-use-before-define": "off",
    "@typescript-eslint/no-use-before-define": "error",
    "no-shadow": "off",
    "@typescript-eslint/no-shadow": "error",
  },
};

const keywords = {
  keywords: ["react", "flux"],
};

main();

function main() {
  console.log("*** starter-react-flux ***");
  const args = process.argv;
  const options = {
    ts: false,
    yarn: false,
  };

  if (args.includes("init")) {
    options.yarn = !!args.includes("--yarn");
    options.ts = !!args.includes("--ts");
    if (args[2] === "init") {
      setupReact(options);
      showComplete();
    }
  } else {
    showUsage();
  }
}

function showUsage() {
  console.log("*** starter-react-flux ***");
  console.log("Usage:");
  console.log(
    "starter-react-flux init             : Setup a React/Flux project with npm and JavaScript"
  );
  console.log(
    "starter-react-flux init --yarn      : Setup a React/Flux project with yarn and JavaScript"
  );
  console.log(
    "starter-react-flux init --ts        : Setup a React/Flux project with npm and TypeScript"
  );
  console.log(
    "starter-react-flux init --yarn --ts : Setup a React/Flux project with yarn and TypeScript"
  );

  process.exit(-1);
}

function showComplete() {
  console.log("Completed!");
}

function installModules(npms) {
  npms.map((command) => {
    console.log(command);
    exec(command, fu.puts);
  });
}

function setupReact({ ts = false, yarn = false }) {
  if (ts) {
    scripts.typecheck = "tsc";
    scripts.tsc = "tsc";
  }

  fu.createDirectories(dirs);
  exec("npm init -y", fu.puts);
  fu.fixJSON(
    "package.json",
    "description",
    "React app generated by Starter-React-Flux"
  );
  fu.fixJSON("package.json", "repository", repository);
  fu.fixJSON("package.json", "jest", jest);
  fu.fixJSON("package.json", "scripts", scripts);
  fu.fixJSON("package.json", "keywords", keywords);
  fu.fixJSON("package.json", "license", "MIT");

  fu.createJSON(".eslintrc", ts ? eslint_ts : eslint);
  const presets = [
    "@babel/preset-react",
    "@babel/preset-env",
   ];
  if (ts) {
    presets.push("@babel/preset-typescript");
  }

  fu.createJSON(".babelrc", {
    targets: [
      "last 2 Chrome versions",
      "last 2 Safari versions",
      "last 2 Firefox versions",
      "ie 11",
      "cover 85% in US",
    ],
    presets,
    plugins: [
      ["@babel/plugin-proposal-class-properties", { loose: false }],
      ["@babel/plugin-proposal-decorators", { legacy: true }],
      "@babel/plugin-proposal-do-expressions",
      "@babel/plugin-proposal-export-default-from",
      "@babel/plugin-proposal-export-namespace-from",
      "@babel/plugin-proposal-function-bind",
      "@babel/plugin-proposal-function-sent",
      "@babel/plugin-proposal-logical-assignment-operators",
      ["@babel/plugin-proposal-nullish-coalescing-operator", { loose: false }],
      "@babel/plugin-proposal-numeric-separator",
      ["@babel/plugin-proposal-optional-chaining", { loose: false }],
      ["@babel/plugin-proposal-pipeline-operator", { proposal: "minimal" }],
      ["@babel/plugin-proposal-private-methods", { loose: false }],
      "@babel/plugin-proposal-throw-expressions",
      "@babel/plugin-syntax-dynamic-import",
      "@babel/plugin-syntax-import-meta",
      "@babel/plugin-proposal-json-strings",
      "@babel/plugin-transform-runtime",
    ],
  });

  console.log(__dirname);
  fu.createFile("./app/html/index.html", fu.readFile("./app/html/index.html"));
  fu.createFile("./public/favicon.ico", fu.readFile("./app/html/favicon.ico"));

  fu.createFile("./app/icon/icon.png", fu.readFile("./app/icon/icon.png"));
  fu.createFile(
    "./public/css/style.css",
    fu.readFile("./public/css/style.css")
  );
  fu.createFile(
    "./public/img/hero.jpeg",
    fu.readFile("./public/img/hero.jpeg")
  );

  fu.createFile("webpack.dev.js", fu.readFile("./app/webpack.dev.js"));
  fu.createFile("webpack.prod.js", fu.readFile("./app/webpack.prod.js"));

  fu.createFile("./app/sw.js", fu.readFile("./app/sw.js"));

  if (ts) {
    fu.createFile("./tsconfig.json", fu.readFile("./tsconfig.json"));
    fu.createFile(
      "webpack.common.js",
      fu.readFile("./app/webpack.common-ts.js")
    );
    fu.createFile("./app/App.tsx", fu.readFile("./app/App.tsx"));
    fu.createFile(
      "./app/dispatcher/AppDispatcher.ts",
      fu.readFile("./app/dispatcher/dispatcher.ts")
    );
    fu.createFile(
      "./app/components/Navi.tsx",
      fu.readFile("./app/components/Navi.tsx")
    );
  } else {
    fu.createFile("webpack.common.js", fu.readFile("./app/webpack.common.js"));
    fu.createFile("./app/App.js", fu.readFile("./app/App.js"));
    fu.createFile(
      "./app/dispatcher/AppDispatcher.js",
      fu.readFile("./app/dispatcher/dispatcher.js")
    );
    fu.createFile(
      "./app/components/Navi.js",
      fu.readFile("./app/components/Navi.js")
    );
  }

  generator.ContainerFile({ prefix: "Top", ts });
  generator.ContentFile({ prefix: "Top", ts });
  generator.ContentTestCode({ prefix: "Top", ts });
  generator.ActionFile({ prefix: "Top", ts });
  generator.StoreFile({ prefix: "Top", ts });

  generator.ContainerFile({ prefix: "Sample", ts });
  generator.ContentFile({ prefix: "Sample", ts });
  generator.ContentTestCode({ prefix: "Sample", ts });
  generator.ActionFile({ prefix: "Sample", ts });
  generator.StoreFile({ prefix: "Sample", ts });

  generator.AppConstantFile({ prefixes: ["Top", "Sample"], ts });

  installModules(npms(yarn));

  if (ts) {
    installModules(npms_ts(yarn));
  }
}
