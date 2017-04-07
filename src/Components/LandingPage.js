import React from 'react';
import { Container} from 'react-grid-system';
import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
const pages={
    MRMVAnalyst:<LandingPageAnalystContainer/>
}
const LandingPage=({user})=>
<Container>
    <h2>Welcome {user.cn}!</h2>
    {pages[user.userType]}
</Container>

export default LandingPage