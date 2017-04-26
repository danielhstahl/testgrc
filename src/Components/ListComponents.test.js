import React from 'react';
import ReactDOM from 'react-dom';
import {ListOfPersonel, ListWithDelete} from './ListComponents';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



it('renders ListOfPersonel without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ListOfPersonel 
      arrayOfPersons={[{cn:"name", id:"1", requiredSkills:["skill"]}]}
      onCheck={()=>{}}
    />
  </MuiThemeProvider>, div);
});
it('renders ListWithDelete without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <ListWithDelete 
      selectedItems={["skill"]}
      onDelete={()=>{}}
    />
  </MuiThemeProvider>, div);
});