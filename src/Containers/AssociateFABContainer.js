import { connect } from 'react-redux'
import { setLogOut } from '../Actions/AuthenticationActions'
import AssociateFAB from '../Components/AssociateFAB'

const mapStateToProps=(state, ownProps)=>{
    return {}
}
const mapDispatchToProps=(dispatch)=>{
    return{
        handleLogout:()=>dispatch(setLogOut())
    };
}
const AssociateFABContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(AssociateFAB)
export default AssociateFABContainer;

