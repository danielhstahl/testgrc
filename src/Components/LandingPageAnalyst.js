import React from 'react';
import pure from 'recompose/pure'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';

import Activities from './Activities'

const enhance=compose(
    pure,
    setPropTypes({
        activities:React.PropTypes.arrayOf(React.PropTypes.shape({
            type:React.PropTypes.string.isRequired,
            description:React.PropTypes.string.isRequired
        })).isRequired,
    })
)
const LandingPageAnalyst=enhance(({activities})=><Activities list={activities} />)
    
export default LandingPageAnalyst