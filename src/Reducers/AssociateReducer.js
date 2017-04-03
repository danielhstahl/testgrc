const associate=(state={}, action)=>{
    switch(action.type){
        case "ADD_VALIDATION_ASSOCIATE":
            return {
                id:action.associate.id,
                skills:action.associate.requiredSkills
            }
        case "REMOVE_VALIDATION_ASSOCIATE":
            return state.id!==action.associate.id
        default:
            return state;
    }
}
const associates=(state=[], action)=>{
    switch(action.type){
        case "ADD_VALIDATION_ASSOCIATE":
            return [...state, associate(undefined, action)]
        case "REMOVE_VALIDATION_ASSOCIATE":
            return state.filter((skl)=>associate(skl, action))
        case "LOAD_VALIDATION_ASSOCIATES":
            return action.associates
        default:
            return state;
    }
}
export default associates;