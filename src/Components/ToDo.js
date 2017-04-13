import React from 'react';
import {List, ListItem} from 'material-ui/List';
import AutoRenew from 'material-ui/svg-icons/action/autorenew'//ongoing monitoring
import FeedBack from 'material-ui/svg-icons/action/feedback' //issue
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import Pipeline from './Pipeline';
import LinearProgress from 'material-ui/LinearProgress';
import {Link} from 'react-router-dom'
import {validationIcon} from '../landingPageHelpers'

const enhance=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired
    })
)


const ToDo=enhance(({list})=>
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
export default ToDo