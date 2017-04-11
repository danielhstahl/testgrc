import { connect } from 'react-redux'
import LandingPage from '../Components/LandingPage'
const mapStateToProps=(state)=>{
    return {user:state.user.user}
}
const mapDispatchToProps=(dispatch)=>{
    return{
    };
}
const LandingPageContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(LandingPage)
export default LandingPageContainer;