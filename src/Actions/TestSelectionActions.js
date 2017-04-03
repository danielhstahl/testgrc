import axios from 'axios'
import url from './url'
export const setRawTestSelection=(testSelection)=>{
    return {
        type:"SET_RAW_TESTSELECTION",
        testSelection
    }
}
export const getRawTestSelection=(dispatch)=>{
    return axios.get(`${url}/testSelection`).then((response)=>{
        console.log(response);
        dispatch(setRawTestSelection(response.data))
    })
}