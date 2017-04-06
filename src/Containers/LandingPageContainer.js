import { connect } from 'react-redux'
//import { getRawTodos, getRawActivities } from '../Actions/ReduxActions'
import LandingPage from '../Components/LandingPage'
//import {getRawTodos} from '../Actions/TodoActions'
//import {getRawActivities} from '../Actions/ActivityActions'
const mapStateToProps=(state, ownProps)=>{
    return {user:state.user.user}
}
const mapDispatchToProps=(dispatch)=>{

    return{
        /*getRawTodos:()=>getRawTodos(dispatch),
        getRawActivities:()=>getRawActivities(dispatch)*/
    };
}
const LandingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)
export default LandingPageContainer;