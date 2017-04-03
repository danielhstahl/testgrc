import { connect } from 'react-redux'

import {addPlanningToValidation, editPlan} from '../Actions/RcusActions'
import Scope from '../Components/Scope'

const mapStateToProps=(state, ownProps)=>{
    return {validationId:ownProps.validationId, rawRCUS:state.rawRCUS, plans:state.plans,rawTestSelection:state.rawTest}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleTestSubmit:(plan, validationId)=>{
            return plan.submitted?dispatch(editPlan(plan, validationId)):dispatch(addPlanningToValidation(plan, validationId))
        }
    }
}
const ScopeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scope)
export default ScopeContainer;