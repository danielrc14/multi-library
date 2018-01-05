import React from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';

import './SideDrawer.css';

const sideDrawer = props => {
    return (
        <Drawer containerClassName='SideDrawer'>
            <MenuItem>Menu Item</MenuItem>
            <MenuItem>Menu Item 2</MenuItem>
        </Drawer>
    )
};

export default sideDrawer;