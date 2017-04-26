import React from 'react';
import ReactDOM from 'react-dom';
import UserOptions from './UserOptions';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
injectTapEventPlugin();

it('renders UserOptions without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Router><MuiThemeProvider>
    <UserOptions 
        onLoad={(groups)=>{}}
        handleLogout={()=>{}} 
        countToDo={5}
        user={{policyGroups:["hello"], cn:"world"}}/>
    </MuiThemeProvider></Router>, div);
});