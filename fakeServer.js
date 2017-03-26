const express = require('express');
const bodyParser=require('body-parser');
const {RCUS, skills, availablePersonel, testSelection} =require('./tmpData.js')
const jsonParser = bodyParser.json();
let app = express();
app.use(bodyParser.json());
app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

let port = process.env.PORT || 3001;
let scopeData=[];
let skillData=[];
app.get("/currentAssociates", (req, res)=>{
    res.send(availablePersonel)
})
app.get("/skills", (req, res)=>{
    res.send(skills)
})
app.get("/RCUS", (req, res)=>{
    res.send(RCUS)
})
app.get("/testSelection", (req, res)=>{
    res.send(testSelection)
})
app.get("/skillAssessment", (req, res)=>{
    res.send(skillData);
})
app.get("/scopeAssessment", (req, res)=>{
    res.send(scopeData);
})

app.post("/handleTestSubmit",  (req, res)=>{
    console.log(req.body);
    scopeData.push(req.body);
    res.sendStatus(200);
})

app.post("/handleAddTeamMember",  (req, res)=>{
    console.log(req.body);
    skillData=req.body;
    res.sendStatus(200);
})

app.listen(port);

