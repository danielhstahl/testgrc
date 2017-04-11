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
import {
  Link
} from 'react-router-dom'
const switchIcon=(type)=>{
    switch(type){
        case "Validation":
            return <Functions/>
        case "Ongoing Monitoring":
            return <AutoRenew/>
        case "Issue":
            return <FeedBack/>
        case "Annual Review":
            return <Poll/>
        default:
            return <Poll/>
    }
}
const switchList=(tab, activities, todos, pipeline)=>{
    switch(tab){
        case 0:
            return <ListWithLinks list={activities} />
        case 1:
            return <ListWithLinks list={todos} />
        case 2:
            return <Pipeline list={pipeline} />
        default:
            return <ListWithLinks list={activities} />
    }   
}
const enhanceLinks=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired
    })
)
const ListWithLinks=enhanceLinks(({list})=>
<List >
    {list.map((listItem, index)=>{
        return <ListItem 
            key={index}
            primaryText={listItem.description}
            leftIcon={switchIcon(listItem.type)}
            containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}
        />
    })}
</List>)

const enhance=compose(
    pure,
    lifecycle({
        componentWillMount(){
            this.props.onLoad();
        }
    }),
    setPropTypes({
        activities:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        todos:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        pipeline:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        onLoad:React.PropTypes.func.isRequired
    })
)
const LandingPageAnalyst=enhance(({activities, todos, pipeline, tab})=>switchList(tab, activities, todos, pipeline))
    
export default LandingPageAnalyst