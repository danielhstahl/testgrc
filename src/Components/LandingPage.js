import React from 'react';
import { Container} from 'react-grid-system';
import AssociateFAB from './AssociateFAB'
import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
import workflowTheme from '../workflowTheme'

const topStyles={backgroundColor:workflowTheme.palette.accent2Color,padding:'6%'}
const pages={
    MRMVAnalyst:<LandingPageAnalystContainer/>
}
const LandingPage=({user})=>
<div>
    <div style={topStyles}>
        <Container>
            <h2>Welcome {user.cn}!</h2>
        </Container>
    </div>
    <AssociateFAB/>
    <Container>
    {pages[user.userType]}
    </Container>
</div>

export default LandingPage