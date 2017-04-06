import { connect } from 'react-redux'
import {joinHelper, mergeHelper} from '../scopeHelpers'
import {leftjoin} from './../helperFunctions.js'
import {addPlanningToValidation, editPlan} from '../Actions/RcusActions'

import Scope from '../Components/Scope'
const computePlan=(rawRCUS, plans)=>{
    return leftjoin(rawRCUS, plans, joinHelper, mergeHelper);
}
const mapStateToProps=(state, ownProps)=>{
    return {rawTestSelection:state.rawTest, mrmvPlanning:computePlan(state.rawRCUS, state.plans, state.rawTest)}
}
const mapDispatchToProps=(dispatch, ownProps)=>{
    return {
        
        handleTestSubmit:(plan)=>{
            return plan.submitted?dispatch(editPlan(plan, ownProps.validationId)):dispatch(addPlanningToValidation(plan, ownProps.validationId))
        }
    }
}
const ScopeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scope)
export default ScopeContainer;