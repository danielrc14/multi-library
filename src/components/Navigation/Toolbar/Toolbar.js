import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarTitle} from 'material-ui/Toolbar';

import './Toolbar.css';

const toolbar = props => {
    return (
        <Toolbar className='Toolbar'>
            <ToolbarGroup firstChild={true}>
                <ToolbarTitle text="Multi Library" style={{paddingLeft: '20px'}}/>
            </ToolbarGroup>
            <ToolbarGroup>
                <ToolbarTitle text='Hola'/>
            </ToolbarGroup>
        </Toolbar>
    );
};

export default toolbar;