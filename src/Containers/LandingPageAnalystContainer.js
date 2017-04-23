import { connect } from 'react-redux'
import LandingPageAnalyst from '../Components/LandingPageAnalyst'

const mapStateToProps=(state)=>{
    const {activities, user}=state;
    return {activities,  policyGroups:user.user.policyGroups}
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