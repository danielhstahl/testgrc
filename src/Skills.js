import React, { Component } from 'react';
import SelectField from 'material-ui/SelectField';
import { Container, Row, Col} from 'react-grid-system';
import MenuItem from 'material-ui/MenuItem';

const skills=[
    {
        type:"programming",
        value:"Matlab"
    },{
        type:"programming",
        value:"R"
    },{
        type:"programming",
        value:"C++"
    },{
        type:"math",
        value:"Stochastic Calculus"
    },{
        type:"statistics",
        value:"Time Series"
    },{
        type:"accounting",
        value:"FAS 114"
    }
]
const availablePersonel=[
    {
        name:"Thomas Nguyen",
        skills:[
            "R",
            "FAS 114",
            "Time Series"
        ]        
    },
    {
        name:"Terrance",
        skills:[
            "Stochastic Calculus",
            "R",
            "C++",
            "Time Series"
        ]
    }
]
const whoFitsSkill=(skill)=>{
    return availablePersonel.filter((val, index)=>val.skills.filter((v)=>v===skill).length>0);
}
const getSkillsPerPersonel=(skills)=>{
    return availablePersonel.map((person, index)=>{
        const requiredSkills=skills.filter((skill)=>person.skills.find((personSkill)=>skill===personSkill));
        return {name:person.name, requiredSkills:requiredSkills, numberOfRequiredSkills:requiredSkills.length};
    }).filter((person)=>person.numberOfRequiredSkills>0);
}
const getUniqueArray=(array)=>[...new Set(array)]//ensure unique values
export class Skills extends Component {
    state={
        selectedSkills:[],
        selectedTeam:[],
        skillsByPersonel:[]
    }
    handleSelect=(e, i, v)=>{
        this.setState((prevState)=>{
            prevState.selectedSkills.push(v);
            prevState.selectedSkills=getUniqueArray(prevState.selectedSkills);
            prevState.skillsByPersonel=getSkillsPerPersonel(prevState.selectedSkills);
            console.log(prevState.skillsByPersonel);
            prevState.skillsByPersonel.sort((a, b)=>a.numberOfRequiredSkills>b.numberOfRequiredSkills?-1:1);
            return prevState;
        })
    }
    render(){
        const {selectedSkills, skillsByPersonel}=this.state;
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
            {
                selectedSkills.map((val, index)=>{
                    return <div key={index}>{val}</div>
                })
            }
            </Col>
            <Col sm={6}>
                {
                    skillsByPersonel.map((person, index)=>{
                        return <div key={index}><h3>{person.name}</h3>
                        {
                            person.requiredSkills.map((skill, index)=>{
                                return <div key={index}>{skill}</div>
                            })
                        }
                        </div>
                    })
                }
            </Col>
           
            </Row>
        </Container>
        );
    }
}