import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover'
import DatePicker from 'material-ui/DatePicker';
import MenuItem from 'material-ui/MenuItem'
import Menu from 'material-ui/Menu'
import {List, ListItem} from 'material-ui/List';
import Functions from 'material-ui/svg-icons/editor/functions' //validation
import {backgroundPrimary} from '../Styles/ThemeStyles'
import Poll from 'material-ui/svg-icons/social/poll' //review
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {
  Link
} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress';
const disableWeekends=date=>date.getDay()===0||date.getDay()===6
const firstDayOfWeek=0;
const enhance=compose(
    pure,
    setPropTypes({
        list:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired
    })
)
const enhanceDatePopover=compose(
    withState('open', 'toggleOpen', false),
    withState('anchor', 'setAnchor', null),
    withHandlers({
        handleTouchTap:props=>event=>{
            event.preventDefault()
            props.toggleOpen(!props.open);
            props.setAnchor(event.currentTarget)
        },
        handleRequestClose:props=>e=>{
            props.toggleOpen(false)
        }
    }),
    onlyUpdateForKeys(['open', 'anchor'])
)
const MyDatePicker=({title})=><DatePicker container='inline' hintText={title} mode='landscape' shouldDisableDate={disableWeekends} firstDayOfWeek={firstDayOfWeek}/>

const CustomDatePicker=enhanceDatePopover(({open, anchor, handleTouchTap, handleRequestClose})=><div>
    <RaisedButton
        onTouchTap={handleTouchTap}
        label="QC Dates"
    />
     <Popover
        open={open}
        anchorEl={anchor}
        anchorOrigin={anchorOrigin}
        targetOrigin={targetOrigin}
        onRequestClose={handleRequestClose}
    ><Menu>
            <MyDatePicker title="QC1"/>
            <MyDatePicker title="QC2"/>
            <MyDatePicker title="QC3"/>
            <MyDatePicker title="QC4"/>
        </Menu>
    </Popover>
</div>)

const anchorOrigin={horizontal:"left",vertical:"bottom"}
const targetOrigin={horizontal:"left",vertical:"top"}
const PipelineDescription=({description, open, anchor})=>(
<Container>
    <Row>
        <Col xs={3}>{description}</Col>
        <Col xs={6}><LinearProgress style={{maxWidth:300}} mode="determinate" value={50}/></Col>
        <Col xs={3}><CustomDatePicker/></Col>
    </Row>
</Container>
)

const PipeLineList=enhance(({list})=>
<List>
    {list.map((listItem, index)=>{
        return <ListItem 
            key={index}
            primaryText={<PipelineDescription description={listItem.description}/>}
            leftCheckbox={<Checkbox />}
            
        />
    })}
</List>)
export default PipeLineList