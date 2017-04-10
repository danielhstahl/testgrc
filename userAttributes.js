'use strict'
const AD = require('activedirectory2').promiseWrapper;
const config = { url: 'ldap://corp.rgbk.com',
               baseDN: 'dc=domain,dc=com'}


const customParser=function(entry, raw, callback){
    console.log(entry)
    if (raw.hasOwnProperty("thumbnailPhoto")){
        console.log(raw)
        entry.thumbnailPhoto = raw.thumbnailPhoto;
    }
    //callback(entry)
}

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
        //console.log(auth)
        if(!auth){
            throw new Error("Login Failed")
        }

        

        const authConfig={baseDN:domainPartition, url: 'ldap://corp.rgbk.com',username, password, attributes:{
            user: [
                'dn', 'distinguishedName',
                'userPrincipalName', 'sAMAccountName', 'mail',
                'lockoutTime', 'whenCreated', 'pwdLastSet', 'userAccountControl',
                'employeeID', 'sn', 'givenName', 'initials', 'cn', 'displayName',
                'comment', 'description', 'thumbnailPhoto'
            ],
                
        }}

        //authConfig.entryParser=
        ad=new AD(authConfig);
        return ad.findUser(customParser, userid)
    }).then((userObject)=>{
        user=userObject;
        return ad.isUserMemberOf(userid, 'MVGMembers')
    }).then((isWithMRMV)=>{
        user.userType=isWithMRMV?"MRMVAnalyst":"";
        //user.thumbnailPhoto=new Buffer(user.thumbnailPhoto, 'ascii').toString('base64')
        //console.log(user.thumbnailPhoto)
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