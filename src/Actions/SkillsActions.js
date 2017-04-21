import axios from 'axios'
import paramify from './paramify'
//import url from './url'
export const setRawSkills=(skills)=>{
    return {
        type:"SET_RAW_SKILLS",
        skills
    }
}
export const getRawSkills=(dispatch, groups)=>{
    return axios.get(`/skills`, paramify({policyGroups:groups}) ).then((response)=>{
        dispatch(setRawSkills(response.data))
    })
}
export const addSkillsRequiredForValidation=(skill, validationId, groups)=>{
    axios.post(`/writeValidationSkill`, {skill, validationId, include:true, policyGroups:groups}).then().catch(err=>console.log(err))
    return {
        type:"ADD_VALIDATION_SKILL",
        skill
    }
}
export const loadSkillsRequiredForValidation=(skills)=>{
    return {
        type:"LOAD_VALIDATION_SKILLS",
        skills
    }
}
export const getValidationSkills=(dispatch, validationId, groups)=>{
    return axios.get(`/validationSkills`, paramify({validationId, policyGroups:groups})).then((response)=>{
        dispatch(loadSkillsRequiredForValidation(response.data))
    })
}
export const removeSkillRequiredForValidation=(skill)=>{
    return {
        type:"REMOVE_VALIDATION_SKILL",
        skill
    }
}