import { connect } from 'react-redux'

import { addSkillsRequiredForValidation,removeSkillRequiredForValidation} from '../Actions/SkillsActions'
import{addAssociateForValidation, removeAssociateForValidation } from '../Actions/AssociateActions'
import Skills from '../Components/Skills'

const mapStateToProps=(state)=>{
    return {validationSkills:state.skills, rawSkills:state.rawSkills, skills:state.skills, rawAssociates:state.rawAssociates, associates:state.associates,policyGroups:state.user.user.policyGroups}
}
const mapDispatchToProps=(dispatch, ownProps)=>{
    return {
        handleSelect:(e, i, v, groups)=>{
            dispatch(addSkillsRequiredForValidation(v, ownProps.validationId, groups));
        },
        handleToggleAssociate:(associate, isChecked, groups)=>{
            return isChecked?dispatch(addAssociateForValidation(associate, ownProps.validationId, groups)):dispatch(removeAssociateForValidation(associate, ownProps.validationId, groups))
        },
        handleRemoveSkill:(skill, groups)=>{
            dispatch(removeSkillRequiredForValidation(skill, ownProps.validationId, groups));
        }
    }
}
const SkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills)
export default SkillsContainer;