import React from 'react'
import SelectField from 'material-ui/SelectField'
import { Container, Row, Col} from 'react-grid-system'
import MenuItem from 'material-ui/MenuItem'
import {ListOfPersonel, ListWithDelete} from './ListComponents.js'
import {joinedAssociates} from '../skillsHelpers'




const Skills=({rawSkills, associates, rawAssociates, skills, validationSkills, handleSelect, policyGroups, handleToggleAssociate, handleRemoveSkill})=>{
    const handleSelectSub=(e, i, v)=>handleSelect(e, i, v, policyGroups)
    const handleToggleAssociateSub=(associate, isChecked)=>handleToggleAssociate(associate, isChecked, policyGroups)
    const handleRemoveSkillSub=skill=>handleRemoveSkill(skill, policyGroups)
    const associatesForDisplay=joinedAssociates(skills, rawAssociates, associates)
    return <Container>
    <Row>
        <Col md={6}>
            <SelectField
                floatingLabelText="Skills"
                onChange={handleSelectSub}
                fullWidth={true}
            >
                {rawSkills.map((val, index)=>{
                    return <MenuItem key={index} value={val.value} primaryText={val.value} />;
                })}
            </SelectField>
            <ListWithDelete selectedItems={validationSkills} onDelete={handleRemoveSkillSub}/> 
        </Col>
        <Col md={6} >
            <ListOfPersonel arrayOfPersons={associatesForDisplay} onCheck={handleToggleAssociateSub}/>
        </Col>
    </Row>
</Container>
}

    
Skills.propTypes={
    rawSkills:React.PropTypes.arrayOf(React.PropTypes.shape({
        value:React.PropTypes.string.isRequired
    })).isRequired, 
    validationSkills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired, 
    associates:React.PropTypes.arrayOf(React.PropTypes.shape({
        id:React.PropTypes.string
    })).isRequired, 
    rawAssociates:React.PropTypes.arrayOf(React.PropTypes.shape({
        cn:React.PropTypes.string.isRequired,
        id:React.PropTypes.string.isRequired,
        skills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    })).isRequired, 
    skills:React.PropTypes.arrayOf(React.PropTypes.string).isRequired, 
    handleSelect:React.PropTypes.func.isRequired, 
    handleToggleAssociate:React.PropTypes.func.isRequired,
    handleRemoveSkill:React.PropTypes.func.isRequired,
    policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
    validationId:React.PropTypes.string.isRequired
}
export default Skills