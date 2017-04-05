import axios from 'axios'
import url from './url'
export const setRawSkills=(skills)=>{
    return {
        type:"SET_RAW_SKILLS",
        skills
    }
}
export const getRawSkills=(dispatch)=>{
    return axios.get(`${url}/skills`).then((response)=>{
        dispatch(setRawSkills(response.data))
    })
}
export const addSkillsRequiredForValidation=(skill, validationId)=>{
    axios.post(`${url}/writeValidationSkill`, {skill, validationId, include:true}).then((response)=>console.log(response));
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
export const getValidationSkills=(dispatch, validationId)=>{
    return axios.get(`${url}/validationSkills`, {params:{validationId}}).then((response)=>{
        dispatch(loadSkillsRequiredForValidation(response.data))
    })
}
export const removeSkillRequiredForValidation=(skill)=>{
    return {
        type:"REMOVE_VALIDATION_SKILL",
        skill
    }
}