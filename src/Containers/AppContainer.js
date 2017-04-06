import { connect } from 'react-redux'
/*import {getRawRCUS} from '../Actions/RcusActions'
import {getRawTestSelection} from '../Actions/TestSelectionActions'
import {getRawTodos} from '../Actions/TodoActions'
import {getRawActivities} from '../Actions/ActivityActions'*/
import App from '../Components/App'


const mapStateToProps=(state, ownProps)=>{
    return {
    };
}
const mapDispatchToProps=(dispatch)=>{
    return {
    }
}
const AppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default AppContainer;