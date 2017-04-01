import { connect } from 'react-redux'
import { setStep } from '../Actions/ReduxActions'
import App from '../Components/App'


const mapStateToProps=(state, ownProps)=>{
    return {step:state.step}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleStepChange:(step)=>{
            dispatch(setStep(step));
        }
    }
}
const SelectAppStep = connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
export default SelectAppStep;