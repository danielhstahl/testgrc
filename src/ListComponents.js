import React from 'react';
import Checkbox from 'material-ui/Checkbox';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import ActionDelete from 'material-ui/svg-icons/action/delete';
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

export const ListWithDelete=({selectedSkills, onDelete})=>
<List>
    {
        selectedSkills.map((val, index)=>{
            return <ListItem 
                key={index} 
                primaryText={val}
                leftCheckbox={
                    <Checkbox checked={false} uncheckedIcon={<ActionDelete />} checkedIcon={<ActionDelete/>}
                    onCheck={(e, isChecked)=>onDelete(val, isChecked)}/>
                }
            />
        })
    }
</List>