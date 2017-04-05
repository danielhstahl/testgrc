import { connect } from 'react-redux'
import { getLogIn } from '../Actions/AuthenticationActions'
import Login from '../Components/Login'

const mapStateToProps=(state, ownProps)=>{
    return {
        user:state.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleLogin:(user, password)=>getLogIn(dispatch, user, password)
    };
}
const LoginContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(Login)
export default LoginContainer;