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
            timeline:[
                {
                    description:"Kickoff",
                    dueDate:"2017-04-01",
                    actualDate:"2017-04-02"
                },
                {
                    description:"QC1",
                    dueDate:"2017-04-15",
                    actualDate:null
                },
                {
                    description:"QC2",
                    dueDate:"2020-04-30",
                    actualDate:null
                },
                {
                    description:"QC3",
                    dueDate:"2020-04-30",
                    actualDate:null
                },
                {
                    description:"QC4",
                    dueDate:"2020-04-30",
                    actualDate:null
                },
                {
                    description:"Draft",
                    dueDate:"2020-04-30",
                    actualDate:null
                },{
                    description:"Final",
                    dueDate:"2020-04-30",
                    actualDate:null
                }
            ]
        },
        {
            type:"Annual Review",
            id:"4",
            description:"Annual Review for Model2",
            timeline:[
                {
                    description:"Kickoff",
                    dueDate:"2017-04-01",
                    actualDate:"2017-04-02"
                },
                {
                    description:"QC1",
                    dueDate:"2017-04-15",
                    actualDate:"2017-04-15",
                },
                {
                    description:"QC2",
                    dueDate:"2020-04-30",
                    actualDate:null
                },{
                    description:"Final",
                    dueDate:"2020-04-30",
                    actualDate:null
                }
            ]
        }
    ]
    return dispatch(setRawActivities(activities))
}
