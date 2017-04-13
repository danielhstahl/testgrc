import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover'
import DatePicker from 'material-ui/DatePicker';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import {List, ListItem} from 'material-ui/List';
import DateRange from 'material-ui/svg-icons/action/date-range' //
import IsQC from 'material-ui/svg-icons/device/access-time' //
import {backgroundPrimary} from '../Styles/ThemeStyles'
import pure from 'recompose/pure'
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {Link} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress';
import {validationIcon} from '../landingPageHelpers'
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
const enhanceMenu=compose(
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
const anchor={horizontal: 'left', vertical: 'top'}
const CustomDatePicker=/*enhanceMenu*/(/*({open, anchor, handleTouchTap, handleRequestClose})=>*/
<IconMenu
    iconButtonElement={<IconButton><DateRange /></IconButton>}
    anchorOrigin={anchor}
    targetOrigin={anchor}
>
    <MenuItem><MyDatePicker title="QC1"/></MenuItem>
    <MenuItem><MyDatePicker title="QC2"/></MenuItem>
    <MenuItem><MyDatePicker title="QC3"/></MenuItem>
    <MenuItem><MyDatePicker title="QC4"/></MenuItem>

</IconMenu>)

const QCPicker=(
    <div>
    <DateRange />
    <DateRange />
    <DateRange />
    <DateRange />
    </div>
)

/*
const CustomAssignTo=enhanceMenu(({open, anchor, handleTouchTap, handleRequestClose})=><div>
    <RaisedButton
        onTouchTap={handleTouchTap}
        label="Assign To"
    />
     <Popover
        open={open}
        anchorEl={anchor}
        anchorOrigin={anchorOrigin}
        targetOrigin={targetOrigin}
        onRequestClose={handleRequestClose}
    ><Menu>
            <MenuItem primaryText="Daniel"/>
            <MenuItem primaryText="Daniel"/>
            <MenuItem primaryText="Daniel"/>
            <MenuItem primaryText="Daniel"/>
        </Menu>
    </Popover>
</div>)

*/

const PipeLineList=enhance(({list})=>
<List>
    {list.map((listItem, index)=>{
        return <ListItem 
            disabled={true}
            key={index}
            primaryText={<div>{listItem.description}</div>}
            leftIcon={validationIcon(listItem.type)}
            rightIconButton={CustomDatePicker}
        />

    })}
</List>)
export default PipeLineList