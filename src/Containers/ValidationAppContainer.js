import { connect } from 'react-redux'
import { setStep} from '../Actions/StepActions'
import ValidationApp from '../Components/ValidationApp'

const mapStateToProps=(state, ownProps)=>{
    console.log(ownProps);
    return {step:state.step, match:ownProps.match, arrowColor:ownProps.arrowColor}
}
const mapDispatchToProps=(dispatch)=>{
    return {
        handleStepChange:(step)=>{
            dispatch(setStep(step));
        }
    }
}
const ValidationAppContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(ValidationApp)
export default ValidationAppContainer;