import React from 'react';
import {List} from 'material-ui/List';
import { Container, Row, Col} from 'react-grid-system';
import RaisedButton from 'material-ui/RaisedButton'
import Subheader from 'material-ui/Subheader';
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import PMTimeline from './PMTimeline'
import {Link} from 'react-router-dom'
import {validationIcon} from '../catalogHelpers'

import ExpandingListItem from './ExpandingListItem'

const enhanceLinks=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired,
            timeline:React.PropTypes.arrayOf(React.PropTypes.shape({
                actualDate:React.PropTypes.any,
                dueDate:React.PropTypes.any.isRequired,
                description:React.PropTypes.string.isRequired,
            })).isRequired
        })).isRequired
    })
)

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
                     <RaisedButton primary label="Work on activity" containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}/>
                </div>
            </ExpandingListItem>
        )
    })}
</List>)
export default ActivityList