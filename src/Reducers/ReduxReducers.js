import {SET_STEP} from './ReduxActions';
const initialState = {
  step:0
}

function workflowApp(state=initialState, action) {
    switch(action.type){
        case SET_STEP:
            return [...state, {step:action.filter}]
        default:
            return state;
    }
}
export default workflowApp;