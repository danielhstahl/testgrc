import { connect } from 'react-redux'
import LandingPageAnalyst from '../Components/LandingPageAnalyst'

const mapStateToProps=(state, ownProps)=>{
    const {activities, user}=state;
    //const lists=[state.activities, state.todos, state.pipeline]
    return {activities:activities.sort((a, b)=>a.nextDueDate>b.nextDueDate),  policyGroups:user.user.policyGroups, tab:ownProps.tab}
}
const mapDispatchToProps=(dispatch)=>{
    
    return{
        /*onLoad:(groups)=>{
            getRawActivities(dispatch, groups);
        }*/
        
    };
}
const LandingPageAnalystContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(LandingPageAnalyst)
export default LandingPageAnalystContainer;