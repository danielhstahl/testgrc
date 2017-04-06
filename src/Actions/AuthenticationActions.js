import axios from 'axios'
import url from './url'
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
    return {
        type:"LOGOUT",
        user:null
    }
}
export const getLogIn=(dispatch, user, password)=>{
    axios.post(`${url}/login`, {user, password}).then((response)=>{
        const {err, user}=response.data;
        if(err){
            dispatch(setLogInError(err))
        }else{
            dispatch(setLogIn(user))
            setStorage(user)            
        }
    })
}