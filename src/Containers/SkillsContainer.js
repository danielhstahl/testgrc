import { connect } from 'react-redux'
import {joinedAssociates} from '../skillsHelpers'
import { addSkillsRequiredForValidation,removeSkillRequiredForValidation} from '../Actions/SkillsActions'
import{addAssociateForValidation, removeAssociateForValidation } from '../Actions/AssociateActions'
import Skills from '../Components/Skills'

const mapStateToProps=(state)=>{
    return {validationSkills:state.skills, rawSkills:state.rawSkills, associatesForDisplay:joinedAssociates(state.skills, state.rawAssociates, state.associates)}
}
const mapDispatchToProps=(dispatch, ownProps)=>{
    return {
        handleSelect:(e, i, v)=>{
            dispatch(addSkillsRequiredForValidation(v, ownProps.validationId));
        },
        handleToggleAssociate:(associate, isChecked)=>{
            return isChecked?dispatch(addAssociateForValidation(associate, ownProps.validationId)):dispatch(removeAssociateForValidation(associate, ownProps.validationId))
        },
        handleRemoveSkill:(skill)=>{
            dispatch(removeSkillRequiredForValidation(skill, ownProps.validationId));
        }
    }
}
const SkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills)
export default SkillsContainer;