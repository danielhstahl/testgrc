import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import {leftjoin} from './helperFunctions.js'

const whoFitsSkill=(skill, availablePersonel)=>{
    return availablePersonel.filter((val, index)=>val.skills.filter((v)=>v===skill).length>0);
}
const getSkillsPerPersonel=(skills, availablePersonel)=>{
    return availablePersonel.map((person, index)=>{
        const requiredSkills=skills.filter((skill)=>person.skills.find((personSkill)=>skill===personSkill));
        return {name:person.name, requiredSkills:requiredSkills, skills:person.skills, selectedForTeam:person.selectedForTeam, id:person.id, numberOfRequiredSkills:requiredSkills.length};
    })
}
const getUniqueArray=(array)=>[...new Set(array)]//ensure unique values
const addSelectedSkill=(prevSkills, skill)=>{
    prevSkills.push(skill);
    return getUniqueArray(prevSkills);
}
const removeSelectedSkill=(prevSkills, skill)=>{
    return prevSkills.filter((gSkill)=>skill!==gSkill);
}
const updatePersonel=(updatedSkills, personel)=>{
    const updatedPersonel=getSkillsPerPersonel(updatedSkills, personel);
    updatedPersonel.sort((a, b)=>a.numberOfRequiredSkills>b.numberOfRequiredSkills?-1:1);
    return updatedPersonel;
}
export class Skills extends Component {
    state={
        selectedSkills:[],
        skillsByPersonel:[],
        skills:[], 
    }
    availablePersonel=[]
    componentDidMount(){
        const {url}=this.props;
        axios.get(`${url}/currentAssociates`).then((response)=>this.availablePersonel=response.data).catch((err)=>console.log(err));
        axios.get(`${url}/skills`).then((response)=>this.setState({skills:response.data})).catch((err)=>console.log(err));
        axios.get(`${url}/skillAssessment`).then((response)=>this.setState({skillsByPersonel:response.data})).catch((err)=>console.log(err));
        axios.get(`${url}/selectedSkills`).then((response)=>this.setState({selectedSkills:response.data})).catch((err)=>console.log(err));
    }
    handleSelect=(e, i, v)=>{
        this.setState((prevState)=>{
            const updatedSkills=addSelectedSkill(prevState.selectedSkills, v);
            this.availablePersonel=leftjoin(this.availablePersonel, prevState.skillsByPersonel, (left, right)=>left.id===right.id)
            const updatedPersonel=updatePersonel(updatedSkills, this.availablePersonel);
            axios.post(`${this.props.url}/handleSelect`, updatedSkills).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return {selectedSkills:updatedSkills, skillsByPersonel:updatedPersonel};
        })
    }
    handleAddTeamMember=(id, isChecked)=>{
        this.setState((prevState)=>{
            prevState.skillsByPersonel.find((val)=>val.id===id).selectedForTeam=isChecked;
            axios.post(`${this.props.url}/handleAddTeamMember`, prevState.skillsByPersonel).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return prevState;
        })
    }
    handleDeleteSkill=(skill, isChecked)=>{
        this.setState((prevState)=>{
            const updatedSkills=removeSelectedSkill(prevState.selectedSkills, skill);
            const updatedPersonel=updatePersonel(updatedSkills, this.availablePersonel);
            axios.post(`${this.props.url}/handleSelect`, updatedSkills).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return {selectedSkills:updatedSkills, skillsByPersonel:updatedPersonel};
        });
    }
    render(){
        const {selectedSkills, skillsByPersonel, skills}=this.state;
        return(
        <Container>
            <Row>
            <Col xs={12}>
                <SelectField
                    floatingLabelText="Skills"
                    onChange={this.handleSelect}
                >
                {skills.map((val, index)=>{
                    return <MenuItem key={index} value={val.value} primaryText={val.value} />;
                })}
                </SelectField>
            </Col>
            </Row>
            <Row>
            <Col sm={6}>
               <ListWithDelete selectedSkills={selectedSkills} onDelete={this.handleDeleteSkill}/>  
            </Col>
            <Col sm={6}>
                <ListOfPersonel ArrayOfPersons={skillsByPersonel} onCheck={this.handleAddTeamMember}/>
            </Col>
           
            </Row>
        </Container>
        );
    }
}