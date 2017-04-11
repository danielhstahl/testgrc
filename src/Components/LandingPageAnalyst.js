import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import AutoRenew from 'material-ui/svg-icons/action/autorenew'//ongoing monitoring
import FeedBack from 'material-ui/svg-icons/action/feedback' //issue
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import {
  Link
} from 'react-router-dom'
//const ListStyle={marginTop:14}
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
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        onLoad:React.PropTypes.func.isRequired
    })
)
const LandingPageAnalyst=enhance(({list})=><ListWithLinks list={list} />)
    
export default LandingPageAnalyst