import { connect } from 'react-redux'
//import { setStep} from '../Actions/StepActions'
import { getValidationSkills} from '../Actions/SkillsActions'
import { getValidationAssociates} from '../Actions/AssociateActions'
import {getRawAssociates} from '../Actions/AssociateActions'
import {getRawSkills} from '../Actions/SkillsActions'
import {getRawRCUS} from '../Actions/RcusActions'
import {getValidationPlan} from '../Actions/RcusActions'
import {getRawTestSelection} from '../Actions/TestSelectionActions'
import ValidationApp from '../Components/ValidationApp'

const mapStateToProps=(state)=>{
    return {}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        loadInit:()=>{
            getRawAssociates(dispatch);
            getRawSkills(dispatch); 
            getRawTestSelection(dispatch); 
            getRawRCUS(dispatch); 
        },
        loadOnValidationChange:(validationId)=>{
            getValidationSkills(dispatch, validationId);
            getValidationAssociates(dispatch, validationId);
            getValidationPlan(dispatch, validationId);
        }
    }
}

const ValidationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValidationApp)
export default ValidationAppContainer;