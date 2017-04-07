import React from 'react';
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward';
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back';
import IconButton from 'material-ui/IconButton';

import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import {
  Step,
  Stepper,
  StepButton,
} from 'material-ui/Stepper';

const FlowDescriptionStyles={
  fontSize:'.75em', 
  paddingLeft:14, 
  paddingRight:14
}

export const ValidationWork=({step, nodeArray})=>{ 
  return nodeArray[step];
}
ValidationWork.propTypes={
    step:React.PropTypes.number.isRequired,
    nodeArray:React.PropTypes.arrayOf(React.PropTypes.node).isRequired
}

const enhanceFlow=compose(
  onlyUpdateForKeys(['step']),
  setPropTypes({
    handleStepChange:React.PropTypes.func.isRequired,
    step:React.PropTypes.number.isRequired,
    arrowColor:React.PropTypes.string,
    contents:React.PropTypes.arrayOf(React.PropTypes.shape({
        title:React.PropTypes.string.isRequired,
        text:React.PropTypes.string.isRequired
    })).isRequired
  })
)

export const ValidationFlow=enhanceFlow(({handleStepChange, step, contents, arrowColor})=>{
  return (
      <div >
        <Stepper
          activeStep={step}
          linear={false}
        >
        {contents.map((val, index)=>{
          const {title}=val;
          return(
            <Step key={index}>
              <StepButton onTouchTap={() => handleStepChange(index)}>
                {title}
              </StepButton>
            </Step>
          );
        })}
        </Stepper>
        <ValidationFlowDescription arrowColor={arrowColor} text={contents[step].text} step={step} maxStep={contents.length} handleStepChange={handleStepChange}/>
      </div>
  );
})

const enhanceFlowDescription=compose(
  onlyUpdateForKeys(['step', 'text']),
  setPropTypes({
    handleStepChange:React.PropTypes.func.isRequired,
    step:React.PropTypes.number.isRequired,
    maxStep:React.PropTypes.number.isRequired,
    text:React.PropTypes.string.isRequired,
    arrowColor:React.PropTypes.string
  })
)

const ValidationFlowDescription=enhanceFlowDescription(({text, step, maxStep, handleStepChange, arrowColor})=>
<div>
    <p style={FlowDescriptionStyles}>{text}</p>
    <IconButton disabled={step===0} onTouchTap={()=>{return handleStepChange(step-1);}}>
        <ArrowBack color={arrowColor}/>
    </IconButton> 
    <IconButton disabled={step===maxStep-1} onTouchTap={()=>{return handleStepChange(step+1);}}>
        <ArrowForward color={arrowColor}/>
    </IconButton>
</div>)
