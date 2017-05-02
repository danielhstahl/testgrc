import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
import DatePicker from 'material-ui/DatePicker';
import Paper from 'material-ui/Paper';
import pure from 'recompose/pure'
import SelectAssociates from './SelectAssociates'
import lifecycle from 'recompose/lifecycle'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import {containerStyle, paperStyle} from '../Styles/ContentStyles'
import {validationIcon, numberOfQC} from '../catalogHelpers'
import ExpandingListItem from './ExpandingListItem'

const disableWeekends=date=>date.getDay()===0||date.getDay()===6
const firstDayOfWeek=0;
const enhance=compose(
    pure, 
    lifecycle({
        componentWillMount(){
            const {loadInit, policyGroups}=this.props
            loadInit(policyGroups)
        }
    }),
    setPropTypes({
        pipeline:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
        associates:React.PropTypes.arrayOf(React.PropTypes.shape({
            cn:React.PropTypes.string.isRequired,
            id:React.PropTypes.string.isRequired
        })).isRequired,
        loadInit:React.PropTypes.func.isRequired, 
        policyGroups:React.PropTypes.arrayOf(React.PropTypes.string).isRequired
    })
)

const MyDatePicker=({title})=><DatePicker container='inline' hintText={title} mode='landscape' shouldDisableDate={disableWeekends} firstDayOfWeek={firstDayOfWeek}/>

const PipeLineList=enhance(({pipeline, associates})=>(
<Container style={containerStyle}>
    <Paper rounded={false} style={paperStyle}>
        {pipeline.map((listItem, pipeIndex)=>
        <ExpandingListItem
            key={pipeIndex}
            primaryText={listItem.description}
            leftIcon={validationIcon(listItem.type)}
        >
        <Container>
            <Row>
                <Col xs={4}>
                    {[...Array(numberOfQC(listItem.type))].map((v, qcIndex)=>{
                        return <MyDatePicker key={qcIndex} title={`QC ${qcIndex+1}`}/>
                    })}
                </Col>
                <Col xs={4}>
                    <SelectAssociates associates={associates} onSelect={(v)=>{console.log(v)}}/>
                </Col>
            </Row>
        </Container>
        </ExpandingListItem>)}
    </Paper>
</Container>
))
export default PipeLineList