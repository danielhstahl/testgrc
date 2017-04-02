import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'; 
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
const DisplayTable=({dataObj, columnTitles, height, title})=>{
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
DisplayTable.propTypes={
    dataObj:React.PropTypes.arrayOf(React.PropTypes.shape({
        process:React.PropTypes.string.isRequired,
        risk:React.PropTypes.string.isRequired,
        processStep:React.PropTypes.number.isRequired,
        riskStep:React.PropTypes.number.isRequired,
        controls:React.PropTypes.string.isRequired,
        workpaper:React.PropTypes.number.isRequired,
        MRMVResponsibility:React.PropTypes.string.isRequired,
        explanation:React.PropTypes.string.isRequired,
        testWork:React.PropTypes.number,
        submitted:React.PropTypes.bool.isRequired
    })).isRequired, 
    columnTitles:React.PropTypes.arrayOf(React.PropTypes.string), height:React.PropTypes.number,
    title:React.PropTypes.string
}
export class ScopeDisplay extends Component {
    state={
        openFinalScope:false,
    }
    handleCloseFinalScope=(v)=>{
        this.setState({
            openFinalScope:false
        })
    }
    handleOpenFinalScope=(v)=>{
        this.setState({
            openFinalScope:true
        })
    }
    render(){
        const {mrmvPlanning}=this.props;
        const {openFinalScope}=this.state;
        return(
            <div>
                <RaisedButton label="View final scope" onTouchTap={(e, v)=>this.handleOpenFinalScope(v)}/>
                <Dialog
                    contentStyle={customContentStyle}
                    title="Final Scope"
                    modal={false}
                    open={openFinalScope}
                    onRequestClose={this.handleCloseFinalScope}
                >
                    <DisplayTable dataObj={mrmvPlanning.concat().sort((a, b)=>a.workpaper<b.workpaper?-1:1)} columnTitles={["workpaper", "risk", "controls", "testWorkDescription", "explanation"]} height="500px"/>
                </Dialog>
            </div>
        )
    }
}
ScopeDisplay.propTypes={
    mrmvPlanning:React.PropTypes.arrayOf(React.PropTypes.shape({
        process:React.PropTypes.string.isRequired,
        risk:React.PropTypes.string.isRequired,
        processStep:React.PropTypes.number.isRequired,
        riskStep:React.PropTypes.number.isRequired,
        controls:React.PropTypes.string.isRequired,
        workpaper:React.PropTypes.number.isRequired,
        MRMVResponsibility:React.PropTypes.string.isRequired,
        explanation:React.PropTypes.string.isRequired,
        testWork:React.PropTypes.number,
        submitted:React.PropTypes.bool.isRequired
    })).isRequired
}