import React from 'react';
import { withRouter } from 'react-router'
import ContentCreate from 'material-ui/svg-icons/content/create';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import Badge from 'material-ui/Badge'
import {MenuItem} from 'material-ui/Menu';
import Avatar from 'material-ui/Avatar';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import IconButton from 'material-ui/IconButton';
import IconMenu from 'material-ui/IconMenu';
import {backgroundAccent, centerStyle, alternateTextColor, backgroundPrimary} from '../Styles/ThemeStyles'
const zeroPadding={padding:0}
//const zeroTopMargin={marginTop:0}
const anchorOrigin={horizontal: 'right', vertical: 'top'}
const targetOrigin={horizontal: 'right', vertical: 'top'}
const badgeStyle={top: 12, right: 12}

const badgedImage=(countToDo, avatar)=>(
    countToDo?<Badge
        badgeContent={countToDo}
        secondary={true}
        badgeStyle={badgeStyle}
    >
        {avatar}
    </Badge>:avatar
)

const UserOptions=({user, history, handleLogout, countToDo})=>{
    const dataImage=user.thumbnailPhoto&&`data:image/jpeg;base64,${user.thumbnailPhoto}`
    const avatar=(
        <IconButton style={zeroPadding}>
            <Avatar src={dataImage}/>
        </IconButton>
    )
    return(
        <div style={centerStyle}>
            {user.cn}
            <IconMenu
                iconButtonElement={badgedImage(countToDo, avatar)}
                anchorOrigin={anchorOrigin}
                targetOrigin={targetOrigin}
            >
            <MenuItem primaryText="Tasks" onTouchTap={()=>history.push('/')} leftIcon={<ContentCreate/>}/>
            <MenuItem primaryText="Logout" leftIcon={<ExitToApp/>} onTouchTap={handleLogout}/>
            </IconMenu>
        </div>
    )
}
UserOptions.propTypes={
    user:React.PropTypes.shape({
        policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        cn:React.PropTypes.string.isRequired
    }).isRequired,
    handleLogout:React.PropTypes.func.isRequired,
    countToDo:React.PropTypes.number
}
export default withRouter(UserOptions);