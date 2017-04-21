import { connect } from 'react-redux'
//import { getRawTodos, getRawActivities } from '../Actions/ReduxActions'
import LandingPageAnalyst from '../Components/LandingPageAnalyst'
import {getRawTodos} from '../Actions/TodoActions'
import {getRawActivities} from '../Actions/ActivityActions'
import {getPipeline} from '../Actions/PipelineActions'
const mapStateToProps=(state, ownProps)=>{
    const {activities, todos, pipeline, user}=state;
    //const lists=[state.activities, state.todos, state.pipeline]
    return {activities, todos, pipeline, policyGroups:user.user.policyGroups, tab:ownProps.tab}
}
const mapDispatchToProps=(dispatch)=>{
    
    return{
        onLoad:(groups)=>{
            getRawTodos(dispatch, groups);
            getRawActivities(dispatch, groups);
            getPipeline(dispatch, groups);
        }
        
    };
}
const LandingPageAnalystContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LandingPageAnalyst)
export default LandingPageAnalystContainer;