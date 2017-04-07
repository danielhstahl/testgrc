'use strict'
const timeAllowedLogin=86400000;
const uuidV4=require('uuid/v4')
let sessions={}
const getFromSession=(id)=>sessions[id]

const removeFromSession=(id)=>{
    sessions[id]=null
    delete sessions[id]
}
const addToSession=(hashPassword)=>{
    const id=uuidV4()
    sessions[id]=hashPassword
    setTimeout(()=>removeFromSession(id), timeAllowedLogin)
    return id;
}

module.exports.addToSession=addToSession
module.exports.removeFromSession=removeFromSession
module.exports.getFromSession=getFromSession