import React from 'react';
export const leftjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right)=>{
    return leftArray.map((left)=>{
        const result=rightArray.find((right)=>condition(left, right))
        return result?result:left;
    })
}
export const innerjoin=(leftArray=[], rightArray=[], condition=(left, right)=>left===right)=>{
    return leftArray.filter((left)=>{
        return rightArray.find((right)=>condition(left, right))
    })
}
