import React, { Component } from 'react';
import {FourColBody, RiskTestExplanation} from './ScopeUtils'
import EnterTestingPlan from './EnterTestingPlan'
import SelectTesting from './SelectTesting'
import {isOkToSubmit} from '../scopeHelpers'
export class SelectAndEnter extends Component{
    state={
        explanation:"",//holder for current "Plan"
        testWork:null//holder for current "Plan"
    }
    handleExplanation=(v)=>{
        this.setState({
            explanation:v
        })
    }
    handleSelect=(index, value)=>{
        this.setState({
            testWork:index
        })
    }
    clearState=()=>{
        this.setState({
            testWork:null,
            explanation:""
        })
    }
    render(){
        const {rcusItem, rawTestSelection, handleTestSubmit, tableStyle}=this.props
        const {testWork, explanation}=this.state
        return <FourColBody style={tableStyle} first={rcusItem.process} second={rcusItem.risk} third={rcusItem.controls}>
            <SelectTesting notAllowedToSubmit={!isOkToSubmit(testWork, explanation, rawTestSelection)} isSubmitted={rcusItem.submitted}  handleSubmit={()=>{
                handleTestSubmit({...rcusItem, explanation:explanation, testWork:testWork});
                this.clearState();
            }}>
                <RiskTestExplanation responsibility={rcusItem.MRMVResponsibility} risk={rcusItem.risk} control={rcusItem.controls}/>
                <EnterTestingPlan 
                    testSelection={rawTestSelection}
                    requiresExplanation={explanation||rcusItem.explanation} 
                    selectedItem={testWork!==null?testWork:rcusItem.testWork} 
                    handleExplanation={this.handleExplanation} 
                    handleSelect={this.handleSelect}
                />
            </SelectTesting>
        </FourColBody>
    }
}
SelectAndEnter.propTypes={
    rcusItem:React.PropTypes.shape({
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
    }),
    rawTestSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
        index:React.PropTypes.number.isRequired,
        description:React.PropTypes.string.isRequired
    })),
    handleTestSubmit:React.PropTypes.func.isRequired,
    tableStyle:React.PropTypes.object
}