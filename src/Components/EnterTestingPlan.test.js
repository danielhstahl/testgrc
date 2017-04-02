import React from 'react';
import ReactDOM from 'react-dom';
import EnterTestingPlan from './EnterTestingPlan';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();



it('renders EnterTestingPlan without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <EnterTestingPlan 
      handleSelect={()=>{}}
      handleExplanation={()=>{}}
      selectedItem={0}
      testSelection={[{index:0, description:"hello"}]}
      requiresExplanation={true}
    />
  </MuiThemeProvider>, div);
});