'use strict'
const AD = require('activedirectory2');
const config = { url: 'ldap://corp.rgbk.com',
               baseDN: 'dc=domain,dc=com'}
const authenticate=(user, password, cb)=>{
    const username=`CORP\\${user}`;
    let ad = new AD(config);
    ad.getRootDSE(function(err, result) {
        const defaultDN=result.defaultNamingContext
        const domainPartition=result.namingContexts[2];
        ad.authenticate(username, password, (err, auth)=>{
            if(!err&&auth){
                ad=new AD(Object.assign({}, config, {baseDN:domainPartition, username, password}));
                ad.findUser(user, (err, user)=>{
                    return cb(ad, user)
                })
            }
            else{
                return cb(null, "Login Failed");
            }
            
        })
    });
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