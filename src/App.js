import React, { Component } from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Step,
  Stepper,
  StepButton,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Paper from 'material-ui/Paper';
import { Container, Row, Col} from 'react-grid-system';
import {Scope} from './Scope.js'
import {Skills} from './Skills.js'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();
const RenderStepActions=({step, maxStep, handleStepChange})=>
<div style={{margin: '12px 0'}}>
  {step<(maxStep-1) && (<RaisedButton
    label="Next"
    disableTouchRipple={true}
    disableFocusRipple={true}
    primary={true}
    onTouchTap={()=>{return handleStepChange(step+1);}}
    style={{marginRight: 12}}
  />)}
  {step > 0 &&  (
    <FlatButton
      label="Back"
      disableTouchRipple={true}
      disableFocusRipple={true}
      onTouchTap={()=>{return handleStepChange(step-1);}}
    />
  )}
</div>
RenderStepActions.propTypes={
  step:React.PropTypes.number.isRequired,
  maxStep:React.PropTypes.number.isRequired,
  handleStepChange:React.PropTypes.func.isRequired
}


const ValidationWork=({step, nodeArray})=>{ 
  return nodeArray[step];
}

const ValidationFlow=({handleStepChange, step, maxStep, contents})=>{
  return (
      <div style={{maxWidth: 380, maxHeight: 400, margin: 'auto'}}>
        <Stepper
          activeStep={step}
          linear={false}
          orientation="vertical"
        >
        {contents.map((val, index, arr)=>{
          const {title, text}=val;
          return(
            <Step key={index}>
              <StepButton onTouchTap={() => handleStepChange(index)}>
                {title}
              </StepButton>
              <StepContent>
                <p>
                  {text}
                </p>
                <RenderStepActions step={index} maxStep={maxStep} handleStepChange={handleStepChange}/>
              </StepContent>
            </Step>
          );
        })}
        </Stepper>
      </div>
  );
}

const contents=[
  {
    title:"Skill Assessment",
    text:"Enter the skills required and find applicable talent"
  },
  {
    title:"Scope",
    text:"Use risk based scoping"
  },
  {
    title:"Workpapers",
    text:"Fill out workpapers according to scope"
  },
  {
    title:"Issues",
    text:"Write issues"
  }
]
const url="http://localhost:3001";
class App extends Component {
  maxStep=contents.length;
  state={
    step:0
  }
  handleStepChange=(step)=>{
    if(step>=0 &&step<=this.maxStep){
      this.setState({step:step});
    }
  }
  render() { //{renderSomethingOnPageTemp(step)}
    const {step}=this.state;
    const componentPerItem=[
      <Skills url={url}/>,
      <Scope url={url}/>,
      <p>
        On step {step}
      </p>,
      <p>
        On step {step}
      </p>
    ];
    return (
      <MuiThemeProvider>
        <Container>
          <Row>
            <Col sm={4}>
              <ValidationFlow contents={contents} maxStep={this.maxStep} handleStepChange={this.handleStepChange} step={step}/>
            </Col>
            <Col sm={8}>
              <Paper  zDepth={1} style={{marginTop:25, paddingBottom:15}}>
                <ValidationWork 
                  step={step} 
                  nodeArray={componentPerItem} 
                />
              </Paper>
            </Col>

          </Row>
        </Container>
      </MuiThemeProvider>
    );
  }
}

export default App;
