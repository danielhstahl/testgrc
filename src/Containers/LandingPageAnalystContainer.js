import { connect } from 'react-redux'
//import { getRawTodos, getRawActivities } from '../Actions/ReduxActions'
import LandingPageAnalyst from '../Components/LandingPageAnalyst'

const mapStateToProps=(state, ownProps)=>{
    return {activities:state.activities, todos:state.todos, user:state.user}
}
const mapDispatchToProps=(dispatch)=>{
    return{
    };
}
const LandingPageAnalystContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPageAnalyst)
export default LandingPageAnalystContainer;