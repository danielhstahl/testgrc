const data =require('./tmpData.js');
const RCUS=data.RCUS, skills=data.skills, availablePersonel=data.availablePersonel, testSelection=data.testSelection;
let scopeData=[];
let skillData=[];
let selectedSkills=[];
const resolvers = {
  Query: {
    rcus: () => {
      return rcus;
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
    scopeAssessment:()=>{
        return scopeData
    },
    selectedSkills:()=>{
        return selectedSkills
    },
    skillAssessment:()=>{
        return skillData
    }
  },
  Mutation: {
    addChannel: (root, args) => {
      const newChannel = { id: nextId++, name: args.name };
      channels.push(newChannel);
      return newChannel;
    },
  },
};