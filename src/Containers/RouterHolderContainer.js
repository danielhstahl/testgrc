import { connect } from 'react-redux'
import  RouterHolder  from '../Components/RouterHolder'
const mapStateToProps=(state)=>{
    return {
        userObj:state.user,
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