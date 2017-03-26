import React from 'react';
export const leftjoin=(leftArray, rightArray, condition)=>{
    return leftArray.map((left)=>{
        const result=rightArray.find((right)=>condition(left, right))
        return result?result:left;
    })
}
leftjoin.propTypes={
    leftArray:React.PropTypes.array.isRequired,
    rightArray:React.PropTypes.array.isRequired,
    condition:React.PropTypes.func.isRequired
}