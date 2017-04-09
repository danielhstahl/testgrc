import { connect } from 'react-redux'
//import { getRawTodos, getRawActivities } from '../Actions/ReduxActions'
import LandingPageAnalyst from '../Components/LandingPageAnalyst'
import {getRawTodos} from '../Actions/TodoActions'
import {getRawActivities} from '../Actions/ActivityActions'
const mapStateToProps=(state, ownProps)=>{
    return {activities:state.activities, todos:state.todos}
}
const mapDispatchToProps=(dispatch)=>{
    
    return{
        onLoad:()=>{
            getRawTodos(dispatch);
            getRawActivities(dispatch);
        }
        
    };
}
const LandingPageAnalystContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LandingPageAnalyst)
export default LandingPageAnalystContainer;