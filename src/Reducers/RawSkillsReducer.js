
const rawSkills=(state=[], action)=>{
    switch(action.type){
        case "SET_RAW_SKILLS":
            return action.skills
        default:
            return state;
    }
}
export default rawSkills;
