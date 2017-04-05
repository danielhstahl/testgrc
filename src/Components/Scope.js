import React from 'react';
import {Container} from 'react-grid-system';

import ScopeDisplay from './ScopeDisplay'
import SelectAndEnter from './SelectAndEnter'

import {FourColHead} from './ScopeUtils'

const tableStyle={marginLeft:0, marginRight:0};



const Scope =({mrmvPlanning, rawTestSelection, handleTestSubmit, maxHeight=500})=> {
    return <Container>
        <div style={{maxHeight:maxHeight, overflowY:"auto"}}>
        <FourColHead style={tableStyle} first="Process" second="Risk" third="Control (if any)" fourth="MRMV Testing"/>
        {mrmvPlanning.map((rcusItem, rcusIndex)=>{
            return <SelectAndEnter tableStyle={tableStyle} key={rcusIndex} rcusItem={rcusItem} rawTestSelection={rawTestSelection} handleTestSubmit={handleTestSubmit}/>
        })}
        </div>
        <ScopeDisplay mrmvPlanning={mrmvPlanning} rawTestSelection={rawTestSelection}/>
    </Container>
}
Scope.propTypes={
    mrmvPlanning:React.PropTypes.arrayOf(React.PropTypes.shape({
        process:React.PropTypes.string.isRequired,
        risk:React.PropTypes.string.isRequired,
        processStep:React.PropTypes.number.isRequired,
        riskStep:React.PropTypes.number.isRequired,
        controls:React.PropTypes.string.isRequired,
        workpaper:React.PropTypes.number.isRequired,
        MRMVResponsibility:React.PropTypes.string.isRequired
    })),
    rawTestSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
        index:React.PropTypes.number.isRequired,
        description:React.PropTypes.string.isRequired
    })),
    handleTestSubmit:React.PropTypes.func.isRequired,
    maxHeight:React.PropTypes.number
}
export default Scope