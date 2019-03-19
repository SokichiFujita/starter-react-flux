const fs = require("fs");
const util = require("util");
const path = require("path");
const fu = require("./futil");

module.exports.ContentFile = contentPrefix => {
  const code = `import React from 'react';
import PropTypes from 'prop-types'; 
import Button from "@material-ui/core/Button";
import ${contentPrefix}ActionCreators from "../actions/${contentPrefix}ActionCreators";

const ${contentPrefix}Content = ({ title, subtitle, text }) => {
  const handleClick = () => {
    ${contentPrefix}ActionCreators.actionCreator001();
  };

  return (
    <div>
      <div
        style={{
          backgroundImage: 
            "linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(./img/hero.jpeg)",
          height: "40vh",
          backgroundSize: "cover",
          backgroundPosition: "center center",
          backgroundRepeat: "no-repeat",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          padding: 32
        }}
      >
        <div
          className="hero-title"
          style={{
            fontWeight: 900,
            fontSize: 72,
            color: "white",
          }}
        >
          Starter React Flux
        </div>
        <div
        className="hero-subtitle"
          style={{
            fontWeight: 300,
            fontSize: 40,
            color: "white",
          }}
        >
          Superfast React development tool
        </div>
      </div>
      <div style={{ padding: 32 }}>
        <div
          style={{
            fontWeight: 900,
            fontSize: 48
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: 24
          }}
        >
          {subtitle}
        </div>
        <div style={{ fontFamily: "Merriweather", padding: "40px 0" }}>
          {text}
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "black", color: "white" }}
          size="large"
          onClick={handleClick}
        >
          Try Flux
        </Button>
      </div>
    </div>
  );
};

${contentPrefix}Content.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
}

export default ${contentPrefix}Content;
`;

  fu.createFile(`./app/components/${contentPrefix}Content.js`, code);
};

module.exports.ContainerFile = prefix => {
  const code = `import React, { Component } from 'react';
import { Container } from 'flux/utils';
import ${prefix}Store from '../stores/${prefix}Store';
import Navi from './Navi';
import ${prefix}Content from './${prefix}Content';

class ${prefix}Container extends Component {
  static getStores() {
    return [${prefix}Store];
  }

  static calculateState() {
    return {
      data: ${prefix}Store.getState()
    };
  }

  componentDidMount() {
  }

  render() {
    return (
      <>
        <Navi title="${prefix}"/>
        <${prefix}Content
          title={this.state.data.title}
          subtitle={this.state.data.subtitle}
          text={this.state.data.text}
        />
      </>
    );
  }
}

export default Container.create(${prefix}Container);
`;

  fu.createFile(`./app/components/${prefix}Container.js`, code);
};

module.exports.StoreFile = prefix => {
  const code = `import { ReduceStore } from 'flux/utils';
import ActionTypes from '../constants/AppConstants';
import AppDispatcher from '../dispatcher/AppDispatcher';

class ${prefix}Store extends ReduceStore {
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
        const newCount = state.count + 1;
        return {
          title: action.data.title,
          subtitle: action.data.subtitle,
          text: "Action Creator was called " + newCount  + " times.",
          count: newCount
        }
      case ActionTypes.TYPE_002:
        return state;
      default:
        return state;
    }
  }
}

export default new ${prefix}Store(AppDispatcher);
`;

  fu.createFile(`./app/stores/${prefix}Store.js`, code);
};

module.exports.ActionFile = prefix => {
  const code = `import AppDispatcher from '../dispatcher/AppDispatcher';
import ActionTypes from '../constants/AppConstants';

const ${prefix}ActionCreators = {
  actionCreator001(arg) {
    AppDispatcher.dispatch({
      type: ActionTypes.${prefix}_TYPE_001,
      data: {
        "title": "New Title",
        "subtitle": "Created by ActionCreator",
        "text": "This text will be overwritten"
      },
    });
  },
  actionCreator002(arg) {
    // 1. Do something. (e.g. Fetch JSON from an API)
    // 2. Create an action from the result.
    // 3, Pass the action to the dispatch().
    AppDispatcher.dispatch({
      type: ActionTypes.${prefix}_TYPE_002,
      data: 'RESULT OF YOUT ACTION',
    });
  },
};

export default ${prefix}ActionCreators;
`;

  fu.createFile(`./app/actions/${prefix}ActionCreators.js`, code);
};

module.exports.AppConstantFile = prefixList => {
  const types = prefixList
    .map(
      x => `
    ${x.toUpperCase()}_TYPE_001: '${x.toUpperCase()}_TYPE_001',
    ${x.toUpperCase()}_TYPE_002: '${x.toUpperCase()}_TYPE_002',`
    )
    .reduce((p, c) => p + c, "");

  const code = `const ActionTypes = {
${types}

  }

  export default ActionTypes;
`;

  fu.createFile(`./app/constants/AppConstants.js`, code);
};

module.exports.ContentTestCode = prefix => {
  const code = `import React from "react";
import renderer from "react-test-renderer";
import ${prefix}Content from "../app/components/${prefix}Content";

test("Check the content", () => {
  const component = renderer.create(
    <${prefix}Content title="Title" subtitle="Subtitle" text="Text" />
  );
  const instance = component.root;
  expect(instance.findByProps({ className: "hero-title" }).children).toEqual([
    "Starter React Flux"
  ]);
  expect(instance.findByProps({ className: "hero-subtitle" }).children).toEqual(
    ["Superfast React development tool"]
  );
});

test("Snapshot testing", () => {
  const component = renderer.create(
    <${prefix}Content title="Title" subtitle="Subtitle" text="Text" />
  );
  //expect(component.toJSON()).toMatchSnapshot();
});`;

  fu.createFile(`./__tests__/${prefix}Content-test.js`, code);
};
