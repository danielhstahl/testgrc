import axios from 'axios'
export const setRawTodos=(todos)=>{
    return{
        type:"SET_RAW_TODOS",
        todos
    }
}
export const getRawTodos=dispatch=>{
    const todos=[
        {
            type:"Issue",
            id:"1",
            description:"Issue remediation received for Model2"
        },
        {
            type:"Ongoing Monitoring",
            id:"4",
            description:"Ongoing Monitoring required for Model2"
        },
        {
            type:"Validation",
            id:"1",
            description:"QC Checkpoint Due for Model1"
        }
    ]
    return dispatch(setRawTodos(todos))
}