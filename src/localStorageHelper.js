const timeAllowedLogin=86400
const userItemName='token'
const userItemTime='tokenTime'
const unsetStorage=(store, setLogOut)=>{
    localStorage.removeItem(userItemName);
    localStorage.removeItem(userItemTime);
    store.dispatch(setLogOut());
}
export const setStorage=(user)=>{
    localStorage.setItem(userItemName, JSON.stringify(user));
    localStorage.setItem(userItemTime, JSON.stringify(new Date().getTime()));
}
const setUser=(user, store, attemptLogin)=>{
    user&&attemptLogin(store.dispatch, user)
}
export const checkLogin=(store, attemptLogin, setLogOut)=>{
    const timeSinceLoggedIn=new Date().getTime()-parseInt(localStorage.getItem(userItemTime), 10)
    if(timeSinceLoggedIn>timeAllowedLogin){
        return unsetStorage(store, setLogOut);
    }
    try{
        setUser(JSON.parse(localStorage.getItem('token')), store, attemptLogin);
    }catch(e){
        unsetStorage(store, setLogOut);
    }
}
