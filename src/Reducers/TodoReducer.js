const todos=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_TODOS":
            return action.todos
        default:
            return state;
    }
}
export default todos;