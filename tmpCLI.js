const prompt=require('prompt')
const userAttributes=require('./userAttributes')
const schema = {
    properties: {
        username: {
            required: true
        },
        password: {
            hidden: true
        }
    }
};
prompt.start();
prompt.get(schema, (err, results)=>{
    userAttributes.authenticate(results.username, results.password, (err, user)=>{
       // console.log(user);
        /*if(ad===null){
            return console.log(user);
        }*/
        //console.log(username);
        //userAttributes.genericQuery(ad, `CN=*Stahl*`)
        //userAttributes.getUser(ad, username);
       // userAttributes.findAllGroups(ad, user.sAMAccountName);
        //userAttributes.getUsersForGroup(ad, 'MVGMembers')
        //userAttributes.genericQuery(ad, '(&(objectCategory=computer)(memberOf=CN=ML_QRMAudit,OU=Restricted Groups,DC=corp,DC=rgbk,DC=com))')
        /*userAttributes.isUserMemberOfMRMV(ad, user.userPrincipalName, (isMember)=>{
            console.log(isMember);
        });*/

    })
})