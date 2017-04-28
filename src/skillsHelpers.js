import {leftjoin} from './helperFunctions.js';
export const whoFitsSkill=(skill="", rawAssociates=[{skills:[]}])=>{
    return rawAssociates.filter((val, index)=>val.skills.filter((v)=>v===skill).length>0);
}
export const getSkillsByAssociate=(skills=[], rawAssociates=[{cn:"", id:"", skills:[""]}])=>{
    return rawAssociates.map((person, index)=>{
        const requiredSkills=skills.filter((skill)=>person.skills.filter((personSkill)=>skill===personSkill)[0]);
        return {cn:person.cn, requiredSkills:requiredSkills, skills:person.skills, id:person.id};
    })
}

export const getUniqueArray=Array.from?(array)=>[...new Set(array)]:(array)=>array.sort().filter((val, index, arr)=>!index||val!==arr[index-1])//ensure unique values

export const sortSkillsByAssociate=(updatedSkills=[""], rawAssociates=[{cn:"", id:"", skills:[""]}])=>{
    const updatedPersonel=getSkillsByAssociate(updatedSkills, rawAssociates);
    updatedPersonel.sort((a, b)=>a.requiredSkills.length>b.requiredSkills.length?-1:1);
    return updatedPersonel;
}
export const joinedAssociates=(skills=[""], rawAssociates=[{cn:"", id:"", skills:[""]}], validationAssociates=[{id:""/*, requiredSkills:[""]*/}])=>{
    return leftjoin(sortSkillsByAssociate(skills, rawAssociates), validationAssociates, (left, right)=>left.id===right.id, (left, right)=>right?{...left, selected:true}:{...left, selected:false});
}





