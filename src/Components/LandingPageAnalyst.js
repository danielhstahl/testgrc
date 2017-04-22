import React from 'react';
import {List, ListItem} from 'material-ui/List';
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import Pipeline from './Pipeline';
import {validationIcon} from '../landingPageHelpers'
import {Link} from 'react-router-dom'
import Activities from './Activities'
import ToDo from './ToDo'

const switchList=(tab, activities, todos, pipeline)=>{
    switch(tab){
        case 0:
            return <Activities list={activities} />
        case 1:
            return <ToDo list={todos} />
        case 2:
            return <Pipeline list={pipeline} />
        default:
            return <Activities list={activities} />
    }   
}



/*const ActivityList=enhanceLinks(({list})=>
<List >
    {list.map((listItem, index)=>{
        return <ListItem 
            key={index}
            primaryText={listItem.description}
            leftIcon={validationIcon(listItem.type)}
            containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}
        />
    })}
</List>)
*/
const enhance=compose(
    pure,
    lifecycle({
        componentWillMount(){
            this.props.onLoad(this.props.policyGroups);
        }
    }),
    setPropTypes({
        activities:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        /*todos:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        pipeline:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,*/
        policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        onLoad:React.PropTypes.func.isRequired
    })
)
const LandingPageAnalyst=enhance(({activities,  tab})=>switchList(tab, activities))
    
export default LandingPageAnalyst