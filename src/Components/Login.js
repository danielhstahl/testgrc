import React, {Component} from 'react';
import Paper from 'material-ui/Paper'
import TextField from 'material-ui/TextField'
import {Container} from 'react-grid-system'
import RaisedButton from 'material-ui/RaisedButton'
const paperStyle={maxWidth:500, margin:"0 auto"}
const formStyle={padding:50}
const containerStyle={marginTop:50}
export default class Login extends Component {
    state={
        user:"",
        password:""
    }
    handleLoginWrapper=(e)=>{
        e.preventDefault();
        const {user, password}=this.state;
        this.props.handleLogin(user, password);
    }
    handleUser=(e, user)=>{
        this.setState({user})
    }
    handlePassword=(e, password)=>{
        this.setState({password})
    }
    render(){
        const {user}=this.props;
        return(
            <Container style={containerStyle}>
                <Paper zDepth={2} style={paperStyle}>
                    <form onSubmit={this.handleLoginWrapper} style={formStyle}>
                        {user.err?<h4>Login Failed!</h4>:null}
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
                        <br/>
                        <RaisedButton primary label="Login" type="submit"/>
                    </form>
                </Paper>
            </Container>
        )
       
    }
}
