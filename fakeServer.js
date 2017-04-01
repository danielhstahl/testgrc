'use strict';
const express = require('express');
const bodyParser=require('body-parser');
const cors=require('cors');
const graphExpress=require('graphql-server-express')
const graphqlExpress=graphExpress.graphqlExpress
const graphiqlExpress=graphExpress.graphiqlExpress
const schema =require('./schema.js');

const jsonParser = bodyParser.json();
let app = express();
app.use(bodyParser.json());
app.use('*', cors({origin:'http://localhost:3000'}));
app.use('/graphql',jsonParser, graphqlExpress({
  schema
}));
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql'
}));


let port = process.env.PORT || 3001;
/*let scopeData=[];
let skillData=[];
let selectedSkills=[];
app.get("/currentAssociates", (req, res)=>{ 
    res.send(availablePersonel)
})
app.get("/skills", (req, res)=>{//these are "static"
    res.send(skills)
})
app.get("/RCUS", (req, res)=>{//these are "static"
    res.send(RCUS)
})
app.get("/testSelection", (req, res)=>{//these are "static"
    res.send(testSelection)
})
app.get("/skillAssessment", (req, res)=>{//in final state use validation id.  This is the "instantiated" version of "currentAssociates"
    res.send(skillData);
})
app.get("/scopeAssessment", (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
    res.send(scopeData);
})
app.get("/selectedSkills", (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
    res.send(selectedSkills);
})

app.post("/handleTestSubmit",  (req, res)=>{ //in final state use validation id
    scopeData=req.body;
    res.sendStatus(200);
})
app.post("/handleAddTeamMember",  (req, res)=>{ //in final state use validation id
    skillData=req.body;
    res.sendStatus(200);
})
app.post("/handleSelect",  (req, res)=>{ //in final state use validation id
    selectedSkills=req.body;
    res.sendStatus(200);
})*/
app.listen(port);

