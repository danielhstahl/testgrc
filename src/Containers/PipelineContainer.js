import { connect } from 'react-redux'
import {getPipeline} from '../Actions/PipelineActions'
import Pipeline from '../Components/Pipeline'
import{getRawAssociates } from '../Actions/AssociateActions'
const mapStateToProps=(state)=>{
    const {pipeline, user}=state;
    return {associates:state.rawAssociates, pipeline,  policyGroups:user.user.policyGroups}
}
const mapDispatchToProps=(dispatch)=>{
    
    return{
        loadInit:(groups)=>{
            getPipeline(dispatch, groups)
            getRawAssociates(dispatch, groups)
        },
    };
}
const PipelineContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(Pipeline)
export default PipelineContainer;