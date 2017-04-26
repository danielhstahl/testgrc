import React from 'react';
import ReactDOM from 'react-dom';
import CustomAppBar from './CustomAppBar';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {setLogIn} from '../Actions/AuthenticationActions'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import workflowApp from '../Reducers/ReduxReducers';
let store = createStore(workflowApp)
beforeAll(()=>{
  store.dispatch(setLogIn({user:{policyGroups:["groups"], cn:"name"}}))
})
injectTapEventPlugin();
import {
  BrowserRouter as Router,
  Route
} from 'react-router-dom'
it('renders CustomAppBar while open without crashing', () => {
  const div = document.createElement('div');
  console.log(store.getState)
  ReactDOM.render(<Provider store={store}><Router><MuiThemeProvider>
    <CustomAppBar 
        open={true}
        routes={[{
          path:"/",
          name:"somename"
        }]}
    />
    </MuiThemeProvider></Router></Provider>, div);
});
it('renders CustomAppBar while closed without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><Router><MuiThemeProvider>
    <CustomAppBar 
        open={false}
        routes={[{
          path:"/",
          name:"somename"
        }]}
    />
    </MuiThemeProvider></Router></Provider>, div);
});