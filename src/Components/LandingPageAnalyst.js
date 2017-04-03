import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import AutoRenew from 'material-ui/svg-icons/action/autorenew'//ongoing monitoring
import FeedBack from 'material-ui/svg-icons/action/feedback' //issue
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
import {
  Link
} from 'react-router-dom'

const ListWithLinks=({list, title})=>
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
</List>


const LandingPageAnalyst=({activities, todos})=>{
    console.log(activities);
    console.log(todos);
    return(
        <Container>
            <Row>
                <Col xs={12} md={6}>
                    <ListWithLinks list={activities} title="Validation Activities"/>
                </Col>

                <Col xs={12} md={6}>
                    <ListWithLinks list={todos} title="Todos"/>
                </Col>
            </Row>
        </Container>
    )
}
export default LandingPageAnalyst