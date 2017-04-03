import { connect } from 'react-redux'
import {getRawAssociates} from '../Actions/AssociateActions'
import {getRawSkills} from '../Actions/SkillsActions'
import {getRawRCUS} from '../Actions/RcusActions'
import {getRawTestSelection} from '../Actions/TestSelectionActions'
import {getRawTodos} from '../Actions/TodoActions'
import {getRawActivities} from '../Actions/ActivityActions'
import App from '../Components/App'


const mapStateToProps=(state, ownProps)=>{
    return {};//{step:state.step}
}
const mapDispatchToProps=(dispatch)=>{
    
    return {
        getRawAssociates:()=>getRawAssociates(dispatch),
        getRawSkills:()=>getRawSkills(dispatch),
        getRawRCUS:()=>getRawRCUS(dispatch),
        getRawTestSelection:()=>getRawTestSelection(dispatch),
        getRawTodos:()=>getRawTodos(dispatch),
        getRawActivities:()=>getRawActivities(dispatch)
    }
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default AppContainer;