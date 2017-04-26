import React from 'react';
import ReactDOM from 'react-dom';
import Skills from './Skills';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders Skills without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <Skills 
      handleSelect={()=>{}}
      associatesForDisplay={[{id:"hello", cn:"Name 1", requiredSkills:["skill"]}]}
      rawSkills={[{value:"hello"}]}
      validationSkills={["hello"]}
      handleToggleAssociate={()=>{}}
      handleRemoveSkill={()=>{}}
      validationId="Hello"
    />
  </MuiThemeProvider>, div);
});
