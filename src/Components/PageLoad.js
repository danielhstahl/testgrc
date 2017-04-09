import React from 'react';
import {Container} from 'react-grid-system'
import RefreshIndicator from 'material-ui/RefreshIndicator'; 
const progressStyle={maxWidth:500, margin:"0 auto"}

const PageLoad = () =>
<div style={progressStyle}>
    <RefreshIndicator
        size={70}
        left={0}
        top={0}
        status="loading"
    />
</div>
export default PageLoad;