import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import UserOptionsContainer from '../Containers/UserOptionsContainer'
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import workflowTheme from '../workflowTheme'
import {backgroundborderColor, alternateTextColor, centerStyle, backgroundPrimary} from '../Styles/ThemeStyles'
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
const zeroTopMargin={marginTop:0}
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import getContext from 'recompose/getContext';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import {
    BrowserRouter as Router,
  Link
} from 'react-router-dom'


const appBarStyle=Object.assign({}, centerStyle, backgroundPrimary, {marginBottom:20})
const iconStyleRight=Object.assign({}, zeroTopMargin, alternateTextColor) 
const hamburger=<IconButton><MenuIcon color={workflowTheme.palette.alternateTextColor}/></IconButton>

const enhance=compose(
    withState('open', 'toggleDrawer', false),
    getContext({
        router: React.PropTypes.object
    }),
    withHandlers({
        /**this is declared so it doesnn't have to be recomputed every render */
        localToggleDrawer:({open, toggleDrawer})=>()=>toggleDrawer(!open),
        localToggleWrapper:({open, toggleDrawer})=>(newOpen)=>toggleDrawer(newOpen),
    }),
    onlyUpdateForKeys(['open']),
    setPropTypes({
        open:React.PropTypes.bool.isRequired
    })
    
)
const CustomAppBar=enhance(({open, localToggleWrapper, localToggleDrawer, router, routes})=>{
    const filteredRoutes=routes.filter(val=>val.nav)
    return (
    <div>
        <AppBar 
            title={null} 
            iconElementLeft={hamburger}
            iconElementRight={<UserOptionsContainer/>} 
            iconStyleRight={iconStyleRight}
            iconStyleLeft={zeroTopMargin}
            style={appBarStyle}
            zDepth={0}
            onLeftIconButtonTouchTap={localToggleDrawer}
        />
        <Drawer 
            open={open} 
            docked={false}
            onRequestChange={localToggleWrapper}
        >
        {filteredRoutes.map(route=>{
            return  <MenuItem 
                key={route.path} 
                onTouchTap={localToggleDrawer} 
                style={router.route.location.pathname===route.path?backgroundborderColor:null}
                containerElement={<Link to={route.path}/>}
            >
                {route.name}
            </MenuItem>
        })}
        </Drawer>
    </div>
    )
})


export default CustomAppBar;