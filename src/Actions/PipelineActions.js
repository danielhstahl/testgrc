import axios from 'axios'
export const setPipeline=(pipeline)=>{
    return{
        type:"SET_RAW_PIPELINE",
        pipeline
    }
}
export const getPipeline=dispatch=>{
    const pipeline=[
        {
            type:"Validation",
            id:"1",
            description:"Validation for Model1"
        },
        {
            type:"Annual Review",
            id:"4",
            description:"Annual Review for Model2"
        },
        {
            type:"Annual Review",
            id:"6",
            description:"Annual Review for Model3"
        }
    ]
    return dispatch(setPipeline(pipeline))
}
