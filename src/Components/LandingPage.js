import React from 'react';
import { Container, Row} from 'react-grid-system';
import AssociateFAB from './AssociateFAB'
import workflowTheme from '../workflowTheme'
import LandingPageAnalystContainer from '../Containers/LandingPageAnalystContainer'
import MaterialView from './MaterialView'
import {Tabs, Tab} from 'material-ui/Tabs';
import withState from 'recompose/withState';
import pure from 'recompose/pure';
import compose from 'recompose/compose';
import withHandlers from 'recompose/withHandlers';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';
import Paper from 'material-ui/Paper'
import Avatar from 'material-ui/Avatar';
import {List, ListItem} from 'material-ui/List';
 
const titleStyle={position:'absolute', top:20, width:'100%'};
const TabStyle={}
const getLandingPage=(userType)=>{
    switch(userType){
        case "MRMVAnalyst":
            return ({tab})=><LandingPageAnalystContainer tab={tab}/>
        default:
            return ({tab})=><LandingPageAnalystContainer tab={tab}/>
    }
}

const enhanceTabs=compose(
    onlyUpdateForKeys(['index']),
    setPropTypes({
        labels:React.PropTypes.arrayOf(React.PropTypes.string).isRequired,
        tab:React.PropTypes.number.isRequired,
        setTab:React.PropTypes.func.isRequired
    })
)
const listBackground={backgroundColor:workflowTheme.palette.canvasColor}
const listTextColor={color:workflowTheme.palette.textColor}
const ListOfTabs = enhanceTabs(({labels, tab, setTab}) =>
<Tabs 
    value={tab} 
    onChange={setTab}
    tabItemContainerStyle={listBackground}
>
    {labels.map((label, index)=>{
        return(
        <Tab style={listTextColor} label={label} key={index} value={index}>
        </Tab>)
    })}
</Tabs>)
const enhanceLandingPageV=compose(
    withState('tab', 'updateTab', 0),
    withHandlers({
        setTab:props=>val=>props.updateTab(val)
    }),
    onlyUpdateForKeys(['Page', 'tab']),
    setPropTypes({
        tab:React.PropTypes.number.isRequired,
        Page:React.PropTypes.func.isRequired,
        setTab:React.PropTypes.func.isRequired
    })
)
const labels=["Activities", "To Do", "Pipeline"]
const LandingPageV=enhanceLandingPageV(({user, Page, tab, setTab})=>{
    const dataImage=`data:image/jpeg;base64,${user.thumbnailPhoto}`
    const header=<ListOfTabs labels={labels} tab={tab} setTab={setTab}/>
    return(
    <MaterialView 
        headerChild={header} 
        contentChild={<Page tab={tab}/>}
        optionalTitle={<Container><Row><Paper rounded={false} style={titleStyle}><List><ListItem disabled={true} leftAvatar={<Avatar src={dataImage}/>}>Welcome {user.cn}!</ListItem></List></Paper></Row></Container>}
    />
)})

  

const LandingPage=({user})=>{
    //const Page=getLandingPage(user.userType)
    
    return <LandingPageV user={user} Page={getLandingPage(user.userType)}/>
}



export default LandingPage