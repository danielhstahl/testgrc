
const rawRCUS=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_RCUS":
            return action.rcus
        default:
            return state;
    }
}
export default rawRCUS;
