import React from 'react';
import { SpeedDial, SpeedDialItem } from 'react-mui-speeddial';
//import FloatingActionButton from 'material-ui/FloatingActionButton';
import PriorityHigh from 'material-ui/svg-icons/notification/priority-high';
import ContentAdd from 'material-ui/svg-icons/content/add';
import NavigationClose from 'material-ui/svg-icons/navigation/close';
import ActionHome from 'material-ui/svg-icons/action/home';
import ContentCreate from 'material-ui/svg-icons/content/create';
import ExitToApp from 'material-ui/svg-icons/action/exit-to-app';
import { withRouter } from 'react-router'
import workflowTheme from '../workflowTheme'
const fabStyle={height:28,width:'100%', backgroundColor:workflowTheme.palette.accent2Color}
const butStyle={float:'right', marginRight:50}

const AssociateFAB=({history})=>{
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
        <SpeedDialItem label="" fabContent={<ExitToApp/>}/>
    </SpeedDial>
    </div>
    );
}
export default withRouter(AssociateFAB)