const rawAssociates=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_ASSOCIATES":
            return action.associates
        default:
            return state
    }
    //return state
}
export default rawAssociates;