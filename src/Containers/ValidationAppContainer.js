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
    return {policyGroups:state.user.user.policyGroups}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        loadInit:(groups)=>{
            getRawAssociates(dispatch, groups);
            getRawSkills(dispatch, groups); 
            getRawTestSelection(dispatch, groups); 
            getRawRCUS(dispatch, groups); 
        },
        loadOnValidationChange:(validationId, groups)=>{
            getValidationSkills(dispatch, validationId, groups);
            getValidationAssociates(dispatch, validationId, groups);
            getValidationPlan(dispatch, validationId, groups);
        }
    }
}

const ValidationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps,
)(ValidationApp)
export default ValidationAppContainer;