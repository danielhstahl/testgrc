import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';


import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const enhance=compose(
    withState('open', 'updateOpen', false),
    withHandlers({
        handleOpen:({updateOpen})=>updateOpen(true),
        handleClose:({updateOpen})=>updateOpen(false)
    }),
    onlyUpdateForKeys(['isSubmitted', 'notAllowedToSubmit', 'open']),
    setPropTypes({
        handleSubmit:React.PropTypes.func.isRequired,
        isSubmitted:React.PropTypes.bool,
        children:React.PropTypes.node.isRequired, 
        notAllowedToSubmit:React.PropTypes.bool.isRequired,
        open:React.PropTypes.bool.isRequired,
        handleOpen:React.PropTypes.func.isRequired,
        handleClose:React.PropTypes.func.isRequired,
    })
)
const buttonHelper=(handleClose, handleSubmit, notAllowedToSubmit)=>[
    <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
    />,
    <RaisedButton
        label="Submit"
        primary={true}
        disabled={notAllowedToSubmit}
        onTouchTap={()=>{handleClose();handleSubmit();}}
    />
];

const SelectTesting=enhance(({handleSubmit, isSubmitted, children, notAllowedToSubmit, open, handleOpen, handleClose})=>
<div >
    {isSubmitted?
        <RaisedButton  primary label="Submitted!" onTouchTap={this.handleOpen} />:
    <RaisedButton  label="Enter Plan" onTouchTap={this.handleOpen} />}
    <Dialog
        title="Testing Plan"
        actions={buttonHelper(handleClose, handleOpen, notAllowedToSubmit)}
        modal={false}
        open={this.state.open}
        onRequestClose={this.handleClose}
        >
        {children}
    </Dialog>
</div>
)
export default SelectTesting
