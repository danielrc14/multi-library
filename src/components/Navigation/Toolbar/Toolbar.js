import React from 'react';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';

const toolbar = props => {
    return (
        <Toolbar>
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