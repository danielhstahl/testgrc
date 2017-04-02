import React from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';
import {joinedAssociates} from '../skillsHelpers'

export const Skills=({url, rawSkills, rawAssociates, validationSkills, validationAssociates,  handleSelect, handleToggleAssociate, handleRemoveSkill})=> {
    const associatesForDisplay=joinedAssociates(validationSkills, rawAssociates, validationAssociates);
    return(
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
    );
}