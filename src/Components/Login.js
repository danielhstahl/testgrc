import React from 'react';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import {Container} from 'react-grid-system'
import RaisedButton from 'material-ui/RaisedButton'

import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';


const paperStyle={maxWidth:500, margin:"0 auto"}
const formStyle={padding:50}
const containerStyle={marginTop:50}


const enhance=compose(
    withState('username', 'updateUser', ''),
    withState('password', 'updatePswd', ''),
    withHandlers({
        handleLoginWrapper:({username, password, handleLogin})=>e=>{
            e.preventDefault();
            handleLogin(username, password);
        },
        handleUser:({updateUser})=>(e, user)=>updateUser(user),
        handlePassword:({updatePswd})=>(e, password)=>updatePswd(password)
    }),
    onlyUpdateForKeys(['user', 'username', 'password']),
    setPropTypes({
        username:React.PropTypes.string.isRequired,
        user:React.PropTypes.object.isRequired,
        password:React.PropTypes.string.isRequired,
        handleLogin:React.PropTypes.func.isRequired,
        handleLoginWrapper:React.PropTypes.func.isRequired,
        handleUser:React.PropTypes.func.isRequired,
        handlePassword:React.PropTypes.func.isRequired,
    })
)


const Login=enhance(({user, username, password, handleLoginWrapper, handleUser, handlePassword})=>
<Container style={containerStyle}>
    <Paper zDepth={2} style={paperStyle}>
        <form onSubmit={handleLoginWrapper} style={formStyle}>
            {user.err?<h4>Login Failed!</h4>:null}
            <TextField                        
                floatingLabelText="username"
                onChange={handleUser}
            />
            <br/>
            <TextField                        
                floatingLabelText="password"
                type="password"
                onChange={handlePassword}
            />
            <br/>
            <RaisedButton primary label="Login" type="submit"/>
        </form>
    </Paper>
</Container>
)
export default Login
