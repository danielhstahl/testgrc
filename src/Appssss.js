import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {Scope} from './Scope.js'
import {Skills} from './Skills.js'
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';

class App extends Component {

  render() { 
    return (
      <MuiThemeProvider>
        <Skills/>
      </MuiThemeProvider>
    );
  }
}

export default App;
