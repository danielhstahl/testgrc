import React from 'react';
import ReactDOM from 'react-dom';
import LandingPage from './LandingPage';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import {setLogIn} from '../Actions/AuthenticationActions'
import workflowApp from '../Reducers/ReduxReducers';
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
let store = createStore(workflowApp)
beforeAll(()=>{
  store.dispatch(setLogIn({user:{policyGroups:["groups"], cn:"name"}}))
})

injectTapEventPlugin();

it('renders LandingPage without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <Router>
    <LandingPage user={{policyGroups:["group"], cn:"Test User"}} />
    </Router>
    </MuiThemeProvider></Provider>, div);
});