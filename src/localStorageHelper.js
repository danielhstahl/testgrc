//const timeAllowedLogin=86400
const userItemName='token'
const userItemTime='tokenTime'
const unsetStorage=(store, setLogOut)=>{
    localStorage.removeItem(userItemName);
    store.dispatch(setLogOut());
}
export const setStorage=(user)=>{
    localStorage.setItem(userItemName, JSON.stringify(user));
}
const setUser=(user, store, attemptLogin)=>{
    attemptLogin(store.dispatch, user)
}
export const checkLogin=(store, attemptLogin, setLogOut)=>{
    try{
        setUser(JSON.parse(localStorage.getItem(userItemName)), store, attemptLogin);
    }catch(e){
        unsetStorage(store, setLogOut);
    }
}
