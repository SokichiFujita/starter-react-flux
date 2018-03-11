import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';

import TopContainer from "./components/TopContainer";
import SampleContainer from "./components/SampleContainer";

const muiTheme = createMuiTheme({});

render(
  <MuiThemeProvider theme={muiTheme}>
    <Router>
      <div>
        <Route exact path="/" component={TopContainer} />
        <Route path="/sample" component={SampleContainer} />
      </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
