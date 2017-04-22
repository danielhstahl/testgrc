import { connect } from 'react-redux'
import { setLogOut } from '../Actions/AuthenticationActions'
import UserOptions from '../Components/UserOptions'
import {getRawActivities} from '../Actions/ActivityActions'

const tomorrowDate=new Date().setDate(new Date().getDate()+1)
const convertDate=date=>Date.parse(date)<tomorrowDate

const mapStateToProps=(state)=>{
    return {
        user:state.user.user, 
        countToDo:state.activities.filter(val=>convertDate(val.nextDueDate)).length, 
        policyGroups:state.user.user.policyGroups
    }
}
const mapDispatchToProps=(dispatch)=>{
    return{
        onLoad:(groups)=>{
            getRawActivities(dispatch, groups);
        },
        handleLogout:()=>dispatch(setLogOut())
    };
}
const UserOptionsContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserOptions)
export default UserOptionsContainer;
