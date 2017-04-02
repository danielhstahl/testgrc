export const setStep=(step)=>{
    return {
        type:'SET_STEP',
        step
    };
}
export const addSkillsRequiredForValidation=(skill)=>{
    return {
        type:"ADD_VALIDATION_SKILL",
        skill
    }
}
export const addAssociateForValidation=(associate)=>{
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

