import React from 'react';
import { Container} from 'react-grid-system';
import Subheader from 'material-ui/Subheader';
import Checkbox from 'material-ui/Checkbox';
import RaisedButton from 'material-ui/RaisedButton';
import Popover from 'material-ui/Popover'
import DatePicker from 'material-ui/DatePicker';
import IconMenu from 'material-ui/IconMenu';
import Paper from 'material-ui/Paper';
import MenuItem from 'material-ui/MenuItem'
import IconButton from 'material-ui/IconButton'
import Menu from 'material-ui/Menu'
import {List, ListItem} from 'material-ui/List';
import DateRange from 'material-ui/svg-icons/action/date-range' //
import IsQC from 'material-ui/svg-icons/device/access-time' //
import {backgroundPrimary} from '../Styles/ThemeStyles'
import pure from 'recompose/pure'
import {Card, CardActions, CardHeader, CardMedia, CardTitle, CardText} from 'material-ui/Card';
import withState from 'recompose/withState'
import lifecycle from 'recompose/lifecycle'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import {Link} from 'react-router-dom'
import LinearProgress from 'material-ui/LinearProgress';
import {containerStyle, paperStyle} from '../Styles/ContentStyles'
import {validationIcon, numberOfQC} from '../landingPageHelpers'
const disableWeekends=date=>date.getDay()===0||date.getDay()===6
const firstDayOfWeek=0;
const enhance=compose(
    pure, 
    lifecycle({
        componentWillMount(){
            const {loadInit, policyGroups}=this.props
            loadInit(policyGroups)
        }
    }),
    setPropTypes({
        pipeline:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        loadInit:React.PropTypes.func.isRequired
    })
)
const enhanceCard=compose(
    withState('open', 'toggleOpen', false),
    withHandlers({
        handleOpen:props=>expand=>{
            props.toggleOpen(expand)
        }
    }),
    onlyUpdateForKeys(['open'])
)
const MyDatePicker=({title})=><DatePicker container='inline' hintText={title} mode='landscape' shouldDisableDate={disableWeekends} firstDayOfWeek={firstDayOfWeek}/>




/*
const anchor={horizontal: 'left', vertical: 'top'}
const CustomDatePicker=(
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
)*/

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

const CustomCard=enhanceCard(({open, handleOpen, description, type})=>
<Card expanded={open} onExpandChange={handleOpen}>
    <CardHeader
        title={description}
        avatar={validationIcon(type)}
        actAsExpander={true}
        showExpandableButton={true}
    />
    <CardText expandable={true}>
        {[...Array(numberOfQC(type))].map((v, index)=>{
            return <MyDatePicker key={index} title={`QC ${index+1}`}/>
        })}
    </CardText>
    </Card>

)


const PipeLineList=enhance(({pipeline})=>{
    return <Container style={containerStyle}>
        <Paper rounded={false} style={paperStyle}>
            {pipeline.map((listItem, index)=>
            <CustomCard key={index} description={listItem.description} type={listItem.type}/>
)}</Paper></Container>
})

export default PipeLineList