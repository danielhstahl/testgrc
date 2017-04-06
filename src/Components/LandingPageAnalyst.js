import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import AutoRenew from 'material-ui/svg-icons/action/autorenew'//ongoing monitoring
import FeedBack from 'material-ui/svg-icons/action/feedback' //issue
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

import {
  Link
} from 'react-router-dom'

const enhanceLinks=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        title:React.PropTypes.string.isRequired
    })
)
const ListWithLinks=enhanceLinks(({list, title})=>
<List style={{marginTop:14}}>
<Subheader>{title}</Subheader>
    {list.map((listItem, index)=>{
        return <ListItem 
            key={index}
            primaryText={listItem.description}
            leftIcon={listItem.type==="Validation"?<Functions/>:<Poll/>}
            containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}
        />
    })}
</List>)

const enhance=compose(
    pure,
    setPropTypes({
        activities:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        todos:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired
    })
)
const LandingPageAnalyst=enhance(({activities, todos})=>
<Container>
    <Row>
        <Col xs={12} md={6}>
            <ListWithLinks list={activities} title="Validation Activities"/>
        </Col>
        <Col xs={12} md={6}>
            <ListWithLinks list={todos} title="Todos"/>
        </Col>
    </Row>
</Container>)
    
export default LandingPageAnalyst