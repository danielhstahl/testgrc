const step=(state=0, action)=>{
    switch(action.type){
        case "SET_STEP":
            return action.step
        default:
            return state;
    }
}
export default step;