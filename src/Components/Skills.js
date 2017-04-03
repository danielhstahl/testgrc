import React from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';
import {joinedAssociates} from '../skillsHelpers'

const Skills=({rawSkills, rawAssociates, validationSkills, validationId, validationAssociates,  handleSelect, handleToggleAssociate, handleRemoveSkill})=> {
    const associatesForDisplay=joinedAssociates(validationSkills, rawAssociates, validationAssociates);
    const handleSelectCurried=(e, i, v)=>handleSelect(v, validationId)
    const handleToggleAssociateCurried=(associate, isChecked)=>handleToggleAssociate(associate, isChecked, validationId)
    const handleRemoveSkillCurried=(skill)=>handleRemoveSkill(skill, validationId)
    return(
        <Container>
            <Row>
                <Col md={6}>
                    <SelectField
                        floatingLabelText="Skills"
                        onChange={handleSelectCurried}
                        fullWidth={true}
                    >
                        {rawSkills.map((val, index)=>{
                            return <MenuItem key={index} value={val.value} primaryText={val.value} />;
                        })}
                    </SelectField>
                    <ListWithDelete selectedItems={validationSkills} onDelete={handleRemoveSkillCurried}/> 
                </Col>
                <Col md={6} >
                    <ListOfPersonel arrayOfPersons={associatesForDisplay} onCheck={handleToggleAssociateCurried}/>
                </Col>
            </Row>
        </Container>
    );
}
Skills.propTypes={
    rawSkills:React.PropTypes.arrayOf(React.PropTypes.shape({
        value:React.PropTypes.string.isRequired
    })).isRequired, 
    rawAssociates:React.PropTypes.arrayOf(React.PropTypes.shape({
        name:React.PropTypes.string.isRequired,
        id:React.PropTypes.string.isRequired,
        skills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    })).isRequired, 
    validationSkills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired, validationAssociates:React.PropTypes.arrayOf(React.PropTypes.shape({
        id:React.PropTypes.string.isRequired,
        skills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    })).isRequired,  
    handleSelect:React.PropTypes.func.isRequired, 
    handleToggleAssociate:React.PropTypes.func.isRequired,
    handleRemoveSkill:React.PropTypes.func.isRequired,
    validationId:React.PropTypes.string.isRequired
}
export default Skills