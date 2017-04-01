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
import {FourColHead, FourColBody, RiskTestExplanation} from './ScopeUtils'
import EnterTestingPlan from './EnterTestingPlan'
import SelectTesting from './SelectTesting'
const Checks=[
    {
        title:"Audit issues/regulatory findings",
        description:"Check for issues and findings from Audit or Regulators to assess impact on testwork"
    }
]



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
                        <EnterTestingPlan 
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
Scope.propTypes={
    url:React.PropTypes.string.isRequired
}