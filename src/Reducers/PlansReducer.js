import {joinHelper} from '../scopeHelpers'
const plan=(state={}, action, i=0)=>{
    switch(action.type){
        case "ADD_VALIDATION_PLAN":
            return {
                processStep:action.plan.processStep,
                riskStep:action.plan.riskStep,
                explanation:action.plan.explanation,
                testWork:action.plan.testWork
            }
        case "EDIT_VALIDATION_PLAN":
            return {
                processStep:action.plan.processStep,
                riskStep:action.plan.riskStep,
                explanation:action.plan.explanation,
                testWork:action.plan.testWork
            }
        default:
            return state;
    }
}
const plans=(state=[], action)=>{
    switch(action.type){
        case "ADD_VALIDATION_PLAN":
            return [...state, plan(undefined, action)]
        case "EDIT_VALIDATION_PLAN":
            return state.map((priorPlan)=>joinHelper(priorPlan, action.plan)?plan(priorPlan, action):priorPlan)
        default:
            return state;
    }
}
export default plans;