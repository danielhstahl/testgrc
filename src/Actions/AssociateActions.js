import axios from 'axios'
//import url from './url'
export const setRawAssociates=(associates)=>{
    return {
        type:"SET_RAW_ASSOCIATES",
        associates
    }
}
export const getRawAssociates=(dispatch)=>{
    return axios.get(`/associates`).then((response)=>{
        console.log(response);
        dispatch(setRawAssociates(response.data))
    })
}
export const addAssociateForValidation=(associate, validationId)=>{
    axios.post(`/writeValidationAssociate`, {validationId, id:associate.id, include:true}).then().catch(err=>console.log(err))
    return {
        type:"ADD_VALIDATION_ASSOCIATE",
        associate
    }
}
export const removeAssociateForValidation=(associate, validationId)=>{
    axios.post(`/writeValidationAssociate`, {id:associate.id, validationId, include:false}).then().catch(err=>console.log(err))
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
export const getValidationAssociates=(dispatch, validationId)=>{
    return axios.get(`/validationAssociates`, {params:{validationId}}).then((response)=>{
        dispatch(loadAssociatesRequiredForValidation(response.data))
    })
}
