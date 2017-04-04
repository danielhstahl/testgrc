import { connect } from 'react-redux'
import { setStep} from '../Actions/StepActions'
import { getValidationSkills} from '../Actions/SkillsActions'
import { getValidationAssociates} from '../Actions/AssociateActions'
import ValidationApp from '../Components/ValidationApp'

const mapStateToProps=(state, ownProps)=>{
    console.log(ownProps);
    return {step:state.step, match:ownProps.match, arrowColor:ownProps.arrowColor}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleStepChange:(step)=>{
            dispatch(setStep(step));
        },
        getValidationSkills:(validationId)=>getValidationSkills(dispatch, validationId),
        getValidationAssociates:(validationId)=>getValidationAssociates(dispatch, validationId)
    }
}
const ValidationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidationApp)
export default ValidationAppContainer;