const timeAllowedLogin=86400
const userItemName='token'
const userItemTime='tokenTime'
const unsetStorage=()=>{
    localStorage.removeItem(userItemName);
    localStorage.removeItem(userItemTime);
}
export const setStorage=(user)=>{
    localStorage.setItem(userItemName, JSON.stringify(user));
    localStorage.setItem(userItemTime, JSON.stringify(new Date().getTime()));
}
const setUser=(user, store, setLogIn)=>{
    user&&store.dispatch(setLogIn(user))
}
export const checkLogin=(store, setLogIn)=>{
    const timeSinceLoggedIn=new Date().getTime()-parseInt(localStorage.getItem(userItemTime))
    if(timeSinceLoggedIn>timeAllowedLogin){
        return unsetStorage();
    }
    try{
        setUser(JSON.parse(localStorage.getItem('token')), store, setLogIn);
    }catch(e){
        unsetStorage();
    }
}
