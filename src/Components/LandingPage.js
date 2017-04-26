import React from 'react';
import { Container, Row} from 'react-grid-system';
import workflowTheme from '../workflowTheme'
import {containerStyle, paperStyle} from '../Styles/ContentStyles'

import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
//import MaterialView from './MaterialView'
import {Tabs, Tab} from 'material-ui/Tabs';
import withState from 'recompose/withState';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
import Badge from 'material-ui/Badge'
import IconButton from 'material-ui/IconButton';
import Warning from 'material-ui/svg-icons/alert/warning';
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