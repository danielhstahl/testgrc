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
import {leftjoin} from './helperFunctions.js'
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'; //temporary
import {
  gql,
  graphql,
  compose
} from 'react-apollo';
const getRcus = gql`
   query Rcus {
     rcus {
        process
        risk
        processStep
        riskStep
        controls
        workpaper
        MRMVResponsibility
    }
   }
 `;
const getRcusValidation = gql`
   query RcusInstance($validationId:String!) {
     scopeAssessment(validationId:$validationId) {
       processStep
       riskStep
       explanation
       testWorkIndex
     }
   }
 `;




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
const FourColHead=({first, second, third, fourth, style})=>
<Row style={style}>
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
const FourColBody=({first, second, third, fourth,children, style})=>
<Row style={style}>
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
        const {handleSelect, handleExplanation, selectedItem, testSelection}=this.props;
        return(
        <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <SelectField
                        floatingLabelText="Select Test Type"
                        value={selectedItem}
                        onChange={(e, i, v)=>{handleSelect(v, testSelection.filter((val)=>val.index===v)[0].description);this.handleSelect(v)}}
                    >
                        {testSelection.map((val, index)=>{
                            return <MenuItem key={index} value={val.index} primaryText={val.description} />;
                        })}
                    </SelectField>
                </Col>
                <Col xs={12} sm={6}>
                    {this.state.requiresExplanation?<TextField 
                        defaultValue={this.props.requiresExplanation}
                        floatingLabelText="Explanation for Lack of Testing"
                        onChange={(e,v)=>handleExplanation(v)}
                    />:""}
                </Col>
            </Row>
        </Container>
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
const tableStyle={marginLeft:0, marginRight:0};
const isOkToSubmit=(item)=>{
    switch(item.testWorkDescription){
        case "None":
            return item.explanation?true:false
        case undefined:
            return false;
        default:
            return true;
    }
}
export let testOkToSubmit;
if(process.env.NODE_ENV==='test'){
    testOkToSubmit=isOkToSubmit;
}
export class Scope extends Component {
    state={
        mrmvPlanning:[],
        testSelection:[],
        openFinalScope:false //this is temporary, for expository purposes
    }
    componentDidMount(){
        const {url}=this.props;
        axios.all([axios.get(`${url}/RCUS`), axios.get(`${url}/scopeAssessment`)]).then(axios.spread((rcus, scope)=>{
            this.setState({
                mrmvPlanning:leftjoin(rcus.data, scope.data, (left, right)=>left.processStep===right.processStep&&left.riskStep===right.riskStep)
            });
        }))
        axios.get(`${url}/testSelection`).then((response)=>this.setState({testSelection:response.data})).catch((err)=>console.log(err));
    }
    handleTestSubmit=(i)=>{
        this.setState((prevState, props)=>{
            prevState.mrmvPlanning[i].isSubmitted=true;
            axios.post(`${props.url}/handleTestSubmit`, prevState.mrmvPlanning).then((response)=>console.log(response)).catch((err)=>console.log(err))
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
        const {mrmvPlanning, testSelection, openFinalScope, filteredData}=this.state;
        return <Container>
            <div style={{maxHeight:500, overflowY:"auto"}}>
            <FourColHead style={tableStyle} first="Process" second="Risk" third="Control (if any)" fourth="MRMV Testing"/>
            {mrmvPlanning.map((rcusItem, index)=>{
                return <FourColBody style={tableStyle} key={index} first={rcusItem.process} second={rcusItem.risk} third={rcusItem.controls}>
                    <SelectTesting notAllowedToSubmit={!isOkToSubmit(rcusItem)} isSubmitted={rcusItem.isSubmitted}  handleSubmit={()=>this.handleTestSubmit(index)}>
                        <RiskTestExplanation responsibility={rcusItem.MRMVResponsibility} risk={rcusItem.risk} control={rcusItem.controls}/>
                        <TestTypes 
                            testSelection={testSelection}
                            requiresExplanation={rcusItem.explanation} 
                            selectedItem={rcusItem.testWork} 
                            handleExplanation={(v)=>this.handleExplanation(index, v)} 
                            handleSelect={(i, v)=>this.handleSelect(index, i, v)}
                        />
                    </SelectTesting>
                </FourColBody>
            })}
            </div>
            <RaisedButton label="View final scope" onTouchTap={(e, v)=>this.handleOpenFinalScope(v)}/>
            <Dialog
                contentStyle={customContentStyle}
                title="Final Scope"
                modal={false}
                open={openFinalScope}
                onRequestClose={this.handleCloseFinalScope}
            >
                <TmpTable dataObj={filteredData} columnTitles={["workpaper", "risk", "controls", "testWorkDescription", "explanation"]} height="500px"/>
            </Dialog>
        </Container>
    }
}