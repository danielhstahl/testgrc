import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import {ListOfPersonel} from './ListOfPersonel.js';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';

const whoFitsSkill=(skill, availablePersonel)=>{
    return availablePersonel.filter((val, index)=>val.skills.filter((v)=>v===skill).length>0);
}
const getSkillsPerPersonel=(skills, availablePersonel)=>{
    return availablePersonel.map((person, index)=>{
        const requiredSkills=skills.filter((skill)=>person.skills.find((personSkill)=>skill===personSkill));
        return {name:person.name, requiredSkills:requiredSkills, selectedForTeam:person.selectedForTeam, id:person.id, numberOfRequiredSkills:requiredSkills.length};
    })
}
const getUniqueArray=(array)=>[...new Set(array)]//ensure unique values

export class Skills extends Component {
    state={
        selectedSkills:[],
        //selectedTeam:[],
        skillsByPersonel:[],
        skills:[], 
    }
    availablePersonel=[]
    componentDidMount(){
        const {url}=this.props;
        axios.get(`${url}/currentAssociates`).then((response)=>this.availablePersonel=response.data).catch((err)=>console.log(err));
        axios.get(`${url}/skills`).then((response)=>this.setState({skills:response.data})).catch((err)=>console.log(err));
        axios.get(`${url}/skillAssessment`).then((response)=>this.setState({skillsByPersonel:response.data})).catch((err)=>console.log(err));
    }
    handleSelect=(e, i, v)=>{
        this.setState((prevState)=>{
            prevState.selectedSkills.push(v);
            prevState.selectedSkills=getUniqueArray(prevState.selectedSkills);
            this.availablePersonel=this.availablePersonel.map((val, index)=>{
                let result=prevState.skillsByPersonel.find((skill)=>skill.id===val.id);
                result?result.skills=val.skills:"";
                return result?result:val
            })
            prevState.skillsByPersonel=getSkillsPerPersonel(prevState.selectedSkills, this.availablePersonel);
            prevState.skillsByPersonel.sort((a, b)=>a.numberOfRequiredSkills>b.numberOfRequiredSkills?-1:1);
            return prevState;
        })
    }
    handleAddTeamMember=(id, isChecked)=>{
        this.setState((prevState)=>{
            prevState.skillsByPersonel.find((val)=>val.id===id).selectedForTeam=isChecked;
            axios.post(`${this.props.url}/handleAddTeamMember`, prevState.skillsByPersonel.filter((val)=>val.selectedForTeam)).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return prevState;
        })
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
                <List>
                    {
                        selectedSkills.map((val, index)=>{
                            return <ListItem key={index} primaryText={val}/>
                        })
                    }
                </List>    
            
            </Col>
            <Col sm={6}>
                <ListOfPersonel ArrayOfPersons={skillsByPersonel} onCheck={this.handleAddTeamMember}/>
            </Col>
           
            </Row>
        </Container>
        );
    }
}