import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';

export const ListOfPersonel=({ArrayOfPersons, onCheck})=>
<List>
    <Subheader>List of Available Associates</Subheader>
    {ArrayOfPersons.map((person, index)=>{
        return <ListItem 
            key={index} 
            primaryText={person.name} 
            leftCheckbox={<Checkbox checked={person.selectedForTeam?true:false} onCheck={(e, isChecked)=>onCheck(person.id, isChecked)}/>} 
            nestedItems={person.requiredSkills.map((skill, index)=>{
                return <ListItem key={index} primaryText={skill} />
            })}
        />
    })}
</List>