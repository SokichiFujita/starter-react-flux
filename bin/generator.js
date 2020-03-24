const fs = require("fs");
const util = require("util");
const path = require("path");
const fu = require("./futil");

module.exports.ContentFile = ({ prefix, ts }) => {
  const typeName = ts ? `${prefix}Props` : "";
  const typeArg = ts ? `: ${prefix}Props` : "";

  const typeDef = ts
    ? 
`
type ${typeName} = {
  title: string;
  subtitle: string;
  text: string;
};
`
    : ``;

  const code = `import React from "react";
import PropTypes from "prop-types";
import Button from "@material-ui/core/Button";
import { ${prefix}ActionCreators } from "../actions/${prefix}ActionCreators";
${typeDef}
const ${prefix}Content = ({ title, subtitle, text }${typeArg}) => {
  const handleClick = () => {
    ${prefix}ActionCreators.actionCreator001();
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
          padding: 32,
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
            fontSize: 48,
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontWeight: 300,
            fontSize: 24,
          }}
        >
          {subtitle}
        </div>
        <div style={{ fontFamily: "Merriweather", padding: "40px 0", }}>
          {text}
        </div>
        <Button
          variant="contained"
          style={{ backgroundColor: "black", color: "white", }}
          size="large"
          onClick={handleClick}
        >
          Try Flux
        </Button>
      </div>
    </div>
  );
};

${prefix}Content.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired
};

export default ${prefix}Content;
`;

  if (ts) {
    fu.createFile(`./app/components/${prefix}Content.tsx`, code);
  } else {
    fu.createFile(`./app/components/${prefix}Content.js`, code);
  }
};

module.exports.ContainerFile = ({ prefix, ts }) => {
  const typeArg = ts ? `<${prefix}Props, ${prefix}State>` : ``;
  const typeDef = ts
    ? `
type ${prefix}State = {
  title: string;
  subtitle: string;
  text: string;
};

type ${prefix}Props = {};
`
    : ``;

  const code = `import React, { Component } from "react";
import { Container } from "flux/utils";
import ${prefix}Store from "../stores/${prefix}Store";
import { Navi } from "./Navi";
import ${prefix}Content from "./${prefix}Content";
${typeDef}
class ${prefix}Container extends Component${typeArg} {
  static getStores() {
    return [${prefix}Store];
  }

  static calculateState() {
    const data = ${prefix}Store.getState();
    return {
      title: data.title,
      subtitle: data.subtitle,
      text: data.text,
    };
  }

  render() {
    const { title, subtitle, text } = this.state;
    return (
      <>
        <Navi title="${prefix}" />
        <${prefix}Content title={title} subtitle={subtitle} text={text} />
      </>
    );
  }
}

export default Container.create(${prefix}Container);
`;

  if (ts) {
    fu.createFile(`./app/components/${prefix}Container.tsx`, code);
  } else {
    fu.createFile(`./app/components/${prefix}Container.js`, code);
  }
};

module.exports.StoreFile = ({ prefix, ts }) => {
  const PREFIX = prefix.toUpperCase();
  const typeArg = ts ? `<${prefix}State, Actions>` : "";
  const typeDef = ts
    ? `
import { ActionTypes, Actions } from "../constants/AppConstants";

type ${prefix}State = {
  title: string;
  subtitle: string;
  text: string;
  count: number;
};
`
    : `
import { ActionTypes } from "../constants/AppConstants";
`;
  const reduceArg = ts
    ? `(state: ${prefix}State, action: Actions)`
    : `(state, action)`;

  const code = `import { ReduceStore } from "flux/utils";
import AppDispatcher from "../dispatcher/AppDispatcher";
${typeDef}
class ${prefix}Store extends ReduceStore${typeArg} {
  getInitialState() {
    return {
      title: "Title",
      subtitle: "Subtitle",
      text: "Text",
      count: 0,
    };
  }

  reduce${reduceArg} {
    switch (action.type) {
      case ActionTypes.${PREFIX}_TYPE_001: {
        const newCount = state.count + 1;
        return {
          title: action.data.title,
          subtitle: action.data.subtitle,
          text: \`Action Creator was called \${newCount} times.\`,
          count: newCount,
        };
      }
      case ActionTypes.${PREFIX}_TYPE_002:
        return state;
      default:
        return state;
    }
  }
}

export default new ${prefix}Store(AppDispatcher);
`;

  if (ts) {
    fu.createFile(`./app/stores/${prefix}Store.ts`, code);
  } else {
    fu.createFile(`./app/stores/${prefix}Store.js`, code);
  }
};

module.exports.ActionFile = ({ prefix, ts }) => {
  const PREFIX = prefix.toUpperCase();
  const code = `import AppDispatcher from "../dispatcher/AppDispatcher";
import { ActionTypes } from "../constants/AppConstants";

const get${prefix}Action001 = () => ({
  type: ActionTypes.${PREFIX}_TYPE_001${
    ts ? ` as ActionTypes.${PREFIX}_TYPE_001` : ""
  },
  data: {
    title: "New Title",
    subtitle: "Created by ActionCreator",
    text: "This text will be overwritten",
  },
});

const get${prefix}Action002 = () => ({
  type: ActionTypes.${PREFIX}_TYPE_002${
    ts ? ` as ActionTypes.${PREFIX}_TYPE_002` : ""
  },
  data: "RESULT OF YOUT ACTION",
});
${
    ts
      ? 
`
export type ${prefix}Actions = ReturnType<
  typeof get${prefix}Action001 | typeof get${prefix}Action002
>;
`
      : ""
}
export const ${prefix}ActionCreators = {
  actionCreator001() {
    AppDispatcher.dispatch(get${prefix}Action001());
  },
  actionCreator002() {
    AppDispatcher.dispatch(get${prefix}Action002());
  },
};
`;

  if (ts) {
    fu.createFile(`./app/actions/${prefix}ActionCreators.ts`, code);
  } else {
    fu.createFile(`./app/actions/${prefix}ActionCreators.js`, code);
  }
};

module.exports.AppConstantFile = ({ prefixes, ts }) => {
  const actionTypeCode = prefixes
    .map(
      prefix => 
`  ${prefix.toUpperCase()}_TYPE_001${ts ? " = " : ": "}"${prefix.toUpperCase()}_TYPE_001",
  ${prefix.toUpperCase()}_TYPE_002${ts ? " = " : ": "}"${prefix.toUpperCase()}_TYPE_002",
`).reduce((p, c) => p + c, "").slice(0,-1);

const actionCode = prefixes
.map(
  prefix => `import { ${prefix}Actions } from "../actions/${prefix}ActionCreators";
`).reduce((p, c) => p + c, "");

const exportActionCode = prefixes.map(prefix => [`${prefix}Actions`, ` | `])
  .reduce((p, c) => p.concat(c), [])
  .slice(0, -1)
  .reduce((p, c) => p + c, "")

const code = ts ? `${actionCode}
export type Actions = ${exportActionCode};

export enum ActionTypes {
${actionTypeCode}
}
`
    : 
`export const ActionTypes = {
${actionTypeCode}
};
`;

  if (ts) {
    fu.createFile(`./app/constants/AppConstants.ts`, code);
  } else {
    fu.createFile(`./app/constants/AppConstants.js`, code);
  }
};

module.exports.ContentTestCode = ({ prefix, ts }) => {
  const code = `import React from "react";
import renderer from "react-test-renderer";
import ${prefix}Content from "../app/components/${prefix}Content";

test("Check the content", () => {
  const component = renderer.create(
    <${prefix}Content title="Title" subtitle="Subtitle" text="Text" />
  );
  const instance = component.root;
  expect(instance.findByProps({ className: "hero-title" }).children).toEqual([
    "Starter React Flux",
  ]);
  expect(
    instance.findByProps({ className: "hero-subtitle" }).children
    ).toEqual(["Superfast React development tool"]);
});

test("Snapshot testing", () => {
  // const component = renderer.create(
  //   <${prefix}Content title="Title" subtitle="Subtitle" text="Text" />
  // );
  // expect(component.toJSON()).toMatchSnapshot();
});
`;

  if (ts) {
    fu.createFile(`./__tests__/${prefix}Content-test.tsx`, code);
  } else {
    fu.createFile(`./__tests__/${prefix}Content-test.js`, code);
  }
};
