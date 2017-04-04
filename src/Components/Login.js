import React from 'react';
import Paper from 'material-ui/paper'
import TextField from 'material-ui/TextField'
import RaisedButton from 'material-ui/RaisedButton'

export default class Login extends Component {
    state={
        user:"",
        password:""
    }
    handleLoginWrapper=(e)=>{
        e.preventDefault();
        return this.props.handleLogin(user, password);
    }
    handleUser=(user)=>{
        this.setState({user})
    }
    handlePassword=(password)=>{
        this.setState({password})
    }
    render(){
        return(
            <Paper zDepth={2}>
                <form onSubmit={this.handleLoginWrapper}>
                    <TextField                        
                        floatingLabelText="username"
                        onChange={this.handleUser}
                    />
                    <br/>
                    <TextField                        
                        floatingLabelText="password"
                        type="password"
                        onChange={this.handlePassword}
                    />
                    <RaisedButton primary label="Login" type="submit"/>
                </form>
            </Paper>
        )
       
    }
}
