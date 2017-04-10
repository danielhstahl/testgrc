import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import {List, ListItem} from 'material-ui/List';
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import {
  Link
} from 'react-router-dom'

const ListStyle={marginTop:14}
const enhance=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        title:React.PropTypes.string.isRequired
    })
)
const PipeLineList=enhance(({list, title})=>
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