import {leftjoin, innerjoin} from './helperFunctions.js';
const leftArray=[
    {id:1, val:5},{id:2, val:6},{id:3, val:7},
]
const rightArray=[{id:2, val:6, another:4}]
it('returns all matches', () => {
    const comb=leftjoin(leftArray, rightArray, (left, right)=>left.id===right.id);
    expect(comb).toEqual([{id:1, val:5},{id:2, val:6, another:4},{id:3, val:7},])
});

it('returns only matches', () => {
    const comb=innerjoin(leftArray, rightArray, (left, right)=>left.id===right.id);
    expect(comb).toEqual([{id:2, val:6}])
});