const rawTest=(state=[
], action)=>{
    switch(action.type){
        case "SET_RAW_TESTSELECTION":
            return action.testSelection
        default:
            return state;
    }
}
export default rawTest;