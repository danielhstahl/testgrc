import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import {ValidationFlow, ValidationWork} from './ValidationWorkFlow'
import ScopeContainer from '../Containers/ScopeContainer'
import SkillsContainer from '../Containers/SkillsContainer'

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

const handleStepChangeHelper=(step)=>step>=0&&step<=contents.length
const ValidationApp=({step, match, arrowColor, handleStepChange, getValidationSkills, getValidationAssociates})=>{
    const {validationId}=match.params;
    getValidationSkills(validationId);
    getValidationAssociates(validationId);
    const componentPerItem=[
        <SkillsContainer validationId={validationId}/>,
        <ScopeContainer validationId={validationId}/>,
        <p>
            On step 3
        </p>,
        <p>
            On step 4
        </p>
    ];
    return(
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
    </Container>);
}

ValidationApp.propTypes={
    step:React.PropTypes.number.isRequired,
    arrowColor:React.PropTypes.string,
    handleStepChange:React.PropTypes.func.isRequired,
    getValidationSkills:React.PropTypes.func.isRequired,
    getValidationAssociates:React.PropTypes.func.isRequired,
}
export default ValidationApp;