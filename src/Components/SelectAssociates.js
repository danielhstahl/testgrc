import React from 'react'
import SelectField from 'material-ui/SelectField';
import {MenuItem} from 'material-ui/Menu';
import withState from 'recompose/withState'
import withHandlers from 'recompose/withHandlers'
import compose from 'recompose/compose';
import setPropTypes from 'recompose/setPropTypes';
import onlyUpdateForKeys from 'recompose/onlyUpdateForKeys';

const enhance=compose(
    withState('selection', 'updateSelection', 0),
    withHandlers({
        onSelectWrapper:({updateSelection, onSelect})=>(e, k, v)=>{
            updateSelection(v)
            onSelect(v)
        }
    }),
    onlyUpdateForKeys(['selection', 'associates']),
    setPropTypes({
        associates:React.PropTypes.arrayOf(React.PropTypes.shape({
            id:React.PropTypes.string.isRequired,
            cn:React.PropTypes.string.isRequired
        }))
    })
)
export default enhance(({associates, selection, onSelectWrapper})=>(
<SelectField
    floatingLabelText="Assigned To"
    value={selection}
    onChange={onSelectWrapper}
>
    {associates.map(v=>
        <MenuItem key={v.id} value={v.id} primaryText={v.cn} />
    )}

</SelectField>
))