import React from 'react';
import { withRouter } from 'react-router'
import ContentCreate from 'material-ui/svg-icons/content/create';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import {MenuItem} from 'material-ui/Menu';
import {ListItem } from 'material-ui/List';
import Avatar from 'material-ui/Avatar';
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import lifecycle from 'recompose/lifecycle';
import Warning from 'material-ui/svg-icons/alert/warning'
import { centerStyle} from '../Styles/ThemeStyles'

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
    const alerts=countToDo>0?<span style={centerStyle}><Warning/>{countToDo}</span>:null
    return(
        <div>
            <ListItem leftAvatar={<Avatar src={dataImage}/>} primaryText={user.cn} disabled/>
            <MenuItem primaryText="Tasks" onTouchTap={()=>history.push('/')} leftIcon={<ContentCreate/>} rightIcon={alerts}/>
            <MenuItem primaryText="Logout" leftIcon={<ExitToApp/>} onTouchTap={handleLogout}/>
            
        </div>
        
    )
})
export default withRouter(UserOptions);