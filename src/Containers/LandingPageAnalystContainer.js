import { connect } from 'react-redux'
//import { getRawTodos, getRawActivities } from '../Actions/ReduxActions'
import LandingPageAnalyst from '../Components/LandingPageAnalyst'
import {getRawTodos} from '../Actions/TodoActions'
import {getRawActivities} from '../Actions/ActivityActions'
import {getPipeline} from '../Actions/PipelineActions'
const mapStateToProps=(state, ownProps)=>{
    const {activities, todos, pipeline}=state;
    //const lists=[state.activities, state.todos, state.pipeline]
    return {activities, todos, pipeline, tab:ownProps.tab}
}
const mapDispatchToProps=(dispatch)=>{
    
    return{
        onLoad:()=>{
            getRawTodos(dispatch);
            getRawActivities(dispatch);
            getPipeline(dispatch);
        }
        
    };
}
const LandingPageAnalystContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LandingPageAnalyst)
export default LandingPageAnalystContainer;