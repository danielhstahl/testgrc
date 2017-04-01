import {combineReducers} from 'redux'
import step from './StepReducer'
import skills from './SkillsReducer'
import rawSkills from './RawSkillsReducer'
import associates from './AssociateReducer'
import rawAssociates from './RawAssociatesReducer'
import validationID from './ValidationIDReducer'
import rawRCUS from './RawRCUSReducer'
import plans from './PlansReducer'
import rawTest from './RawTestSelectionReducer'

const workflowApp=combineReducers({
    rawSkills,
    validationID,
    rawAssociates,
    step,
    skills,
    rawRCUS,
    plans,
    rawTest, 
    associates
})
export default workflowApp;