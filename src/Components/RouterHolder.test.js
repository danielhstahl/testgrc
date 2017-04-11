import React from 'react';
import ReactDOM from 'react-dom';
import RouterHolder from './RouterHolder';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import workflowApp from '../Reducers/ReduxReducers';
let store = createStore(workflowApp)
injectTapEventPlugin();
const userObj={user:{userType:"userType", cn:"cn"}, err:""}
it('renders RouterHolder when isLoading without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <RouterHolder userObj={userObj} isLoading={true}/>
    </MuiThemeProvider></Provider>, div);
});

it('renders RouterHolder when loaded without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <RouterHolder userObj={userObj} isLoading={false}/>
    </MuiThemeProvider></Provider>, div);
});

it('renders RouterHolder when no user without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <RouterHolder userObj={{err:"hello"}} isLoading={false}/>
    </MuiThemeProvider></Provider>, div);
});