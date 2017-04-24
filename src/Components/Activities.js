import React from 'react';
import {List, ListItem} from 'material-ui/List';
import { Container, Row, Col} from 'react-grid-system';
import FlatButton from 'material-ui/FlatButton'
import AutoRenew from 'material-ui/svg-icons/action/autorenew'//ongoing monitoring
import FeedBack from 'material-ui/svg-icons/action/feedback' //issue
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Subheader from 'material-ui/Subheader';
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import Pipeline from './Pipeline';
import LinearProgress from 'material-ui/LinearProgress';
import PMTimeline from './PMTimeline'
import {Link} from 'react-router-dom'
import {validationIcon} from '../landingPageHelpers'

import ExpandingListItem from './ExpandingListItem'

const enhanceLinks=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired
    })
)

const maxWidth={maxWidth:300};
const dueDateStyle=(date)=>{
    return Date.parse(date)<Date.now()?{color:'red'}:null
}
const ActivityDescription=({description, nextDueDate, finalDueDate})=>(
<Container>
    <Row>
        <Col xs={3}>{description}</Col>
        <Col xs={3} style={dueDateStyle(nextDueDate)}>{nextDueDate}</Col>
        <Col xs={3} style={dueDateStyle(finalDueDate)}>{finalDueDate}</Col>
        <Col xs={3}></Col>
    </Row>
</Container>
)
const ActivityDetail=({listItem})=>(
<Container>
    <Row>
        <Col xs={3}><LinearProgress mode='determinate' style={maxWidth} value={50}/></Col>
        <Col xs={3}>
            <FlatButton primary label="Work on activity" containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}/>

        </Col>
    </Row>
</Container>
)

const ActivityList=enhanceLinks(({list})=>
<List >
    <Subheader>Activities</Subheader>
    {list.map((listItem, index)=>{
        return (
            <ExpandingListItem 
                key={index}
                primaryText={<ActivityDescription description={listItem.description} nextDueDate={listItem.nextDueDate} finalDueDate={listItem.finalDueDate}/>}
                leftIcon={validationIcon(listItem.type)}
            >
                <div>
                    <PMTimeline timeline={listItem.timeline} />
                     <FlatButton primary label="Work on activity" containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}/>
                </div>
            </ExpandingListItem>
        )
    })}
</List>)
export default ActivityList