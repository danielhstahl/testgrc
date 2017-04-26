import { connect } from 'react-redux'
import {getPipeline} from '../Actions/PipelineActions'
import Pipeline from '../Components/Pipeline'

const mapStateToProps=(state)=>{
    const {pipeline, user}=state;
    console.log(state)
    return {pipeline,  policyGroups:user.user.policyGroups}
}
const mapDispatchToProps=(dispatch)=>{
    
    return{
        loadInit:(groups)=>{
            getPipeline(dispatch, groups); 
        },
    };
}
const PipelineContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Pipeline)
export default PipelineContainer;