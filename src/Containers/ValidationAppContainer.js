import { connect } from 'react-redux'
import { setStep} from '../Actions/StepActions'
import { getValidationSkills} from '../Actions/SkillsActions'
import { getValidationAssociates} from '../Actions/AssociateActions'
import {getRawAssociates} from '../Actions/AssociateActions'
import {getRawSkills} from '../Actions/SkillsActions'
import {getRawRCUS} from '../Actions/RcusActions'
import {getValidationPlan} from '../Actions/RcusActions'
import {getRawTestSelection} from '../Actions/TestSelectionActions'
import ValidationApp from '../Components/ValidationApp'

const mapStateToProps=(state, ownProps)=>{
    return {step:state.step, match:ownProps.match, arrowColor:ownProps.arrowColor}
}
const mapDispatchToProps=(dispatch, ownProps)=>{
    const {validationId}=ownProps.match.params;
    getValidationSkills(dispatch, validationId);
    getValidationAssociates(dispatch, validationId);
    getRawAssociates(dispatch);
    getRawSkills(dispatch); 
    getRawTestSelection(dispatch); 
    getRawRCUS(dispatch); 
    getValidationPlan(dispatch, validationId);
    return {
        handleStepChange:(step)=>{
            dispatch(setStep(step));
        },
    }
}
const ValidationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidationApp)
export default ValidationAppContainer;