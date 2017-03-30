import React from 'react';
import ReactDOM from 'react-dom';
import {Skills, testWhoFitsSkill, testGetSkillsPerPersonel, testGetUniqueArray, testAddSelectedSkill, testRemoveSelectedSkill, testUpdatePersonel} from './Skills';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import injectTapEventPlugin from 'react-tap-event-plugin';
injectTapEventPlugin();
it('returns both associates', ()=>{
    const obj=[{
        skills:[1, 2, 3]
    },
    {
        skills:[1, 2]
    }]
    expect(testWhoFitsSkill(1, obj)).toEqual(obj);
})
it('returns only the first associate', ()=>{
    const obj=[{
        skills:[1, 2, 3]
    },
    {
        skills:[1, 2]
    }]
    expect(testWhoFitsSkill(3, obj)).toEqual([{
        skills:[1, 2, 3]
    }]);
})
it('returns no associates', ()=>{
    const obj=[{
        skills:[1, 2, 3]
    },
    {
        skills:[1, 2]
    }]
    expect(testWhoFitsSkill(4, obj)).toEqual([]);
})

it('returns both skills per associate', ()=>{
    const skills=[1, 2]
    const obj=[{
        skills:[1, 2, 3],
        name:"Person1",
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2],
        name:"Person2",
        id:2,
        selectedForTeam:true
    }]
    const expectedResult=[{
        skills:[1, 2, 3],
        name:"Person1",
        numberOfRequiredSkills:2,
        requiredSkills:[1, 2],
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2],
        name:"Person2",
        numberOfRequiredSkills:2,
        requiredSkills:[1, 2],
        id:2,
        selectedForTeam:true
    }]
    expect(testGetSkillsPerPersonel(skills, obj)).toEqual(expectedResult);
})
it('returns only 1 skill for one associate', ()=>{
    const skills=[3]
    const obj=[{
        skills:[1, 2, 3],
        name:"Person1",
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2],
        name:"Person2",
        id:2,
        selectedForTeam:true
    }]
    const expectedResult=[{
        skills:[1, 2, 3],
        name:"Person1",
        numberOfRequiredSkills:1,
        requiredSkills:[3],
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2],
        name:"Person2",
        numberOfRequiredSkills:0,
        requiredSkills:[],
        id:2,
        selectedForTeam:true
    }]
    expect(testGetSkillsPerPersonel(skills, obj)).toEqual(expectedResult);
})
it('returns partial skills per associate', ()=>{
    const skills=[2, 3]
    const obj=[{
        skills:[1, 2, 3],
        name:"Person1",
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2],
        name:"Person2",
        id:2,
        selectedForTeam:true
    }]
    const expectedResult=[{
        skills:[1, 2, 3],
        name:"Person1",
        numberOfRequiredSkills:2,
        requiredSkills:[2, 3],
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2],
        name:"Person2",
        numberOfRequiredSkills:1,
        requiredSkills:[2],
        id:2,
        selectedForTeam:true
    }]
    expect(testGetSkillsPerPersonel(skills, obj)).toEqual(expectedResult);
})


it('returns unique array without last 1', ()=>{
    const arr=[1, 2, 3, 1]
    const expectedResult=[1, 2, 3]
    expect(testGetUniqueArray(arr)).toEqual(expectedResult);
})
it('returns unique array with only 1', ()=>{
    const arr=[1, 1, 1, 1]
    const expectedResult=[1]
    expect(testGetUniqueArray(arr)).toEqual(expectedResult);
})
it('appends to array', ()=>{
    const arr=["hello"]
    const expectedResult=["hello", "World"]
    expect(testAddSelectedSkill(arr, "World")).toEqual(expectedResult);
})
it('removes from array', ()=>{
    const arr=["hello", "World"]
    const expectedResult=["hello"]
    expect(testRemoveSelectedSkill(arr, "World")).toEqual(expectedResult);
})
it('appends then removes from array', ()=>{
    const arr=["hello"]
    const expectedResult=["hello"]
    expect(testRemoveSelectedSkill(testAddSelectedSkill(arr, "World"), "World")).toEqual(expectedResult);
})

it('updates personel then returns sorted', ()=>{
    const skills=[2, 3]
    const obj=[{
        skills:[1, 2],
        name:"Person1",
        id:1,
        selectedForTeam:false
    },
    {
        skills:[1, 2, 3],
        name:"Person2",
        id:2,
        selectedForTeam:true
    }]
    const expectedResult=[{
        skills:[1, 2, 3],
        name:"Person2",
        numberOfRequiredSkills:2,
        requiredSkills:[2, 3],
        id:2,
        selectedForTeam:true
    },
    {
        skills:[1, 2],
        name:"Person1",
        numberOfRequiredSkills:1,
        requiredSkills:[2],
        id:1,
        selectedForTeam:false
    }]
    expect(testUpdatePersonel(skills, obj)).toEqual(expectedResult);
})


it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<MuiThemeProvider><Skills url="etc" /></MuiThemeProvider>, div);
});