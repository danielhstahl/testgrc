import {isOkToSubmit} from './scopeHelpers'
const rawTestSelection=[
    {
        index:0,
        description:"Something"
    },
    {
        index:1,
        description:"None"
    }
]
it('returns false when there is no test work and no filled in explanation', ()=>{
    expect(isOkToSubmit(1, "", rawTestSelection)).toEqual(false);
})
it('returns true when there is no test work and an explanation', ()=>{
    expect(isOkToSubmit(1, "etc", rawTestSelection)).toEqual(true);
})
it('returns false if test work is not defined', ()=>{
    expect(isOkToSubmit(null, "etc", rawTestSelection)).toEqual(false);
})
it('returns true if test work is not none', ()=>{
    expect(isOkToSubmit(0, "", rawTestSelection)).toEqual(true);
})