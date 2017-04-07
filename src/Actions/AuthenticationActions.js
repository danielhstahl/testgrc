import axios from 'axios'
import url from './url'
import {SHA256, enc} from 'crypto-js'
import {setStorage} from '../localStorageHelper'
export const setLogIn=(user)=>{
    return {
        type:"LOGIN",
        user
    }
}
export const setLogInError=(err)=>{
    return {
        type:"LOGIN_ERROR",
        err
    }
}
export const setLogOut=()=>{
    //axios.post(`${url}/logout`)
    return {
        type:"LOGOUT",
        user:null
    }
}
export const attemptLogin=(dispatch, user)=>{
    axios.get(`${url}/checkLogin`, {params:{sessionId:user.sessionId}}).then((response)=>{
        console.log(response.data);
        const {hashPassword}=response.data;
        if(!hashPassword||user.hashPassword!==hashPassword){
            dispatch(setLogOut())
        }
        else{
            dispatch(setLogIn(user))
        }
    })
}
export const getLogIn=(dispatch, user, password)=>{
    axios.post(`${url}/login`, {user, password}).then((response)=>{
        const {err, user}=response.data;
        if(err){
            dispatch(setLogInError(err))
        }else{
            user.hashPassword=SHA256(password).toString(enc.Base64);
            console.log(user);
            dispatch(setLogIn(user))
            console.log(user);
            setStorage(user)            
        }
    })
}