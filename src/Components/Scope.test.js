import React from 'react';
import ReactDOM from 'react-dom';
import {Scope, testOkToSubmit} from './Scope';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
it('returns false when there is no test work and no explanation', ()=>{
    const obj={testWorkDescription:"None"}
    expect(testOkToSubmit(obj)).toEqual(false);
})
it('returns false when there is no test work and no filled in explanation', ()=>{
    const obj={testWorkDescription:"None", explanation:""}
    expect(testOkToSubmit(obj)).toEqual(false);
})
it('returns true when there is no test work and an explanation', ()=>{
    const obj={testWorkDescription:"None", explanation:"etc"}
    expect(testOkToSubmit(obj)).toEqual(true);
})
it('returns false if test work is not defined', ()=>{
    const obj={explanation:"etc"}
    expect(testOkToSubmit(obj)).toEqual(false);
})
it('returns true if test work is has letters', ()=>{
    const obj={testWorkDescription:"etc"}
    expect(testOkToSubmit(obj)).toEqual(true);
})
it('returns true if test work is has no explanation', ()=>{
    const obj={testWorkDescription:""}
    expect(testOkToSubmit(obj)).toEqual(true);
})
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><Scope url="etc" /></MuiThemeProvider>, div);
});