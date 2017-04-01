import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import { Container, Row, Col} from 'react-grid-system';
export default class EnterTestingPlan extends Component {
    state={
        requiresExplanation:this.props.requiresExplanation
    }
    handleSelect=(v)=>{
        this.setState({
            requiresExplanation:this.props.testSelection.filter((val)=>val.index===v)[0].requiresExplanation
        });
    }
    render(){
        const {handleSelect, handleExplanation, selectedItem, testSelection}=this.props;
        return(
        <Container>
            <Row>
                <Col xs={12} sm={6}>
                    <SelectField
                        floatingLabelText="Select Test Type"
                        value={selectedItem}
                        onChange={(e, i, v)=>{handleSelect(v, testSelection.filter((val)=>val.index===v)[0].description);this.handleSelect(v)}}
                    >
                        {testSelection.map((val, index)=>{
                            return <MenuItem key={index} value={val.index} primaryText={val.description} />;
                        })}
                    </SelectField>
                </Col>
                <Col xs={12} sm={6}>
                    {this.state.requiresExplanation?<TextField 
                        defaultValue={this.props.requiresExplanation}
                        floatingLabelText="Explanation for Lack of Testing"
                        onChange={(e,v)=>handleExplanation(v)}
                    />:""}
                </Col>
            </Row>
        </Container>
        )
    }
}

EnterTestingPlan.propTypes={
    handleSelect:React.PropTypes.func.isRequired,
    handleExplanation:React.PropTypes.func.isRequired,
    selectedItem:React.PropTypes.number,
    testSelection:React.PropTypes.arrayOf((propValue, key, componentName, location, propFullName)=>{
        return !(propValue[key].index>=0&&propValue[key].description)&&new Error(`Invalid prop ${propFullName} supplied to ${componentName}. Validation failed.`)
    }).isRequired,
    requiresExplanation:React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.bool])
}