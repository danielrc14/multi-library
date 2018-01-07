import React from 'react';
import TextField from 'material-ui/TextField';

import './Input.css';

const input = props => {
    let error = props.error;
    if(!props.touched){
        error = null;
    }

    return (
        <TextField
            className='Input'
            errorText={error}
            type={props.type}
            hintText={props.placeholder}
            value={props.value}
            onChange={props.changed}
            fullWidth={true}
            onBlur={props.setTouched}
        />
    )
};

export default input;