import React, {Component} from 'react';
import { Container, Row, Col} from 'react-grid-system';
import {ValidationFlow, ValidationWork} from './ValidationWorkFlow'
import ScopeContainer from '../Containers/ScopeContainer'
import SkillsContainer from '../Containers/SkillsContainer'
import {backgroundPrimary, backgroundAccent, headingHeight} from '../Styles/ThemeStyles'
import Paper from 'material-ui/Paper'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import shouldUpdate from 'recompose/shouldUpdate';
import lifecycle from 'recompose/lifecycle';
import {Route, Switch, Redirect} from 'react-router-dom'
import AssociateFAB from './AssociateFAB'
const pageStyle={height:'100%'}
const FlowStyles={padding: "2% 0% 0% 0%"}
const headingStyle=Object.assign({}, backgroundPrimary, {height:headingHeight, position:'relative'})
const headingPaperStyle={position:'absolute', bottom:0, width:'100%', left:0, right:0, margin:'0 auto'};
const bottomPaperStyle={minHeight:300, maxHeight:500};
const bottomStyle=Object.assign({}, backgroundAccent, {height:'100%'})
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

const switchComponent=(step, validationId)=>{
    switch(step){
        case 0:
            return <SkillsContainer validationId={validationId}/>
        case 1:
            return <ScopeContainer validationId={validationId}/>
        default:
            return <p>On Step {step}</p>
    }
}
const getDefaultStep=(stringStep)=>stringStep?parseInt(stringStep, 10):0

const enhanceSwitch=compose(
    shouldUpdate(
        (props, nextProps)=>{
            return props.match.params.step!==nextProps.match.params.step || props.validationId!==nextProps.validationId
        }
    ),
    setPropTypes({
        history:React.PropTypes.object.isRequired,
        match:React.PropTypes.object.isRequired,
        url:React.PropTypes.string.isRequired,
        validationId:React.PropTypes.string.isRequired
    })
)
const ValApp=enhanceSwitch(({url, match, history, validationId})=>{
    const step=getDefaultStep(match.params.step)
    return(
    <div style={pageStyle} >
    <div style={headingStyle}>
        <Container style={headingPaperStyle}> 
            <Row style={FlowStyles}>
                <Paper rounded ={false} style={{bottom:0}}>
                    <ValidationFlow contents={contents}  handleStepChange={(step)=>handleStepChangeHelper(step)&&history.push(`${url}/${step}`)}  step={step}/>
                    
                </Paper>
            </Row>
        </Container> 
    </div>
    <AssociateFAB/>
    <div style={bottomStyle}>
    <Container> 
        <Row>
            <Paper rounded={false} style={bottomPaperStyle}>
            
              {switchComponent(step, validationId)}  

            </Paper>
        </Row>
    </Container>
    </div></div>)
})

const enhanceVApp=compose(
    lifecycle({
        componentWillMount(){
            console.log("This is expensive")
            const {validationId}=this.props.match.params
            this.props.loadInit();
            this.props.loadOnValidationChange(validationId);
        }
    }),
    shouldUpdate(
        (props, nextProps)=>{
            const checkValidationID=props.match.params.validationId!==nextProps.match.params.validationId;
            if(checkValidationID){
                props.loadOnValidationChange(nextProps.match.params.validationId);
            }
            return checkValidationID ||
            props.location.pathname!==nextProps.location.pathname
        }
    ),
    setPropTypes({
        history:React.PropTypes.object.isRequired,
        match:React.PropTypes.object.isRequired
    })
)

const ValidationApp=enhanceVApp(({ history, match})=>{
    const {validationId}=match.params
    const url=match.url;
    const CurriedApp=({match, history})=><ValApp history={history} match={match} url={url} validationId={validationId}/>
    return <Switch>
        <Route path={`${url}/:step`} component={CurriedApp}/>
        <Redirect from={url} to={`${url}/0`}/>
    </Switch>
})


export default ValidationApp;