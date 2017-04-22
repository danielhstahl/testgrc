import { connect } from 'react-redux'
import { setLogOut } from '../Actions/AuthenticationActions'
import UserOptions from '../Components/UserOptions'

const mapStateToProps=(state)=>{
    return {
        user:state.user.user
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleLogout:()=>dispatch(setLogOut())
    };
}
const UserOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOptions)
export default UserOptionsContainer;
