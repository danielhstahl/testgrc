'use strict';
const express = require('express');
const bodyParser=require('body-parser');
const data =require('./tmpData.js');
const RCUS=data.RCUS, skills=data.skills, availablePersonel=data.availablePersonel, testSelection=data.testSelection;
const jsonParser = bodyParser.json();
let app = express();
app.use(bodyParser.json());
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
const pg=require('pg');
const config={
    user:'gvjnbkho',
    database:'gvjnbkho',
    password:'ANxXJwEDc_RPPEFea3NbhP1EGYO-J4oy',
    host:'stampy.db.elephantsql.com',
    port:5432,
    max:10,
    idleTimeoutMillis: 30000
}
const pool = new pg.Pool(config);
pool.on('error', (err, client)=>{
    console.log(err);
})


const validationId=1;


let port = process.env.PORT || 3001;
let scopeData=[];
let skillData=[];
let selectedSkills=[];
app.get("/currentAssociates", (req, res)=>{ 
    pool.query("SELECT * FROM associateskills;", (err, result)=>{
        if(err){
            return console.log(err);
        }
        res.send(transformNormalizedToKey(result.rows))
    })
})
app.get("/skills", (req, res)=>{//these are "static"
    pool.query("SELECT category as type, skill as value FROM skills;", (err, result)=>{
        if(err){
            return console.log(err);
        }
        res.send(result.rows)
    })
    //res.send(skills)
})
app.get("/RCUS", (req, res)=>{//these are "static"
    res.send(RCUS)
})
app.get("/testSelection", (req, res)=>{//these are "static"
    res.send(testSelection)
})
app.get("/skillAssessment", (req, res)=>{//in final state use validation id.  This is the "instantiated" version of "currentAssociates"
    console.log(req.query);
    pool.query("SELECT id FROM ValidationAssociates WHERE validationId=$1 AND include=True;", [req.query.validationId], (err, result)=>{
        if(err){
            return console.log(err);
        }
        res.send(result.rows)
    })
    //res.send(skillData);
})
app.get("/scopeAssessment", (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
    res.send(scopeData);
})
app.get("/selectedSkills", (req, res)=>{ //in final state use validation id.  This is the "instantiated" version of "RCUS"
    console.log(req.query);
    res.send(selectedSkills);
})

app.post("/handlePlanSubmit",  (req, res)=>{ //in final state use validation id
    console.log(req.body);
    scopeData=req.body.plan;
    res.sendStatus(200);
    
})
app.post("/handleAddTeamMember",  (req, res)=>{ //in final state use validation id
    //skillData=req.body;
    const id=req.body.id;
    const include=req.body.include;
    const validationId=req.body.validationId;
    const sql=`insert into ValidationAssociates (validationId, id, include)  values ($1, $2, $3)
    on conflict (validationId, id)
    do update set (include) = ($3)
    where ValidationAssociates.validationID = $1 AND ValidationAssociates.id=$2;`
    pool.query(sql, [validationId,id, include], (err, result)=>{
        console.log(err)
        console.log(result)
        res.sendStatus(200);
    })
})
app.post("/handleAddSkill",  (req, res)=>{ //in final state use validation id
    selectedSkills=req.body.skill;
    res.sendStatus(200);
})
app.listen(port);

