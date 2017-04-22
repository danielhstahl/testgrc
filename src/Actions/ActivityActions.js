import axios from 'axios'
export const setRawActivities=(activities)=>{
    return{
        type:"SET_RAW_ACTIVITIES",
        activities
    }
}
export const getRawActivities=dispatch=>{
    const activities=[
        {
            type:"Validation",
            id:"1",
            description:"Validation for Model1",
            nextDueDate:"2017-04-01",
            finalDueDate:"2020-04-01"
        },
        {
            type:"Annual Review",
            id:"4",
            description:"Annual Review for Model2",
            nextDueDate:"2020-04-01",
            finalDueDate:"2020-04-01"
        }
    ]
    return dispatch(setRawActivities(activities))
}
