import React from 'react';
import { withRouter } from 'react-router'
import ContentCreate from 'material-ui/svg-icons/content/create';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Badge from 'material-ui/Badge'
import {MenuItem} from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import { centerStyle, backgroundSecondary} from '../Styles/ThemeStyles'
const zeroPadding={padding:0}
const anchorOrigin={horizontal: 'right', vertical: 'top'}
const targetOrigin={horizontal: 'right', vertical: 'top'}
const badgeStyle={top: 12, right: 12}
const fontWeight={fontWeight:"normal"}
const badgedImage=(countToDo, avatar)=>(
    countToDo?<Badge
        badgeContent={countToDo}
        secondary={true}
        badgeStyle={badgeStyle}
    >
        {avatar}
    </Badge>:avatar
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
const alertStyle=Object.assign({}, backgroundSecondary,  {borderRadius: '50%', width:24, height:24, })
const UserOptions=enhance(({user, history, handleLogout, countToDo})=>{
    const dataImage=user.thumbnailPhoto&&`data:image/jpeg;base64,${user.thumbnailPhoto}`
    const avatar=(
        <IconButton style={zeroPadding}>
            <Avatar src={dataImage}/>
        </IconButton>
    )
    const alerts=countToDo>0?<span style={alertStyle}>{countToDo}</span>:null
    return(
        <div style={centerStyle}>
            <h3 style={fontWeight}>{user.cn}</h3>
            <IconMenu
                iconButtonElement={avatar}
                anchorOrigin={anchorOrigin}
                targetOrigin={targetOrigin}
            >
                <MenuItem primaryText="Tasks" onTouchTap={()=>history.push('/')} leftIcon={<ContentCreate/>}/>
                <MenuItem primaryText="Logout" leftIcon={<ExitToApp/>} onTouchTap={handleLogout}/>
            </IconMenu>
            {alerts}
        </div>
    )
})
export default withRouter(UserOptions);