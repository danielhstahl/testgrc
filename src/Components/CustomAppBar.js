import React from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import UserOptionsContainer from '../Containers/UserOptionsContainer'
import workflowTheme from '../workflowTheme'
import {backgroundAccent, alternateTextColor, centerStyle, backgroundPrimary} from '../Styles/ThemeStyles'
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
const zeroTopMargin={marginTop:0}
import pure from 'recompose/pure'
const appBarStyle=Object.assign({}, centerStyle, backgroundPrimary, {marginBottom:20})
const iconStyleRight=Object.assign({}, zeroTopMargin, alternateTextColor) 
const hamburger=<IconButton><MenuIcon color={workflowTheme.palette.alternateTextColor}/></IconButton>
const CustomAppBar=pure(()=>{
    return (
        <AppBar 
            title={null} 
            iconElementLeft={hamburger}
            iconElementRight={<UserOptionsContainer/>} 
            iconStyleRight={iconStyleRight}
            iconStyleLeft={zeroTopMargin}
            style={appBarStyle}
            zDepth={0}
        />
    )
})


export default CustomAppBar;