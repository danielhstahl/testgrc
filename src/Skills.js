import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';
import {ListOfPersonel, ListWithDelete} from './ListComponents.js';
import {List, ListItem} from 'material-ui/List';
import axios from 'axios';
import {leftjoin} from './helperFunctions.js';
import {
  gql,
  graphql,
  compose
} from 'react-apollo';

const validationId=1;//temporary
const getAllAssociates = gql`
   query Associates {
     availablePersonel {
       id
       name
       skills
     }
   }
 `;
const getAllSkills = gql`
   query Skills {
     skills {
       type
       value
    }
   }
 `;
const getValidationSkillsRequired = gql`
   query ValidationSkills($validationId:String!) {
     selectedSkills(validationId:$validationId) {
       type
       value
     }
   }
 `;
const getValidationSkillsAvailable = gql`
   query AssociateSkills($validationId:String!) {
     skillAssessment(validationId:$validationId) {
       id
       requiredSkills
     }
   }
 `;
const addSkillToValidation = gql`
    mutation addSkill(
        $validationId:String!
        $type:String!
        $value:String!
    ) {
        addSkillToValidation(
            validationId:$validationId
            type:$type
            value:$value
        ) {
            type
            value
        }
   }
`;




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

const SkillSelect=({data:{skills}, handleSelect})=>{
    return(
        <Col xs={12}>
            <SelectField
                floatingLabelText="Skills"
                onChange={handleSelect}
            >
            {skills.map((val, index)=>{
                return <MenuItem key={index} value={val.value} primaryText={val.value} />;
            })}
            </SelectField>
        </Col>
    )
}
const SkillSelectGQL=graphql(getAllSkills)(SkillSelect);

const Skills = ({associates, skillsByPersonel, selectedSkills})=>{
    associates

}




class Skills extends Component {
    availablePersonel=leftjoin(this.props.associates, this.props.skillsByPersonel, (left, right)=>left.id===right.id)
    state={
        selectedSkills:this.props.selectedSkills({variables:{validationId:validationId}}),
        skillsByPersonel:updatePersonel(this.state.selectedSkills, this.availablePersonel)
    }
    
    /*componentDidMount(){
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
    }*/
    handleSelect=(e, i, v)=>{
        this.setState((prevState, props)=>{
            const updatedSkills=addSelectedSkill(prevState.selectedSkills, v);
            this.availablePersonel=leftjoin(this.availablePersonel, prevState.skillsByPersonel, (left, right)=>left.id===right.id)
            const updatedPersonel=updatePersonel(updatedSkills, this.availablePersonel);
            props.addSkill({
                variables:{
                    validationId:validationId,
                    type:updatedSkills.type,
                    value:updatedSkills.value
                }
            }).then((response)=>console.log(response));
            /*axios.post(`${props.url}/handleSelect`, updatedSkills).then((response)=>console.log(response)).catch((err)=>console.log(err));*/
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
                <SkillSelectGQL handleSelect={this.handleSelect} />
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

export const SkillsQL=compose(
    graphql(getAllAssociates, {name:"associates"}),
    graphql(getValidationSkillsRequired, {options:(props)=>({
    variables:{
        validationId:props.validationId
    }}),name:"selectedSkills"}),
    graphql(getValidationSkillsAvailable, {options:(props)=>({
    variables:{
        validationId:props.validationId
    }}), name:"skillsByPersonel"}),
    graphql(addSkillToValidation, {options:(props)=>({
    variables:{
        validationId:props.validationId
    }}), name:"addSkill"}),
)(Skills);
