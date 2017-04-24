import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import './App.css';
import {
  Step,
  Stepper,
  StepLabel,
  StepContent,
} from 'material-ui/Stepper';
import RaisedButton from 'material-ui/RaisedButton';
import FlatButton from 'material-ui/FlatButton';

const customConnectorStyle={
    display:"block",
    minHeight:28 //see https://github.com/callemall/material-ui/blob/master/src/Stepper/StepConnector.js
}
const customConnector=<span style={customConnectorStyle}></span>
const PMTimeline=({timeline})=>
<Container>
    <Row>
        <Col xs={3} style={{paddingRight:0}}>
            <Stepper orientation="vertical" connector={customConnector}>
                {timeline.map((val, index)=>{
                    return(<Step key={index} active={true} >
                        <StepLabel icon={null}></StepLabel>
                        <StepContent style={{paddingRight:0, borderLeft:'0px', float:'right'}}>{val.dueDate}</StepContent>
                    </Step>)
                })}
            </Stepper>
        </Col>
        <Col xs={3} style={{paddingLeft:0}}>
            <Stepper orientation="vertical">
                {timeline.map((val, index)=>{
                    return(<Step key={index} active={val.actualDate?true:false} >
                        <StepLabel>{val.description}</StepLabel>
                        <StepContent active={true}>{val.actualDate?val.actualDate:<br/>}</StepContent>
                    </Step>)
                })}
            </Stepper>
        </Col>
        
    </Row>
</Container>
export default PMTimeline