import axios from 'axios'
import url from './url'
export const setRawRCUS=(rcus)=>{
    return{
        type:"SET_RAW_RCUS",
        rcus
    }
}
export const getRawRCUS=(dispatch)=>{
    return axios.get(`${url}/RCUS`).then((response)=>{
        console.log(response);
        dispatch(setRawRCUS(response.data))
    })
}

export const addPlanningToValidation=(plan, validationId)=>{
    axios.post(`${url}/handlePlanSubmit`, {testWork:plan.testWork, explanation:plan.explanation, processStep:plan.processStep, riskStep:plan.riskStep, validationId}).then((response)=>console.log(response));
    return {
        type:"ADD_VALIDATION_PLAN",
        plan
    }
}
export const editPlan=(plan, validationId)=>{
    axios.post(`${url}/handlePlanSubmit`, {testWork:plan.testWork, explanation:plan.explanation, processStep:plan.processStep, riskStep:plan.riskStep, validationId}).then((response)=>console.log(response));
    return {
        type:"EDIT_VALIDATION_PLAN",
        plan
    }
}
export const getValidationPlan=(dispatch, validationId)=>{
    return axios.get(`${url}/scopeAssessment`, {validationId}).then((response)=>{
        console.log(response);
        dispatch(loadPlanRequiredForValidation(response.data))
    })
}
//this is getting complicated...
export const loadPlanRequiredForValidation=(plans)=>{
    return {
        type:"LOAD_VALIDATION_PLAN",
        plans
    }
}