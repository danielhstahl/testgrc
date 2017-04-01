const data =require('./tmpData.js');
const RCUS=data.RCUS, skills=data.skills, availablePersonel=data.availablePersonel, testSelection=data.testSelection;
let scopeData=[];
let skillData=[];
let selectedSkills=[];
const resolvers = {
    Query: {
        rcus: () => {
            return RCUS;
        },
        skills:()=>{
            return skills
        },
        availablePersonel:()=>{
            return availablePersonel
        },
        testSelection:()=>{
            return testSelection
        },
        scopeAssessment:(root, args)=>{
            return scopeData.filter((val)=>val.validationId===args.validationId)
        },
        selectedSkills:(root, args)=>{
            return selectedSkills.filter((val)=>val.validationId===args.validationId)
        },
        skillAssessment:(root, args)=>{
            return skillData.filter((val)=>val.validationId===args.validationId)
        }
    },
    Mutation: {
        addRcusToValidation: (root, args) => {
            const newRcusElement = { 
                processStep: args.processStep, 
                riskStep: args.riskStep,
                explanation: args.explanation,
                testWorkIndex: args.testWorkIndex,
            };
            scopeData.push(newRcusElement);
            return newRcusElement;
        },
        updateRcusToValidation: (root, args) => {
            const newRcusElement = { 
                processStep: args.processStep, 
                riskStep: args.riskStep,
                explanation: args.explanation,
                testWorkIndex: args.testWorkIndex,
            };
            scopeData.filter((val)=>{
                return val.riskStep===args.riskStep&&val.processStep===args.processStep
            })[0]=newRcusElement;
            return newRcusElement;
        },
        addSkillToValidation:(root, args)=>{
            const newSkill={
                validationId:args.validationId,
                type:args.type,
                value:args.value
            }
            selectedSkills.push(newSkill);
            return newSkill;
        },
        removeSkillFromValidation:(root, args)=>{
            selectedSkills=selectedSkills.filter((val)=>{
                return val.validationId!==args.validationId&&val.type!==args.type
            });
            return true;
        },
        addAssociateToValidation:(root, args)=>{
            const newAssociate={
                validationId:args.validationId,
                id:args.id,
                requiredSkills:args.requiredSkills
            }
            skillData.push(newAssociate);
            return newAssociate;
        },
        removeAssociateFromValidation:(root, args)=>{
            skillData=skillData.filter((val)=>{
                return val.validationId!==args.validationId&&val.id!==args.id
            });
            return true;
        }
    },
};
module.exports=resolvers;