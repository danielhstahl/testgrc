import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Container, Row, Col} from 'react-grid-system';
import pure from 'recompose/pure';
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';


const convertUndefinedToString=(val)=>val?val:""

const enhance=compose(
    withState('requiresExplanation', 'setExplanation', ({initExplanation})=>convertUndefinedToString(initExplanation)),
    withHandlers({
        localHandleSelect:({testSelection, setExplanation})=>v=>setExplanation(convertUndefinedToString(testSelection.filter((val)=>val.index===v)[0].requiresExplanation))
    }),
    onlyUpdateForKeys(['selectedItem', 'requiresExplanation']),
    setPropTypes({
        handleSelect:React.PropTypes.func.isRequired,
        handleExplanation:React.PropTypes.func.isRequired,
        selectedItem:React.PropTypes.number,
        testSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
            index: React.PropTypes.number.isRequired,
            description: React.PropTypes.string.isRequired
        })).isRequired,
        requiresExplanation:React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool]),
        localHandleSelect:React.PropTypes.func.isRequired,
        initExplanation:React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool])
    })
)
const EnterTestingPlan=enhance(({handleSelect, handleExplanation, selectedItem, testSelection, localHandleSelect, initExplanation, requiresExplanation})=>
<Container>
    <Row>
        <Col xs={12} sm={6}>
            <SelectField
                floatingLabelText="Select Test Type"
                value={selectedItem}
                onChange={(e, i, testIndex)=>{handleSelect(testIndex);localHandleSelect(testIndex)}}
            >
                {testSelection.map((val, index)=>{
                    return <MenuItem key={index} value={val.index} primaryText={val.description} />;
                })}
            </SelectField>
        </Col>
        <Col xs={12} sm={6}>
            {requiresExplanation?<TextField 
                defaultValue={initExplanation}
                floatingLabelText="Explanation for Lack of Testing"
                onChange={(e,v)=>handleExplanation(v)}
            />:""}
        </Col>
    </Row>
</Container>
)
export default EnterTestingPlan
