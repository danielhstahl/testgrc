import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import Paper from 'material-ui/Paper';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import {leftjoin} from './../helperFunctions.js';

const whoFitsSkill=(skill="", availablePersonel=[{skills:[]}])=>{
    return availablePersonel.filter((val, index)=>val.skills.filter((v)=>v===skill).length>0);
}
const getSkillsPerPersonel=(skills=[], availablePersonel=[{name:"", id:"", skills:[]}])=>{
    return availablePersonel.map((person, index)=>{
        const requiredSkills=skills.filter((skill)=>person.skills.filter((personSkill)=>skill===personSkill)[0]);
        return {name:person.name, requiredSkills:requiredSkills, skills:person.skills, selectedForTeam:person.selectedForTeam, id:person.id, numberOfRequiredSkills:requiredSkills.length};
    })
}
const getUniqueArray=Array.from?(array)=>[...new Set(array)]:(array)=>array.sort().filter((val, index, arr)=>!index||val!==arr[index-1])//ensure unique values
const addSelectedSkill=(prevSkills=[], skill="")=>{
    return getUniqueArray(prevSkills.concat([skill]));
}
const removeSelectedSkill=(prevSkills=[], skill="")=>{
    return prevSkills.filter((gSkill)=>skill!==gSkill);
}
const updatePersonel=(updatedSkills=[], personel=[{name:"", id:"", skills:[]}])=>{
    const updatedPersonel=getSkillsPerPersonel(updatedSkills, personel);
    updatedPersonel.sort((a, b)=>a.numberOfRequiredSkills>b.numberOfRequiredSkills?-1:1);
    return updatedPersonel;
}
export let testWhoFitsSkill;
export let testGetSkillsPerPersonel;
export let testGetUniqueArray;
export let testAddSelectedSkill;
export let testRemoveSelectedSkill;
export let testUpdatePersonel;
if(process.env.NODE_ENV==='test'){
    testWhoFitsSkill=whoFitsSkill;
    testGetSkillsPerPersonel=getSkillsPerPersonel;
    testGetUniqueArray=getUniqueArray;
    testAddSelectedSkill=addSelectedSkill;
    testRemoveSelectedSkill=removeSelectedSkill;
    testUpdatePersonel=updatePersonel;
}
const PaperDepth=1;
const PaperStyle={marginTop:25, paddingBottom:15}
export class Skills extends Component {
    state={
        selectedSkills:[],
        skillsByPersonel:[],
        skills:[], 
    }
    availablePersonel=[]
    componentDidMount(){
        const {url}=this.props;
        axios.all([
            axios.get(`${url}/currentAssociates`), 
            axios.get(`${url}/selectedSkills`), 
            axios.get(`${url}/skillAssessment`)]
        ).then(axios.spread((associates ,selectedSkills, skillsByPersonel)=>{
            this.availablePersonel=leftjoin(associates.data, skillsByPersonel.data, (left, right)=>left.id===right.id)
            const updatedPersonel=updatePersonel(selectedSkills.data, this.availablePersonel);
            this.setState({selectedSkills:selectedSkills.data, skillsByPersonel:updatedPersonel});
        })).catch((err)=>console.log(err));
        axios.get(`${url}/skills`).then((response)=>this.setState({skills:response.data})).catch((err)=>console.log(err));
    }
    handleSelect=(e, i, v)=>{
        this.setState((prevState, props)=>{
            const updatedSkills=addSelectedSkill(prevState.selectedSkills, v);
            this.availablePersonel=leftjoin(this.availablePersonel, prevState.skillsByPersonel, (left, right)=>left.id===right.id)
            const updatedPersonel=updatePersonel(updatedSkills, this.availablePersonel);
            axios.post(`${props.url}/handleSelect`, updatedSkills).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return {selectedSkills:updatedSkills, skillsByPersonel:updatedPersonel};
        })
    }
    handleAddTeamMember=(id, isChecked)=>{
        this.setState((prevState, props)=>{
            prevState.skillsByPersonel.filter((val)=>val.id===id)[0].selectedForTeam=isChecked;
            axios.post(`${props.url}/handleAddTeamMember`, prevState.skillsByPersonel).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return {skillsByPersonel:prevState.skillsByPersonel};
        })
    }
    handleDeleteSkill=(skill, isChecked)=>{
        this.setState((prevState, props)=>{
            const updatedSkills=removeSelectedSkill(prevState.selectedSkills, skill);
            const updatedPersonel=updatePersonel(updatedSkills, this.availablePersonel);
            axios.post(`${props.url}/handleSelect`, updatedSkills).then((response)=>console.log(response)).catch((err)=>console.log(err));
            return {selectedSkills:updatedSkills, skillsByPersonel:updatedPersonel};
        });
    }
    render(){
        const {selectedSkills, skillsByPersonel, skills}=this.state;
        return(
            <Container>
                <Row>
                    <Col md={6}>
                        <SelectField
                            floatingLabelText="Skills"
                            onChange={this.handleSelect}
                            fullWidth={true}
                        >
                            {skills.map((val, index)=>{
                                return <MenuItem key={index} value={val.value} primaryText={val.value} />;
                            })}
                        </SelectField>
                        <ListWithDelete selectedSkills={selectedSkills} onDelete={this.handleDeleteSkill}/> 
                    </Col>
                    <Col md={6} >
                        <ListOfPersonel ArrayOfPersons={skillsByPersonel} onCheck={this.handleAddTeamMember}/>
                    </Col>
                </Row>
            </Container>
        );
    }
}