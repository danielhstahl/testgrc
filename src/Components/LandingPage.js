import React from 'react';
import { Container} from 'react-grid-system';
import AssociateFAB from './AssociateFAB'
import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
import workflowTheme from '../workflowTheme'
import {backgroundPrimary, headingHeight, backgroundAccent} from '../Styles/ThemeStyles'
//const cTopStyles=Object.assign({}, backgroundPrimary, {padding:'6%'});
const headingStyle=Object.assign({}, backgroundPrimary, {height:headingHeight, position:'relative', margin:0})
const pageStyle={height:'100%'}
const pages={
    MRMVAnalyst:<LandingPageAnalystContainer/>
}
const titleStyle={color:workflowTheme.palette.accent2Color, paddingTop:'100px'};
const bottomStyle=Object.assign({}, backgroundAccent, {height:'100%'})
const LandingPage=({user})=>
<div style={pageStyle}>
    <div style={headingStyle}>
        <Container>
            <h2 style={titleStyle}>Welcome {user.cn}!</h2>
        </Container>
    </div>
    <AssociateFAB/>
    <Container>
    {pages[user.userType]}
    </Container>
</div>

export default LandingPage