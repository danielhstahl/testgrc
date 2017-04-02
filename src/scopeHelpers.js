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
    switch(description.length>0?description[0].description:"None"){
        case "None":
            return explanation?true:false
        case undefined:
            return false;
        default:
            return true;
    }
}