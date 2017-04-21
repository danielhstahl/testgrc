import axios from 'axios'
import paramify from './paramify'
//import url from './url'
export const setRawAssociates=(associates)=>{
    return {
        type:"SET_RAW_ASSOCIATES",
        associates
    }
}
export const getRawAssociates=(dispatch, groups)=>{
    return axios.get(`/associates`, paramify({policyGroups:groups})).then((response)=>{
        console.log(response);
        dispatch(setRawAssociates(response.data))
    })
}
export const addAssociateForValidation=(associate, validationId, groups)=>{
    axios.post(`/writeValidationAssociate`, {validationId, id:associate.id, include:true, policyGroups:groups}).then().catch(err=>console.log(err))
    return {
        type:"ADD_VALIDATION_ASSOCIATE",
        associate
    }
}
export const removeAssociateForValidation=(associate, validationId, groups)=>{
    axios.post(`/writeValidationAssociate`, {id:associate.id, validationId, include:false, policyGroups:groups}).then().catch(err=>console.log(err))
    return {
        type:"REMOVE_VALIDATION_ASSOCIATE",
        associate
    }
}

export const loadAssociatesRequiredForValidation=(associates)=>{
    return {
        type:"LOAD_VALIDATION_ASSOCIATES",
        associates
    }
}
export const getValidationAssociates=(dispatch, validationId, groups)=>{
    return axios.get(`/validationAssociates`, paramify({validationId, policyGroups:groups})).then((response)=>{
        dispatch(loadAssociatesRequiredForValidation(response.data))
    })
}
