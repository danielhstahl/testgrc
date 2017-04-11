import axios from 'axios'
//import url from './url'
export const setRawRCUS=(rcus)=>{
    return{
        type:"SET_RAW_RCUS",
        rcus
    }
}
export const getRawRCUS=(dispatch)=>{
    return axios.get(`/RCUS`).then((response)=>{
        dispatch(setRawRCUS(response.data))
    })
}

export const addPlanningToValidation=(plan, validationId)=>{
    axios.post(`/writeValidationRcus`, {testWork:plan.testWork, explanation:plan.explanation, processStep:plan.processStep, riskStep:plan.riskStep, validationId}).then().catch(err=>console.log(err))
    return {
        type:"ADD_VALIDATION_PLAN",
        plan
    }
}
export const editPlan=(plan, validationId)=>{
    axios.post(`/writeValidationRcus`, {testWork:plan.testWork, explanation:plan.explanation, processStep:plan.processStep, riskStep:plan.riskStep, validationId}).then().catch(err=>console.log(err))
    return {
        type:"EDIT_VALIDATION_PLAN",
        plan
    }
}
export const loadPlanRequiredForValidation=(plans)=>{
    return {
        type:"LOAD_VALIDATION_PLAN",
        plans
    }
}
export const getValidationPlan=(dispatch, validationId)=>{
    return axios.get(`/validationRcus`, {params:{validationId}}).then((response)=>{
        console.log(response);
        dispatch(loadPlanRequiredForValidation(response.data))
    })
}

