import React from 'react';
import AutoRenew from 'material-ui/svg-icons/action/autorenew'//ongoing monitoring
import FeedBack from 'material-ui/svg-icons/action/feedback' //issue
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
export const validationIcon=(type)=>{
    switch(type){
        case "Validation":
            return <Functions/>
        case "Ongoing Monitoring":
            return <AutoRenew/>
        case "Issue":
            return <FeedBack/>
        case "Annual Review":
            return <Poll/>
        default:
            return <Poll/>
    }
}

export const numberOfQC=(type)=>{
    switch(type){
        case "Validation":
            return 4
        case "Ongoing Monitoring":
            return 1
        case "Issue":
            return 2
        case "Annual Review":
            return 2
        default:
            return 2
    }
}