import React from 'react';
import ReactDOM from 'react-dom';
import Skills from './Skills';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



it('renders Skills without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><Skills 
    rawSkills={[{
        value:"value"
    }]}
    rawAssociates={[{
        name:"name",
        id:"123",
        skills:["skill"]
    }]}
    validationSkills={["skill"]}
    validationAssociates={[{
        id:"123",
        skills:["skill"]
    }]}
    handleSelect={()=>{}}
    handleToggleAssociate={()=>{}}
    handleRemoveSkill={()=>{}}
  
  /></MuiThemeProvider>, div);
});