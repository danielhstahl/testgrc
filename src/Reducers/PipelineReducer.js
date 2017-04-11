const pipeline=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_PIPELINE":
            return action.pipeline
        default:
            return state;
    }
}
export default pipeline;