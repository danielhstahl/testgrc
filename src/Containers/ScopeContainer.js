import { connect } from 'react-redux'

import {addPlanningToValidation, editPlan} from '../Actions/RcusActions'

import Scope from '../Components/Scope'

const mapStateToProps=(state, ownProps)=>{
    return {rawTestSelection:state.rawTest, rawRCUS:state.rawRCUS, plans:state.plans, policyGroups:state.user.user.policyGroups}
}
const mapDispatchToProps=(dispatch, ownProps)=>{
    return {
        
        handleTestSubmit:(plan, groups)=>{
            return plan.submitted?dispatch(editPlan(plan, ownProps.validationId, groups)):dispatch(addPlanningToValidation(plan, ownProps.validationId, groups))
        }
    }
}
const ScopeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scope)
export default ScopeContainer;