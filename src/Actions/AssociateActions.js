import axios from 'axios'
import url from './url'
export const setRawAssociates=(associates)=>{
    return {
        type:"SET_RAW_ASSOCIATES",
        associates
    }
}
export const getRawAssociates=(dispatch)=>{
    return axios.get(`${url}/associates`).then((response)=>{
        console.log(response);
        dispatch(setRawAssociates(response.data))
    })
}
export const addAssociateForValidation=(associate, validationId)=>{
    axios.post(`${url}/writeValidationAssociate`, {validationId, id:associate.id, include:true}).then((response)=>console.log(response));
    return {
        type:"ADD_VALIDATION_ASSOCIATE",
        associate
    }
}
export const removeAssociateForValidation=(associate, validationId)=>{
    axios.post(`${url}/writeValidationAssociate`, {id:associate.id, validationId, include:false}).then((response)=>console.log(response));
    return {
        type:"REMOVE_VALIDATION_ASSOCIATE",
        associate
    }
}

export const getValidationAssociates=(dispatch, validationId)=>{
    return axios.get(`${url}/validationAssociates`, {params:{validationId}}).then((response)=>{
        console.log(response);
        dispatch(loadAssociatesRequiredForValidation(response.data))
    })
}
//this is getting complicated...
export const loadAssociatesRequiredForValidation=(associates)=>{
    return {
        type:"LOAD_VALIDATION_ASSOCIATES",
        associates
    }
}