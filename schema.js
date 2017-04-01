const grptools=require('graphql-tools');
const makeExecutableSchema=grptools.makeExecutableSchema;
const resolvers=require('./resolvers')
const typeDefs = `
type RcusElement {
    process:String!
    risk:String!
    processStep:Int!
    riskStep:Int!
    controls:String!
    workpaper:Int!,
    MRMVResponsibility:String!
}
type SkillElement{
    type:String!
    value:String!
}
type SkillPerValidation{
    validationId:String!
    type:String!
    value:String!
}
type Associate{
    name:String!
    id:String!
    skills:[String]!
}
type AssociatePerValidation{
    validationId:String!
    id:String!
    requiredSkills:[String]!
} 
type Test{
    index:Int!
    description:String!
}
type RcusInstance{
    processStep:Int!
    riskStep:Int!
    explanation:String
    testWorkIndex:Int!
}
# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   rcus: [RcusElement]    # "[]" means this is a list 
   skills:[SkillElement]
   availablePersonel:[Associate]
   testSelection:[Test]
   scopeAssessment(validationId:String!):[RcusInstance]
   selectedSkills(validationId:String!):[SkillPerValidation]
   skillAssessment(validationId:String!):[AssociatePerValidation]
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new element
  addRcusToValidation(
      processStep: Int!
      riskStep: Int!
      explanation:String
      testWorkIndex:Int!
  ): RcusInstance
  updateRcusToValidation(
      processStep: Int!
      riskStep: Int!
      explanation:String
      testWorkIndex:Int!
  ):RcusInstance
  addSkillToValidation(
      validationId:String!
      type:String!
      value:String!
  ): SkillPerValidation
  removeSkillFromValidation(
      validationId:String!
      type:String!
  ): Boolean
  addAssociateToValidation(
      validationId:String!
      id:String!
      requiredSkills:[String]!
  ): AssociatePerValidation
  removeAssociateFromValidation(
      validationId:String!
      id:String!
  ): Boolean

}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
//addMockFunctionsToSchema({ schema });
module.exports=schema;