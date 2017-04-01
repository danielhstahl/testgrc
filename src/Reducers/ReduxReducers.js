const initialState = {
  step:0
}

const workflowApp=(state=initialState, action)=>{
    console.log(action);
    switch(action.type){
        case "SET_STEP":
            return {...state, step:action.step}
        default:
            return state;
    }
}
export default workflowApp;