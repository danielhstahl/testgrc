import { connect } from 'react-redux'
import { addSkillsRequiredForValidation, addAssociateForValidation, removeSkillRequiredForValidation, removeAssociateForValidation } from '../Actions/ReduxActions'
import {Skills} from '../Components/Skills'

const mapStateToProps=(state, ownProps)=>{
    return {url:ownProps.url, validationSkills:state.skills, validationAssociates:state.associates, rawSkills:state.rawSkills, rawAssociates:state.rawAssociates}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleSelect:(e, i, v)=>{
            dispatch(addSkillsRequiredForValidation(v));
        },
        handleToggleAssociate:(associate, isChecked)=>{
            return isChecked?dispatch(addAssociateForValidation(associate)):dispatch(removeAssociateForValidation(associate))
        },
        handleRemoveSkill:(skill)=>{
            dispatch(removeSkillRequiredForValidation(skill));
        }
    }
}
const SkillsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Skills)
export default SkillsContainer;