import axios from 'axios'
import url from './url'
import {SHA256, enc} from 'crypto-js'
import {setStorage} from '../localStorageHelper'
import {CheckLoading} from './LoadingAction'
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
    return {
        type:"LOGOUT",
        user:null
    }
}
export const attemptLogin=(dispatch, user)=>{
    if(user){
        dispatch(CheckLoading(true))
        axios.get(`${url}/checkLogin`, {params:{sessionId:user.sessionId}}).then((response)=>{
            console.log(response.data);
            const {hashPassword}=response.data;
            if(!hashPassword||user.hashPassword!==hashPassword){
                dispatch(setLogOut())
            }
            else{
                dispatch(setLogIn(user))
            }
            dispatch(CheckLoading(false))
        })
    }else{
        dispatch(CheckLoading(false))
    }
}
export const getLogIn=(dispatch, user, password)=>{
    dispatch(CheckLoading(true))
    axios.post(`${url}/login`, {user, password}).then((response)=>{
        const {err, user}=response.data;
        if(err){
            dispatch(setLogInError(err))
        }else{
            user.hashPassword=SHA256(password).toString(enc.Base64);
            dispatch(setLogIn(user))
            setStorage(user)            
        }
        dispatch(CheckLoading(false))
    })
}