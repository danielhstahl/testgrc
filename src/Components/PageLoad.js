import React from 'react';
import RefreshIndicator from 'material-ui/RefreshIndicator'; 

const refreshSize=100;
const progressStyle={maxWidth:refreshSize, margin:"0 auto"}
const refreshStyle= {
    display: 'inline-block',
    position: 'relative',
  }
const PageLoad = () =>
<div style={progressStyle}>
    <RefreshIndicator
        style={refreshStyle}
        size={refreshSize}
        left={0}
        top={200}
        status="loading"
    />
</div>
export default PageLoad;