'use strict'
const AD = require('activedirectory2').promiseWrapper;
const config = { url: 'ldap://corp.rgbk.com',
               baseDN: 'dc=domain,dc=com'}
const authenticate=(userid, password, cb)=>{
    const username=`CORP\\${userid}`;
    let ad = new AD(config);
    let domainPartition;
    let defaultDN;
    let user;
    ad.getRootDSE().then((dse)=>{
        defaultDN=dse.defaultNamingContext
        domainPartition=dse.namingContexts[2];
        return ad.authenticate(username, password);
    }).then((auth)=>{
        if(!auth){
            throw new Error("Login Failed")
        }
        ad=new AD(Object.assign({}, config, {baseDN:domainPartition, username, password}));
        return ad.findUser(userid)
    }).then((userObject)=>{
        user=userObject;
        return ad.isUserMemberOf(userid, 'MVGMembers')
    }).then((isWithMRMV)=>{
        user.userType=isWithMRMV?"MRMVAnalyst":"";
        return cb(null, user)
    }).catch((err)=>{
        //console.log(err.message)
        if(err.message==="getaddrinfo ENOTFOUND corp.rgbk.com corp.rgbk.com:389" && process.env.NODE_ENV !== 'production'){
            return cb(null, {cn:"Test Person", userType:"MRMVAnalyst"});
        }
        return cb(err, null);
    })
}

const genericQuery=(ad, query)=>{
    ad.find(query, (err, results)=>{
        console.log(err);
        console.log(results);
    })
}
const getUser=(ad, username)=>{
    ad.findUser(username, (err, user)=>{
        console.log(user);
    })
}
const findAllGroups=(ad, username)=>{
    ad.getGroupMembershipForUser(username, (err, groups)=>{
        console.log(groups);
    })
}
const isUserMemberOfMRMV=(ad, username, cb)=>{
    ad.isUserMemberOf(username, 'MVGMembers', (err, res)=>{
        cb(!(err||!res));
    })
}
const getUsersForGroup=(ad, group)=>{
    ad.getUsersForGroup(group, (err, users)=>{
        console.log(users);
    })
}
module.exports.authenticate=authenticate;
module.exports.getUser=getUser;
module.exports.findAllGroups=findAllGroups;
module.exports.isUserMemberOfMRMV=isUserMemberOfMRMV;
module.exports.genericQuery=genericQuery;
module.exports.getUsersForGroup=getUsersForGroup;