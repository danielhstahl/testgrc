import React, { Component } from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'; 
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import pure from 'recompose/pure';
import {filterAndSortPlan} from '../scopeHelpers'
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
const defaultHeight="500px"
const DisplayTable=pure(({dataObj, columnTitles, height, title})=>{
    const tableKeys=dataObj.length>0?Object.keys(dataObj[0]):[];
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
              {tableKeys.map((keys, index)=>{
                return <TableRowColumn key={index}>{val[keys]}</TableRowColumn>
              })}
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
    )
})
/*DisplayTable.propTypes={
    dataObj:React.PropTypes.arrayOf(React.PropTypes.shape({
        risk:React.PropTypes.string.isRequired,
        controls:React.PropTypes.string.isRequired,
        workpaper:React.PropTypes.number.isRequired,
        explanation:React.PropTypes.string.isRequired,
        testWorkDescription:React.PropTypes.string.isRequired
    })).isRequired, 
    columnTitles:React.PropTypes.arrayOf(React.PropTypes.string), 
    height:React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string]),
    title:React.PropTypes.string
}*/
class ScopeDisplay extends Component {
    state={
        openFinalScope:false,
    }
    handleCloseFinalScope=(v)=>{
        this.setState({
            openFinalScope:false
        })
    }
    shouldComponentUpdate(nextProps, nextState){
        return nextProps.mrmvPlanning!==this.props.mrmvPlanning
    }
    handleOpenFinalScope=(v)=>{
        this.setState({
            openFinalScope:true
        })
    }
    render(){
        const {mrmvPlanning, height, rawTestSelection}=this.props;
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
                    {openFinalScope?<DisplayTable dataObj={filterAndSortPlan(mrmvPlanning, rawTestSelection)} columnTitles={["workpaper", "risk", "controls", "testwork", "explanation"]} height={height?height:defaultHeight}/>:null}
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
    })).isRequired,
    rawTestSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
        index: React.PropTypes.number.isRequired,
        description: React.PropTypes.string.isRequired
    })).isRequired,
    height:React.PropTypes.oneOfType([React.PropTypes.number, React.PropTypes.string])
}
export default ScopeDisplay