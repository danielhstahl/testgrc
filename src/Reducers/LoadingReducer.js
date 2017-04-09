const isLoading=(state=true, action)=>{
    switch(action.type){
        case "CHECK_LOADING":
            return action.loadingStatus
        default:
            return state;
    }
}
export default isLoading;