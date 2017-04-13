import React from 'react';
import { Container, Row} from 'react-grid-system';

import {backgroundPrimary, backgroundAccent, headingHeight} from '../Styles/ThemeStyles'
import Paper from 'material-ui/Paper'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import pure from 'recompose/pure';
import AssociateFABContainer from '../Containers/AssociateFABContainer'

const pageStyle={height:'100%'}
//const FlowStyles={padding: "2% 0% 0% 0%"}
const headingStyle=Object.assign({}, backgroundPrimary, {height:headingHeight, position:'relative'})
const headingPaperStyle={position:'absolute', bottom:0, width:'100%', left:0, right:0, margin:'0 auto'};
const bottomPaperStyle={minHeight:300, maxHeight:500};
const bottomStyle=Object.assign({}, backgroundAccent, {height:'100%'})

const enhance=compose(
    pure,
    setPropTypes({
        headerChild:React.PropTypes.node.isRequired,
        contentChild:React.PropTypes.node.isRequired,
        optionalTitle:React.PropTypes.node,
    })
)
const MaterialView=({headerChild, contentChild, optionalTitle})=>
<div style={pageStyle} >
    
    
    <div style={headingStyle}>
        {optionalTitle?optionalTitle:null}
        <Container style={headingPaperStyle}> 
            <Row>
                <Paper rounded={false} style={{bottom:0}}>
                    {headerChild}                   
                </Paper>
            </Row>
        </Container> 
    </div>
    <AssociateFABContainer/>
    <div style={bottomStyle}>
    <Container> 
        <Row>
            <Paper rounded={false} style={bottomPaperStyle}>
              {contentChild}      
            </Paper>
        </Row>
    </Container>
    </div>
</div>
export default enhance(MaterialView);