import React from 'react';
import {ThreeColBody, RiskTestExplanation} from './ScopeUtils'
import EnterTestingPlan from './EnterTestingPlan'
import SelectTesting from './SelectTesting'
import {isOkToSubmit} from '../scopeHelpers'
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const ifFirstIsNullThenSecond=(first, second)=>first!==null?first:second
const enhance=compose(
    withState('explanation', 'updateExplanation', ''),
    withState('testWork', 'updateTestWork', null),
    withHandlers({
        handleExplanation:({updateExplanation})=>v=>updateExplanation(v),
        handleSelect:({updateTestWork})=>i=>updateTestWork(i),
        clearState:({updateExplanation, updateTestWork})=>()=>{
            updateExplanation("")
            updateTestWork(null)
        }
    }),
    onlyUpdateForKeys(['rcusItem', 'explanation', 'testWork']),
    setPropTypes({
        rcusItem:React.PropTypes.shape({
            //process:React.PropTypes.string.isRequired,
            risk:React.PropTypes.string.isRequired,
            processStep:React.PropTypes.number.isRequired,
            riskStep:React.PropTypes.number.isRequired,
            controls:React.PropTypes.string.isRequired,
            workpaper:React.PropTypes.number.isRequired,
            MRMVResponsibility:React.PropTypes.string.isRequired,
            explanation:React.PropTypes.string.isRequired,
            testWork:React.PropTypes.number,
            submitted:React.PropTypes.bool.isRequired
        }),
        rawTestSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
            index:React.PropTypes.number.isRequired,
            description:React.PropTypes.string.isRequired
        })),
        handleTestSubmit:React.PropTypes.func.isRequired,
        tableStyle:React.PropTypes.object,
        explanation:React.PropTypes.string.isRequired,
        testWork:React.PropTypes.number,
        handleExplanation:React.PropTypes.func.isRequired,
        handleSelect:React.PropTypes.func.isRequired,
        clearState:React.PropTypes.func.isRequired
    })
)

const SelectAndEnter=enhance(({tableStyle, rcusItem, explanation, rawTestSelection, testWork, handleSelect, handleExplanation, clearState, handleTestSubmit})=>
<ThreeColBody style={tableStyle} first={rcusItem.risk} second={rcusItem.controls}>
    <SelectTesting 
        notAllowedToSubmit={!isOkToSubmit(testWork, explanation, rawTestSelection)} 
        isSubmitted={rcusItem.submitted}  
        handleSubmit={()=>{
            handleTestSubmit({...rcusItem, explanation:explanation, testWork:testWork});
            //clearState();
        }}
        onClose={clearState}
    >
        <RiskTestExplanation responsibility={rcusItem.MRMVResponsibility} risk={rcusItem.risk} control={rcusItem.controls}/>
        <EnterTestingPlan 
            testSelection={rawTestSelection}
            explanation={explanation||rcusItem.explanation} 
            selectedItem={ifFirstIsNullThenSecond(testWork, rcusItem.testWork)}
            handleExplanation={handleExplanation} 
            handleSelect={handleSelect}
        />
    </SelectTesting>
</ThreeColBody>
)


export default SelectAndEnter