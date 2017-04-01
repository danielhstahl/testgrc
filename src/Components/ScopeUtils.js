import React from 'react';
import { Container, Row, Col} from 'react-grid-system';
export const FourColHead=({first, second, third, fourth, style})=>
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
</Row>
FourColHead.propTypes={
    first:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    second:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    third:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    fourth:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    style:React.PropTypes.object
}

export const FourColBody=({first, second, third, children, style})=>
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
</Row>
FourColBody.propTypes={
    first:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    second:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    third:React.PropTypes.oneOfType([React.PropTypes.node, React.PropTypes.string]).isRequired,
    children:React.PropTypes.node.isRequired,
    style:React.PropTypes.object
}

export const RiskTestExplanation=({risk, control, responsibility})=>
<div>
    <p>In testing this risk, consider the following:</p>
    <ul>
        <li>The risk is "{risk}"</li>
        <li>The control is "{control}"</li>
        <li>MRMV's responsibility for this risk and control is "{responsibility}"</li>
        <li>Testing may be excluded based off relevance or risk.  Excluded tests must have an explanation.</li>
    </ul>
</div>
RiskTestExplanation.propTypes={
    risk:React.PropTypes.string.isRequired,
    control:React.PropTypes.string.isRequired,
    responsibility:React.PropTypes.string.isRequired
}