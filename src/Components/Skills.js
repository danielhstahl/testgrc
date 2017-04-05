import React from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';


const Skills=({rawSkills, associatesForDisplay, validationSkills, handleSelect, handleToggleAssociate, handleRemoveSkill})=>
<Container>
    <Row>
        <Col md={6}>
            <SelectField
                floatingLabelText="Skills"
                onChange={handleSelect}
                fullWidth={true}
            >
                {rawSkills.map((val, index)=>{
                    return <MenuItem key={index} value={val.value} primaryText={val.value} />;
                })}
            </SelectField>
            <ListWithDelete selectedItems={validationSkills} onDelete={handleRemoveSkill}/> 
        </Col>
        <Col md={6} >
            <ListOfPersonel arrayOfPersons={associatesForDisplay} onCheck={handleToggleAssociate}/>
        </Col>
    </Row>
</Container>
    
Skills.propTypes={
    rawSkills:React.PropTypes.arrayOf(React.PropTypes.shape({
        value:React.PropTypes.string.isRequired
    })).isRequired, 
    validationSkills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired, associatesForDisplay:React.PropTypes.arrayOf(React.PropTypes.shape({
        id:React.PropTypes.string.isRequired
    })).isRequired,  
    handleSelect:React.PropTypes.func.isRequired, 
    handleToggleAssociate:React.PropTypes.func.isRequired,
    handleRemoveSkill:React.PropTypes.func.isRequired,
    validationId:React.PropTypes.string.isRequired
}
export default Skills