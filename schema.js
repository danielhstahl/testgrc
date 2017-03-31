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
type Associate{
    name:String!
    id:String!
    skills:[String]!
}
type AssociatePerValidation{
    validationId:String!
    id:String!
    numberOfRequiredSkills:Int!
    requiredSkills:[String]!
    selectedForTeam:Boolean!
} 
type Test{
    index:Int!
    description:String!
}

# This type specifies the entry points into our API. In this case
# there is only one - "channels" - which returns a list of channels.
type Query {
   rcus: [RcusElement]    # "[]" means this is a list of channels
}

# The mutation root type, used to define all mutations.
type Mutation {
  # A mutation to add a new channel to the list of channels
  addChannel(name: String!): Channel
}
`;
const schema = makeExecutableSchema({ typeDefs, resolvers });
//addMockFunctionsToSchema({ schema });
module.exports=schema;