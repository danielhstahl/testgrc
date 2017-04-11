import React from 'react';
import {Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn} from 'material-ui/Table'; 
import RaisedButton from 'material-ui/RaisedButton';
import Dialog from 'material-ui/Dialog';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {filterAndSortPlan} from '../scopeHelpers'
const customContentStyle = {
  width: '100%',
  maxWidth: 'none',
};
const buttonStyle={marginTop:20}
const defaultHeight="500px"
const enhanceTable=compose(
    pure,
    setPropTypes({
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
    })
)

const DisplayTable=enhanceTable(({dataObj, columnTitles, height, title})=>{
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

const enhance=compose(
    withState('openFinalScope', 'handleUpdate', false),
    onlyUpdateForKeys(['openFinalScope', 'mrmvPlanning']),
    withHandlers({
        handleCloseFinalScope:props=>v=>props.handleUpdate(false),
        handleOpenFinalScope:props=>v=>props.handleUpdate(true),
    }),
    setPropTypes({
        openFinalScope:React.PropTypes.bool.isRequired,
        handleCloseFinalScope:React.PropTypes.func.isRequired,
        handleOpenFinalScope:React.PropTypes.func.isRequired,
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
    })
)
const ScopeDisplay=enhance(({openFinalScope, handleCloseFinalScope, handleOpenFinalScope, mrmvPlanning, height, rawTestSelection})=>
<div style={buttonStyle}>
    <RaisedButton primary label="View final scope" onTouchTap={(e, v)=>handleOpenFinalScope(v)}/>
    <Dialog
        contentStyle={customContentStyle}
        title="Final Scope"
        modal={false}
        open={openFinalScope}
        onRequestClose={handleCloseFinalScope}
    >
        {openFinalScope?<DisplayTable dataObj={filterAndSortPlan(mrmvPlanning, rawTestSelection)} columnTitles={["workpaper", "risk", "controls", "testwork", "explanation"]} height={height?height:defaultHeight}/>:null}
    </Dialog>
</div>)
export default ScopeDisplay