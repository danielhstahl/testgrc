import React, { Component } from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import SubmitButtonProgress from './SubmitProgress.js'
import axios from 'axios';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'; //temporary

const Checks=[
    {
        title:"Audit issues/regulatory findings",
        description:"Check for issues and findings from Audit or Regulators to assess impact on testwork"
    }
]

class SelectTesting extends Component {
    state={
        open:false
    }
    handleOpen = () => {
        this.setState({open: true});
    };

    handleClose = () => {
        this.setState({open: false});
    };
    render(){
        const {handleSubmit, isSubmitted, children}=this.props;
        const actions = [
            <FlatButton
                label="Cancel"
                primary={true}
                onTouchTap={this.handleClose}
            />,
            <FlatButton
                label="Submit"
                primary={true}
                keyboardFocused={true}
                onTouchTap={()=>{this.handleClose();handleSubmit();}}
            />,
        ];
        return(
            <div>
                {isSubmitted?
                    <RaisedButton primary label="Submitted!" onTouchTap={this.handleOpen} />:
                <RaisedButton label="Enter Testing Plan" onTouchTap={this.handleOpen} />}
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
const FourColHead=({first, second, third, fourth})=>
<Row>
    <Col xs={3} >
        <h3>{first}</h3>
    </Col>
    <Col xs={3}>
        <h3>{second}</h3>
    </Col>
    <Col xs={3}>
        <h3>{third}</h3>
    </Col>
    <Col xs={3}>
        <h3>{fourth}</h3>
    </Col>
</Row>
const FourColBody=({first, second, third, fourth,children})=>
<Row>
    <Col xs={3} >
        <p>{first}</p>
    </Col>
    <Col xs={3}>
        <p>{second}</p>
    </Col>
    <Col xs={3}>
        <p>{third}</p>
    </Col>
    <Col xs={3}>
        {children}
    </Col>
</Row>
const RiskTestExplanation=({risk, control, responsibility})=>
<div>
    <p>In testing this risk, consider the following:</p>
    <ul>
        <li>The risk is "{risk}"</li>
        <li>The control is "{control}"</li>
        <li>MRMV's responsibility for this risk and control is "{responsibility}"</li>
        <li>Testing may be excluded based off relevance or risk.  Excluded tests must have an explanation.</li>
    </ul>
</div>
class TestTypes extends Component {
    state={
        requiresExplanation:this.props.requiresExplanation
    }
    handleSelect=(v)=>{
        this.setState({
            requiresExplanation:this.props.testSelection.filter((val)=>val.index===v)[0].requiresExplanation
        });
    }
    render(){
        const {handleSelect, handleExplanation, selectedItem}=this.props;
        return(
        <div>
            <SelectField
                floatingLabelText="Select Test Type"
                value={selectedItem}
                onChange={(e, i, v)=>{handleSelect(v, this.props.testSelection.filter((val)=>val.index===v)[0].description);this.handleSelect(v)}}
            >
                {this.props.testSelection.map((val, index)=>{
                    return <MenuItem key={index} value={val.index} primaryText={val.description} />;
                })}
            </SelectField>
            {this.state.requiresExplanation?<TextField 
                defaultValue={this.props.requiresExplanation}
                floatingLabelText="Explanation for Lack of Testing"
                onChange={(e,v)=>handleExplanation(v)}

            />:""}
        </div>
        )
    }
}
const TmpTable=({dataObj, columnTitles, height, title})=>{
    return (
    <Table selectable={false} height={height?height:"inherit"}>
      <TableHeader displaySelectAll={false} adjustForCheckbox={false}>
         {title?<TableRow>
          <TableHeaderColumn colSpan={columnTitles.length}  style={{textAlign: 'center'}}>
            {title}
          </TableHeaderColumn>
        </TableRow>:""}
        <TableRow>
          {columnTitles.map((val, index)=>{
            return <TableHeaderColumn key={index}>{val}</TableHeaderColumn>
          })}
        </TableRow>
      </TableHeader>
      <TableBody displayRowCheckbox={false}>
        {dataObj.map((val, index)=>{
          return(
            <TableRow key={index}>
              {columnTitles.map((keys, index)=>{
                return <TableRowColumn key={index}>{val[keys]}</TableRowColumn>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
    )
}
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
export class Scope extends Component {
    state={
        mrmvPlanning:[],
        testSelection:[],
        openFinalScope:false //this is temporary, for expository purposes
    }
    componentDidMount(){
        const {url}=this.props;
        axios.all([axios.get(`${url}/RCUS`), axios.get(`${url}/scopeAssessment`)]).then(axios.spread((rcus, scope)=>{
            console.log(rcus);
            console.log(scope);
            this.setState({
                mrmvPlanning:rcus.data.map((val)=>{
                const result=scope.data.find((scopeVal)=>scopeVal.processStep===val.processStep&&scopeVal.riskStep===val.riskStep)
                return result?result:val;
            })});
        }))
        axios.get(`${url}/testSelection`).then((response)=>this.setState({testSelection:response.data})).catch((err)=>console.log(err));
    }
    handleTestSubmit=(i)=>{
        this.setState((prevState, props)=>{
            prevState.mrmvPlanning[i].isSubmitted=true;
            axios.post(`${this.props.url}/handleTestSubmit`, prevState.mrmvPlanning[i]).then((response)=>console.log(response)).catch((err)=>console.log(err))
            return prevState;
        })
    }
    handleExplanation=(i, v)=>{
        this.setState((prevState, props)=>{
            prevState.mrmvPlanning[i].explanation=v;
            return prevState;
        })
    }
    handleSelect=(i, index, value)=>{
        this.setState((prevState, props)=>{
            prevState.mrmvPlanning[i].testWork=index;
            prevState.mrmvPlanning[i].testWorkDescription=value;
            return prevState;
        })
    }
    handleCloseFinalScope=(v)=>{
        this.setState({
            openFinalScope:false
        })
    }
    handleOpenFinalScope=(v)=>{
        this.setState((prevState, props)=>{
            prevState.openFinalScope=true;
            prevState.filteredData=prevState.mrmvPlanning.concat().sort((a, b)=>a.workpaper<b.workpaper?-1:1);
            return prevState;
        });
    }
    render(){
        return <Container>
            <FourColHead first="Process" second="Risk" third="Control (if any)" fourth="MRMV Testing"/>
            {this.state.mrmvPlanning.map((val, index)=>{
                return <FourColBody key={index} first={val.process} second={val.risk} third={val.controls}>
                    <SelectTesting isSubmitted={val.isSubmitted}  handleSubmit={()=>this.handleTestSubmit(index)}>
                        <RiskTestExplanation responsibility={val.MRMVResponsibility} risk={val.risk} control={val.controls}/>
                        <TestTypes 
                            testSelection={this.state.testSelection}
                            requiresExplanation={val.explanation} 
                            selectedItem={val.testWork} 
                            handleExplanation={(v)=>this.handleExplanation(index, v)} 
                            handleSelect={(i, v)=>this.handleSelect(index, i, v)}
                        />
                    </SelectTesting>
                </FourColBody>
            })}
            <RaisedButton label="View final scope" onTouchTap={(e, v)=>this.handleOpenFinalScope(v)}/>
            <Dialog
                contentStyle={customContentStyle}
                title="Final Scope"
                modal={false}
                open={this.state.openFinalScope}
                onRequestClose={this.handleCloseFinalScope}
            >
                <TmpTable dataObj={this.state.filteredData} columnTitles={["workpaper", "risk", "controls", "testWorkDescription", "explanation"]} height="500px"/>
            </Dialog>
        </Container>
    }
}