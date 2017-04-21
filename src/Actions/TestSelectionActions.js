import axios from 'axios'
import paramify from './paramify'
//import url from './url'
export const setRawTestSelection=(testSelection)=>{
    return {
        type:"SET_RAW_TESTSELECTION",
        testSelection
    }
}
export const getRawTestSelection=(dispatch, groups)=>{
    return axios.get(`/testSelection`, paramify({policyGroups:groups})).then((response)=>{
        dispatch(setRawTestSelection(response.data))
    })
}