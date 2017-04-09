import { connect } from 'react-redux'
import  RouterHolder  from '../Components/RouterHolder'

const mapStateToProps=(state)=>{
    console.log("Should only get here once per session");
    return {
        userObj:state.user,
        //arrowColor:ownProps.arrowColor,
        isLoading:state.isLoading
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