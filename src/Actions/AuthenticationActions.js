import axios from 'axios'
import url from './url'
export const setLogIn=(user)=>{
    return {
        type:"LOGIN",
        user
    }
}
export const setLogOut=()=>{
    return {
        type:"LOGOUT",
        user:null
    }
}
export const getLogIn=(dispatch, user, password)=>{
    return axios.post(`${url}/login`, {user, password}).then((response)=>{
        console.log(response);
        dispatch(setLogIn(response.data))
    })
}