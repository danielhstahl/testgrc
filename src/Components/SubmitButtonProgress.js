import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';
export default class SubmitButtonProgress extends Component{
  state={
    err:"",
    success:"",
    waitingResponse:false
  }
  submit=()=>{
    const {handleSubmit}=this.props;
    const msToWait=3000;
    this.setState({waitingResponse:true});
    handleSubmit((err, res)=>{
      if(err){
        this.setState({
          err:"Error!",
          success:"",
          waitingResponse:false
        }, ()=>{
          setTimeout(()=>{
            this.setState({
              err:""
            })
          }, msToWait)
        })
      }
      else{
        this.setState({
          success:"Success!",
          err:"",
          waitingResponse:false
        }, ()=>{
          setTimeout(()=>{
            this.setState({
              success:""
            })
          }, msToWait)
        })
      }
    })
  }
  render(){
    const {success, err, waitingResponse}=this.state;
    return(
      err?<RaisedButton secondary onTouchTap={this.submit} label={err}/>:
      success?<RaisedButton primary onTouchTap={this.submit} label={success}/>:
      waitingResponse?<CircularProgress/>:<RaisedButton primary onTouchTap={this.submit} label="Submit"/>
    )
  }
}
SubmitButtonProgress.propTypes={
  handleSubmit:React.PropTypes.func.isRequired
}