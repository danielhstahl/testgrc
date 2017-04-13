import React from 'react';
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
//import PriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import { withRouter } from 'react-router'
const fabStyle={height:0,width:'100%'}
const butStyle={float:'right', marginRight:50, top:-28}
const fabProps={secondary:true}
const AssociateFAB=({history, handleLogout})=>{
    return(
    <div style={fabStyle}>
    <SpeedDial
        fabContentOpen={
            <ContentAdd />
        }
        fabContentClose={
            <NavigationClose />
        }
        style={butStyle}
        fabProps={fabProps}
    >
        <SpeedDialItem 
            label="" 
            fabContent={<ActionHome/>}
            onTouchTap={()=>history.push('/')}
        />
        <SpeedDialItem 
            label="" 
            fabContent={<ContentCreate/>}
        />
        <SpeedDialItem 
            label="" 
            fabContent={<ExitToApp/>}
            onTouchTap={handleLogout}
        />
    </SpeedDial>
    </div>
    );
}
export default withRouter(AssociateFAB)