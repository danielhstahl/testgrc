import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import {joinedAssociates} from '../skillsHelpers'

const PaperDepth=1;
const PaperStyle={marginTop:25, paddingBottom:15}
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