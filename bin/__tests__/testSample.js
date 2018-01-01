import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import Sample from "../app/components/Sample";

test('<Sample> displays "Hello World"', () => {
  const app = ReactTestUtils.renderIntoDocument(<Sample title="World" />);
  const appNode = ReactDOM.findDOMNode(app);
  expect(appNode.textContent).toEqual("HelloWorld");
});
