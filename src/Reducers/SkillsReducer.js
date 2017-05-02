import {getUniqueArray} from '../helperFunctions'
const skill=(state="", action)=>{
    switch(action.type){
        case "ADD_VALIDATION_SKILL":
            return action.skill
        case "REMOVE_VALIDATION_SKILL":
            return state!==action.skill
        default:
            return state;
    }
}
const skills=(state=[], action)=>{
    switch(action.type){
        case "ADD_VALIDATION_SKILL":
            return getUniqueArray([...state, skill(undefined, action)])
        case "REMOVE_VALIDATION_SKILL":
            return state.filter((skl)=>skill(skl, action))
        case "LOAD_VALIDATION_SKILLS":
            return action.skills
        default:
            return state;
    }
}
export default skills;