import { connect } from 'react-redux'
import  RouterHolder  from '../Components/RouterHolder'

const mapStateToProps=(state, ownProps)=>{
    console.log("Should only get here once per session");
    return {
        userObj:state.user,
        arrowColor:ownProps.arrowColor
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
    };
}
const RouterHolderContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(RouterHolder)
export default RouterHolderContainer;