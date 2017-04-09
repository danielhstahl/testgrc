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
        handleOpen:({updateOpen})=>()=>updateOpen(true),
        handleClose:({updateOpen, onClose})=>()=>{
            updateOpen(false)
            onClose?onClose():""
        }
    }),
    onlyUpdateForKeys(['isSubmitted', 'notAllowedToSubmit', 'open', 'children']),
    setPropTypes({
        handleSubmit:React.PropTypes.func.isRequired,
        isSubmitted:React.PropTypes.bool,
        children:React.PropTypes.node.isRequired, 
        notAllowedToSubmit:React.PropTypes.bool.isRequired,
        open:React.PropTypes.bool.isRequired,
        handleOpen:React.PropTypes.func.isRequired,
        handleClose:React.PropTypes.func.isRequired,
        onClose:React.PropTypes.func
    })
)
const buttonHelper=(handleClose,  handleSubmit, notAllowedToSubmit)=>[
    <FlatButton
        label="Cancel"
        primary={true}
        onTouchTap={handleClose}
    />,
    <RaisedButton
        label="Submit"
        primary={true}
        disabled={notAllowedToSubmit}
        onTouchTap={()=>{
            handleClose();
            handleSubmit();
        }}
    />
];

const SelectTesting=enhance(({handleSubmit, isSubmitted, children, notAllowedToSubmit, open, handleOpen, handleClose, onClose})=>
<div>
    {isSubmitted?
        <RaisedButton  primary label="Submitted!" onTouchTap={handleOpen} />:
    <RaisedButton  label="Enter Plan" onTouchTap={handleOpen} />}
    <Dialog
        title="Testing Plan"
        actions={buttonHelper(handleClose,  handleSubmit, notAllowedToSubmit)}
        modal={false}
        open={open}
        onRequestClose={handleClose}
        >
        {children}
    </Dialog>
</div>
)
export default SelectTesting
