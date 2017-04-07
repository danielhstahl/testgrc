'use strict';
const express = require('express');
const bodyParser=require('body-parser');
const cryptojs=require('crypto-js');
const SHA256 = require('crypto-js/SHA256');
const inRamDb=require('./inRamDb');
const addToSession=inRamDb.addToSession
const removeFromSession=inRamDb.removeFromSession
const getFromSession=inRamDb.getFromSession

const data =require('./tmpData.js');
const userAttributes=require('./userAttributes')
const sql=require('./fakeSql.js')
const uuidV4=require('uuid/v4')
const RCUS=data.RCUS, skills=data.skills, availablePersonel=data.availablePersonel, testSelection=data.testSelection;

const jsonParser = bodyParser.json();
let app = express();
app.use(bodyParser.json());
//const timeAllowedLogin=86400000;

app.use((req, res, next)=>{
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});
const transformNormalizedToKey=(associates)=>{
    associates.sort((a, b)=>a.id<b.id?-1:1);
    return associates.reduce((aggr, curr, index, arr)=>{
        const aggrLength=aggr.length;
        if(index>0&&arr[index-1].id===curr.id){
            aggr[aggrLength-1].skills.push(curr.skill)
        }
        else{
            aggr.push({name:`Name ${aggrLength+1}`, id:curr.id, skills:[curr.skill]})
        }
        return aggr
    }, [])
}

const port='3001';

app.get("/associates", (req, res)=>{ 
    sql.getAssociateSkills((err, result)=>{
        if(err){
            return console.log(err);
        }
        console.log("at line 37")
        res.send(transformNormalizedToKey(result))
    })
})
app.get("/skills", (req, res)=>{//these are "static"
    sql.getSkills((err, result)=>{
        if(err){
            return console.log(err);
        }
        console.log("at line 46")
        res.send(result)
    })
})
app.get('/checkLogin', (req, res)=>{
    console.log(req.query);
    res.send({hashPassword:getFromSession(req.query.sessionId)})
})
app.get("/RCUS", (req, res)=>{//these are "static"
    sql.getRcus((err, result)=>{
        res.send(result)
    })
})
app.get("/testSelection", (req, res)=>{//these are "static"
    sql.getTestSelection((err, result)=>{
        res.send(result)
    })
})
app.get("/validationAssociates", (req, res)=>{//in final state use validation id.  This is the "instantiated" version of "currentAssociates"
    sql.getValidationAssociates(req.query.validationId, (err, result)=>{
        if(err){
            return console.log(err);
        }
        res.send(result)
    })
})
app.get("/validationRcus", (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
    sql.getValidationRcus(req.query.validationId, (err, result)=>{
        if(err){
            return console.log(err);
        }
        res.send(result)
    })
})
app.get("/validationSkills", (req, res)=>{ 
    console.log(req.query)
    sql.getValidationSkills(req.query.validationId, (err, result)=>{
        if(err){
            return console.log(err);
        }
        console.log("at line 77")
        console.log(result);
        res.send(result)
    })
})

app.post("/writeValidationRcus",  (req, res)=>{ //in final state use validation id
    const obj=req.body;
    console.log(obj);
    sql.writeValidationRcus(obj.validationId, obj.testWork, obj.explanation, obj.processStep, obj.riskStep, (err, result)=>{
        if(err){
            return console.log(err);
        }
        res.sendStatus(200);
    })
    
    
})
app.post('/login', (req, res)=>{
    userAttributes.authenticate(req.body.user, req.body.password, (err, user)=>{
        if(!err){
            user.sessionId=addToSession(SHA256(req.body.password).toString(cryptojs.enc.Base64))
        }
        res.send({err, user})
    })
})
app.post("/writeValidationAssociate",  (req, res)=>{ //in final state use validation id
    //skillData=req.body;
    const id=req.body.id;
    const include=req.body.include;
    const validationId=req.body.validationId;
    sql.writeValidationAssociate(validationId, id, include, (err)=>{
        if(err){
            console.log(err)
        }
        res.sendStatus(200);
        
    })
})
app.post("/writeValidationSkill",  (req, res)=>{ //in final state use validation id
    //console.log(req.body);
    const skill=req.body.skill;
    const include=req.body.include;
    const validationId=req.body.validationId;
    sql.writeValidationSkill(validationId, skill, include, (err)=>{
        if(err){
            console.log(err)
        }
        res.sendStatus(200);
    })
})
app.listen(port);

