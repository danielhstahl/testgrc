import React, { Component } from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
export default class SelectTesting extends Component {
    state={
        open:false
    }
    handleOpen = () => {
        this.setState({open: true});
    };
    handleClose = () => {
        this.setState({open: false});
    };
    shouldComponentUpdate(nextProps){
        return nextProps.isSubmitted!==this.props.isSubmitted||nextProps.notAllowedToSubmit!==this.props.notAllowedToSubmit
    }
    render(){
        const {handleSubmit, isSubmitted, children, notAllowedToSubmit}=this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <RaisedButton
                label="Submit"
                primary={true}
                disabled={notAllowedToSubmit}
                onTouchTap={()=>{this.handleClose();handleSubmit();}}
            />,
        ];
        return(
            <div >
                {isSubmitted?
                    <RaisedButton  primary label="Submitted!" onTouchTap={this.handleOpen} />:
                <RaisedButton  label="Enter Plan" onTouchTap={this.handleOpen} />}
                <Dialog
                    title="Testing Plan"
                    actions={actions}
                    modal={false}
                    open={this.state.open}
                    onRequestClose={this.handleClose}
                    >
                    {children}
                </Dialog>
            </div>
        )
    }
}
SelectTesting.propTypes={
    handleSubmit:React.PropTypes.func.isRequired,
    isSubmitted:React.PropTypes.bool,
    children:React.PropTypes.node.isRequired, 
    notAllowedToSubmit:React.PropTypes.bool.isRequired
}