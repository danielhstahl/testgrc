export const leftjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right, manageResult=(left, right)=>right?right:left)=>{
    return leftArray.map((left)=>{
        const result=rightArray.filter((right)=>condition(left, right))[0]
        return manageResult(left, result);//result?result:left;
    })
}
export const innerjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right)=>{
    return leftArray.filter((left)=>{
        return rightArray.filter((right)=>condition(left, right))[0]
    })
}

export const getUniqueArray=Array.from?(array)=>[...new Set(array)]:(array)=>array.sort().filter((val, index, arr)=>!index||val!==arr[index-1])//ensure unique values