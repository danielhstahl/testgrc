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
        case "EDIT_TEST_INDEX":
            return {
                ...state, testWork:action.plan.testWork
            }
        case "EDIT_TEST_EXPLANATION":
            return {
                ...state, explanation:action.plan.explanation
            }
        default:
            return state;
    }
}
const plans=(state=[], action)=>{
    let tmpState;
    console.log(action);
    const index=action.plan?action.plan:0;
    switch(action.type){
        case "ADD_VALIDATION_PLAN":
            return [...state, plan(undefined, action)]
        case "EDIT_VALIDATION_PLAN":
            tmpState=state.concat()[index]=plan(state[index], action)
            return tmpState;
        case "EDIT_TEST_INDEX":
            tmpState=state.concat()[index]=plan(state[index], action)
            return tmpState;
        case "EDIT_TEST_EXPLANATION":
            tmpState=state.concat()[index]=plan(state[index], action)
            return tmpState;
        default:
            return state;
    }
}
export default plans;