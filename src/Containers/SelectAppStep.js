import { connect } from 'react-redux'
import { setStep, getRawAssociates, getRawSkills, getRawRCUS, getRawTestSelection } from '../Actions/ReduxActions'
import App from '../Components/App'


const mapStateToProps=(state, ownProps)=>{
    return {step:state.step}
}
const mapDispatchToProps=(dispatch)=>{
    
    return {
        getRawAssociates:()=>getRawAssociates(dispatch),
        getRawSkills:()=>getRawSkills(dispatch),
        getRawRCUS:()=>getRawRCUS(dispatch),
        getRawTestSelection:()=>getRawTestSelection(dispatch),
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