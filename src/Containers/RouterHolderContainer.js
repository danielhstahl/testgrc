import { connect } from 'react-redux'
import  RouterHolder  from '../Components/RouterHolder'

const mapStateToProps=(state, ownProps)=>{
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