import React from "react";
import { render } from "react-dom";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";

import TopContainer from "./components/TopContainer";
import SampleContainer from "./components/SampleContainer";

const muiTheme = createMuiTheme({});

if ("serviceWorker" in navigator) {
  window.addEventListener("load", () => {
    navigator.serviceWorker
      .register("sw.js")
      .then(() => {
        // console.log("ServiceWorker is registered.");
      })
      .catch(() => {
        // console.log("ServiceWorker registration error.");
      });
  });
} else {
  // console.log("Your browser doesn't suppert ServiceWorker.", navigator);
}

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
