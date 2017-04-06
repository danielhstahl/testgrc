import React from 'react';
import shouldUpdate from 'recompose/shouldUpdate'
import { Row, Col} from 'react-grid-system';


import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';






const enhanceHead=compose(
    onlyUpdateForKeys(['first', 'second', 'third', 'fourth']),
    setPropTypes({
        first:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        second:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        third:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        fourth:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        style:React.PropTypes.object
    })
)

export const FourColHead=enhanceHead(({first, second, third, fourth, style})=>
<Row style={style}>
    <Col xs={3} >
        <h3>{first}</h3>
    </Col>
    <Col xs={3}>
        <h3>{second}</h3>
    </Col>
    <Col xs={3}>
        <h3>{third}</h3>
    </Col>
    <Col xs={3}>
        <h3>{fourth}</h3>
    </Col>
</Row>)


const enhanceBody=compose(
    onlyUpdateForKeys(['first', 'second', 'third', 'children']),
    setPropTypes({
        first:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        second:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        third:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
        children:React.PropTypes.node.isRequired,
        style:React.PropTypes.object
    })
)
export const FourColBody=enhanceBody(({first, second, third, children, style})=>
<Row style={style}>
    <Col xs={3} >
        <p>{first}</p>
    </Col>
    <Col xs={3}>
        <p>{second}</p>
    </Col>
    <Col xs={3}>
        <p>{third}</p>
    </Col>
    <Col xs={3}>
        {children}
    </Col>
</Row>)

const enhanceRisk=compose(
    onlyUpdateForKeys(['risk', 'control', 'responsibility']),
    setPropTypes({
        risk:React.PropTypes.string.isRequired,
        control:React.PropTypes.string.isRequired,
        responsibility:React.PropTypes.string.isRequired
    })
)
export const RiskTestExplanation=enhanceRisk(({risk, control, responsibility})=>
<div>
    <p>In testing this risk, consider the following:</p>
    <ul>
        <li>The risk is "{risk}"</li>
        <li>The control is "{control}"</li>
        <li>MRMV's responsibility for this risk and control is "{responsibility}"</li>
        <li>Testing may be excluded based off relevance or risk.  Excluded tests must have an explanation.</li>
    </ul>
</div>)