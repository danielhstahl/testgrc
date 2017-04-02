import React from 'react';
import {Container} from 'react-grid-system';
import {leftjoin} from './../helperFunctions.js'
import ScopeDisplay from './ScopeDisplay'
import SelectAndEnter from './SelectAndEnter'
import {joinHelper, mergeHelper} from '../scopeHelpers'
import {FourColHead} from './ScopeUtils'
/*const Checks=[
    {
        title:"Audit issues/regulatory findings",
        description:"Check for issues and findings from Audit or Regulators to assess impact on testwork"
    }
]*/

const tableStyle={marginLeft:0, marginRight:0};

const computePlan=(rawRCUS, plans)=>{
    return leftjoin(rawRCUS, plans, joinHelper, mergeHelper);
}

const Scope =({rawRCUS, plans, rawTestSelection, handleTestSubmit, maxHeight=500})=> {
    const mrmvPlanning=computePlan(rawRCUS, plans, rawTestSelection)
    return <Container>
        <div style={{maxHeight:maxHeight, overflowY:"auto"}}>
        <FourColHead style={tableStyle} first="Process" second="Risk" third="Control (if any)" fourth="MRMV Testing"/>
        {mrmvPlanning.map((rcusItem, rcusIndex)=>{
            return <SelectAndEnter tableStyle={tableStyle} key={rcusIndex} rcusItem={rcusItem} rawTestSelection={rawTestSelection} handleTestSubmit={handleTestSubmit}/>
        })}
        </div>
        <ScopeDisplay mrmvPlanning={mrmvPlanning}/>
    </Container>
}
Scope.propTypes={
    rawRCUS:React.PropTypes.arrayOf(React.PropTypes.shape({
        process:React.PropTypes.string.isRequired,
        risk:React.PropTypes.string.isRequired,
        processStep:React.PropTypes.number.isRequired,
        riskStep:React.PropTypes.number.isRequired,
        controls:React.PropTypes.string.isRequired,
        workpaper:React.PropTypes.number.isRequired,
        MRMVResponsibility:React.PropTypes.string.isRequired
    })),
    plans:React.PropTypes.arrayOf(React.PropTypes.shape({
        processStep:React.PropTypes.number.isRequired,
        riskStep:React.PropTypes.number.isRequired,
        explanation:React.PropTypes.string.isRequired,
        testWork:React.PropTypes.number.isRequired
    })),
    rawTestSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
        index:React.PropTypes.number.isRequired,
        description:React.PropTypes.string.isRequired
    })),
    handleTestSubmit:React.PropTypes.func.isRequired,
    maxHeight:React.PropTypes.number
}
export default Scope