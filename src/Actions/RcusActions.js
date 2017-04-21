import axios from 'axios'
//import url from './url'
import paramify from './paramify'
export const setRawRCUS=(rcus)=>{
    return{
        type:"SET_RAW_RCUS",
        rcus
    }
}
export const getRawRCUS=(dispatch, groups)=>{
    return axios.get(`/RCUS`, paramify({policyGroups:groups})).then((response)=>{
        dispatch(setRawRCUS(response.data))
    })
}

export const addPlanningToValidation=(plan, validationId, groups)=>{
    axios.post(`/writeValidationRcus`, {testWork:plan.testWork, explanation:plan.explanation, processStep:plan.processStep, riskStep:plan.riskStep, validationId, policyGroups:groups}).then().catch(err=>console.log(err))
    return {
        type:"ADD_VALIDATION_PLAN",
        plan
    }
}
export const editPlan=(plan, validationId, groups)=>{
    axios.post(`/writeValidationRcus`, {testWork:plan.testWork, explanation:plan.explanation, processStep:plan.processStep, riskStep:plan.riskStep, validationId, policyGroups:groups}).then().catch(err=>console.log(err))
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
export const getValidationPlan=(dispatch, validationId, groups)=>{
    return axios.get(`/validationRcus`, paramify({validationId, policyGroups:groups})).then((response)=>{
        console.log(response);
        dispatch(loadPlanRequiredForValidation(response.data))
    })
}

