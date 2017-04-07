import React, { Component } from 'react';
import CircularProgress from 'material-ui/CircularProgress';
import RaisedButton from 'material-ui/RaisedButton';

import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';


const cb=(msToWait, updateErr, updateSuccess, updateResponse)=>{
  return (err, res)=>{
    if(err){
      updateErr("Error!")
      updateSuccess("")
      updateResponse(false)
      setTimeout(()=>{
        updateErr("")
      }, msToWait)
    }
    else{
      updateErr("")
      updateSuccess("Success!")
      updateResponse(false)
      setTimeout(()=>{
        updateSuccess("")
      }, msToWait)
    }
  }
}

const enhance=compose(
  withState('err', 'updateErr', ""),
  withState('success', 'updateSuccess', ""),
  withState('waitingForResponse', 'updateResponse', false),
  withHandlers({
    submit:({msToWait, handleSubmit, updateErr, updateSuccess, updateResponse})=>{
      updateResponse(true)
      handleSubmit(cb(msToWait, updateErr, updateSuccess, updateResponse))
    }
  }),
  onlyUpdateForKeys(['handleSubmit']),
  setPropTypes({
    handleSubmit:React.PropTypes.func.isRequired,
    err:React.PropTypes.string.isRequired,
    success:React.PropTypes.string.isRequired,
    waitingForResponse:React.PropTypes.bool.isRequired,
  })
)

const SubmitButtonProgress=enhance(({submit, err, success, waitingResponse})=>
    err?<RaisedButton secondary onTouchTap={submit} label={err}/>:
    success?<RaisedButton primary onTouchTap={submit} label={success}/>:
    waitingResponse?<CircularProgress/>:<RaisedButton primary onTouchTap={submit} label="Submit"/>
)
export default SubmitButtonProgress