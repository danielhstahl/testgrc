import React from 'react';
import ReactDOM from 'react-dom';
import PMTimeline from './PMTimeline';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();

it('renders PMTimeline without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider>
    <PMTimeline 
        timeline={[{actualDate:"Hello", dueDate:"HelloAgain", description:"World"}]}
        />
    </MuiThemeProvider>, div);
});