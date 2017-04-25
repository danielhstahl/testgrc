import React from 'react';
import { withRouter } from 'react-router'
import ContentCreate from 'material-ui/svg-icons/content/create';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Badge from 'material-ui/Badge'
import {MenuItem} from 'material-ui/Menu';
import {ListItem } from 'material-ui/List';

import Avatar from 'material-ui/Avatar';
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import Warning from 'material-ui/svg-icons/alert/warning'
import { centerStyle, backgroundSecondary} from '../Styles/ThemeStyles'
const zeroPadding={padding:0}
const anchorOrigin={horizontal: 'right', vertical: 'top'}
const targetOrigin={horizontal: 'right', vertical: 'top'}
const badgeStyle={top: 0, right: 0, padding:0, margin:0}
const fontWeight={fontWeight:"normal"}
const badgedImage=(countToDo)=>(
    countToDo?<Badge
        badgeContent={countToDo}
        secondary={true}
        badgeStyle={badgeStyle}
    >
        <Warning/>
    </Badge>:null
)

const enhance=compose(
    pure,
    lifecycle({
        componentWillMount(){
            this.props.onLoad(this.props.policyGroups);
        }
    }),
    setPropTypes({
        user:React.PropTypes.shape({
            policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
            cn:React.PropTypes.string.isRequired
        }).isRequired,
        handleLogout:React.PropTypes.func.isRequired,
        countToDo:React.PropTypes.number
    })
)
const UserOptions=enhance(({user, history, handleLogout, countToDo})=>{
    const dataImage=user.thumbnailPhoto&&`data:image/jpeg;base64,${user.thumbnailPhoto}`
   /* const avatar=(
        <IconButton style={zeroPadding}>
            <Avatar src={dataImage}/>
        </IconButton>
    )*/
    //const alerts=badgedImage(countToDo)
    const alerts=countToDo>0?<span style={centerStyle}><Warning/>{countToDo}</span>:null
    //const alerts=countToDo>0?<span style={alertStyle}>{countToDo}</span>:null
    return(
        <div>
            <ListItem leftAvatar={<Avatar src={dataImage}/>} primaryText={user.cn} disabled/>
            <MenuItem primaryText="Tasks" onTouchTap={()=>history.push('/')} leftIcon={<ContentCreate/>} rightIcon={alerts}/>
            <MenuItem primaryText="Logout" leftIcon={<ExitToApp/>} onTouchTap={handleLogout}/>
            
        </div>
        
    )
})
export default withRouter(UserOptions);