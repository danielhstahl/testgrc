import { connect } from 'react-redux'
import { addSkillsRequiredForValidation,removeSkillRequiredForValidation} from '../Actions/SkillsActions'
import{addAssociateForValidation, removeAssociateForValidation } from '../Actions/AssociateActions'

import Skills from '../Components/Skills'

const mapStateToProps=(state, ownProps)=>{
    return {validationId:ownProps.validationId, validationSkills:state.skills, validationAssociates:state.associates, rawSkills:state.rawSkills, rawAssociates:state.rawAssociates}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleSelect:(v, validationId)=>{
            dispatch(addSkillsRequiredForValidation(v, validationId));
        },
        handleToggleAssociate:(associate, isChecked, validationId)=>{
            return isChecked?dispatch(addAssociateForValidation(associate, validationId)):dispatch(removeAssociateForValidation(associate, validationId))
        },
        handleRemoveSkill:(skill, validationId)=>{
            dispatch(removeSkillRequiredForValidation(skill, validationId));
        }
    }
}
const SkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills)
export default SkillsContainer;