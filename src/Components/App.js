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
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import FlatButton from 'material-ui/FlatButton';
import IconButton from 'material-ui/IconButton';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Container, Row, Col} from 'react-grid-system';
import ScopeContainer from '../Containers/ScopeContainer.js'
import SkillsContainer from '../Containers/SkillsContainer.js'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const FlowStyles={
  borderBottom: "1px solid lightgrey", 
  padding: "2% 0% 2% 0%", 
  marginBottom: "5%"
}
const FlowDescriptionStyles={
  fontSize:'.75em', 
  paddingLeft:14, 
  paddingRight:14
}
const ArrowColor=lightBaseTheme.palette.primary1Color;
const ValidationWork=({step, nodeArray})=>{ 
  return nodeArray[step];
}


const ValidationFlow=({handleStepChange, step, contents})=>{
  return (
      <div >
        <Stepper
          activeStep={step}
          linear={false}
        >
        {contents.map((val, index, arr)=>{
          const {title, text}=val;
          return(
            <Step key={index}>
              <StepButton onTouchTap={() => handleStepChange(index)}>
                {title}
              </StepButton>
              
            </Step>
            
          );
        })}
        </Stepper>
        <ValidationFlowDescription contents={contents} step={step} maxStep={contents.length} handleStepChange={handleStepChange}/>
      </div>
  );
}

const ValidationFlowDescription=({contents, step, maxStep, handleStepChange})=>
<div>
    <p style={FlowDescriptionStyles}>
      {contents[step].text}</p>
      <IconButton disabled={step===0} onTouchTap={()=>{return handleStepChange(step-1);}}>
        <ArrowBack color={ArrowColor}/>
      </IconButton> 
      <IconButton disabled={step===maxStep-1} onTouchTap={()=>{return handleStepChange(step+1);}}>
        <ArrowForward color={ArrowColor}/>
      </IconButton>
</div>

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
const handleStepChangeHelper=(step)=>step>=0&&step<=contents.length

const App =({step, handleStepChange}) => {
  const componentPerItem=[
    <SkillsContainer url={url}/>,
    <ScopeContainer url={url}/>,
    <p>
      On step {step}
    </p>,
    <p>
      On step {step}
    </p>
  ];
  return (
    <MuiThemeProvider muiTheme={getMuiTheme(lightBaseTheme)}>
      <Container>
        <Row style={FlowStyles}>
          <Col xs={12}>
            <ValidationFlow contents={contents}  handleStepChange={(step)=>              handleStepChangeHelper(step)&&handleStepChange(step)}
               step={step}/>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
              <ValidationWork 
                step={step} 
                nodeArray={componentPerItem} 
              />
          </Col>

        </Row>
      </Container>
    </MuiThemeProvider>
  );
}
App.propTypes={
    step:React.PropTypes.number.isRequired,
    handleStepChange:React.PropTypes.func.isRequired
}
export default App;
