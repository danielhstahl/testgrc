import { connect } from 'react-redux'
import { addPlanningToValidation, editPlan} from '../Actions/ReduxActions'
import {Scope} from '../Components/Scope'

const mapStateToProps=(state, ownProps)=>{
    return {rawRCUS:state.rawRCUS, plans:state.plans,rawTestSelection:state.rawTest}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleTestSubmit:(plan)=>{
            return plan.submitted?dispatch(editPlan(plan)):dispatch(addPlanningToValidation(plan))
        }
    }
}
const ScopeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Scope)
export default ScopeContainer;