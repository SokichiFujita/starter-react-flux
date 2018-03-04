import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import MuiThemeProvider from "material-ui/styles/MuiThemeProvider";
import getMuiTheme from "material-ui/styles/getMuiTheme";
import injectTapEventPlugin from "react-tap-event-plugin";

import TopContainer from "./components/TopContainer";
import SampleContainer from "./components/SampleContainer";

injectTapEventPlugin();

const muiTheme = getMuiTheme({});

render(
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <div>
        <Route exact path="/" component={TopContainer} />
        <Route path="/sample" component={SampleContainer} />
      </div>
    </Router>
  </MuiThemeProvider>,
  document.getElementById("root")
);
