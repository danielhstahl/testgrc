import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import {List, ListItem} from 'material-ui/List';
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import {
  Link
} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress';

const enhance=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired
    })
)
const PipelineDescription=({description})=>{
    return <div>{description}<LinearProgress mode="determinate" value={50}/></div>
}
const PipeLineList=enhance(({list})=>
<List>
    {list.map((listItem, index)=>{
        return <ListItem 
            key={index}
            primaryText={<PipelineDescription description={listItem.description}/>}
            leftCheckbox={<Checkbox />}
            containerElement={<Link to={`/${listItem.type}/${listItem.id}`} />}
        />
    })}
</List>)
export default PipeLineList