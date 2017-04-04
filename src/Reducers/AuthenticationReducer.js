const authenticate=(state=false, action)=>{
    switch(action.type){
        case "LOGIN":
            return action.user
        case "LOGOUT":
            return action.user
        default:
            return state;
    }
}
export default authenticate;