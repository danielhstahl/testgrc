const activities=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_ACTIVITIES":
            return action.activities
        default:
            return state;
    }
}
export default activities;