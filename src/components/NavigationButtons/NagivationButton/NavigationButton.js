import React from 'react';
import FlatButton from 'material-ui/FlatButton';

const navigationButton = props => {
    const label = props.label ? props.label : props.page;

    return (
        <FlatButton
            onClick={() => props.changePage(props.page)}
            style={{minWidth: 0}}
            label={label}
            disabled={props.disabled}
        />
    )
};

export default navigationButton;