const user=(state=false, action)=>{
    switch(action.type){
        case "LOGIN":
            return {user:action.user, err:null}
        case "LOGOUT":
            return {user:null, err:null}
        case "LOGIN_ERROR":
            return {user:null, err:action.err}
        default:
            return state;
    }
}
export default user;