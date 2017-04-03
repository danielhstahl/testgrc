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
        console.log(response);
        dispatch(setRawSkills(response.data))
    })
}
export const addSkillsRequiredForValidation=(skill, validationId)=>{
    axios.post(`${url}/handleAddSkill`, {skill, validationId, include:true}).then((response)=>console.log(response));
    return {
        type:"ADD_VALIDATION_SKILL",
        skill
    }
}
export const getValidationSkills=(dispatch, validationId)=>{
    return axios.get(`${url}/selectedSkills`, {validationId}).then((response)=>{
        console.log(response);
        dispatch(loadSkillsRequiredForValidation(response.data))
    })
}
//this is getting complicated...
export const loadSkillsRequiredForValidation=(skills)=>{
    return {
        type:"LOAD_VALIDATION_SKILLS",
        skills
    }
}
export const removeSkillRequiredForValidation=(skill)=>{
    return {
        type:"REMOVE_VALIDATION_SKILL",
        skill
    }
}