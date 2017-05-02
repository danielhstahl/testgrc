export const joinHelper=(left, right)=>{
    return left.processStep===right.processStep&&left.riskStep===right.riskStep
}
export const mergeHelper=(left, right, testDescriptions)=>{
    if(right){
        return {...left, submitted:true, testWork:right.testWork, explanation:right.explanation}
    }
    else{
        return {...left, submitted:false, testWork:null, explanation:""};
    }
}
export const isOkToSubmit=(testWork=0, explanation="", rawTestSelection=[{index:0, description:""}])=>{
    const description=rawTestSelection.filter(test=>test.index===testWork);
    switch(description.length>0?description[0].description:undefined){
        case "None":
            return explanation?true:false
        case undefined:
            return false;
        default:
            return true;
    }
}

export const filterAndSortPlan=(planResults, rawTestSelection)=>{
    return planResults.reduce((aggrPlan, processItem)=>{
        return aggrPlan.concat(processItem.risk_controls.map(plan=>({
            workpaper:plan.workpaper, 
            risk:plan.risk,
            controls:plan.controls,
            testWorkDescription:plan.testWork?rawTestSelection.filter(val=>val.index===plan.testWork)[0].description:"",
            explanation:plan.explanation
        })))
    }, []).sort((a, b)=>a.workpaper<b.workpaper?-1:1)
}
