import React from 'react';
import { render } from 'react-dom';
import { Container } from 'flux/utils';
import { BrowserRouter as Router, Route } from 'react-router-dom'
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import injectTapEventPlugin from 'react-tap-event-plugin';

import TopContainer from './components/TopContainer';
import SampleContainer1 from './components/SampleContainer1';
import SampleContainer2 from './components/SampleContainer2';

injectTapEventPlugin();

const muiTheme = getMuiTheme({});

render((
  <MuiThemeProvider muiTheme={muiTheme}>
    <Router>
      <div>
        <Route exact path="/" component={TopContainer}/>
        <Route path="/sample1" component={SampleContainer1}/>
        <Route path="/sample2" component={SampleContainer2}/>
      </div>
    </Router>
  </MuiThemeProvider>
), document.getElementById('root'));

