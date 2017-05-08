import React from 'react';
import {Container} from 'react-grid-system';

import ScopeDisplay from './ScopeDisplay'
import SelectAndEnter from './SelectAndEnter'

import {ThreeColHead} from './ScopeUtils'
import ExpandingListItem from './ExpandingListItem'
import {joinHelper, mergeHelper} from '../scopeHelpers'
import {leftjoin} from './../helperFunctions.js'

const tableStyle={marginLeft:0, marginRight:0};
const computePlan=(rawRCUS, plans)=>{
    return leftjoin(rawRCUS, plans, joinHelper, mergeHelper).reduce((prev, curr)=>{
        const lastItem=prev.length-1;
        if(prev[lastItem]&&prev[lastItem].process===curr.process){
            prev[lastItem].risk_controls.push(curr)
        }
        else{
            prev.push({process:curr.process, risk_controls:[curr]});
        }
        return prev;
        }, []);
}
const bottomPadding={height:15};
const Scope =({rawRCUS, plans, rawTestSelection, handleTestSubmit, policyGroups})=> {
    const handleTestSubmitSubScope=plan=>handleTestSubmit(plan, policyGroups)
    const mrmvPlanning=computePlan(rawRCUS, plans)
    return <Container>
        
            {mrmvPlanning.map((process, index)=>{
                return <ExpandingListItem 
                    key={index}
                    primaryText={process.process}
                >
                    <ThreeColHead 
                        style={tableStyle} 
                        first="Risk" second="Control (if any)" third="MRMV Testing"
                    />
                    {process.risk_controls.map((rcusItem, rcusIndex)=>{
                        return <SelectAndEnter key={rcusIndex} tableStyle={tableStyle} rcusItem={rcusItem} rawTestSelection={rawTestSelection} handleTestSubmit={handleTestSubmitSubScope}/>
                    })}
                    
                </ExpandingListItem>
            })}

        <ScopeDisplay mrmvPlanning={mrmvPlanning} rawTestSelection={rawTestSelection}/>
        <div style={bottomPadding}/>
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
    })).isRequired,
    plans:React.PropTypes.arrayOf(React.PropTypes.shape({
        explanation:React.PropTypes.string,
        processStep:React.PropTypes.number.isRequired,
        riskStep:React.PropTypes.number.isRequired,
        testWork:React.PropTypes.number.isRequired
    })).isRequired,
    rawTestSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
        index:React.PropTypes.number.isRequired,
        description:React.PropTypes.string.isRequired
    })),
    handleTestSubmit:React.PropTypes.func.isRequired,
    policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    maxHeight:React.PropTypes.number
}
export default Scope