import axios from 'axios'
const url='http://localhost:3001'
export const setStep=(step)=>{
    return {
        type:'SET_STEP',
        step
    };
}
export const setRawAssociates=(associates)=>{
    return {
        type:"SET_RAW_ASSOCIATES",
        associates
    }
}
export const setRawSkills=(skills)=>{
    return {
        type:"SET_RAW_SKILLS",
        skills
    }
}
export const setRawTestSelection=(testSelection)=>{
    return {
        type:"SET_RAW_TESTSELECTION",
        testSelection
    }
}
export const setRawRCUS=(rcus)=>{
    return{
        type:"SET_RAW_RCUS",
        rcus
    }
}
export const getRawAssociates=(dispatch)=>{
    return axios.get(`${url}/currentAssociates`).then((response)=>{
        console.log(response);
        dispatch(setRawAssociates(response.data))
    })
}
export const getRawSkills=(dispatch)=>{
    return axios.get(`${url}/skills`).then((response)=>{
        console.log(response);
        dispatch(setRawSkills(response.data))
    })
}
export const getRawTestSelection=(dispatch)=>{
    return axios.get(`${url}/testSelection`).then((response)=>{
        console.log(response);
        dispatch(setRawTestSelection(response.data))
    })
}
export const getRawRCUS=(dispatch)=>{
    return axios.get(`${url}/RCUS`).then((response)=>{
        console.log(response);
        dispatch(setRawRCUS(response.data))
    })
}





export const addSkillsRequiredForValidation=(skill)=>{
    return {
        type:"ADD_VALIDATION_SKILL",
        skill
    }
}
export const addAssociateForValidation=(associate)=>{
    axios.post(`${url}/handleAddTeamMember`, {id:associate.id, include:true}).then((response)=>console.log(response));
    return {
        type:"ADD_VALIDATION_ASSOCIATE",
        associate
    }
}
export const removeSkillRequiredForValidation=(skill)=>{
    return {
        type:"REMOVE_VALIDATION_SKILL",
        skill
    }
}
export const removeAssociateForValidation=(associate)=>{
    axios.post(`${url}/handleAddTeamMember`, {id:associate.id, include:false}).then((response)=>console.log(response));
    return {
        type:"REMOVE_VALIDATION_ASSOCIATE",
        associate
    }
}
export const addPlanningToValidation=(plan)=>{
    return {
        type:"ADD_VALIDATION_PLAN",
        plan
    }
}
export const editPlan=(plan)=>{
    return {
        type:"EDIT_VALIDATION_PLAN",
        plan
    }
}

