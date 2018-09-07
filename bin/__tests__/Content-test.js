import React from "react";
import ReactDOM from "react-dom";
import ReactTestUtils from "react-dom/test-utils";
import Content from "../app/components/Content";

jest.mock('@material-ui/core/Button');

test('<Content> displays...', () => {
  const app = ReactTestUtils.renderIntoDocument(
    <Content 
      title="Title" 
      subtitle="Subtitle" 
      text="Text" 
    />
  );
  const appNode = ReactDOM.findDOMNode(app);
  expect(appNode.textContent).toEqual("TitleSubtitleText");
});
