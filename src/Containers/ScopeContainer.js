import { connect } from 'react-redux'
import { addPlanningToValidation, editPlan, updateExplanation, updateTestType} from '../Actions/ReduxActions'
import {Scope} from '../Components/Scope'

const mapStateToProps=(state, ownProps)=>{
    return {url:ownProps.url, rawRCUS:state.rawRCUS, plans:state.plans, rawTestSelection:state.rawTestSelection, rawTestSelection:state.rawTest}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleSelect:(rcusIndex, selectIndex)=>{
            dispatch(updateTestType(rcusIndex, selectIndex));
        },
        handleExplanation:(rcusIndex, explanation)=>{
            dispatch(updateExplanation(rcusIndex, explanation))
        },
        handleTestSubmit:(isNew, i, plan)=>{
            return isNew?dispatch(addPlanningToValidation(plan)):dispatch(editPlan(i, plan))
        }
    }
}
const ScopeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scope)
export default ScopeContainer;