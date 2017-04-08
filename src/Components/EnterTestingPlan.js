import React from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Container, Row, Col} from 'react-grid-system';
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';


const convertToBool=(val)=>{
    return val?true:false
}

const enhance=compose(
    withState('requiresExplanation', 'setRequiresExplanation', ({explanation})=>convertToBool(explanation)),
    withHandlers({
        localHandleSelect:({testSelection, setRequiresExplanation})=>v=>setRequiresExplanation(
            testSelection.filter((val)=>val.index===v)[0].requiresExplanation
        )
    }),
    onlyUpdateForKeys(['selectedItem', 'explanation', 'requiresExplanation']),
    setPropTypes({
        handleSelect:React.PropTypes.func.isRequired,
        handleExplanation:React.PropTypes.func.isRequired,
        selectedItem:React.PropTypes.number,
        testSelection:React.PropTypes.arrayOf(React.PropTypes.shape({
            index: React.PropTypes.number.isRequired,
            description: React.PropTypes.string.isRequired
        })).isRequired,
        setRequiresExplanation:React.PropTypes.func.isRequired,
        requiresExplanation:React.PropTypes.bool,
        localHandleSelect:React.PropTypes.func.isRequired,
        explanation:React.PropTypes.string
    })
)
const EnterTestingPlan=enhance(({handleSelect, handleExplanation, selectedItem, testSelection, localHandleSelect, explanation, setRequiresExplanation, requiresExplanation})=>
<Container>
    <Row>
        <Col xs={12} sm={6}>
            <SelectField
                floatingLabelText="Select Test Type"
                value={selectedItem}
                onChange={(e, i, testIndex)=>{localHandleSelect(testIndex);handleSelect(testIndex)}}
            >
                {testSelection.map((val, index)=>{
                    return <MenuItem key={index} value={val.index} primaryText={val.description} />;
                })}
            </SelectField>
        </Col>
        <Col xs={12} sm={6}>
            {requiresExplanation?<TextField 
                value={explanation}
                floatingLabelText="Explanation for Lack of Testing"
                onChange={(e,v)=>handleExplanation(v)}
            />:""}
        </Col>
    </Row>
</Container>)
export default EnterTestingPlan
