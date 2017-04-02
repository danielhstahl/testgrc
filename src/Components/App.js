import React from 'react';
import './App.css';
import injectTapEventPlugin from 'react-tap-event-plugin';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import lightBaseTheme from 'material-ui/styles/baseThemes/lightBaseTheme';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import { Container, Row, Col} from 'react-grid-system';
import ScopeContainer from '../Containers/ScopeContainer'
import SkillsContainer from '../Containers/SkillsContainer'
import {ValidationFlow, ValidationWork} from './ValidationFlow'
// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const FlowStyles={
  borderBottom: "1px solid lightgrey", 
  padding: "2% 0% 2% 0%", 
  marginBottom: "5%"
}
const contents=[
  {
    title:"Skill Assessment",
    text:"Enter the skills required and find applicable talent"
  },
  {
    title:"Scope",
    text:"Use risk based scoping.  Make sure to obtain assurance providers and regulatory issues related to model to assess impact on scope."
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
const arrowColor=lightBaseTheme.palette.primary1Color;
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
            <ValidationFlow contents={contents}  handleStepChange={(step)=>handleStepChangeHelper(step)&&handleStepChange(step)} arrowColor={arrowColor} step={step}/>
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
