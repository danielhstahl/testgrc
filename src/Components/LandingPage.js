import React from 'react';
import { Container} from 'react-grid-system';
import {containerStyle, paperStyle} from '../Styles/ContentStyles'
import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Paper from 'material-ui/Paper'
const getLandingPage=(userType)=>{
    switch(userType){
        case "MRMVAnalyst":
            return ()=><LandingPageAnalystContainer/>
        default:
            return ()=><LandingPageAnalystContainer/>
    }
}

const enhanceLandingPageV=compose(
    onlyUpdateForKeys(['Page']),
    setPropTypes({
        Page:React.PropTypes.func.isRequired,
    })
)

const LandingPageV=enhanceLandingPageV(({Page})=>{
    return(
        <Container style={containerStyle}>
            <Paper rounded={false} style={paperStyle}>
                <Page/>
            </Paper>
        </Container>
)})



/**todo!  need to improve which policy group is selected */
const LandingPage=({user})=>{
    return <LandingPageV Page={getLandingPage(user.policyGroups[0])}/>
}
LandingPage.propTypes={
    user:React.PropTypes.shape({
        policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        cn:React.PropTypes.string.isRequired
    }).isRequired
}



export default LandingPage