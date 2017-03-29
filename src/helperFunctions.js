export const leftjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right)=>{
    return leftArray.map((left)=>{
        const result=rightArray.filter((right)=>condition(left, right))[0]
        return result?result:left;
    })
}
export const innerjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right)=>{
    return leftArray.filter((left)=>{
        return rightArray.filter((right)=>condition(left, right))[0]
    })
}