import React from 'react';
import ReactDOM from 'react-dom';
import RouterHolder from './RouterHolder';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import workflowApp from '../Reducers/ReduxReducers';
import {setLogIn} from '../Actions/AuthenticationActions';
let store = createStore(workflowApp)
injectTapEventPlugin();

it('renders RouterHolder when isLoading without crashing', () => {
    const userObj={user:{userType:"userType", cn:"cn"}, err:""}
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <RouterHolder userObj={userObj} isLoading={true}/>
    </MuiThemeProvider></Provider>, div)
});

it('renders RouterHolder when not loaded without crashing', () => {
    const userObj={user:{userType:"userType", cn:"cn"}, err:""}
    const div = document.createElement('div');
    store.dispatch(setLogIn(userObj.user))
    ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <RouterHolder userObj={userObj} isLoading={false}/>
    </MuiThemeProvider></Provider>, div)

});

it('renders RouterHolder when no user without crashing', () => {
    const userObj={user:{userType:"userType", cn:"cn"}, err:{hello:"hello"}}
    const div = document.createElement('div');
    ReactDOM.render(<Provider store={store}><MuiThemeProvider>
    <RouterHolder userObj={userObj} isLoading={false}/>
    </MuiThemeProvider></Provider>, div)

});